"use client";

import { ArrowLeft, Zap, Check, Crown, Star, Shield } from "lucide-react";
import Link from "next/link";
import "./pricing.css";

export default function PricingPage() {
    return (
        <div className="wrapper" style={{
            backgroundImage: "linear-gradient(rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.95)), url('/anime_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            width: "100%"
        }}>
            <div className="container">
                <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem' }}>
                    <Link href="/dashboard" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        background: 'rgba(255,255,255,0.05)',
                        transition: '0.2s'
                    }}>
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={18} className="text-gradient" />
                        <span style={{ fontWeight: 700, letterSpacing: '1px' }}>SUBSCRIPTION MANAGER</span>
                    </div>
                </header>

                <div className="header">
                    <h1 className="title">Select Your <span className="text-gradient">Class</span></h1>
                    <p className="subtitle">Unlock your true potential with Titan-tier access.</p>
                </div>

                <div className="grid">
                    {/* Novice Tier */}
                    <div className="card">
                        <div className="iconWrapper">
                            <Shield size={32} />
                        </div>
                        <h3 className="planName">Novice</h3>
                        <div className="planPrice">
                            Free
                        </div>
                        <ul className="features">
                            <li className="feature"><Check size={16} color="var(--primary)" /> Ad-supported experience</li>
                            <li className="feature"><Check size={16} color="var(--primary)" /> Basic workout logging</li>
                            <li className="feature"><Check size={16} color="var(--primary)" /> Community access</li>
                        </ul>
                        <button className="ctaButton">Current Plan</button>
                    </div>

                    {/* Pro Tier */}
                    <div className="card pro" style={{ transform: 'scale(1.05)', borderColor: 'var(--primary)' }}>
                        <div style={{
                            position: 'absolute', top: 15, right: 15,
                            background: 'var(--primary)', color: 'black',
                            fontSize: '0.7rem', fontWeight: 800,
                            padding: '4px 12px', borderRadius: '20px'
                        }}>POPULAR</div>
                        <div className="iconWrapper" style={{ color: 'var(--primary)', background: 'rgba(0, 240, 255, 0.1)' }}>
                            <Star size={32} />
                        </div>
                        <h3 className="planName" style={{ color: 'var(--primary)' }}>Pro Titan</h3>
                        <div className="planPrice">
                            <span className="currency">₹</span>99<span className="period">/mo</span>
                        </div>
                        <ul className="features">
                            <li className="feature"><Check size={16} color="var(--primary)" /> No Ads - Pure Focus</li>
                            <li className="feature"><Check size={16} color="var(--primary)" /> Advanced Analytics</li>
                            <li className="feature"><Check size={16} color="var(--primary)" /> AI Coach Insights</li>
                            <li className="feature"><Check size={16} color="var(--primary)" /> Unlimited Logs</li>
                        </ul>
                        <button className="ctaButton">Upgrade to Pro</button>
                    </div>

                    {/* God Tier */}
                    <div className="card god">
                        <div className="iconWrapper" style={{ color: 'var(--secondary)', background: 'rgba(112, 0, 255, 0.1)' }}>
                            <Crown size={32} />
                        </div>
                        <h3 className="planName" style={{ color: 'var(--secondary)' }}>God Tier</h3>
                        <div className="planPrice">
                            <span className="currency">₹</span>199<span className="period">/mo</span>
                        </div>
                        <ul className="features">
                            <li className="feature"><Check size={16} color="var(--secondary)" /> Everything in Pro</li>
                            <li className="feature"><Check size={16} color="var(--secondary)" /> 1-on-1 Human Coaching</li>
                            <li className="feature"><Check size={16} color="var(--secondary)" /> Custom Meal Plans</li>
                            <li className="feature"><Check size={16} color="var(--secondary)" /> Verified Titan Badge</li>
                        </ul>
                        <button className="ctaButton">Ascend</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
