type Service = {
    serviceId: string;
    serviceName: string;
    description: string;
    price: string;
    duration: string;
    mediaUrlList: string[];
};

interface AppointmentState {
    selectedServices: Service[];
    totalPrice: number;
    totalDuration: number;
    selectedDate: string | null; 
    selectedTime: string | null;
    startTime?: string | null;
    endTime?: string | null;
}