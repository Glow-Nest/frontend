"use client";

import { CalendarDays } from "lucide-react";
import { format, formatDistanceToNowStrict, isBefore } from "date-fns";

export interface AppointmentCardProps {
  startTime: string;
  endTime: string;
  clientName: string;
  service: string;
  appointmentDate: Date;
  avatarUrl?: string;
}

interface UpcomingAppointmentsListProps {
  appointments: AppointmentCardProps[];
}

function parseTodayTimeToDate(timeString: string): Date {
  const [hoursStr, minutesStr] = timeString.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );
}

function combineDateAndTime(date: Date, timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );
}


export default function UpcomingAppointmentsList({
  appointments
}: UpcomingAppointmentsListProps) {

  return (
    <div className="bg-white h-full rounded-xl p-4 mb-5 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Upcoming Appointments
      </h3>
      <ul className="space-y-4">
        {appointments.map((appt, i) => {
          const start = combineDateAndTime(appt.appointmentDate, appt.startTime);
          const end = combineDateAndTime(appt.appointmentDate, appt.endTime);

          const isPast = isBefore(start, new Date());

          const timeRange = `${appt.startTime} – ${appt.endTime}`;
          const displayDate = format(appt.appointmentDate, "EEEE, MMMM d");

          return (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {appt.avatarUrl && (
                  <img
                    src={appt.avatarUrl}
                    alt={appt.clientName}
                    width={40}
                    height={40}
                    className="rounded-full shadow-sm"
                  />
                )}

                <div className="text-sm">
                  <p className="font-medium text-gray-800">{appt.clientName}</p>

                  <div className="text-xs text-gray-600 mt-1">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-[#dba052]" />
                      <span>{displayDate}, {timeRange}</span>
                    </div>

                    <div className="mt-1">
                      <span className="bg-[#f3e0ca] text-[#4B306A] px-2 py-0.5 rounded-full font-medium w-fit inline-block">
                        {appt.service}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </li>
          );
        })}

      </ul>
    </div >
  );
}
