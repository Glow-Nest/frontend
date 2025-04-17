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
