import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import styles from "./CustomDatePicker.module.css";

interface CustomDatePickerProps {
  name: string;
  required?: boolean;
}

export default function CustomDatePicker({ name, required }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setIsOpen(false);
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate?.getDate() === i && 
                         selectedDate?.getMonth() === currentMonth.getMonth() &&
                         selectedDate?.getFullYear() === currentMonth.getFullYear();
      days.push(
        <motion.div
          key={`day-${i}`}
          className={`${styles.day} ${isSelected ? styles.selectedDay : ""}`}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelectDate(i)}
        >
          {i}
        </motion.div>
      );
    }
    return days;
  };

  const formattedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : "";

  const displayDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Select a date...";

  return (
    <div className={styles.container} ref={dropdownRef}>
      <input type="hidden" name={name} value={formattedDate} required={required} />
      
      <div 
        className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedDate ? styles.selectedText : styles.placeholder}>
          {displayDate}
        </span>
        <Calendar className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} size={18} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className={styles.calendarHeader}>
              <motion.button 
                type="button" 
                onClick={handlePrevMonth} 
                className={styles.navButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <div className={styles.monthYear}>
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <motion.button 
                type="button" 
                onClick={handleNextMonth} 
                className={styles.navButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
            
            <div className={styles.daysOfWeek}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className={styles.dayOfWeek}>{day}</div>
              ))}
            </div>
            
            <div className={styles.calendarGrid}>
              {renderCalendarDays()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
