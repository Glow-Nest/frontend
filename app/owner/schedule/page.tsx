"use client"

import DatePicker from '@/components/appointments/DatePicker';
import DaySchedule from '@/components/owner/schedule/DaySchedule';
import UpcomingAppointmentsList from '@/components/owner/schedule/UpcomingAppointmentsList';
import { useGetBlockedTimesQuery } from '@/store/api/scheduleApi';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setBlockedTimesForDate } from '@/store/slices/schedules/BlockedTimeSlice';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'


function Schedule() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const dispatch = useAppDispatch();

  const formattedScheduleDate = format(selectedDate, "yyyy-MM-dd");
  const { data: blockedTimes, isSuccess, isLoading, refetch } = useGetBlockedTimesQuery(formattedScheduleDate);

  useEffect(() => {
    if (isSuccess && blockedTimes) {

      dispatch(setBlockedTimesForDate({ date: formattedScheduleDate, blockedTimes: blockedTimes }));
    }
  }, [isSuccess, blockedTimes, dispatch, formattedScheduleDate]);

  const handleSelectedDate = (date: Date | null) => {
    setSelectedDate(date || new Date());
  }

  return (
    <div className="flex flex-col gap-4 w-full min-h-screen p-4 bg-neutral-100 rounded-md lg:grid lg:grid-cols-8 lg:grid-rows-7 lg:gap-2 lg:h-screen lg:overflow-hidden">

      {/* 1 - weekly overview */}
      <div className="bg-amber-300 h-full lg:col-span-2 lg:row-span-3">
        1
      </div>

      {/* 2 - upcoming appointments */}
      <div className="h-full lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-4">
        <UpcomingAppointmentsList date={selectedDate}/>
      </div>

      {/* 3 - week schedule (date picker) */}
      <div className="h-full lg:col-span-6 lg:row-span-2 lg:col-start-3 lg:row-start-1">
        <DatePicker
          expanded={false}
          showMonthToggle={false}
          initialDate={today}
          onSelect={handleSelectedDate}
        />
      </div>

      {/* 4 - day schedule */}
      <div className="h-full lg:col-span-6 lg:row-span-5 lg:col-start-3 lg:row-start-3">
        <DaySchedule date={selectedDate} />
      </div>
    </div>
  )
}

export default Schedule;
