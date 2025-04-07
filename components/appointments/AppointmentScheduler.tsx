"use client";

import React from "react";

import DatePicker from "./DatePicker";
import TimeSelector from "./TimeSelector";

function AppointmentScheduler() {
  return (
    <div className="flex flex-col">
      <DatePicker />
      <TimeSelector />
    </div>
  );
}



export default AppointmentScheduler;
