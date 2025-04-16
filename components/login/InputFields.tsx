'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {InputField} from '../signup/InputFields';
import { useLoginClientMutation } from '@/store/api/clientApi';
import { useAppDispatch } from '@/store/hook';
import { setCredentials } from '@/store/slice/AuthSlice';

function InputFields() {
    const [login, { isLoading }] = useLoginClientMutation();
    const dispatch = useAppDispatch();
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
            const res = await login(form).unwrap();
            dispatch(setCredentials({
                firstName: res.username,
                email: res.email,
                role: res.role,
                token: res.token
            }));
            toast.success("Login successful! Redirecting...");
            router.push(`/`);
        } catch (err: any) {
            const errorsArray = err?.data;
    
            if (Array.isArray(errorsArray)) {
                const notVerifiedError = errorsArray.find((e: any) => e.errorId === "Client.NotVerified");
                const invalidCredentialsError = errorsArray.find((e: any) => e.errorId === "Credentials.Invalid");
                const clientNotFoundError = errorsArray.find((e: any) => e.errorId === "Client.NotFound");

                if (notVerifiedError) {
                    toast.success("Please verify your account via OTP");
                    router.push(`/otpVerify?email=${form.email}`);
                    return;
                }

                if (invalidCredentialsError) {
                    toast.error("Invalid credentials. Please try again.");
                    return;
                }

                if (clientNotFoundError) {
                    toast.error("User not found. Please sign up.");
                    router.push(`/signup`);
                    return;
                }
    
                const fieldErrors: { [key: string]: string } = {};
                errorsArray.forEach((e: any) => {
                    if (e.errorId?.startsWith("Email")) fieldErrors.email = e.message;
                    if (e.errorId?.startsWith("Password")) fieldErrors.password = e.message;
                });
    
                setErrors(fieldErrors);
            } else {
                toast.error("Something went wrong. Please try again.");
                console.error("Unexpected error format:", err);
            }
        }
    };

    const allFieldsFilled = Object.values(form).every(val => val.trim() !== '');

    return (
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-10 ">
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
