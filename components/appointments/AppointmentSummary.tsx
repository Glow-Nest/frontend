"use client";

import { RootState } from '@/store';
import { toggleService } from '@/store/slices/AppointmentSlice';
import { faArrowRight, faTrash, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const steps = ['services', 'datetime', 'confirmation'] as const;
type Step = typeof steps[number];

const getNextStep = (current: Step): Step | null => {
    const i = steps.indexOf(current);
    return i < steps.length - 1 ? steps[i + 1] : null;
};

function AppointmentSummary() {
    const dispatch = useDispatch();
    const selectedServicesState = useSelector((state: RootState) => state.appointment);

    const pathName = usePathname();
    const router = useRouter();

    const currentStep = pathName.split('/').pop() as Step;
    const nextStep = getNextStep(currentStep);
    const canProceed = currentStep !== 'services' || selectedServicesState.selectedServices.length > 0;

    const handleNext = () => {
        if (nextStep && canProceed) {
            router.push(`/appointments/step/${nextStep}`);
        }
    };

    return (
        <div className='lg:w-[100%] md:w-[45%]'>
            <p className="text-2xl font-bold mb-4 text-center md:text-left">Appointment Summary</p>

            <div className="bg-white w-full  md:w-[350px] rounded-2xl shadow-md border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                    <div className="bg-gray-100 rounded-full p-3">
                        <FontAwesomeIcon icon={faUsers} className="text-xl text-gray-700" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-900">
                            {selectedServicesState.selectedServices.length} services
                        </span>
                        <span className="text-sm text-gray-500">
                            {selectedServicesState.totalPrice} DKK · {selectedServicesState.totalDuration} min
                        </span>
                    </div>
                </div>

                <hr className="border-gray-300 mb-4" />

                {/* Services List */}
                <div className="flex flex-col gap-4">
                    {selectedServicesState.selectedServices.map((service, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between"
                        >
                            {/* Left Side */}
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 mt-2 rounded-full bg-gray-400" />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-lg font-medium text-gray-900">
                                        {service.serviceName}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {service.duration}
                                    </span>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-2 ml-2">
                                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                                    {service.price}
                                </span>
                                <button
                                    onClick={() => dispatch(toggleService(service))}
                                    className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                                    aria-label="Remove service"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-md transition duration-200 cursor-pointer ${selectedServicesState.selectedServices.length === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-800 text-white'
                            }`}
                        onClick={handleNext}
                        disabled={!canProceed}
                    >
                        Next
                        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AppointmentSummary;
