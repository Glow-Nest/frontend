"use client";

import React from "react";

function ProgressIndicator({ step }: { step: number }) {
    const steps = [
        { id: 1, name: "User Details" },
        { id: 2, name: "Card Payment" },
    ];

    return (
        <div className="flex justify-center gap-4 my-6">
            {steps.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${step >= s.id
                                ? "bg-amber-500 text-white border-amber-500"
                                : "text-gray-400 border-gray-300"
                            }`}
                    >
                        {s.id}
                    </div>
                    <p
                        className={`text-sm font-medium ${step >= s.id ? "text-gray-900" : "text-gray-400"
                            }`}
                    >
                        {s.name}
                    </p>
                    {s.id !== steps.length && (
                        <div className="w-10 h-px bg-gray-300" />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProgressIndicator;
