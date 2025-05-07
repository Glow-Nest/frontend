"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useAppSelector } from '@/store/hook';
import { RootState } from '@/store';
import { useGetAppointmentsClientQuery } from '@/store/api/scheduleApi';
import { Appointment } from 'libs/types/ScheduleTypes';
import toast from 'react-hot-toast';
import { formatTimeStringTo12HourClock } from 'libs/helpers';
import { CalendarClock, StickyNote } from 'lucide-react';
import { format } from "date-fns";


const timeFrames = ['Future', 'Past'];

function ViewAppointment() {
    const clientId = useAppSelector((state: RootState) => state.user.id);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const timeFrame = timeFrames[selectedIndex];
    const itemsPerPage = 4;

    const { data, isLoading, error } = useGetAppointmentsClientQuery({ clientId: clientId ?? '', timeFrame });

    const toastId = useRef<string | null>(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedIndex]);

    useEffect(() => {
        if (isLoading && !toastId.current) {
            toastId.current = toast.loading(`Loading ${timeFrame} appointments...`);
        }
        if (error && toastId.current) {
            toast.dismiss(toastId.current);
            toast.error('Failed to load appointments.');
            toastId.current = null;
        }
        if (!isLoading && !error && data?.appointments) {
            if (toastId.current) {
                toast.dismiss(toastId.current);
                toast.success(`Loaded ${timeFrame} appointments`);
                toastId.current = null;
            }
        }
    }, [isLoading, error, data, timeFrame]);

    const appointments = data?.appointments ?? [];
    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const paginatedAppointments = appointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="h-full md:p-4 flex flex-col">
            <p className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
                View Appointments
            </p>

            <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <TabList className="flex flex-wrap md:flex-nowrap gap-2 border-b pb-2 mb-4">
                    {['UPCOMING', 'PAST'].map((label, idx) => (
                        <Tab
                            key={idx}
                            className={({ selected }) =>
                                `px-3 py-1.5 text-sm font-medium rounded-md md:rounded-t-lg cursor-pointer ${selected
                                    ? 'bg-white border border-b-transparent text-[#dba052] focus:outline-none'
                                    : 'text-gray-500 hover:text-[#dba052]'
                                }`
                            }
                        >
                            {label}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels className="flex-1 overflow-y-auto">
                    {[paginatedAppointments, paginatedAppointments].map((appointments, index) => (
                        <TabPanel key={index}>
                            <div className="bg-white rounded-lg shadow">
                                {appointments.map((a) => (
                                    <AppointmentCard key={a.appointmentId} appointment={a} />
                                ))}

                                {totalPages > 1 && (
                                    <div className="mt-5 flex justify-center gap-4 text-sm text-gray-700">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 rounded-md border border-[#f0d9c4] bg-[#fff7f0] hover:bg-[#fce9d6] disabled:opacity-50"
                                        >
                                            Prev
                                        </button>
                                        <span className="self-center text-[#9f5621] font-medium">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 rounded-md border border-[#f0d9c4] bg-[#fff7f0] hover:bg-[#fce9d6] disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>

    );
}


type AppointmentProps = {
    appointment: Appointment
}


function AppointmentCard({ appointment }: AppointmentProps) {
    const day = format(new Date(appointment.appointmentDate), 'd');
    const month = format(new Date(appointment.appointmentDate), 'MMM');

    return (
        <div className="flex flex-col sm:flex-row mb-4 rounded-md shadow-sm overflow-hidden">
            {/* Date block */}
            <div className="w-full sm:w-16 bg-[#fdf1e6] flex flex-row sm:flex-col items-center justify-center text-[#333] py-2 sm:py-0">
                <p className="text-3xl font-bold leading-none sm:mb-0">{day}</p>
                <p className="text-base font-semibold uppercase text-[#d38b3d] ml-2 sm:ml-0">{month}</p>
            </div>

            {/* Details */}
            <div className="flex-1 bg-[#fff8f3] hover:bg-[#fff1e7] px-4 py-3 border-t sm:border-t-0 sm:border-l-2 border-[#f7b267] space-y-2 transition-colors">
                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <CalendarClock className="w-4 h-4 text-[#d38b3d]" />
                    <span>{formatTimeStringTo12HourClock(appointment.startTime)} – {formatTimeStringTo12HourClock(appointment.endTime)}</span>
                </div>

                {/* Note */}
                {appointment.appointmentNote && (
                    <div className="flex items-start gap-2 text-xs italic text-gray-500">
                        <StickyNote className="w-4 h-4 text-[#d38b3d]" />
                        <span>Note: {appointment.appointmentNote}</span>
                    </div>
                )}

                {/* Services */}
                <div className="flex flex-wrap gap-2">
                    {appointment.services.map((service, idx) => (
                        <span key={idx} className="text-xs bg-[#fdf1e6] px-2 py-1 rounded-full border border-[#f7b267]">
                            {service}
                        </span>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default ViewAppointment;
