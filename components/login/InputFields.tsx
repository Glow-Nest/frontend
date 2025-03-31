'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {InputField} from '../signup/InputFields';

function InputFields() {
    //const [login, { isLoading }] = useLoginMutation();
    const router = useRouter();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
                    router.push(`/dashboard`);
                })(),
                {
                    loading: 'Logging in...',
                    success: 'Login successful! Redirecting...',
                    error: (err) => {
                        const fallback = "Invalid credentials. Please try again.";
                        return err?.data?.message || fallback;
                    },
                }
            );
        } catch (err: any) {
            const fieldErrors: { [key: string]: string } = {};
            if (err?.data?.errors) {
                err.data.errors.forEach((e: any) => {
                    if (e.errorId?.startsWith("Email")) fieldErrors.email = e.message;
                    if (e.errorId?.startsWith("Password")) fieldErrors.password = e.message;
                });
            }
            setErrors(fieldErrors);
        }
    };

    const allFieldsFilled = Object.values(form).every(val => val.trim() !== '');

    return (
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 ">
            {/* <h2 className="text-xl font-semibold text-center">Login</h2> */}
            <InputField label="EMAIL ADDRESS" name="email" placeholder="name@gmail.com" type="email" value={form.email} onChange={handleChange} error={errors.email} />
            <InputField label="PASSWORD" name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
            <button
                className={`px-5 py-2 text-sm font-medium transition duration-200 cursor-pointer ${allFieldsFilled ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                disabled={!allFieldsFilled}
                onClick={handleSubmit}
            >
                LOG IN
            </button>
        </div>
    );
}

export default InputFields;
