"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./workout.module.css";
import { WORKOUT_DATA, WorkoutStep } from "./data";
import { X, CheckCircle, ChevronRight, Play, Pause, SkipForward } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorkoutPage() {
    const router = useRouter();

    // State
    const [stepIndex, setStepIndex] = useState(0);
    const [phase, setPhase] = useState<'preview' | 'active' | 'rest' | 'complete'>('preview');
    const [currentSet, setCurrentSet] = useState(1);
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Derived State
    const currentStep = WORKOUT_DATA[stepIndex];
    const totalSteps = WORKOUT_DATA.length;
    const isTimeBased = currentStep.duration !== undefined && currentStep.type !== 'exercise'; // Warmup/Cooldown usually time based
    const isTimeBasedExercise = currentStep.duration !== undefined && currentStep.type === 'exercise'; // Plank etc

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 && isTimerRunning) {
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    const handleTimerComplete = () => {
        setIsTimerRunning(false);
        if (phase === 'rest') {
            // Rest over, start next set or exercise
            nextPhase();
        } else if (phase === 'active' && (isTimeBased || isTimeBasedExercise)) {
            // Exercise timer over
            handleSetComplete();
        }
    };

    const startStep = () => {
        setPhase('active');
        if (isTimeBased || isTimeBasedExercise) {
            setTimer(currentStep.duration || 60);
            setIsTimerRunning(true);
        }
    };

    const handleSetComplete = () => {
        setIsTimerRunning(false);

        // Check if more sets remain for this exercise
        if (currentStep.sets && currentSet < currentStep.sets) {
            // Go to Rest
            setPhase('rest');
            setTimer(currentStep.rest || 30);
            setIsTimerRunning(true);
        } else {
            // Exercise/Step Complete
            if (stepIndex < totalSteps - 1) {
                // If there's a next exercise, maybe Rest first if it was a strenuous one?
                // For simplicity, if it was an exercise, give rest before next. Warmup -> immediate.
                if (currentStep.type === 'exercise') {
                    setPhase('rest');
                    setTimer(60); // Rest between exercises
                    setIsTimerRunning(true);
                } else {
                    // Warmup/Cooldown transition immediately
                    completeStep();
                }
            } else {
                setPhase('complete');
            }
        }
    };

    const nextPhase = () => {
        // Called after rest
        if (currentStep.sets && currentSet < currentStep.sets) {
            // Start next set
            setCurrentSet(prev => prev + 1);
            startStep();
        } else {
            // Move to next step
            completeStep();
        }
    };

    const completeStep = () => {
        setStepIndex(prev => prev + 1);
        setCurrentSet(1);
        setPhase('preview'); // Show preview of next
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // --- Render Views ---

    if (phase === 'complete') {
        return (
            <div className={styles.container}>
                <div className={styles.content} style={{ textAlign: 'center' }}>
                    <div className={styles.visualContainer} style={{ borderRadius: '50%', width: '200px', height: '200px', margin: '0 auto 2rem' }}>
                        <CheckCircle size={100} color="var(--success)" />
                    </div>
                    <h1 className={styles.title}>WORKOUT<br />UNLOCKED</h1>
                    <div className={styles.metaInfo} style={{ justifyContent: 'center', marginTop: '1rem' }}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaValue} style={{ color: 'var(--primary)' }}>+250 XP</span>
                            <span className={styles.metaLabel}>Gained</span>
                        </div>
                    </div>
                    <Link href="/dashboard" style={{ width: '100%', maxWidth: '300px' }}>
                        <button className={styles.primaryBtn}>Return to Base</button>
                    </Link>
                </div>
            </div>
        );
    }

    if (phase === 'rest') {
        const nextStep = currentStep.sets && currentSet < currentStep.sets ? currentStep : WORKOUT_DATA[stepIndex + 1];
        const nextLabel = currentStep.sets && currentSet < currentStep.sets ? `Set ${currentSet + 1}` : nextStep?.title || "Cooldown";

        return (
            <div className={styles.restOverlay}>
                <div className={styles.restTitle}>Systems Regenerating</div>
                <div className={styles.restTimer}>{formatTime(timer)}</div>

                <div className={styles.nextUp}>
                    <div className={styles.metaLabel}>Up Next</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{nextLabel}</div>
                </div>

                <button className={styles.skipBtn} onClick={() => handleTimerComplete()}>
                    Skip Rest <SkipForward size={16} style={{ display: 'inline', marginLeft: '5px' }} />
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <span className={styles.phaseBadge}>{currentStep.type}</span>
                <Link href="/dashboard">
                    <button className={styles.closeBtn}><X size={24} /></button>
                </Link>
            </header>

            {/* Main Content */}
            <div className={styles.content}>
                {/* Visual */}
                <div className={styles.visualContainer}>
                    {/* Pseudo Animation */}
                    <div className={currentStep.animationType === 'push' ? styles.animPush : styles.animShape} />
                    <div className={styles.visualCues}>Adjusting Gravity...</div>
                </div>

                <h1 className={styles.title}>{currentStep.title}</h1>

                {/* Meta Info */}
                <div className={styles.metaInfo}>
                    {(currentStep.sets) && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Set</span>
                            {/* If we are in preview, show 1. If active, show current. */}
                            <span className={styles.metaValue}>{phase === 'preview' ? '1' : currentSet} / {currentStep.sets}</span>
                        </div>
                    )}
                    {isTimeBased || isTimeBasedExercise ? (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Duration</span>
                            <span className={styles.metaValue}>{formatTime(phase === 'active' ? timer : (currentStep.duration || 0))}</span>
                        </div>
                    ) : (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Reps</span>
                            <span className={styles.metaValue}>{currentStep.reps}</span>
                        </div>
                    )}
                </div>

                {/* Cues */}
                <div className={styles.cuesList}>
                    {currentStep.cues.map((cue, i) => (
                        <div key={i} className={styles.cueItem}>
                            <CheckCircle size={16} className={styles.checkIcon} />
                            {cue}
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <div className={styles.controls}>
                    {phase === 'preview' ? (
                        <button className={styles.primaryBtn} onClick={startStep}>
                            START <Play size={20} style={{ display: 'inline', marginLeft: '10px' }} />
                        </button>
                    ) : (
                        <button className={styles.primaryBtn} onClick={handleSetComplete}>
                            {isTimeBased || isTimeBasedExercise ? (isTimerRunning ? 'PAUSE' : 'RESUME') : 'DONE'}
                            {!(isTimeBased || isTimeBasedExercise) && <CheckCircle size={20} style={{ display: 'inline', marginLeft: '10px' }} />}
                        </button>
                    )}

                    {/* Pause Toggle Logic for TimeBased */}
                    {(phase === 'active' && (isTimeBased || isTimeBasedExercise)) && (
                        <div style={{ textAlign: 'center', marginTop: '1rem', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setIsTimerRunning(!isTimerRunning)}>
                            {isTimerRunning ? 'Stop Timer' : 'Resume Timer'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
