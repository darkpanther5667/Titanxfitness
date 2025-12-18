// Feature Enhancement Logic

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: string;
}

export function getTimeBasedGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

export function calculateStreak(activities: any[]): number {
    if (activities.length === 0) return 0;

    const today = new Date().toDateString();
    const hasActivityToday = activities.some(a =>
        new Date(a.timestamp || Date.now()).toDateString() === today
    );

    // Simplified: count unique days with activities
    const uniqueDays = new Set(
        activities.map(a => new Date(a.timestamp || Date.now()).toDateString())
    );

    return uniqueDays.size;
}

export function checkAchievements(stats: {
    workouts: number;
    weight: number;
    calories: number;
    water: number;
    sleep: number;
    streak: number;
}): Achievement[] {
    const achievements: Achievement[] = [
        {
            id: 'first_workout',
            title: 'First Steps',
            description: 'Complete your first workout',
            icon: '🎯',
            unlocked: stats.workouts >= 1
        },
        {
            id: 'week_warrior',
            title: 'Week Warrior',
            description: 'Complete 5 workouts in a week',
            icon: '💪',
            unlocked: stats.workouts >= 5
        },
        {
            id: 'hydration_hero',
            title: 'Hydration Hero',
            description: 'Reach 3L of water in a day',
            icon: '💧',
            unlocked: stats.water >= 3
        },
        {
            id: 'calorie_champion',
            title: 'Calorie Champion',
            description: 'Log 2500+ calories',
            icon: '🔥',
            unlocked: stats.calories >= 2500
        },
        {
            id: 'sleep_master',
            title: 'Sleep Master',
            description: 'Log 8+ hours of sleep',
            icon: '😴',
            unlocked: stats.sleep >= 8
        },
        {
            id: 'streak_3',
            title: '3-Day Streak',
            description: 'Maintain a 3-day activity streak',
            icon: '⚡',
            unlocked: stats.streak >= 3
        },
        {
            id: 'streak_7',
            title: 'Week Dominator',
            description: 'Achieve a 7-day streak',
            icon: '🏆',
            unlocked: stats.streak >= 7
        },
        {
            id: 'titan_status',
            title: 'Titan Status',
            description: 'Complete 20 total workouts',
            icon: '👑',
            unlocked: stats.workouts >= 20
        }
    ];

    return achievements;
}

export const MOTIVATIONAL_QUOTES = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't stop when you're tired. Stop when you're done.",
    "Champions are made when no one is watching.",
    "The difference between try and triumph is a little umph.",
    "Discipline is doing what needs to be done, even if you don't want to.",
    "Your only limit is you.",
    "Sweat is just fat crying."
];

export function getDailyQuote(): string {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
}

export function exportDashboardData(data: any): void {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `titanx-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
