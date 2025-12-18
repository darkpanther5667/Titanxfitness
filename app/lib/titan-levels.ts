// Titan Level Progression System

export interface TitanLevel {
    level: number;
    title: string;
    xpRequired: number;
    rewards: string[];
    color: string;
}

export const TITAN_LEVELS: TitanLevel[] = [
    { level: 1, title: "Novice", xpRequired: 0, rewards: ["Dashboard Access"], color: "#808080" },
    { level: 2, title: "Apprentice", xpRequired: 100, rewards: ["Basic Trackers"], color: "#a0a0a0" },
    { level: 3, title: "Warrior", xpRequired: 250, rewards: ["AI Coach Unlocked"], color: "#00a8ff" },
    { level: 4, title: "Guardian", xpRequired: 500, rewards: ["Advanced Stats"], color: "#00d9ff" },
    { level: 5, title: "Champion", xpRequired: 1000, rewards: ["Premium Workouts"], color: "#00f0ff" },
    { level: 6, title: "Elite", xpRequired: 2000, rewards: ["Custom Meal Plans"], color: "#ff9d00" },
    { level: 7, title: "Master", xpRequired: 4000, rewards: ["Progress Analytics"], color: "#ffd700" },
    { level: 8, title: "Legend", xpRequired: 7000, rewards: ["Exclusive Badges"], color: "#ff6400" },
    { level: 9, title: "Titan", xpRequired: 12000, rewards: ["Titan Status"], color: "#7000ff" },
    { level: 10, title: "God Mode", xpRequired: 20000, rewards: ["Ultimate Power"], color: "#ff00ff" }
];

export function calculateXP(stats: {
    workouts: number;
    calories: number;
    water: number;
    sleep: number;
    streak: number;
    weight: number;
}): number {
    let xp = 0;

    // Workouts: 50 XP each
    xp += stats.workouts * 50;

    // Calories: 1 XP per 100 calories logged
    xp += Math.floor(stats.calories / 100);

    // Water: 10 XP per liter
    xp += Math.floor(stats.water * 10);

    // Sleep: 20 XP per hour logged
    xp += Math.floor(stats.sleep * 20);

    // Streak bonus: 30 XP per day
    xp += stats.streak * 30;

    // Weight tracking bonus: 5 XP if weight is set
    if (stats.weight > 0) xp += 5;

    return xp;
}

export function getCurrentLevel(xp: number): TitanLevel {
    for (let i = TITAN_LEVELS.length - 1; i >= 0; i--) {
        if (xp >= TITAN_LEVELS[i].xpRequired) {
            return TITAN_LEVELS[i];
        }
    }
    return TITAN_LEVELS[0];
}

export function getNextLevel(currentLevel: number): TitanLevel | null {
    if (currentLevel >= TITAN_LEVELS.length) return null;
    return TITAN_LEVELS[currentLevel];
}

export function getProgressToNextLevel(xp: number): { current: number; required: number; percentage: number } {
    const currentLevel = getCurrentLevel(xp);
    const nextLevel = getNextLevel(currentLevel.level);

    if (!nextLevel) {
        return { current: xp, required: xp, percentage: 100 };
    }

    const xpInCurrentLevel = xp - currentLevel.xpRequired;
    const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;
    const percentage = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

    return {
        current: xpInCurrentLevel,
        required: xpNeededForNext,
        percentage
    };
}
