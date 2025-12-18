"use client";

import "../auth.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Signup() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Home
                </Link>

                <div className="auth-header">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join Titan Fitness and start your journey</p>
                </div>

                <form className="auth-form">
                    <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <input type="text" className="auth-input" placeholder="John Doe" />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input type="email" className="auth-input" placeholder="john@example.com" />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" className="auth-input" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="btn-primary">
                        Create Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?
                    <Link href="/login" className="auth-link">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
