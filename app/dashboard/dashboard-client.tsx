"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import {
    Activity,
    Dumbbell,
    Flame,
    Plus,
    Utensils,
    Moon,
    Droplets,
    Trophy,
    ChevronRight,
    Settings,
    Zap,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import Modal from "../components/Modal";

interface UserProps {
    name: string;
    image: string;
}

interface ActivityItem {
    id: number;
    name: string;
    timestamp: string;
    type: 'workout' | 'nutrition' | 'sleep' | 'water';
}

import { getAIResponse, DailyContext, TimeAvailable, EnergyLevel, SleepQuality } from "../lib/ai-logic";
import { getTimeBasedGreeting, calculateStreak, checkAchievements, getDailyQuote, exportDashboardData, Achievement } from "../lib/features";
import { calculateXP, getCurrentLevel, getNextLevel, getProgressToNextLevel, TITAN_LEVELS } from "../lib/titan-levels";

export default function DashboardClient({ user }: { user: UserProps }) {
    // 1. Initial State (Lazy load from localStorage if available)
    const [weight, setWeight] = useState(0);
    const [calories, setCalories] = useState(0);
    const [water, setWater] = useState(0);
    const [sleep, setSleep] = useState(0);
    const [workouts, setWorkouts] = useState(0);
    const [activities, setActivities] = useState<ActivityItem[]>([
        { id: 1, name: "Platform Initiated", timestamp: "Just now", type: "workout" }
    ]);

    // Goals State
    const [goals, setGoals] = useState({
        calories: 2500,
        water: 3.5,
        sleep: 8,
        workouts: 5
    });

    // AI Context State
    const [energy, setEnergy] = useState<EnergyLevel>('mid');
    const [timeAvailable, setTimeAvailable] = useState<TimeAvailable>(30);
    const [aiSuggestion, setAiSuggestion] = useState({ message: "Analyzing system protocols...", suggestion: "Standby" });

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    // User Name State
    const [userName, setUserName] = useState(user.name);
    const [streak, setStreak] = useState(0);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [totalXP, setTotalXP] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(TITAN_LEVELS[0]);
    const [modalType, setModalType] = useState<'weight' | 'calories' | 'sleep' | 'checkin' | 'settings' | null>(null);
    const [inputValue, setInputValue] = useState("");

    // Load Data on Mount
    useEffect(() => {
        const savedData = localStorage.getItem("titan_dashboard_data");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setWeight(parsed.weight || 0);
            setCalories(parsed.calories || 0);
            setWater(parsed.water || 0);
            setSleep(parsed.sleep || 0);
            setWorkouts(parsed.workouts || 0);
            if (parsed.activities) setActivities(parsed.activities);
            // Load goals if they exist, otherwise keep defaults
            if (parsed.goals) setGoals(parsed.goals);
            // Load name if exists
            if (parsed.userName) setUserName(parsed.userName);
        }

        // Initial AI Check
        updateAI();
    }, []);

    // Update AI when key metrics change
    useEffect(() => {
        updateAI();
        // Update streak and achievements
        const currentStreak = calculateStreak(activities);
        setStreak(currentStreak);
        const newAchievements = checkAchievements({ workouts, weight, calories, water, sleep, streak: currentStreak });
        setAchievements(newAchievements);

        // Calculate XP and Level
        const xp = calculateXP({ workouts, calories, water, sleep, streak: currentStreak, weight });
        setTotalXP(xp);
        setCurrentLevel(getCurrentLevel(xp));
    }, [sleep, energy, timeAvailable, workouts, activities, water, calories, weight]);

    // Save Data on Change
    useEffect(() => {
        const data = { weight, calories, water, sleep, workouts, activities, goals, userName };
        localStorage.setItem("titan_dashboard_data", JSON.stringify(data));
    }, [weight, calories, water, sleep, workouts, activities, goals, userName]);

    const updateAI = () => {
        const context: DailyContext = {
            energy: energy,
            sleep: sleep < 6 ? 'bad' : sleep > 8 ? 'good' : 'ok',
            timeAvailable: timeAvailable,
            yesterdayWorkout: workouts > 0, // Simplified for now
            streak: workouts // Using total as proxy for streak for now
        };
        setAiSuggestion(getAIResponse(context));
    };

    // Helper to add activity
    const addActivity = (name: string, type: ActivityItem['type']) => {
        const newActivity = {
            id: Date.now(),
            name,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 5)); // Keep last 5
    };

    // Handlers
    const handleAddWater = () => {
        setWater(prev => {
            const m = Math.min(prev + 0.25, 5);
            return parseFloat(m.toFixed(2));
        });
        addActivity("Hydration +250ml", "water");
    };

    const openModal = (type: 'weight' | 'calories' | 'sleep' | 'checkin' | 'settings') => {
        setModalType(type);
        setInputValue("");
        setIsModalOpen(true);
    };

    const handleModalSubmit = () => {
        const val = parseFloat(inputValue);
        if (modalType === 'settings') {
            // Handle settings update in the specific form, or here if simplified
            // For now, we handle settings separately in the render/form logic or simplify here
        } else if (!isNaN(val)) {
            if (modalType === 'weight') {
                setWeight(val);
                addActivity(`Weight Update: ${val}lbs`, "workout");
            }
            if (modalType === 'calories') {
                setCalories(prev => prev + val);
                addActivity(`Nutrition +${val}kcal`, "nutrition");
            }
            if (modalType === 'sleep') {
                setSleep(val);
                addActivity(`Sleep Logged: ${val}hrs`, "sleep");
            }
        }
        setIsModalOpen(false);
    };

    const handleSettingsSave = (e: React.FormEvent) => {
        e.preventDefault();
        // The goals & userName states are updated directly by inputs
        addActivity("System Protocols Updated", "workout");
        setIsModalOpen(false);
    };

    // Quick AI Toggles
    const toggleEnergy = () => {
        const levels: EnergyLevel[] = ['low', 'mid', 'high'];
        const next = levels[(levels.indexOf(energy) + 1) % levels.length];
        setEnergy(next);
        addActivity(`Energy Level: ${next.toUpperCase()}`, "workout");
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Dashboard</h1>
                        <p className={styles.welcomeUser}>{getTimeBasedGreeting()}, {userName}</p>
                    </div>
                    <div className={styles.headerActions}>
                        <div style={{
                            background: 'rgba(255, 215, 0, 0.1)',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginRight: '0.5rem'
                        }}>
                            <Zap size={16} fill="#ffd700" color="#ffd700" />
                            <span style={{ fontWeight: 600, color: '#ffd700' }}>{streak} Day Streak</span>
                        </div>
                        <Link href="/pricing" style={{ textDecoration: 'none' }}>
                            <button className={styles.settingsButton} style={{
                                background: 'rgba(0, 240, 255, 0.1)',
                                color: 'var(--primary)',
                                borderColor: 'rgba(0, 240, 255, 0.3)'
                            }}>
                                <Zap size={18} fill="currentColor" /> Get Pro
                            </button>
                        </Link>
                        <button className={styles.settingsButton} onClick={() => openModal('settings')}>
                            <Settings size={18} /> Settings
                        </button>
                    </div>
                </header>

                {/* Profile Section */}
                <section className={styles.profileSection}>
                    <div className={styles.profileInfo}>
                        <img src={user.image} alt="Profile" className={styles.avatar} />
                        <div className={styles.profileText}>
                            <h2>{userName}</h2>
                            <div className={styles.levelBadge} style={{
                                background: `linear-gradient(135deg, ${currentLevel.color}22, ${currentLevel.color}11)`,
                                border: `1px solid ${currentLevel.color}44`
                            }}>
                                <Trophy size={14} style={{ color: currentLevel.color }} />
                                {currentLevel.title} • Level {currentLevel.level}
                            </div>
                            {getNextLevel(currentLevel.level) && (
                                <div style={{ marginTop: '0.5rem', width: '100%' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '0.75rem',
                                        color: '#a0a0a0',
                                        marginBottom: '0.25rem'
                                    }}>
                                        <span>{totalXP} XP</span>
                                        <span>{getNextLevel(currentLevel.level)?.xpRequired} XP</span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '6px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${getProgressToNextLevel(totalXP).percentage}%`,
                                            height: '100%',
                                            background: `linear-gradient(90deg, ${currentLevel.color}, ${getNextLevel(currentLevel.level)?.color || currentLevel.color})`,
                                            transition: 'width 0.5s ease'
                                        }}></div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#808080', marginTop: '0.25rem' }}>
                                        {Math.floor(getProgressToNextLevel(totalXP).percentage)}% to {getNextLevel(currentLevel.level)?.title}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.profileStats}>
                        <div className={styles.statItem} onClick={() => openModal('weight')} style={{ cursor: 'pointer' }}>
                            <div className={styles.statValue}>{weight} <span className={styles.unit}>lbs</span></div>
                            <div className={styles.statLabel}>Current Weight</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>6'0"</div>
                            <div className={styles.statLabel}>Height</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>15%</div>
                            <div className={styles.statLabel}>Body Fat</div>
                        </div>
                    </div>
                </section>

                <div className={styles.insightBanner}>
                    <div className={styles.insightIcon}><Zap size={20} fill="currentColor" /></div>
                    <div className={styles.insightContent}>
                        <h3>AI Coach Protocol</h3>
                        <p style={{ fontStyle: 'italic', marginBottom: '0.5rem', color: '#fff' }}>"{aiSuggestion.message}"</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <div
                                onClick={toggleEnergy}
                                style={{
                                    padding: '0.3rem 0.8rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                Energy: <span style={{ color: energy === 'high' ? '#00f0ff' : energy === 'low' ? '#ff4d4d' : '#ffd700' }}>{energy.toUpperCase()}</span>
                            </div>
                            <div
                                style={{
                                    padding: '0.3rem 0.8rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                Mission: <span style={{ color: '#00f0ff' }}>{aiSuggestion.suggestion}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00f0ff' }}>{workouts}</div>
                        <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '0.25rem' }}>Total Workouts</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ff9d00' }}>{calories}</div>
                        <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '0.25rem' }}>Calories Logged</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ffd700' }}>{streak}</div>
                        <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '0.25rem' }}>Day Streak</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#7000ff' }}>{achievements.filter(a => a.unlocked).length}</div>
                        <div style={{ fontSize: '0.85rem', color: '#a0a0a0', marginTop: '0.25rem' }}>Achievements</div>
                    </div>
                </div>

                {/* Achievements Panel */}
                {achievements.filter(a => a.unlocked).length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 className={styles.sectionTitle}>
                            <Trophy size={24} className="text-gradient" /> Recent Achievements
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: '1rem'
                        }}>
                            {achievements.filter(a => a.unlocked).slice(0, 6).map(achievement => (
                                <div key={achievement.id} style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,215,0,0.3)',
                                    borderRadius: '16px',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{achievement.icon}</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffd700', marginBottom: '0.25rem' }}>{achievement.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#a0a0a0' }}>{achievement.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Daily Quote */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(112,0,255,0.1), rgba(0,240,255,0.1))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#a0a0a0', marginBottom: '0.5rem' }}>Daily Motivation</div>
                    <div style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#fff', lineHeight: 1.6 }}>"{getDailyQuote()}"</div>
                </div>

                <h2 className={styles.sectionTitle}>
                    <Activity size={24} className="text-gradient" /> Your Trackers
                </h2>

                <div className={styles.trackersGrid}>
                    <Link href="/exercises" style={{ textDecoration: 'none' }}>
                        <div className={styles.trackerCard}>
                            <div className={styles.trackerHeader}>
                                <div className={styles.iconBox} style={{ color: '#00f0ff' }}>
                                    <Dumbbell size={20} />
                                </div>
                                <span className={styles.cardTrend}>Details &rarr;</span>
                            </div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardTitle}>Workouts</div>
                                <div className={styles.cardValueMain}>{workouts} <span className={styles.unit}>/ {goals.workouts}</span></div>
                            </div>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${(workouts / goals.workouts) * 100}%`, background: 'var(--primary)' }}></div>
                            </div>
                        </div>
                    </Link>

                    <div className={styles.trackerCard} onClick={() => openModal('calories')}>
                        <div className={styles.trackerHeader}>
                            <div className={styles.iconBox} style={{ color: '#ff9d00' }}>
                                <Utensils size={20} />
                            </div>
                            <span className={styles.cardPlus}>+ Log</span>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardTitle}>Calories</div>
                            <div className={styles.cardValueMain}>{calories} <span className={styles.unit}>/ {goals.calories}</span></div>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${(calories / goals.calories) * 100}%`, background: '#ff9d00' }}></div>
                        </div>
                    </div>

                    <div className={styles.trackerCard} onClick={() => openModal('sleep')}>
                        <div className={styles.trackerHeader}>
                            <div className={styles.iconBox} style={{ color: '#7000ff' }}>
                                <Moon size={20} />
                            </div>
                            <span className={styles.cardTrend} style={{ color: '#a0a0a0' }}>Avg: {sleep > 0 ? sleep : '-'}h</span>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardTitle}>Rest</div>
                            <div className={styles.cardValueMain}>{sleep} <span className={styles.unit}>hrs</span></div>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${(sleep / goals.sleep) * 100}%`, background: '#7000ff' }}></div>
                        </div>
                    </div>

                    <div className={styles.trackerCard} onClick={handleAddWater}>
                        <div className={styles.trackerHeader}>
                            <div className={styles.iconBox} style={{ color: '#00a8ff' }}>
                                <Droplets size={20} />
                            </div>
                            <span className={styles.cardPlus}>+ 250ml</span>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardTitle}>Hydration</div>
                            <div className={styles.cardValueMain}>{water} <span className={styles.unit}>/ {goals.water}L</span></div>
                        </div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${(water / goals.water) * 100}%`, background: '#00a8ff' }}></div>
                        </div>
                    </div>
                </div>

                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <div className={styles.list}>
                    {activities.map((activity) => (
                        <div key={activity.id} className={styles.listItem}>
                            <div className={styles.workoutInfo}>
                                <span className={styles.workoutName}>{activity.name}</span>
                                <span className={styles.workoutDate}>{activity.timestamp}</span>
                            </div>
                            <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>Logged</div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalType === 'settings' ? 'System Configuration' : modalType === 'weight' ? 'Update Weight' : modalType === 'calories' ? 'Log Calories' : 'Log Sleep'}
            >
                {modalType === 'settings' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#a0a0a0' }}>Display Name</label>
                            <input
                                type="text"
                                className={styles.modalInput}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#a0a0a0' }}>Calorie Goal</label>
                            <input
                                type="number"
                                className={styles.modalInput}
                                value={goals.calories}
                                onChange={(e) => setGoals({ ...goals, calories: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#a0a0a0' }}>Water Goal (L)</label>
                            <input
                                type="number"
                                className={styles.modalInput}
                                value={goals.water}
                                onChange={(e) => setGoals({ ...goals, water: parseFloat(e.target.value) || 0 })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#a0a0a0' }}>Weekly Workouts</label>
                            <input
                                type="number"
                                className={styles.modalInput}
                                value={goals.workouts}
                                onChange={(e) => setGoals({ ...goals, workouts: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <button
                            className={styles.modalButton}
                            onClick={() => {
                                const data = { weight, calories, water, sleep, workouts, activities, goals, userName, streak };
                                exportDashboardData(data);
                                addActivity("Data Exported", "workout");
                            }}
                            style={{ background: 'rgba(112, 0, 255, 0.2)', border: '1px solid rgba(112, 0, 255, 0.4)' }}
                        >
                            📥 Export Data
                        </button>
                        <button className={styles.modalButton} onClick={handleSettingsSave}>
                            Save Protocol
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            type="number"
                            className={styles.modalInput}
                            placeholder={modalType === 'weight' ? 'Weight in lbs...' : modalType === 'calories' ? 'Calories in kcal...' : 'Hours slept...'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                        />
                        <button className={styles.modalButton} onClick={handleModalSubmit}>
                            Confirm Update
                        </button>
                    </>
                )}
            </Modal>
        </div>
    );
}
