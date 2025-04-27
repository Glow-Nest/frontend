"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import AddModal, { BlockInput } from "./AddModal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { BlockedTime, useAddBlockedTimeMutation } from "@/store/api/scheduleApi";
import toast from "react-hot-toast";
import { RootState } from "@/store";
import { addSelectedDate } from "@/store/slices/schedules/CreateAppointmentSlice";

const workingHours = Array.from({ length: 9 }, (_, i) => 10 + i);

// Interfaces for a time block and component props
interface TimeBlock {
    startTime: string;
    endTime: string;
    label: string;
}

interface DayScheduleProps {
    date?: Date;
    appointments?: TimeBlock[];
}

// Utility to calculate positioning for time blocks
const getPosition = (start: string, end: string) => {
    const baseHour = 10;

    // Parse the start and end times into hours and minutes.
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    // Convert the start and end times into total minutes since midnight.
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    // Calculate the offset from the base hour in minutes.
    const offsetMinutes = startMinutes - baseHour * 60;

    // Calculate the duration of the time block in minutes.
    const durationMinutes = endMinutes - startMinutes;

    // Convert the offset and duration into rem units for CSS.
    return {
        top: `${(offsetMinutes / 60) * 4}rem`,
        height: `${(durationMinutes / 60) * 4}rem`,
    };
};

// ---------- COMPONENT: Main DaySchedule ----------
export default function DaySchedule({
    date = new Date(),
    appointments = [],
}: DayScheduleProps) {
    const dispatch = useAppDispatch();
    const [addBlockedTime, { isLoading }] = useAddBlockedTimeMutation();

    const formattedDate = format(date, "EEEE, MMMM d, yyyy");
    const selectedDate = format(date, "yyyy-MM-dd");

    const blockedTimesByDate = useAppSelector(
        (state: RootState) => state.blockedTimes?.blockedTimesByDate?.[selectedDate] ?? []);

    const [modalOpen, setModalOpen] = useState(false);


    const handleBlockTimeSave = async (blockedTime: BlockInput) => {
        try {
            toast.loading('Saving blocked time...');

            await addBlockedTime({
                scheduleDate: selectedDate, startTime: blockedTime.startTime, endTime: blockedTime.endTime,
                blockReason: blockedTime.blockReason
            }).unwrap();

            toast.dismiss();
            toast.success(`Time blocked from ${blockedTime.startTime} to ${blockedTime.endTime}.`);

            setModalOpen(false);
        } catch (error: any) {
            toast.dismiss();

            const errorCode = error?.data?.[0]?.errorId;

            switch (errorCode) {
                case "BlockTimeSlot.Overlap":
                    toast.error(error?.data?.[0]?.message);
                    break;
                case "BlockTimeSlot.OverlapsExistingAppointment":
                    toast.error(error?.data?.[0]?.message);
                    break;
                case "TimeSlot.EndTimeStart":
                    toast.error(error?.data?.[0]?.message);
                    break;
                case "BlockTimeSlot.EmptyBlockReason":
                    toast.error(error?.data?.[0]?.message);
                    break;
                case "BlockTimeSlot.BlockedTimeInPast":
                    toast.error(error?.data?.[0]?.message);
                    break;
                default:
                    toast.error("Failed to block time. Please try again later.");
                    break;
            }

            console.error("Error blocking time:", error);
        }
    };

    const handleAddModalClick = () => {
        setModalOpen(true);
        dispatch(addSelectedDate(formattedDate));
    }

    return (
        <div className="flex flex-col w-full h-full rounded-xl shadow bg-white border border-gray-200">
            <Header title={formattedDate} onAdd={handleAddModalClick} />
            <Schedule
                appointments={appointments}
                blockedTimes={blockedTimesByDate}
            />
            <AddModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreateAppointment={() => { }}
                onCreateBlock={handleBlockTimeSave}
            />
        </div>
    );
}

// ---------- COMPONENT: Header ----------
function Header({ title, onAdd }: { title: string; onAdd: () => void }) {
    return (
        <div className="px-4 py-3 border-b rounded-xl border-gray-200 bg-[#fdfaf6] flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#dba052]">{title}</h2>
            <button
                onClick={onAdd}
                className="bg-[#dba052] text-white px-3 py-1 rounded shadow hover:bg-[#c48a3a] transition-colors duration-200"
            >
                + Add
            </button>
        </div>
    );
}

// ---------- COMPONENT: Schedule ----------
function Schedule({
    appointments,
    blockedTimes
}: {
    appointments: TimeBlock[];
    blockedTimes: BlockedTime[];
}) {
    return (
        <div className="flex flex-1 overflow-y-auto">
            <TimeLabels />
            <ScheduleGrid appointments={appointments} blockedTimes={blockedTimes} />
        </div>
    );
}

// ---------- COMPONENT: TimeLabels ----------
function TimeLabels() {
    return (
        <div className="w-20 border-r border-gray-200 text-sm text-gray-500">
            {workingHours.map((hour) => (
                <div
                    key={hour}
                    className="h-16 px-2 flex items-start justify-end pr-3 pt-1 leading-none"
                >
                    {new Date(0, 0, 0, hour).toLocaleTimeString([], {
                        hour: "numeric",
                        hour12: true,
                    })}
                </div>
            ))}
        </div>
    );
}

// ---------- COMPONENT: ScheduleGrid ----------
function ScheduleGrid({
    appointments,
    blockedTimes
}: {
    appointments: TimeBlock[];
    blockedTimes: BlockedTime[];
}) {


    return (
        <div className="flex-1 relative">
            {/* Time grid rows */}
            {workingHours.map((hour) => (
                <div key={hour} className="h-16 border-b border-gray-200" />
            ))}

            {/* Appointment blocks */}
            {appointments.map((appt, i) => (
                <TimeBlockItem
                    key={`appt-${i}`}
                    {...getPosition(appt.startTime, appt.endTime)}
                    label={appt.label}
                    type="appointment"
                />
            ))}

            {/* Blocked time blocks */}
            {blockedTimes.length !== 0 &&
                blockedTimes.map((block, i) => (
                    <TimeBlockItem
                        key={`block-${i}`}
                        {...getPosition(block.startTime, block.endTime)}
                        label={block.blockReason}
                        type="blocked"
                    />
                ))
            }

        </div>
    );
}

// ---------- COMPONENT: TimeBlockItem ----------
function TimeBlockItem({
    top,
    height,
    label,
    type,
}: {
    top: string;
    height: string;
    label: string;
    type: "appointment" | "blocked";
}) {
    const styles = {
        appointment:
            "bg-[#f3e0ca] border-l-4 border-[#dba052] text-gray-800",
        blocked:
            "bg-[#F8D7DA] border-l-4 border-[#B71C1C] text-[#B71C1C]",
    };

    return (
        <div
            className={`absolute left-4 right-4 text-sm rounded-md px-3 py-1 shadow ${styles[type]}`}
            style={{ top, height }}
        >
            {label}
        </div>
    );
}
