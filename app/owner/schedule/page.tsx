// "use client";

// import DatePicker from '@/components/appointments/DatePicker';
// import UpcomingAppointmentsList from '@/components/owner/schedule/UpcomingAppointmentsList';
// import NextAppointmentCard, { AppointmentCardProps } from '@/components/owner/schedule/UpcomingAppointmentsList';
// import { format } from 'path';
// import React, { useState } from 'react';

// const upcomingAppointments: AppointmentCardProps[] = [
//   {
//     startTime: "11:00",
//     endTime: "12:00",
//     clientName: "Suhani Pandey",
//     service: "Haircut & Styling",
//     avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent("Suhani Pandey")}`,
//   },
//   {
//     startTime: "13:00",
//     endTime: "14:30",
//     clientName: "Sadixa Baral",
//     service: "Hair Spa",
//     avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent("Sadixa Bista")}`,
//   },
//   {
//     startTime: "14:00",
//     endTime: "16:00",
//     clientName: "Kushum Poudel",
//     service: "Facial",
//     avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent("Kushum Poudel")}`,
//   },
// ];

// function Schedule() {
//   const today = new Date();

//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


//   const handleSelectedDate = (date: Date) => {
//     setSelectedDate(date);
//   }

//   return (
//     <div className="w-full h-full min-h-screen grid grid-cols-6 grid-rows-6 gap-4 p-4 bg-neutral-100">
//       {/* Date Picker */}
//       <div className="col-span-3 row-span-3 bg-amber-200 rounded-lg p-4 shadow">1</div>

//       {/* Block Time */}
//       <div className="col-span-3 row-span-3 col-start-1 row-start-4 bg-green-300 rounded-lg p-4 shadow">2</div>

//       {/* Date Picker */}
//       <div className="col-span-3 row-span-6 col-start-4 row-start-1 rounded-lg">
//         <UpcomingAppointmentsList appointments={upcomingAppointments} date={selectedDate} />

//         <DatePicker expanded={false} showMonthToggle={false} initialDate={today} onSelect={handleSelectedDate} />
//       </div>
//     </div>
//   );
// }

// export default Schedule;

"use client"

import DatePicker from '@/components/appointments/DatePicker';
import DaySchedule from '@/components/owner/schedule/DaySchedule';
import UpcomingAppointmentsList, { AppointmentCardProps } from '@/components/owner/schedule/UpcomingAppointmentsList';
import React, { useState } from 'react'

const upcomingAppointments: AppointmentCardProps[] = [
  {
    startTime: "11:00",
    endTime: "12:00",
    clientName: "Suhani Pandey",
    service: "Haircut & Styling",
    avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent("Suhani Pandey")}`,
    appointmentDate: new Date()
  },
  {
    startTime: "13:00",
    endTime: "14:30",
    clientName: "Sadixa Baral",
    service: "Hair Spa",
    avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent("Sadixa Bista")}`,
    appointmentDate: new Date()
  },
  {
    startTime: "14:00",
    endTime: "16:00",
    clientName: "Kushum Poudel",
    service: "Facial",
    avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent("Kushum Poudel")}`,
    appointmentDate: new Date()
  },
];

function Schedule() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());


  const handleSelectedDate = (date: Date | null) => {
    setSelectedDate(date || undefined);
  }

  return (
    <div className="grid grid-cols-8 grid-rows-7 gap-2 w-full min-h-screen h-screen overflow-hidden p-4 bg-neutral-100 rounded-md">

      {/* weekly overview */}
      <div className="col-span-2 row-span-3 bg-amber-300 h-full">1</div>

      {/* upcoming appointments */}
      <div className="col-span-2 row-span-4 col-start-1 row-start-4 h-full">
        <UpcomingAppointmentsList appointments={upcomingAppointments} />
      </div>

      {/* week schedule */}
      <div className="col-span-6 row-span-2 col-start-3 row-start-1 h-full">
        <DatePicker
          expanded={false}
          showMonthToggle={false}
          initialDate={today}
          onSelect={handleSelectedDate}
        />
      </div>

      <div className="col-span-6 row-span-5 col-start-3 row-start-3">
        <DaySchedule date={selectedDate}/>
      </div>
    </div>

  )
}
export default Schedule
