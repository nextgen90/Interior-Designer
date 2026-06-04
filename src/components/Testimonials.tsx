"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Testimonials.module.css";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Atelier Interiors didn't just redesign our home; they reimagined our way of living. The attention to light and texture is unparalleled.",
    author: "Eleanor Wright",
    role: "Private Residence, Manhattan"
  },
  {
    text: "Working with this team was a revelation. They brought a sense of calm and structure to our chaotic space, using materials that feel timeless.",
    author: "James & Sarah Chen",
    role: "Penthouse, Brooklyn"
  },
  {
    text: "The brass accents and dark wood tones created an atmosphere of absolute luxury that perfectly aligned with our brand identity.",
    author: "Marcus Thorne",
    role: "CEO, The Thorne Group"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Quote size={48} className={styles.quoteIcon} />
        
        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.slide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <p className={styles.text}>"{testimonials[current].text}"</p>
              <div className={styles.authorInfo}>
                <span className={styles.author}>{testimonials[current].author}</span>
                <span className={styles.role}>{testimonials[current].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.activeDot : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
