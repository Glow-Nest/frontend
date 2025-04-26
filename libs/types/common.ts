import { Service } from "./ServiceCategory";

export interface AppointmentBookingState {
    selectedServices: Service[];
    selectedCategoryIds: string[];
    totalPrice: number;
    totalDuration: number;
    selectedDate: string | null; 
    selectedTime: string | null;
    appointmentNote: string | null;
    startTime?: string | null;
    endTime?: string | null;
}

