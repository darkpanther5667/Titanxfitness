"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import {
    Activity,
    Settings,
    Play,
    TrendingUp,
    Zap
} from "lucide-react";
import Link from "next/link";
import Modal from "../components/Modal";

interface UserProps {
    name: string;
    image: string;
}

// Minimal types needed for readiness
interface ActivityItem {
    id: number;
    name: string;
    timestamp: number;
    type: 'workout' | 'nutrition' | 'sleep' | 'water';
}

import { getAIResponse, EnergyLevel, TimeAvailable } from "../lib/ai-logic";
import { calculateStreak } from "../lib/features";

export default function DashboardClient({ user }: { user: UserProps }) {
    // 1. Data State (Simplified for readiness calc)
    const [weight, setWeight] = useState(0);
    const [workouts, setWorkouts] = useState(0);
    const [sleep, setSleep] = useState(0);
    const [water, setWater] = useState(0);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [readinessScore, setReadinessScore] = useState(85);
    const [userName, setUserName] = useState(user.name);

    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'settings' | null>(null);

    // Load Data
    useEffect(() => {
        const savedData = localStorage.getItem("titan_dashboard_data");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setWeight(parsed.weight || 0);
            setWorkouts(parsed.workouts || 0);
            setSleep(parsed.sleep || 0);
            setWater(parsed.water || 0);
            if (parsed.activities) setActivities(parsed.activities);
            if (parsed.userName) setUserName(parsed.userName);
        }
    }, []);

    // Calculate Readiness & Stats
    useEffect(() => {
        // Fake Readiness Logic (Simulated)
        let score = 70;
        if (sleep >= 7) score += 15;
        if (water >= 2) score += 10;
        const lastWorkout = activities.find(a => a.type === 'workout');
        if (lastWorkout && (Date.now() - lastWorkout.timestamp < 43200000)) {
            // Recovering if workout was less than 12 hours ago
            score -= 10;
        } else if (lastWorkout && (Date.now() - lastWorkout.timestamp > 172800000)) {
            // Decaying if no workout for 48h
            score -= 5;
        }

        if (score > 100) score = 100;
        if (score < 40) score = 40; // Floor
        setReadinessScore(score);

    }, [sleep, water, activities]);

    const streak = calculateStreak(activities);

    // Dynamic Greeting/Insight
    const getInsight = () => {
        if (readinessScore >= 90) return { main: "Systems Peak", sub: "Ideal day to break limits." };
        if (readinessScore >= 70) return { main: "Optimal State", sub: "Maintain form and focus." };
        if (readinessScore >= 50) return { main: "Recovery Mode", sub: "Keep intensity moderate." };
        return { main: "Rest Required", sub: "Focus on sleep and mobility." };
    };

    const insight = getInsight();

    const handleSettingsSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Just save name for now
        const currentData = JSON.parse(localStorage.getItem("titan_dashboard_data") || "{}");
        currentData.userName = userName;
        localStorage.setItem("titan_dashboard_data", JSON.stringify(currentData));
        setIsModalOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.dateDisplay}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </div>
                    <Settings className={styles.settingsIcon} size={24} onClick={() => { setModalType('settings'); setIsModalOpen(true); }} />
                </header>

                {/* Readiness Core */}
                <div className={styles.readinessContainer}>
                    <div className={styles.readinessRing} style={{
                        borderColor: readinessScore > 80 ? 'var(--success)' : readinessScore > 60 ? 'var(--primary)' : 'var(--error)'
                    }}></div>
                    <div className={styles.readinessScore}>{readinessScore}%</div>
                    <div className={styles.readinessLabel}>Readiness</div>
                </div>

                {/* Insight */}
                <div className={styles.insightContainer}>
                    <div className={styles.insightText}>{insight.main}</div>
                    <div className={styles.insightSub}>{insight.sub}</div>
                </div>

                {/* Primary Action */}
                <div className={styles.actionContainer}>
                    <Link href="/workout" style={{ width: '100%' }}>
                        <button className={styles.startBtn}>
                            <Play size={20} fill="currentColor" />
                            Start Session
                        </button>
                    </Link>
                </div>

                {/* Footer Stats - Progressive Disclosure */}
                <div className={styles.progressSummary}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{streak}</div>
                        <div className={styles.statLabel}>Day Streak</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{workouts}</div>
                        <div className={styles.statLabel}>Sessions</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{weight || '--'}</div>
                        <div className={styles.statLabel}>lbs</div>
                    </div>
                </div>

            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Settings"
            >
                <div>
                    <label className={styles.modalLabel}>Titan Name</label>
                    <div className={styles.modalInputWrapper}>
                        <input
                            type="text"
                            className={styles.modalInput}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <button className={styles.modalButton} onClick={handleSettingsSave}>
                        Save
                    </button>
                </div>
            </Modal>
        </div>
    );
}
