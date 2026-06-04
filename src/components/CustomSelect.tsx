"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CustomSelect.module.css";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  options: Option[];
  placeholder: string;
  required?: boolean;
}

export default function CustomSelect({ name, options, placeholder, required }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
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

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={styles.container} ref={dropdownRef}>
      {/* Hidden input to make it work with native forms */}
      <input type="hidden" name={name} value={selectedValue} required={required} />
      
      <div 
        className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedValue ? styles.selected : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`} 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${selectedValue === option.value ? styles.activeOption : ""}`}
                onClick={() => {
                  setSelectedValue(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
