"use client";

import React from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCalendar, faCalendarDay, faTrash } from "@fortawesome/free-solid-svg-icons";

import { convertMinutesStringToDuration } from "libs/helpers";
import { getNextStep, getPrevStep, Step } from "libs/stepUtils";
import { AppointmentBookingState } from "libs/types/common";

import { RootState, store } from "@/store";
import { useAddAppointmentMutation } from "@/store/api/scheduleApi";
import { toggleService } from "@/store/slices/schedules/CreateAppointmentSlice";
import { selectCreateAppointmentPayload } from "@/store/slices/schedules/createAppointmentSelectors";
import { Service } from "libs/types/ServiceCategory";

function AppointmentSummary() {
    const appointment = useSelector((state: RootState) => state.appointment);
    const user = useSelector((state: RootState) => state.user);

    const [addAppointment] = useAddAppointmentMutation();

    const router = useRouter();
    const pathName = usePathname();

    const currentStep = pathName.split('/').pop() as Step;
    const nextStep = getNextStep(currentStep);
    const prevStep = getPrevStep(currentStep);

    const canProceed = getCanProceed(currentStep, appointment, user);

    // Move to next step
    const handleNext = () => {
        if (nextStep && canProceed) {
            Cookies.set('selectedServices', JSON.stringify(appointment.selectedServices));
            router.push(`/appointments/step/${nextStep}`);
        }
    };

    // Move to previous step
    const handleBack = () => {
        if (prevStep) {
            router.push(`/appointments/step/${prevStep}`);
        }
    };

    // Confirm and book the appointment
    const handleConfirm = async () => {
        const payload = selectCreateAppointmentPayload(store.getState());
        const toastId = toast.loading('Booking your appointment...');

        try {
            await addAppointment(payload).unwrap();
            toast.success('Appointment booked successfully!', { id: toastId });
        } catch (error: any) {
            const errorMessage = error?.data?.[0]?.message || 'Failed to book appointment. Please try again.';
            toast.error(errorMessage, { id: toastId });
        }
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
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
}

// Renders header info (date, time, total)
function SummaryHeader({ selected }: { selected: AppointmentBookingState }) {
    if (!selected.selectedDate && !selected.selectedServices.length && !selected.selectedTime) return null;

    return (
        <div className="bg-[#fff3e0] rounded-xl px-5 py-4 shadow-sm border border-[#ffe0b2] mb-2">
            <div className="flex items-center gap-4">
                {selected.selectedDate && (
                    <IconWrapper icon={faCalendarDay} />
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
                                    {" · "}
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

// Wrapper for displaying icons consistently
function IconWrapper({ icon }: { icon: any }) {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-[#1f2937] text-lg" />
        </div>
    );
}

// List all selected services
function SelectedServiceList({ selected }: { selected: AppointmentBookingState }) {
    const dispatch = useDispatch();

    const handleToggle = (service: Service) => {
        dispatch(toggleService(service));
        const updatedServices = selected.selectedServices.some(s => s.serviceId === service.serviceId)
            ? selected.selectedServices.filter(s => s.serviceId !== service.serviceId)
            : [...selected.selectedServices, service];
        Cookies.set('selectedServices', JSON.stringify(updatedServices.map(s => s.serviceId)));
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
                            onClick={() => handleToggle(service)}
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

// Navigation buttons (Next, Back, Confirm)
function NavigationButtons({
    currentStep,
    canProceed,
    onNext,
    onBack,
    onConfirm,
}: {
    currentStep: Step;
    canProceed: boolean;
    onNext: () => void;
    onBack: () => void;
    onConfirm: () => void;
}) {
    const baseBtn =
        'w-full md:w-auto px-6 py-3 flex items-center justify-center gap-2 text-base font-semibold rounded-lg transition duration-200 shadow';

    return (
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-start gap-4 lg:justify-between">
            {currentStep === "confirmation" ? (
                <button
                    className={`${baseBtn} ${canProceed ? "bg-[#1f2937] hover:bg-[#111827] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    onClick={onConfirm}
                    disabled={!canProceed}
                >
                    <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                    Confirm
                </button>
            ) : (
                <button
                    className={`${baseBtn} ${canProceed ? "bg-[#1f2937] hover:bg-[#111827] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    onClick={onNext}
                    disabled={!canProceed}
                >
                    Next
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </button>
            )}
            {currentStep !== "services" && (
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

// Helper to determine if user can proceed to the next step
function getCanProceed(step: Step, appointment: AppointmentBookingState, user: any) {
    if (step === "services") {
        return appointment.selectedServices.length > 0;
    }
    if (step === "datetime") {
        return appointment.selectedDate !== null && appointment.selectedTime !== null;
    }
    if (step === "confirmation") {
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
}

export default AppointmentSummary;
