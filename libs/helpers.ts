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
        hour12: true
    });

    return formatted;
}


export const parseDurationString = (duration: string): number => {
    const [hoursStr, minutesStr, secondsStr] = duration.split(":");
    const hours = parseInt(hoursStr, 10) || 0;
    const minutes = parseInt(minutesStr, 10) || 0;
    const seconds = parseInt(secondsStr, 10) || 0;

    return hours * 60 + minutes + Math.floor(seconds / 60);
};

export const formatDuration = (duration: string): string => {
    const totalMinutes = parseDurationString(duration);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours && minutes) return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min`;
    if (hours) return `${hours} hour${hours > 1 ? 's' : ''}`;

    console.log("Format duration", minutes)

    return `${minutes}`;
};

export const parseFormattedDuration = (durationStr: string): number => {
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

export const convertMinutesStringToDuration = (minutes: number): string => {


    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;

    if (hours && min) return `${hours} hour${hours > 1 ? 's' : ''} ${min} min`;
    if (hours) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${min} min`;
};







