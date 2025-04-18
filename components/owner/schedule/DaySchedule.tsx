"use client";

import React from "react";
import { format } from "date-fns";

const workingHours = Array.from({ length: 9 }, (_, i) => 10 + i); // 10 AM – 6 PM

interface DayScheduleProps {
    date?: Date;
}

export default function DaySchedule({ date = new Date() }: DayScheduleProps) {
    const formattedDate = format(date, "EEEE, MMMM d, yyyy");

    return (
        <div className="flex flex-col w-full h-full rounded-xl shadow bg-white border border-gray-200">
            {/* Title */}
            <div className="px-4 py-3 border-b rounded-xl border-gray-200 bg-[#fdfaf6]">
                <h2 className="text-lg font-semibold text-[#dba052]">{formattedDate}</h2>
            </div>

            {/* Schedule Grid */}
            <div className="flex flex-1 overflow-y-auto">
                {/* Time Labels */}
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

                {/* Grid Area */}
                <div className="flex-1 relative">
                    {workingHours.map((hour) => (
                        <div key={hour} className="h-16 border-b border-gray-200" />
                    ))}
                </div>
            </div>
        </div>
    );
}
