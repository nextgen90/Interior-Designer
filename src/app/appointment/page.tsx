"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { submitAppointment } from "./actions";
import CustomSelect from "../../components/CustomSelect";
import CustomDatePicker from "../../components/CustomDatePicker";

const serviceOptions = [
  { value: "Interior Architecture", label: "Interior Architecture" },
  { value: "Bespoke Furniture", label: "Bespoke Furniture" },
  { value: "Lighting Design", label: "Lighting Design" },
  { value: "Full Project Management", label: "Full Project Management" },
];

const timeOptions = [
  { value: "09:00 AM", label: "09:00 AM" },
  { value: "09:30 AM", label: "09:30 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "10:30 AM", label: "10:30 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "11:30 AM", label: "11:30 AM" },
  { value: "01:00 PM", label: "01:00 PM" },
  { value: "01:30 PM", label: "01:30 PM" },
  { value: "02:00 PM", label: "02:00 PM" },
  { value: "02:30 PM", label: "02:30 PM" },
  { value: "03:00 PM", label: "03:00 PM" },
  { value: "03:30 PM", label: "03:30 PM" },
  { value: "04:00 PM", label: "04:00 PM" },
  { value: "04:30 PM", label: "04:30 PM" },
  { value: "05:00 PM", label: "05:00 PM" },
];

export default function AppointmentPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await submitAppointment(formData);
      if (res.success) {
        setStatus("success");
        setMessage("Your consultation request has been received. We will be in touch shortly.");
        (e.target as HTMLFormElement).reset();
        setFormKey(prev => prev + 1);
      } else {
        setStatus("error");
        setMessage(res.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.div 
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.header}>
            <h1 className="h1 text-gold">Book a Consultation</h1>
            <p>Begin the journey of transforming your space. Share your details below, and our design team will reach out to schedule an initial meeting.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required placeholder="Jane Doe" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="jane@example.com" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="service">Service of Interest</label>
              <CustomSelect 
                key={`service-${formKey}`}
                name="service" 
                options={serviceOptions} 
                placeholder="Select a service..." 
                required 
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="date">Preferred Date</label>
                <CustomDatePicker name="date" required key={`date-${formKey}`} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="time">Preferred Time</label>
                <CustomSelect 
                  key={`time-${formKey}`}
                  name="time" 
                  options={timeOptions} 
                  placeholder="Select time..." 
                  required 
                />
              </div>
            </div>

            {status === "success" && <div className={styles.successMessage}>{message}</div>}
            {status === "error" && <div className={styles.errorMessage}>{message}</div>}

            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "SUBMITTING..." : "REQUEST APPOINTMENT"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
