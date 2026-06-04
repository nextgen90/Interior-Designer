"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HeroSlider.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Where shadow meets the quiet glow of brass.",
    subtitle: "Material-led kitchens designed around ritual and light.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 2,
    title: "Elegance in every carefully curated detail.",
    subtitle: "Living spaces that breathe sophistication and calm.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 3,
    title: "Sanctuaries crafted for modern tranquility.",
    subtitle: "Bathrooms designed as personal retreats.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2000&q=80",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.heroContainer}>
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className={styles.slideImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ backgroundImage: `url(${slides[current].image})` }}
        />
      </AnimatePresence>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.label}>— ARCHITECTURAL DETAIL</div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="h1">{slides[current].title}</h1>
            <p className={styles.subtitle}>{slides[current].subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.actions}>
          <Link href="/appointment" className={styles.primaryBtn}>
            BOOK A CONSULTATION <ArrowRight size={18} />
          </Link>
          <Link href="#services" className={styles.secondaryBtn}>
            EXPLORE SERVICES
          </Link>
        </div>

        <div className={styles.navigation}>
          <div className={styles.progressContainer}>
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`${styles.progressBar} ${idx === current ? styles.active : ""}`}
                onClick={() => setCurrent(idx)}
              >
                <div className={styles.progressFill} style={{ 
                  animationDuration: idx === current ? '6s' : '0s',
                  width: idx === current ? '100%' : '0%' 
                }} />
              </div>
            ))}
          </div>
          <div className={styles.counter}>
            0{current + 1} / 0{slides.length}
          </div>
        </div>
      </div>
    </div>
  );
}
