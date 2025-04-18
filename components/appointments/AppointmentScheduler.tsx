"use client";

import React, { useEffect, useState } from "react";

import DatePicker from "./DatePicker";
import TimeSelector from "./TimeSelector";
import { useDispatch } from "react-redux";
import { addSelectedDate } from "@/store/slices/AppointmentSlice";
import { format } from "date-fns";

function AppointmentScheduler() {
  const dispatch = useDispatch();
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    dispatch(addSelectedDate(format(today, "yyyy-MM-dd")));
  }, []);

  const handleSelectedDate = (date: Date) => {
    setSelectedDate(date);
    dispatch(addSelectedDate(format(date, "yyyy-MM-dd")));
  };

  return (
    <div className="flex flex-col">
      <DatePicker
        initialDate={selectedDate ?? new Date()}
        onSelect={handleSelectedDate}
        expanded
        showMonthToggle
      />
      <TimeSelector />
    </div>
  );
}



export default AppointmentScheduler;
