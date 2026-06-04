"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>A</div>
          <div className={styles.logoText}>
            <span className={styles.brand}>ATELIER</span>
            <span className={styles.subBrand}>INTERIORS</span>
          </div>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link href="#services" onClick={() => setMenuOpen(false)}>SERVICES</Link>
          <Link href="#gallery" onClick={() => setMenuOpen(false)}>GALLERY</Link>
          <Link href="#articles" onClick={() => setMenuOpen(false)}>ARTICLE</Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/appointment" className={styles.bookBtn}>
            BOOK CONSULTATION
          </Link>
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
