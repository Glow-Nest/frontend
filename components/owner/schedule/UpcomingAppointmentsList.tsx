"use client";

import { useGetAppointmentForOwnerQuery } from "@/store/api/scheduleApi";
import { format } from "date-fns";
import { formatTimeStringTo12HourClock } from "libs/helpers";
import { Appointment } from "libs/types/ScheduleTypes";
import { CalendarDays, Clock, User2 } from "lucide-react";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

export default function UpcomingAppointmentsList({ date }: { date: Date }) {
  const selectedDate = format(date, "yyyy-MM-dd");

  const { data, isFetching } = useGetAppointmentForOwnerQuery(
    { scheduleDate: selectedDate, mode: "Future" },
    {
      refetchOnMountOrArgChange: true,
      skip: !selectedDate
    }
  );

  const [currentPage, setCurrentPage] = useState(1);

  const appointments: Appointment[] = data?.appointments ?? [];

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return appointments.slice(start, start + ITEMS_PER_PAGE);
  }, [appointments, currentPage]);

  return (
    <div className="bg-white h-full rounded-2xl p-6 mb-5 shadow-md flex flex-col border border-[#f6e9dc]">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        Upcoming Appointments
      </h2>

      {isFetching && (
        <div className="flex-1 flex items-center justify-center text-[#9f5621] italic">
          Loading...
        </div>
      )}

      {!isFetching && appointments.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-gray-400 italic">
          No upcoming appointments.
        </div>
      )}

      {!isFetching && paginatedAppointments.length > 0 && (
        <ul className="text-sm text-gray-700 space-y-4 overflow-auto">
          {paginatedAppointments.map((appt, i) => (
            <li
              key={i}
              className="flex flex-col gap-2 border-l-4 border-[#f7b267] bg-[#fff8f3] rounded-md shadow-sm px-4 py-3 hover:bg-[#fff1e7] transition"
            >
              <div className="flex items-center gap-2 ">
                <User2 className="w-4 h-4 text-[#f08a24]" />
                <span className="font-semibold">{appt.clientName}</span>
                <span className="text-sm">({appt.services.length} service{appt.services.length > 1 ? "s" : ""})</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 text-xs">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-[#f08a24]" />
                  <span>{format(new Date(appt.appointmentDate), "MMM d")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#f08a24]" />
                  <span>
                    {formatTimeStringTo12HourClock(appt.startTime)}–
                    {formatTimeStringTo12HourClock(appt.endTime)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex justify-center gap-4 text-sm text-gray-700">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-[#f0d9c4] bg-[#fff7f0] hover:bg-[#fce9d6] disabled:opacity-50"
          >
            Prev
          </button>
          <span className="self-center text-[#9f5621] font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-[#f0d9c4] bg-[#fff7f0] hover:bg-[#fce9d6] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
