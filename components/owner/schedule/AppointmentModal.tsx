import React from "react";
import { Appointment } from "libs/types/ScheduleTypes";
import { formatTimeStringTo12HourClock } from "libs/helpers";
import { format } from "date-fns";
import { CalendarDays, Clock, Scissors, StickyNote, User2, User2Icon } from "lucide-react";

interface AppointmentModalProps {
    appointment: Appointment;
    onClose: () => void;
}

export default function AppointmentModal({ appointment, onClose }: AppointmentModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" />

            {/* Modal Box */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-xl border border-[#f6e9dc] shadow-xl p-6 animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                >
                    &times;
                </button>

                <h3 className="text-xl font-semibold text-[#d16c1e] mb-4">Appointment Details</h3>

                <div className="text-sm space-y-3 text-gray-800">
                    <p className="flex items-center gap-2">                        
                        <User2Icon className="w-4 h-4 text-[#f08a24]" />
                        <strong className="text-gray-700">Client:</strong> {appointment.clientName}
                    </p>

                    <p className="flex items-center gap-2">                        
                        <CalendarDays className="w-4 h-4 text-[#f08a24]" />
                        <strong className="text-gray-700">Date:</strong> {format(new Date(appointment.appointmentDate), "PPP")}
                    </p>

                    <p className="flex items-center gap-2">                        
                        <Clock className="w-4 h-4 text-[#f08a24]" />
                        <strong className="text-gray-700">Time:</strong> {formatTimeStringTo12HourClock(appointment.startTime)} – {formatTimeStringTo12HourClock(appointment.endTime)}
                    </p>

                    <p className="flex items-center gap-2">                        
                        <Scissors className="w-4 h-4 text-[#f08a24]" />
                        <strong className="text-gray-700">Services:</strong> {appointment.services.map(s => s).join(", ")}
                    </p>

                    {appointment.appointmentNote && <p className="flex items-center gap-2">
                        <StickyNote className="w-4 h-4 text-[#f08a24]" />
                        <strong className="text-gray-700">Note:</strong> {appointment.appointmentNote}
                    </p>}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-[#f08a24] text-white px-5 py-2 rounded-md shadow hover:bg-[#d47112] transition cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
}