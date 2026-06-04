"use client";

import { motion } from "framer-motion";
import styles from "./Articles.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    category: "Design Trends",
    title: "The Resurgence of Dark Wood in Modern Spaces",
    date: "October 12, 2026",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Architecture",
    title: "Maximizing Natural Light in Urban Apartments",
    date: "September 28, 2026",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Materials",
    title: "Why Brass is the Ultimate Accent Metal",
    date: "September 15, 2026",
    image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Articles() {
  return (
    <section className={styles.section} id="articles">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="h2 text-gold">Latest Insights</h2>
          <Link href="/articles" className={styles.viewAll}>
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {articles.map((article, idx) => (
            <motion.div 
              key={idx}
              className={styles.articleCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className={styles.imageWrapper}>
                <div 
                  className={styles.image}
                  style={{ backgroundImage: `url(${article.image})` }}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.category}>{article.category}</span>
                <span className={styles.date}>{article.date}</span>
              </div>
              <h3 className="h3">{article.title}</h3>
              <Link href="#" className={styles.readMore}>
                Read Article
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
