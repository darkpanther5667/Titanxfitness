"use client";

import { ArrowLeft, Dumbbell, Flame, Timer, Zap } from "lucide-react";
import Link from "next/link";
import "./exercises.css";

export default function ExercisesPage() {
    const exercises = [
        {
            title: "Titan Hypertrophy",
            desc: "High volume leg day focused on quad sweep and hamstring isolation.",
            level: "Advanced",
            time: "90 min",
            calories: "800",
            color: "#00f0ff"
        },
        {
            title: "Athena's Agility",
            desc: "Full body HIIT circuit designed for maximum calorie burn and speed.",
            level: "Intermediate",
            time: "45 min",
            calories: "600",
            color: "#ff0055"
        },
        {
            title: "Atlas Strength",
            desc: "Pure powerlifting movements. Deadlifts, Squats, and Bench Press.",
            level: "Elite",
            time: "120 min",
            calories: "500",
            color: "#ff9d00"
        },
        {
            title: "Zeus Upper",
            desc: "Chest and back supersets for a greek god upper body physique.",
            level: "Intermediate",
            time: "60 min",
            calories: "700",
            color: "#7000ff"
        }
    ];

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
                {/* Navigation Header */}
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
                        <ArrowLeft size={18} /> Back to Hub
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={18} className="text-gradient" />
                        <span style={{ fontWeight: 700, letterSpacing: '1px' }}>TRAINING PROTOCOLS</span>
                    </div>
                </header>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="title">Select Your <span className="text-gradient">Battle</span></h1>
                    <p className="subtitle">Choose a protocol to begin your ascension.</p>
                </div>

                <div className="grid">
                    {exercises.map((ex, i) => (
                        <div key={i} className="card" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="cardImage">
                                <Dumbbell size={48} />
                            </div>
                            <div className="cardContent">
                                <h3 style={{ color: ex.color }}>{ex.title}</h3>
                                <p>{ex.desc}</p>

                                <div className="meta">
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Timer size={14} /> {ex.time}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Flame size={14} /> {ex.calories}</span>
                                    </div>
                                    <span className="difficulty" style={{ color: ex.color, background: `${ex.color}15` }}>{ex.level}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
