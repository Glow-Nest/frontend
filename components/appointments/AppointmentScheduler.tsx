"use client";

import React from "react";

import DatePicker from "./DatePicker";

function AppointmentScheduler() {
  return (
    <div className="flex flex-col">
      <DatePicker />
      <TimeSelector />
    </div>
  );
}

function TimeSelector() {
  return <div>TimeSelector</div>;
}

export default AppointmentScheduler;
