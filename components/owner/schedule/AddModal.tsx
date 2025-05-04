import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CalendarDays, ChevronDown, ChevronUp, Clock, Mail, Pen, Scissors } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { setSchedule } from "@/store/slices/schedules/ScheduleSlice";
import { useAddAppointmentMutation, useLazyGetAvailableSlotsQuery } from "@/store/api/scheduleApi";
import toast from "react-hot-toast";
import { formatTimeStringTo12HourClock } from "libs/helpers";
import { useLazyGetAllCategoriesWithServiceQuery } from "@/store/api/serviceApi";
import { setServiceCategory } from "@/store/slices/serviceCategory/ServiceCategorySlice";
import { Service, ServiceCategoryState } from "libs/types/ServiceCategory";
import { addSelectedTime, clearServices, setAppointmentNote, toggleCategoryId, toggleService } from "@/store/slices/schedules/CreateAppointmentSlice";
import { selectCreateAppointmentPayload } from "@/store/slices/schedules/createAppointmentSelectors";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { TimeSlotGroup } from "libs/types/ScheduleTypes";

// --- Types ---
export interface AppointmentInput {
    email: string;
    startTime: string;
    endTime: string;
    services: string[];
    note?: string;
}

export interface BlockInput {
    startTime: string;
    endTime: string;
    blockReason: string;
}

interface AppointmentFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    serviceOptions: ServiceCategoryState;
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
    dispatch: any
}

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateAppointment: (data: AppointmentInput) => void;
    onCreateBlock: (data: BlockInput) => void;
}

// --- Main Modal Component ---
export default function AddModal({
    isOpen,
    onClose,
    onCreateAppointment,
    onCreateBlock,
}: AddModalProps) {
    const dispatch = useDispatch();
    const scheduleState = useSelector((state: RootState) => state.schedules);
    const serviceCategory = useSelector((state: RootState) => state.serviceCategory);

    // Local state
    const [mode, setMode] = useState<"appointment" | "block">("appointment");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [blockReason, setBlockReason] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
    const [timeSlots, setTimeSlots] = useState<TimeSlotGroup>();

    const router = useRouter();

    const [triggerAvailableSlots, { isLoading }] = useLazyGetAvailableSlotsQuery();
    const [triggerCategories] = useLazyGetAllCategoriesWithServiceQuery();
    const [addAppointment] = useAddAppointmentMutation();

    const selectedDate = useSelector((state: RootState) => state.appointment.selectedDate);

    // --- Load available slots when date changes ---
    useEffect(() => {
        if (!selectedDate) return;

        const existing = scheduleState.schedules[selectedDate];
        if (existing) {
            setTimeSlots(existing.availableSlots);
            return;
        }

        const toastId = toast.loading("Loading available time...");
        triggerAvailableSlots(selectedDate)
            .unwrap()
            .then((response) => {
                dispatch(setSchedule({
                    scheduleDate: selectedDate,
                    availableSlots: response,
                    appointments: []
                }));
                setTimeSlots(response);
                toast.success("Available time loaded!", { id: toastId });
            })
            .catch(() => {
                toast.error("Failed to load available time 😢", { id: toastId });
            });
    }, [selectedDate, scheduleState.schedules, triggerAvailableSlots, dispatch]);

    // load services 
    useEffect(() => {
        if (Object.keys(serviceCategory || {}).length === 0) {
            const toastId = toast.loading("Loading categories with services...");

            triggerCategories()
                .unwrap()
                .then((response) => {
                    const normalized = response.categories.reduce((acc: Record<string, any>, category: any) => {
                        acc[category.categoryId] = category;
                        return acc;
                    }, {});

                    dispatch(setServiceCategory(normalized));
                    toast.success("Categories loaded!", { id: toastId });
                })
                .catch(() => {
                    toast.error("Failed to load services 😢", { id: toastId });
                });
        }
    }, [serviceCategory, dispatch, triggerCategories]);

    // --- Form Submit Handler ---
    const handleSubmit = async () => {
        const [startTime, endTime] = selectedTimeSlot.split("-");

        if (mode === "appointment") {
            const payload = selectCreateAppointmentPayload(store.getState(), email);
            const toastId = toast.loading('Booking your appointment...');

            try {
                await addAppointment(payload).unwrap();
                toast.success('Appointment booked successfully!', { id: toastId });

                Cookies.remove('selectedServices');
                dispatch(clearServices());

                router.push('/');
            } catch (error: any) {
                const errorMessage = error?.data?.[0]?.message || 'Failed to book appointment. Please try again.';
                toast.error(errorMessage, { id: toastId });
            }


        } else {
            if (!blockReason.trim() || !selectedTimeSlot) {
                toast.error("Please fill all required fields!");
                return;
            }
            onCreateBlock({ startTime, endTime, blockReason });
        }

        // Clear fields after saving
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setEmail("");
        setNote("");
        setBlockReason("");
        setSelectedTimeSlot("");
        setMode("appointment");
    };

    // --- Service selection ---

    const isValid = mode === "appointment"
        ? email.trim() && selectedTimeSlot
        : blockReason.trim() && selectedTimeSlot;

    // --- UI ---
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 border border-gray-200">
                    <DialogTitle className="text-xl font-semibold mb-6 text-[#dba052] flex items-center gap-2">
                        <CalendarDays className="w-5 h-5" />
                        Add for {selectedDate}
                    </DialogTitle>

                    {/* Mode selection buttons */}
                    <div className="flex mb-6 space-x-2">
                        {["appointment", "block"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setMode(type as "appointment" | "block")}
                                className={`flex-1 px-4 py-2 font-medium rounded-md text-sm transition border ${mode === type
                                    ? type === "appointment"
                                        ? "bg-[#dba052] text-white border-[#dba052]"
                                        : "bg-[#B71C1C] text-white border-[#B71C1C]"
                                    : "bg-gray-100 text-gray-800 border-gray-300"
                                    }`}
                            >
                                {type === "appointment" ? "Appointment" : "Block"}
                            </button>
                        ))}
                    </div>

                    {/* Time slot selection */}
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <select
                            value={selectedTimeSlot}
                            onChange={(e) => {
                                setSelectedTimeSlot(e.target.value);
                                dispatch(addSelectedTime(e.target.value));
                            }}
                            className="w-full border border-gray-300 px-2 py-2 rounded-md text-sm"
                        >
                            <option value="">Select a time slot</option>
                            {timeSlots && Object.entries(timeSlots).map(([period, slots]) => (
                                <optgroup key={period} label={period}>
                                    {slots.map((slot) => {
                                        const slotId = `${slot.start}-${slot.end}`;
                                        return (
                                            <option key={slotId} value={slotId}>
                                                {formatTimeStringTo12HourClock(slot.start)} – {formatTimeStringTo12HourClock(slot.end)}
                                            </option>
                                        );
                                    })}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    {/* Form fields based on mode */}
                    {mode === "appointment" ? (
                        <AppointmentForm
                            email={email}
                            setEmail={setEmail}
                            serviceOptions={serviceCategory}
                            note={note}
                            setNote={setNote}
                            dispatch={dispatch}
                        />
                    ) : (
                        <BlockReasonInput reason={blockReason} setReason={setBlockReason} />
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200 border border-gray-300 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!isValid}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${isValid
                                ? "bg-[#dba052] cursor-pointer text-white hover:bg-[#c58e41]"
                                : "bg-gray-300 text-white cursor-not-allowed"
                                }`}
                        >
                            Save
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

// --- Appointment form ---
function AppointmentForm({ email, setEmail, serviceOptions, dispatch }: AppointmentFormProps) {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const note = useSelector((state: RootState) => state.appointment.appointmentNote);

    // Get selected services from Redux
    const selectedServices = useSelector((state: RootState) => state.appointment.selectedServices);

    const toggleCategory = (categoryId: string) => {
        setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
    };

    const handleServiceClick = (service: Service, categoryId: string) => {
        dispatch(toggleService(service));
        dispatch(toggleCategoryId(categoryId));
    };

    const countSelectedServices = (category: any) => {
        return category.services.filter((service: Service) =>
            selectedServices.includes(service)
        ).length;
    };

    return (
        <>
            <FormInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4 text-gray-500" />}
                type="email"
            />

            {/* Services with dropdown per category */}
            <div className="mb-4">
                <label className="flex items-center gap-1 text-sm mb-1">
                    <Scissors className="w-4 h-4 text-gray-500" /> Services
                </label>

                <div className="space-y-3">
                    {Object.values(serviceOptions).map((category: any) => (
                        <div key={category.categoryId} className="border rounded-md">
                            {/* Category Header */}
                            <button
                                type="button"
                                onClick={() => toggleCategory(category.categoryId)}
                                className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-left bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                                <span>
                                    {category.name}
                                    {/* Show selected count if any */}
                                    {countSelectedServices(category) > 0 && (
                                        <span className="ml-2 text-xs text-[#dba052]">
                                            ({countSelectedServices(category)} selected)
                                        </span>
                                    )}
                                </span>
                                {openCategory === category.categoryId ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>

                            {/* Services inside dropdown */}
                            {openCategory === category.categoryId && (
                                <div className="p-2 flex flex-wrap gap-2">
                                    {category.services.map((service: Service) => (
                                        <button
                                            type="button"
                                            key={service.serviceId}
                                            onClick={() => handleServiceClick(service, category.categoryId)}
                                            className={`px-3 py-1.5 border rounded-full text-sm transition ${selectedServices.includes(service)
                                                ? "bg-[#f3e0ca] border-[#dba052] text-[#5b3e1f]"
                                                : "bg-white border-gray-300 hover:bg-[#f3e0ca] hover:border-[#dba052] hover:text-[#5b3e1f]"
                                                }`}
                                        >
                                            {service.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <FormTextarea
                label="Note"
                value={note || ""}
                onChange={(e) => dispatch(setAppointmentNote(e.target.value))}
            />
        </>
    );
}


// --- Block reason input ---
function BlockReasonInput({ reason, setReason }: { reason: string; setReason: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <FormInput
            label="Reason for blocking"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            icon={<Pen className="w-4 h-4 text-gray-500" />}
            placeholder="e.g. Lunch break, Cleaning, etc."
        />
    );
}

// --- Small reusable input components ---
function FormInput({ label, value, onChange, icon, type = "text", placeholder }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; icon?: React.ReactNode; type?: string; placeholder?: string; }) {
    return (
        <div className="mb-4">
            <label className="flex items-center gap-1 text-sm mb-1">
                {icon} {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            />
        </div>
    );
}

function FormTextarea({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; }) {
    return (
        <div className="mb-4">
            <label className="flex items-center gap-1 text-sm mb-1">
                <Pen className="w-4 h-4 text-gray-500" /> {label}
            </label>
            <textarea
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            />
        </div>
    );
}
