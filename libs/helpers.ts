import { BackendError } from "./types/common";

export function calculateEndTime(startTime: string, duration: number): string {
  const [time, meridiem] = startTime.split(" ");
  let [hour, minute] = time.split(":").map(Number);

  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  const startDate = new Date();
  startDate.setHours(hour, minute);

  const endDate = new Date(startDate.getTime() + duration * 60000);

  const formatted = endDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatted;
}

// 	Converts "HH:MM:SS" string to total minutes
export const parseHHMMDurationToMinutes = (duration: string): number => {
  const [hoursStr, minutesStr, secondsStr] = duration.split(":");
  const hours = parseInt(hoursStr, 10) || 0;
  const minutes = parseInt(minutesStr, 10) || 0;
  const seconds = parseInt(secondsStr, 10) || 0;

  return hours * 60 + minutes + Math.floor(seconds / 60);
};

// Converts "HH:MM:SS" to "X hours Y min" string
export const formatHHMMDurationToReadable = (duration: string): string => {
  const totalMinutes = parseHHMMDurationToMinutes(duration);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours && minutes)
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} min`;
  if (hours) return `${hours} hour${hours > 1 ? "s" : ""}`;

  return `${minutes} min`;
};

// Converts "X hours Y min" to total minutes
export const parseReadableDurationToMinutes = (durationStr: string): number => {
  let totalMinutes = 0;
  const normalized = durationStr.toLowerCase().trim();

  const hourMatch = normalized.match(/(\d+)\s*hour/);
  const minMatch = normalized.match(/(\d+)\s*min/);

  if (hourMatch) {
    totalMinutes += parseInt(hourMatch[1], 10) * 60;
  }

  if (minMatch) {
    totalMinutes += parseInt(minMatch[1], 10);
  }

  return totalMinutes;
};

// Converts minutes number to "X hours Y min" string
export const formatMinutesToReadableDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;

  if (hours && min) return `${hours} hour${hours > 1 ? "s" : ""} ${min} min`;
  if (hours) return `${hours} hour${hours > 1 ? "s" : ""}`;
  return `${min} min`;
};

// Converts "HH:MM" to a 12-hour clock format
export function formatTimeStringTo12HourClock(t: string) {
  const [hours, minutes] = t.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}


// Extract error message
export function extractFirstErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  const backendErrors = (error as { data?: BackendError[] })?.data;
  return backendErrors?.[0]?.message ?? fallback;
}

export const convertMinutesToHHMMSS = (minutes: number): string => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const secs = 0;
  return [hrs, mins, secs]
    .map((unit) => unit.toString().padStart(2, "0"))
    .join(":");
};
