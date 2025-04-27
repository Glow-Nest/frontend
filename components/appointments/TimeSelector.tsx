"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useGetBlockedTimesQuery, useLazyGetAvailableSlotsQuery } from "@/store/api/scheduleApi";
import { setSchedule, TimeSlotGroup } from "@/store/slices/schedules/ScheduleSlice";
import { addSelectedTime } from "@/store/slices/schedules/CreateAppointmentSlice";
import { formatTime } from "libs/helpers";


function TimeSelector() {
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.appointment);
    const scheduleState = useSelector((state: RootState) => state.schedules);

    const [timeSlots, setTimeSlots] = useState<TimeSlotGroup>();

    const [trigger, { data, isLoading, error }] = useLazyGetAvailableSlotsQuery();

    useEffect(() => {
        if (!selected.selectedDate) return;

        // Avoid fetching if already in Redux
        const existing = scheduleState.schedules[selected.selectedDate];
        if (existing) {
            setTimeSlots(existing.availableSlots);
            return;
        }

        const toastId = toast.loading("Loading available time...");

        trigger(selected.selectedDate)
            .unwrap()
            .then((response) => {
                dispatch(setSchedule({
                    scheduleDate: selected.selectedDate!,
                    availableSlots: response
                }));
                setTimeSlots(response);
                toast.success("Available Time loaded!", { id: toastId });
            })
            .catch(() => {
                toast.error("Failed to load available time 😢", { id: toastId });
            });
    }, [selected.selectedDate, scheduleState.schedules, trigger, dispatch]);

    

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <p className="text-2xl font-semibold mb-6">
                {selected.selectedDate && (
                    <span>
                        {new Date(selected.selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })}
                    </span>
                )}
            </p>

            {timeSlots && Object.entries(timeSlots).map(([label, slots]) => (
                <div key={label} className="mb-6">
                    <p className="text-lg font-medium text-gray-800 mb-3">{label}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {slots.map((timeObj, index) => {
                            const formattedTime = `${formatTime(timeObj.start)} - ${formatTime(timeObj.end)}`;
                            const isSelected = selected.selectedTime === formattedTime;

                            const selectedRawStart = selected.startTime;
                            const slotsNeeded = selected.totalDuration / 30;
                            const remainingSlots = slots.length - index;
                            const isDisabledDueToOverflow = remainingSlots < slotsNeeded;

                            const isSelectedGroup = (() => {
                                if (!selectedRawStart || slotsNeeded < 1) return false;
                                const group = slots.slice(index, index + slotsNeeded);
                                return group.length === slotsNeeded && group[0].start === selectedRawStart;
                            })();

                            return (
                                <button
                                    key={`${timeObj.start}-${timeObj.end}`}
                                    disabled={!selected.selectedDate || isDisabledDueToOverflow}
                                    className={`py-2 px-4 rounded-lg font-medium transition text-sm
                                        ${!selected.selectedDate || isDisabledDueToOverflow ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                                            isSelected
                                                ? "bg-[#dba052] text-white shadow  cursor-pointer"
                                                : "bg-gray-100 text-gray-800 hover:bg-[#f3e0ca]  cursor-pointer"
                                        }`}
                                    onClick={() => dispatch(addSelectedTime(formattedTime))
                        }
                                >
                            { formattedTime }
                                </button>
                    );
                        })}
                </div>
                </div>
    ))
}
        </div >
    );
}

export default TimeSelector;
