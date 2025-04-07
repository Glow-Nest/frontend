"use client";

import { RootState } from "@/store";
import { addSelectedTime } from "@/store/slices/AppointmentSlice";
import { useDispatch, useSelector } from "react-redux";

const timeSlots = {
    Morning: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    Afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
    Evening: ["5:00 PM", "5:30 PM"]
};

function TimeSelector() {
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.appointment);

    const handleTimeClick = (time: string) => {
        dispatch(addSelectedTime(time));
    };

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

            {Object.entries(timeSlots).map(([label, slots]) => (
                <div key={label} className="mb-6">
                    <p className="text-lg font-medium text-gray-800 mb-3">{label}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {slots.map((time) => {
                            const isSelected = selected.selectedTime === time;
                            return (
                                <button
                                    key={time}
                                    onClick={() => handleTimeClick(time)}
                                    className={`py-2 px-4 rounded-lg font-medium transition text-sm cursor-pointer
                                        ${isSelected
                                            ? "bg-[#dba052] text-white shadow"
                                            : "bg-gray-100 text-gray-800 hover:bg-[#f3e0ca]"
                                        }`}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TimeSelector;
