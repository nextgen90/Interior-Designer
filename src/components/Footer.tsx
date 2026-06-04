import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.logo}>
              <div className={styles.logoMark}>A</div>
              <div className={styles.logoText}>
                <span className={styles.brand}>ATELIER</span>
                <span className={styles.subBrand}>INTERIORS</span>
              </div>
            </div>
            <p className={styles.desc}>
              Bespoke interior design for modern spaces. Where shadow meets the quiet glow of brass.
            </p>
          </div>
          
          <div className={styles.col}>
            <h4 className="h4">Navigation</h4>
            <nav className={styles.nav}>
              <Link href="/">Home</Link>
              <Link href="#services">Services</Link>
              <Link href="#gallery">Gallery</Link>
              <Link href="#articles">Articles</Link>
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className="h4">Contact</h4>
            <div className={styles.contactInfo}>
              <p>123 Design Avenue</p>
              <p>New York, NY 10001</p>
              <p>hello@atelierinteriors.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Atelier Interiors. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
