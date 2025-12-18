"use client";

import { ArrowLeft, Brain, Cpu, Globe, HeartPulse, Shield, Zap } from "lucide-react";
import Link from "next/link";
import "./features.css";

export default function FeaturesPage() {
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
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        background: 'rgba(255,255,255,0.05)',
                        transition: '0.2s'
                    }}>
                        <ArrowLeft size={18} /> Back to Home
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Cpu size={18} className="text-gradient" />
                        <span style={{ fontWeight: 700, letterSpacing: '1px' }}>SYSTEM CAPABILITIES</span>
                    </div>
                </header>

                <div className="header">
                    <h1 className="title">Titan <span className="text-gradient">Core Features</span></h1>
                    <p className="subtitle">Explore the technologies powering your ascension.</p>
                </div>

                <div className="grid">
                    {/* Feature 1 */}
                    <div className="featureCard">
                        <div className="iconBox">
                            <Brain size={32} />
                        </div>
                        <h3 className="cardTitle">Neural Training AI</h3>
                        <p className="cardDesc">
                            Our proprietary algorithm adapts to your recovery rate, suggesting optimal weights and sets in real-time. It learns your limits before you do.
                        </p>
                        <div className="techSpec">
                            <span>MODULE: AI_COACH_V2</span>
                            <span>STATUS: ACTIVE</span>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="featureCard">
                        <div className="iconBox">
                            <HeartPulse size={32} />
                        </div>
                        <h3 className="cardTitle">Bio-Metric Sync</h3>
                        <p className="cardDesc">
                            Seamlessly integrates with Apple Health and cardio devices to track HRV, resting heart rate, and sleep quality for a holistic view of your engine.
                        </p>
                        <div className="techSpec">
                            <span>MODULE: BIO_LINK</span>
                            <span>STATUS: ONLINE</span>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="featureCard">
                        <div className="iconBox">
                            <Globe size={32} />
                        </div>
                        <h3 className="cardTitle">Global Leaderboards</h3>
                        <p className="cardDesc">
                            Compete in weekly "Raids" against thousands of other Titans. Climb the ranks, earn exclusive badges, and solidify your legacy.
                        </p>
                        <div className="techSpec">
                            <span>MODULE: NET_RANK</span>
                            <span>STATUS: LIVE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
