"use client";

import { useState } from "react";
import { login } from "./actions";
import styles from "./login.module.css";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const res = await login(formData);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h2>Atelier Admin</h2>
          <p>Sign in to manage appointments & expenses</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
