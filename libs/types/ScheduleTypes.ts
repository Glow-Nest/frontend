export type TimeSlot = {
    start: string;
    end: string;
}

export type TimeSlotGroup = {
    Morning: TimeSlot[];
    Afternoon: TimeSlot[];
    Evening: TimeSlot[];
}

export type Schedule = {
    scheduleDate: string;
    availableSlots: TimeSlotGroup;
    appointments: Appointment[];
}

export type ScheduleState = {
    schedules: Record<string, Schedule>;
};

export type Appointment = {
    appointmentDate: string;
    startTime: string;
    endTime: string;
    clientName: string;
    services: string[];
}