export interface WorkoutStep {
    id: string;
    title: string;
    type: 'warmup' | 'exercise' | 'cooldown';
    duration?: number; // seconds (for time-based)
    reps?: string;
    sets?: number;
    rest?: number; // seconds
    cues: string[];
    animationType: 'stretch' | 'push' | 'pull' | 'legs' | 'cardio';
}

export const WORKOUT_DATA: WorkoutStep[] = [
    // WARMUP
    {
        id: 'w1',
        title: 'Neck Rotations',
        type: 'warmup',
        duration: 30,
        cues: ['Slow, controlled circles', 'Breathing deep'],
        animationType: 'stretch'
    },
    {
        id: 'w2',
        title: 'Arm Circles',
        type: 'warmup',
        duration: 45,
        cues: ['Start small, get bigger', 'Keep shoulders down'],
        animationType: 'stretch'
    },
    {
        id: 'w3',
        title: 'Hip Openers',
        type: 'warmup',
        duration: 60,
        cues: ['Lift knee high', 'Rotate outward'],
        animationType: 'legs'
    },

    // MAIN WORKOUT
    {
        id: 'e1',
        title: 'Push-Ups',
        type: 'exercise',
        sets: 3,
        reps: '12-15',
        rest: 60,
        cues: ['Core tight', 'Chest to floor', 'Elbows at 45 degrees'],
        animationType: 'push'
    },
    {
        id: 'e2',
        title: 'Squats',
        type: 'exercise',
        sets: 3,
        reps: '15-20',
        rest: 60,
        cues: ['Knees out', 'Chest up', 'Weight on heels'],
        animationType: 'legs'
    },
    {
        id: 'e3',
        title: 'Plank Hold',
        type: 'exercise',
        sets: 3,
        duration: 45, // Time based exercise
        rest: 45,
        cues: ['Straight line', 'Squeeze glutes', 'Push floor away'],
        animationType: 'stretch'
    },

    // COOLDOWN
    {
        id: 'c1',
        title: 'Child\'s Pose',
        type: 'cooldown',
        duration: 60,
        cues: ['Reach arms forward', 'Sink hips back'],
        animationType: 'stretch'
    },
    {
        id: 'c2',
        title: 'Deep Breathing',
        type: 'cooldown',
        duration: 60,
        cues: ['Inhale 4s', 'Hold 4s', 'Exhale 4s'],
        animationType: 'cardio'
    }
];
