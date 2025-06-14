import { RootState } from "@/store";
import { CreateAppointmentRequest } from "@/store/api/scheduleApi";

export const selectCreateAppointmentPayload = (
    state: RootState,
    email?: string,
): CreateAppointmentRequest => {
    const appointment = state.appointment;
    const user = state.user;

    return {
        appointmentNote: appointment.appointmentNote ?? "",
        startTime: appointment.startTime ?? "",
        endTime: appointment.endTime ?? "",
        appointmentDate: appointment.selectedDate ?? "",
        serviceIds: appointment.selectedServices.map(s => s.serviceId) ?? [],
        bookedByClient: email || user.email || "",
        categoryIds: appointment.selectedCategoryIds,
    };
}
