'use client';

import React, { useState } from 'react';
import "../common/css/hoverUnderline.css";

function InputFields({ onEmailClick }: { onEmailClick: () => void }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const allFieldsFilled = Object.values(form).every(val => val.trim() !== '');

    return (
        <div className="flex flex-col gap-6 w-full">
            <InputField label="First Name" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} />
            <InputField label="Phone Number" name="phoneNumber" placeholder="Phone Number" type="tel" value={form.phoneNumber} onChange={handleChange} />
            <InputField label="Email Address" name="email" placeholder="example@gmail.com" type="email" value={form.email} onChange={handleChange} />
            <InputField label="Password" name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />

            <div className="flex justify-between items-center mt-4">
                <button
                    className={`px-5 py-2 rounded text-sm font-medium transition duration-200 cursor-pointer 
                    ${allFieldsFilled
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    disabled={!allFieldsFilled}
                >
                    CONTINUE
                </button>

                <p className="hoverUnderline text-sm cursor-pointer relative inline-block" onClick={onEmailClick}>
                    BACK
                </p>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, type = 'text' }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
}) {
    return (
        <div className="flex flex-col w-full">
            <label className="text-xs text-gray-600 font-semibold">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="border-b border-gray-400 h-8 focus:outline-none focus:border-b"
            />
        </div>
    );
}

export default InputFields;
