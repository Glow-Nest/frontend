import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CalendarDays, Clock, Mail, Pen, Scissors } from "lucide-react";

// Interfaces for appointment and block inputs
export interface AppointmentInput {
    email: string;
    startTime: string;
    endTime: string;
    services: string[];
    note?: string;
}

export interface BlockInput {
    startTime: string;
    endTime: string;
    reason: string;
}

// Props for the AppointmentForm component
interface AppointmentFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    services: string[];
    toggleService: (service: string) => void;
    serviceOptions: string[];
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
}

// Main AddModal component
export default function AddModal({
    isOpen,
    onClose,
    onCreateAppointment,
    onCreateBlock,
    defaultStartTime = "10:00",
    defaultEndTime = "11:00",
    serviceOptions = [],
}: {
    isOpen: boolean;
    onClose: () => void;
    onCreateAppointment: (data: AppointmentInput) => void;
    onCreateBlock: (data: BlockInput) => void;
    defaultStartTime?: string;
    defaultEndTime?: string;
    serviceOptions: string[];
}) {
    // State variables for managing form inputs and mode
    const [mode, setMode] = useState<"appointment" | "block">("appointment");
    const [email, setEmail] = useState("");
    const [services, setServices] = useState<string[]>([]);
    const [note, setNote] = useState("");
    const [startTime, setStartTime] = useState(defaultStartTime);
    const [endTime, setEndTime] = useState(defaultEndTime);
    const [reason, setReason] = useState<string>("");

    // Handle form submission based on the selected mode
    const handleSubmit = () => {
        if (mode === "appointment") {
            onCreateAppointment({ email, startTime, endTime, services, note });
        } else {
            onCreateBlock({ startTime, endTime, reason });
        }
        onClose();
    };

    // Toggle a service in the selected services list
    const toggleService = (service: string) => {
        setServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    // Generate a list of time options from 10:00 to 18:30 in 30-minute intervals
    const generateTimeOptions = () => {
        const times: string[] = [];
        for (let hour = 10; hour <= 18; hour++) {
            for (let minute of [0, 30]) {
                const formatted = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                times.push(formatted);
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();
    const isValid = mode === "appointment"
        ? email.trim() !== "" && services.length > 0 && startTime && endTime
        : startTime && endTime && reason;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 border border-gray-200">
                    {/* Dialog title with dynamic mode */}
                    <DialogTitle className="text-xl font-semibold mb-6 text-[#dba052] flex items-center gap-2">
                        <CalendarDays className="w-5 h-5" />
                        Add {mode === "appointment" ? "Appointment" : "Block Time"}
                    </DialogTitle>

                    {/* Mode selection buttons */}
                    <div className="flex mb-6 space-x-2">
                        <button
                            onClick={() => setMode("appointment")}
                            className={`flex-1 px-4 py-2 font-medium rounded-md text-sm transition border ${mode === "appointment" ? "bg-[#dba052] text-white border-[#dba052]" : "bg-gray-100 text-gray-800 border-gray-300"}`}
                        >
                            Appointment
                        </button>
                        <button
                            onClick={() => setMode("block")}
                            className={`flex-1 px-4 py-2 font-medium rounded-md text-sm transition border ${mode === "block" ? "bg-[#B71C1C] text-white border-[#B71C1C]" : "bg-gray-100 text-gray-800 border-gray-300"}`}
                        >
                            Block
                        </button>
                    </div>

                    {/* Common elements for both modes */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Start time dropdown */}
                        <div>
                            <label className="flex items-center gap-1 text-sm mb-1">
                                <Clock className="w-4 h-4 text-gray-500" /> Start Time
                            </label>
                            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full border border-gray-300 px-2 py-2 rounded-md text-sm">
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                        {/* End time dropdown */}
                        <div>
                            <label className="flex items-center gap-1 text-sm mb-1">
                                <Clock className="w-4 h-4 text-gray-500" /> End Time
                            </label>
                            <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full border border-gray-300 px-2 py-2 rounded-md text-sm">
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Render AppointmentForm if mode is "appointment" */}
                    {mode === "appointment" && (
                        <AppointmentForm
                            email={email}
                            setEmail={setEmail}
                            services={services}
                            toggleService={toggleService}
                            serviceOptions={serviceOptions}
                            note={note}
                            setNote={setNote}
                        />
                    )}

                    {mode === "block" && (
                        <div className="mb-4">
                            <label htmlFor="block-reason" className="flex items-center gap-1 text-sm mb-1">
                                <Pen className="w-4 h-4 text-gray-500" /> Reason for blocking
                            </label>
                            <input
                                id="block-reason"
                                type="text"
                                placeholder="e.g. Lunch break, Cleaning, etc."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                            />
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-2 mt-6">
                        {/* Cancel button */}
                        <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200 border border-gray-300 cursor-pointer">Cancel</button>

                        {/* Save button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!isValid}
                            className={`px-4 py-2 rounded-md text-sm font-mediumr transition
    ${isValid
                                    ? "bg-[#dba052] cursor-pointer text-white hover:bg-[#c58e41]"
                                    : "bg-gray-300 text-white cursor-not-allowed"}
  `}
                        >
                            Save
                        </button>

                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    );
}

function AppointmentForm({ email, setEmail, services, toggleService, serviceOptions, note, setNote }: AppointmentFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="flex items-center gap-1 text-sm mb-1">
                    <Mail className="w-4 h-4 text-gray-500" /> Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                />
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-1 text-sm mb-1">
                    <Scissors className="w-4 h-4 text-gray-500" /> Services
                </label>
                <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                        <button
                            type="button"
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`px-3 py-1.5 border rounded-full text-sm transition cursor-pointer hover:bg-[#f3e0ca] hover:border-[#dba052] hover:text-[#5b3e1f] ${services.includes(service) ? "bg-[#f3e0ca] border-[#dba052] text-[#5b3e1f]" : "bg-white border-gray-300"}`}
                        >
                            {service}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-1 text-sm mb-1">
                    <Pen className="w-4 h-4 text-gray-500" /> Note
                </label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                />
            </div>
        </>
    )
}