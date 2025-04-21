'use client';

import React, { useState } from 'react';
import "../common/css/hoverUnderline.css";
import { useCreateClientMutation, useSendOtpMutation } from '@/store/api/clientApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function InputFields({ onEmailClick }: { onEmailClick: () => void }) {
    const [createClient, { isLoading, isSuccess, error }] = useCreateClientMutation();
    const [sendOtp, { isLoading: isSending, isSuccess: otpSent, error: sendOtpError }] = useSendOtpMutation();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async () => {
        setErrors({});

        try {
            await toast.promise(
                (async () => {
                    await createClient(form).unwrap();
                    await sendOtp({ email: form.email, purpose: "Registration" }).unwrap();
                    router.push(`/otpVerify?email=${form.email}&purpose=Registration`);
                })(),
                {
                    loading: 'Creating account and sending OTP...',
                    success: 'User created. Enter the OTP sent to your email to verify your account.',
                    error: (err) => {
                        const fallback = "Something went wrong.";
                        if (err?.data?.length) {
                            return err.data.map((e: any) => e.message).join("\n");
                        }
                        return fallback;
                    },
                }
            );

        } catch (err: any) {
            const fieldErrors: { [key: string]: string } = {};

            if (err.data.length) {
                err.data.forEach((e: any) => {
                    if (e.errorId?.startsWith("Email")) fieldErrors.email = e.message;
                    if (e.errorId?.startsWith("FirstName")) fieldErrors.firstName = e.message;
                    if (e.errorId?.startsWith("LastName")) fieldErrors.lastName = e.message;
                    if (e.errorId?.startsWith("Phone")) fieldErrors.phoneNumber = e.message;
                    if (e.errorId?.startsWith("Password")) fieldErrors.password = e.message;
                })
            }

            setErrors(fieldErrors);
        }
    }

    const allFieldsFilled = Object.values(form).every(val => val.trim() !== '');

    return (
        <div className="flex flex-col gap-2 w-full">
            <InputField label="First Name" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} error={errors.firstName} />
            <InputField label="Last Name" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} error={errors.lastName} />
            <InputField label="Phone Number" name="phoneNumber" placeholder="Phone Number" type="tel" value={form.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
            <InputField label="Email Address" name="email" placeholder="example@gmail.com" type="email" value={form.email} onChange={handleChange} error={errors.email} />
            <InputField label="Password" name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} error={errors.password} />

            <div className="flex justify-between items-center">
                <button
                    className={`px-5 py-2 rounded text-sm font-medium transition duration-200 cursor-pointer ${allFieldsFilled && !isLoading && !isSending
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    disabled={!allFieldsFilled || isLoading || isSending}
                    onClick={handleSubmit}
                >
                    {isLoading || isSending ? 'Processing...' : 'CONTINUE'}
                </button>


                <p className="hoverUnderline text-sm cursor-pointer relative inline-block" onClick={onEmailClick}>
                    BACK
                </p>
            </div>
        </div>
    );
}

function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    error
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    error?: string;
}) {
    return (
        <div className="flex flex-col w-full transition-all duration-300 ease-in-out">
            <label className="text-xs text-gray-600 font-semibold">{label}</label>

            <input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className={`border-b h-6 focus:outline-none transition-colors duration-200 ${error ? 'border-red-500' : 'border-gray-400'
                    }`}
            />

            <div
                className={`text-xs text-red-500 mt-1 h-5 transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {error || ' '}
            </div>
        </div>
    );
}


export default InputFields;
export { InputField }; 
