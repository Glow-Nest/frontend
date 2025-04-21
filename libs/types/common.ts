export type Service = {
    serviceId: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    mediaUrls: string[];
    formattedDuration?: string;
};

export interface AppointmentBookingState {
    selectedServices: Service[];
    totalPrice: number;
    totalDuration: number;
    selectedDate: string | null; 
    selectedTime: string | null;
    startTime?: string | null;
    endTime?: string | null;
}

