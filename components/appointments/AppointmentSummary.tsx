"use client";

import { RootState, store } from '@/store';
import {
    faArrowLeft,
    faArrowRight,
    faCalendar,
    faCalendarDay,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNextStep, getPrevStep, Step } from 'libs/stepUtils';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @ts-ignore
import cookie from 'cookie-cutter';
import { AppointmentBookingState } from 'libs/types/common';
import { convertMinutesStringToDuration } from 'libs/helpers';
import { useAddAppointmentMutation } from '@/store/api/scheduleApi';
import { toggleService } from '@/store/slices/schedules/CreateAppointmentSlice';
import { selectCreateAppointmentPayload } from '@/store/slices/schedules/createAppointmentSelectors';
import { Service } from 'libs/types/ServiceCategory';
import toast from 'react-hot-toast';

function AppointmentSummary() {
    const appointment = useSelector((state: RootState) => state.appointment);
    const user = useSelector((state: RootState) => state.user);

    const router = useRouter();
    const pathName = usePathname();
    const [addAppointment, { isLoading, isSuccess, error }] = useAddAppointmentMutation();

    const currentStep = pathName.split('/').pop() as Step;
    const nextStep = getNextStep(currentStep);
    const prevStep = getPrevStep(currentStep);

    const canProceed = (() => {
        if (currentStep === "services") {
            return appointment.selectedServices.length > 0;
        }
        if (currentStep === "datetime") {
            return appointment.selectedDate !== null && appointment.selectedTime !== null;
        }
        if (currentStep === "confirmation") {
            return (
                appointment.selectedServices.length > 0 &&
                appointment.selectedDate !== null &&
                appointment.startTime !== null &&
                appointment.endTime !== null &&
                appointment.selectedTime !== null &&
                appointment.appointmentNote !== null &&
                user.email !== null &&
                user.phoneNumber !== null &&
                user.firstName !== null &&
                user.lastName !== null
            );
        }
        return true;
    })();


    const handleNext = () => {
        if (nextStep && canProceed) {
            cookie.set('selectedServices', JSON.stringify(appointment.selectedServices));
            router.push(`/appointments/step/${nextStep}`);
        }
    };

    const handleBack = () => {
        if (prevStep) router.push(`/appointments/step/${prevStep}`);
    };

    return (
        <div className="lg:w-full md:w-[45%] sticky top-12 self-start z-10">
            <p className="text-2xl font-bold mb-4 text-center md:text-left">Appointment Summary</p>

            <div className="bg-white w-full md:w-[350px] rounded-2xl shadow-md border border-gray-200 p-2 px-6">
                <SummaryHeader selected={appointment} />
                <hr className="border-gray-300 mb-4" />
                <SelectedServiceList selected={appointment} />
                <NavigationButtons
                    currentStep={currentStep}
                    canProceed={canProceed}
                    onNext={handleNext}
                    onBack={handleBack}
                    addAppointment={addAppointment}
                />
            </div>
        </div>
    );
}

function SummaryHeader({ selected }: { selected: AppointmentBookingState }) {
    if (!selected.selectedDate && !selected.selectedServices.length && !selected.selectedTime) return null;

    return (
        <div className="bg-[#fff3e0] rounded-xl px-5 py-4 shadow-sm border border-[#ffe0b2] mb-2">
            <div className="flex items-center gap-4">
                {selected.selectedDate && (
                    <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-center">
                        <FontAwesomeIcon icon={faCalendarDay} className="text-[#1f2937] text-lg" />
                    </div>
                )}
                <div className="flex flex-col text-sm text-gray-700">
                    {selected.selectedDate && (
                        <span className="font-semibold text-[15px] text-gray-900">
                            {new Date(selected.selectedDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    )}
                    {selected.startTime && selected.endTime && (
                        <span className="font-semibold text-[15px] text-gray-900 mb-1">
                            {selected.startTime} – {selected.endTime}
                        </span>
                    )}
                    {selected.selectedServices.length > 0 && (
                        <span className="text-gray-600 font-medium">
                            Total Price: <span className="font-semibold">{selected.totalPrice} DKK</span>
                            {selected.totalDuration > 0 && (
                                <>
                                    {' · '}
                                    <span className="font-semibold">
                                        {convertMinutesStringToDuration(selected.totalDuration)}
                                    </span>
                                </>
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function SelectedServiceList({ selected }: { selected: AppointmentBookingState }) {
    const dispatch = useDispatch();

    const handleServiceToggle = (service: Service) => {
        dispatch(toggleService(service));
        const isSelected = selected.selectedServices.some(s => s.serviceId === service.serviceId);
        const updatedList = isSelected
            ? selected.selectedServices.filter(s => s.serviceId !== service.serviceId)
            : [...selected.selectedServices, service];

        cookie.set('selectedServices', JSON.stringify(updatedList.map(s => s.serviceId)));
    };

    return (
        <div className="flex flex-col gap-4">
            {selected.selectedServices.map((service, index) => (
                <div key={index} className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 rounded-full bg-gray-400" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-medium text-gray-900">{service.name}</span>
                            <span className="text-xs text-gray-500">{service.formattedDuration}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                            {service.price} kr
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
    );
}

function NavigationButtons({
    currentStep,
    canProceed,
    onNext,
    onBack,
    addAppointment
}: {
    currentStep: Step;
    canProceed: boolean;
    onNext: () => void;
    onBack: () => void;
    addAppointment: (payload: ReturnType<typeof selectCreateAppointmentPayload>) => any;
}) {


    const handleBookingConfirmed = async () => {
        const payload = selectCreateAppointmentPayload(store.getState());

        const toastId = toast.loading('Booking your appointment...');

        try {
            await addAppointment(payload).unwrap();
            toast.success('Appointment booked successfully!', { id: toastId });
        } catch (error: any) {
            console.error('Booking failed:', error);

            // If backend sent proper validation errors
            if (error?.data && Array.isArray(error.data) && error.data[0]?.message) {
                toast.error(error.data[0].message, { id: toastId });
            } else {
                toast.error('Failed to book appointment. Please try again.', { id: toastId });
            }
        }
    };


    const baseBtnClass =
        'w-full md:w-auto px-6 py-3 flex items-center justify-center gap-2 text-base font-semibold rounded-lg transition duration-200 shadow';

    return (
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-start gap-4 lg:justify-between">
            {currentStep === 'confirmation' ? (
                <button
                    className={`${baseBtnClass} ${canProceed
                        ? 'bg-[#1f2937] hover:bg-[#111827] text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    onClick={handleBookingConfirmed}
                >
                    <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                    Confirm
                </button>
            ) : (
                <button
                    className={`${baseBtnClass} ${canProceed
                        ? 'bg-[#1f2937] hover:bg-[#111827] text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    onClick={onNext}
                    disabled={!canProceed}
                >
                    Next
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </button>
            )}

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

export default AppointmentSummary;
