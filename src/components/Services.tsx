"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./Services.module.css";
import React from "react";

const services = [
  {
    title: "Interior Architecture",
    desc: "Comprehensive spatial planning and structural modifications to optimize flow and natural light.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Bespoke Furniture",
    desc: "Custom-designed pieces crafted by master artisans to fit perfectly within your unique space.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Lighting Design",
    desc: "Layered illumination schemes that enhance mood, architecture, and texture.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  }
];

const TiltCard = ({ service }: { service: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div 
        className={styles.cardInner}
        style={{ transform: "translateZ(50px)" }}
      >
        <div 
          className={styles.cardImage} 
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className={styles.cardContent} style={{ transform: "translateZ(80px)" }}>
          <h3 className="h3">{service.title}</h3>
          <p>{service.desc}</p>
          <button className={styles.cardBtn}>Discover</button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="h2 text-gold">Our Expertise</h2>
          <p>Elevating spaces through meticulous attention to detail and uncompromising quality.</p>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, idx) => (
            <TiltCard key={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
