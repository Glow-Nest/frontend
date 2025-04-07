import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSelectedDate } from "@/store/slices/AppointmentSlice";
import {
    faArrowLeft,
    faArrowRight,
    faChevronUp,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    addWeeks,
    subWeeks,
    format,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    startOfDay,
    endOfDay,
    isSameDay,
} from "date-fns";

function DatePicker() {
    const dispatch = useDispatch();

    const today = new Date();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(today);

    useEffect(() => {
        dispatch(addSelectedDate(format(today, "yyyy-MM-dd")));
    }, []);

    const maxDate = addWeeks(today, 13);
    const fullWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const isSelectable = (date: Date) =>
        date >= startOfDay(today) && date <= endOfDay(maxDate);

    const isToday = (date: Date) => isSameDay(date, today);

    const handlePrev = () => {
        setCurrentDate((prev) => (isExpanded ? subWeeks(prev, 4) : subWeeks(prev, 1)));
    };

    const handleNext = () => {
        setCurrentDate((prev) => (isExpanded ? addWeeks(prev, 4) : addWeeks(prev, 1)));
    };

    const handleSelectedDate = (date: Date) => {
        if (isSelectable(date)) {
            setSelectedDate(date);
            dispatch(addSelectedDate(format(date, "yyyy-MM-dd")));
        }
    };

    const getDisplayedDates = () => {
        if (isExpanded) {
            const start = startOfMonth(currentDate);
            const end = endOfMonth(currentDate);
            const days = eachDayOfInterval({ start, end });

            const firstDayOfMonth = start.getDay();
            const adjustedStartIndex = (firstDayOfMonth + 6) % 7;

            return [
                ...Array(adjustedStartIndex).fill(null),
                ...days,
            ];
        } else {
            const start = startOfWeek(currentDate, { weekStartsOn: 1 });
            const end = endOfWeek(currentDate, { weekStartsOn: 1 });
            return eachDayOfInterval({ start, end });
        }
    };

    const displayedDates = getDisplayedDates();

    return (
        <div className="w-full mx-auto p-6 mb-2 bg-white shadow-lg rounded-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-5">
                    <p className="text-2xl font-semibold">
                        {format(currentDate, "MMMM yyyy")}
                    </p>
                    <FontAwesomeIcon
                        icon={isExpanded ? faChevronUp : faChevronDown}
                        className="cursor-pointer bg-gray-200 rounded-full p-1.5 w-4 h-5"
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="cursor-pointer p-3 rounded-md bg-gray-200"
                        onClick={handlePrev}
                    />
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="cursor-pointer p-3 rounded-md bg-gray-200"
                        onClick={handleNext}
                    />
                </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
                {fullWeekDays.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Dates Grid */}
            <div className={`grid grid-cols-7 gap-1 text-center ${isExpanded ? "h-[40vh]" : "grid-rows-1"}`}>
                {displayedDates.map((date, index) => {
                    if (!date) return <div key={index} />;

                    const selectable = isSelectable(date);
                    const selected = selectedDate && isSameDay(date, selectedDate);
                    const todayMatch = isToday(date);

                    return (
                        <div
                            key={index}
                            onClick={() => handleSelectedDate(date)}
                            className={`w-10 h-12 flex items-center justify-center mx-auto rounded-md transition-all duration-150
                                ${selected ? "bg-[#dba052] text-white font-bold" : ""}
                                ${!selected && todayMatch ? "border border-[#dba052] font-bold text-black" : ""}
                                ${selectable && !selected && !todayMatch ? "hover:bg-[#f3e0ca] cursor-pointer" : ""}
                                ${!selectable ? "text-gray-400 line-through cursor-default" : ""}
                            `}
                        >
                            {format(date, "d")}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DatePicker;
