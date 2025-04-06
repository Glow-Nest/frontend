"use client";

import { RootState } from '@/store';
import { toggleService } from '@/store/slices/AppointmentSlice';
import { faArrowLeft, faArrowRight, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNextStep, getPrevStep, Step } from 'libs/stepUtils';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @ts-ignore
import cookie from 'cookie-cutter';

function AppointmentSummary() {
    const selected = useSelector((state: RootState) => state.appointment);
    const router = useRouter();
    const pathName = usePathname();

    const currentStep = pathName.split('/').pop() as Step;
    const nextStep = getNextStep(currentStep);
    const prevStep = getPrevStep(currentStep);

    const canProceed =
        currentStep !== 'services' || selected.selectedServices.length > 0;

    const handleNext = () => {
        if (nextStep && canProceed) {
            // Update cookie just before navigation
            cookie.set(
                'selectedServices',
                JSON.stringify(selected.selectedServices.map(s => s.serviceId))
            );

            router.push(`/appointments/step/${nextStep}`);
        }
    };

    const handleBack = () => {
        if (prevStep) {
            router.push(`/appointments/step/${prevStep}`);
        }
    };

    return (
        <div className="lg:w-full md:w-[45%]">
            <p className="text-2xl font-bold mb-4 text-center md:text-left">Appointment Summary</p>

            <div className="bg-white w-full md:w-[350px] rounded-2xl shadow-md border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                    <div className="bg-gray-100 rounded-full p-3">
                        <FontAwesomeIcon icon={faUsers} className="text-xl text-gray-700" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-900">
                            {selected.selectedServices.length} services
                        </span>
                        <span className="text-sm text-gray-500">
                            {selected.totalPrice} DKK · {selected.totalDuration} min
                        </span>
                    </div>
                </div>

                <hr className="border-gray-300 mb-4" />

                {/* Services List */}
                <SelectedServiceList selected={selected} />


                {/* Navigation Buttons */}
                <NavigationButtons
                    currentStep={currentStep}
                    canProceed={canProceed}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            </div>
        </div>
    );
}


function NavigationButtons({ currentStep, canProceed, onNext, onBack }: { currentStep: Step; canProceed: boolean; onNext: () => void; onBack: () => void }) {
    return (
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-start gap-4 just lg:justify-between">
            {/* Next Button */}
            <button className={`w-3xl cursor-pointer md:w-auto px-8 flex items-center justify-center gap-2 text-base font-semibold py-3 rounded-lg transition duration-200 shadow ${canProceed
                ? 'bg-[#1f2937] hover:bg-[#111827] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={onNext}
                disabled={!canProceed}
            >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </button>

            {/* Back Button */}
            {currentStep !== 'services' && (
                <button
                    onClick={onBack}
                    className="w-full cursor-pointer md:w-auto px-6 flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition duration-200"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                    Back
                </button>
            )}
        </div>
    );
}

function SelectedServiceList({ selected }: { selected: AppointmentState }) {
    const dispatch = useDispatch();

    const handleServiceToggle = (service: Service) => {
        dispatch(toggleService(service));
        const selectedServices = selected.selectedServices;

        // Determine the updated list manually
        const isSelected = selectedServices.some(s => s.serviceId === service.serviceId);
        const updatedList = isSelected
            ? selectedServices.filter(s => s.serviceId !== service.serviceId)
            : [...selectedServices, service];

        cookie.set('selectedServices', JSON.stringify(updatedList.map(s => s.serviceId)));
    };

    return (
        <div className="flex flex-col gap-4">
            {selected.selectedServices.map((service, index) => (
                <div key={index} className="flex items-start justify-between">
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

                    <div className="flex items-center gap-2 ml-2">
                        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                            {service.price}
                        </span>
                        <button
                            onClick={() => handleServiceToggle(service)}
                            className="text-gray-400 hover:text-red-500 transition"
                            aria-label="Remove service"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default AppointmentSummary;
