"use client";

import { doGoogleLogin } from "@/app/actions/auth";
import Link from "next/link";
import styles from "./login.module.css";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("titan_user", "Demo User");
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Home
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Enter your credentials to access your account</p>
        </div>

        {/* Credentials Form */}
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} placeholder="john@example.com" />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input type="password" className={styles.input} placeholder="••••••••" />
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>

        <div className={styles.divider}>OR</div>

        {/* Google Form */}
        <form action={doGoogleLogin}>
          <button type="submit" className={styles.googleButton}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
            Continue with Google
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?
          <Link href="/signup" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
