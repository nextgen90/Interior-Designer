"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import styles from "./Gallery.module.css";
import { Play, Pause } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
];

export default function Gallery() {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playFuturisticSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(isPlaying ? 600 : 800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const togglePlay = () => {
    playFuturisticSound();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section className={styles.section} id="gallery" ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="h2 text-gold">Selected Works</h2>
          <p>A curated selection of our most iconic residential and commercial projects.</p>
        </div>

        <div className={styles.masonry}>
          <motion.div className={styles.column} style={{ y: y1 }}>
            <div className={styles.imageCard} style={{ backgroundImage: `url(${galleryImages[0]})`, height: "500px" }} />
            <div className={styles.imageCard} style={{ backgroundImage: `url(${galleryImages[1]})`, height: "400px" }} />
          </motion.div>
          <motion.div className={styles.column} style={{ y: y2 }}>
            <div className={styles.imageCard} style={{ backgroundImage: `url(${galleryImages[2]})`, height: "400px" }} />
            <div className={styles.imageCard} style={{ backgroundImage: `url(${galleryImages[3]})`, height: "500px" }} />
          </motion.div>
        </div>

        {/* Video Section */}
        <div className={styles.videoSection}>
          <motion.div 
            className={styles.videoWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.videoContainer}>
              <video 
                ref={videoRef}
                className={styles.actualVideo}
                src="https://Dentiest.b-cdn.net/6a439009-86bb-4084-bc68-c62be8171725.mp4"
                poster="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1600&q=80"
                controlsList="nodownload"
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              />
              
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div 
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={togglePlay}
                  >
                    <motion.div 
                      className={styles.playButton3d}
                      whileHover={{ scale: 1.1, rotateX: 15, rotateY: 15, boxShadow: "0 20px 40px rgba(212,175,55,0.6)" }}
                      whileTap={{ scale: 0.9, rotateX: -15, rotateY: -15 }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Play size={40} fill="white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    className={styles.pauseButtonContainer}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(212,175,55,0.8)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                  >
                    <Pause size={24} fill="white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className={styles.videoContent}>
              <h3 className="h3">The Process</h3>
              <p>Watch how we transform ordinary spaces into extraordinary sanctuaries.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
