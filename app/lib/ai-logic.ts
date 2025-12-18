export type EnergyLevel = 'low' | 'mid' | 'high';
export type SleepQuality = 'bad' | 'ok' | 'good';
export type TimeAvailable = 5 | 10 | 20 | 30 | 45 | 60;

export interface DailyContext {
    energy: EnergyLevel;
    sleep: SleepQuality;
    timeAvailable: TimeAvailable;
    yesterdayWorkout: boolean;
    streak: number;
}

export const AI_MESSAGES = {
    // Scenario: Low Energy / Bad Sleep
    RECOVERY: [
        "Today isn't for pushing. Just move.",
        "You didn't fail. You paused. Light mobility today.",
        "Grind is strictly prohibited today. Focus on recovery.",
        "Sleep is the best pre-workout. Get some rest, Titan.",
        "Even Titans need to recharge. 5 mins of stretching, that's it."
    ],

    // Scenario: High Energy / Good Sleep
    BEAST_MODE: [
        "Energy is high? Destroy the limits.",
        "The iron is calling. Don't let it go to voicemail.",
        "Perfect conditions to hit a PR today.",
        "You're fully charged. Spend that energy wisely: Heavy Lifting.",
        "No excuses today. Only domination."
    ],

    // Scenario: Short on Time (< 20 mins)
    QUICK_HIT: [
        "15 minutes is enough to shock the muscles.",
        "Efficiency is key. HIIT session incoming.",
        "Don't skip. Just compress. 10 mins hard work.",
        "Something is infinitely better than nothing.",
        "Speed run mode: Activated."
    ],

    // Scenario: Streak Broken (Yesterday = false)
    COMEBACK: [
        "Consistency beats intensity. Just show up.",
        "One day off is rest. Two days is a slippery slope. Get back.",
        "The comeback is always stronger than the setback.",
        "Don't break the chain twice.",
        "Dust yourself off. We go again."
    ],

    // Scenario: Streak High (> 5 days)
    ON_FIRE: [
        "You're becoming dangerous. Keep this up.",
        "Momentum is your superpower right now.",
        "This is how legends are forged. Another day, another win.",
        "You're lapping everyone on the couch.",
        "Stat boost: Discipline +10."
    ]
};

export function getAIResponse(context: DailyContext): { message: string, suggestion: string } {
    const { energy, sleep, timeAvailable, yesterdayWorkout, streak } = context;

    // 1. Recovery Priority (Bad Sleep or Low Energy)
    if (sleep === 'bad' || energy === 'low') {
        const msgIndex = Math.floor(Math.random() * AI_MESSAGES.RECOVERY.length);
        let task = "10 min Mobility Flow";
        if (timeAvailable < 10) task = "5 min Decompression Breathing";

        return {
            message: AI_MESSAGES.RECOVERY[msgIndex],
            suggestion: task
        };
    }

    // 2. Time Constraint Priority
    if (timeAvailable <= 20) {
        const msgIndex = Math.floor(Math.random() * AI_MESSAGES.QUICK_HIT.length);
        return {
            message: AI_MESSAGES.QUICK_HIT[msgIndex],
            suggestion: `${timeAvailable} min HIIT Blast`
        };
    }

    // 3. Comeback (Skipped Yesterday)
    if (!yesterdayWorkout) {
        const msgIndex = Math.floor(Math.random() * AI_MESSAGES.COMEBACK.length);
        return {
            message: AI_MESSAGES.COMEBACK[msgIndex],
            suggestion: "Full Body Wake-Up Circuit"
        };
    }

    // 4. Default: Beast Mode (Good/Mid Energy + Enough Time)
    const msgIndex = Math.floor(Math.random() * AI_MESSAGES.BEAST_MODE.length);
    let workout = "Heavy Compound Lifts";
    if (streak > 5) {
        const streakIndex = Math.floor(Math.random() * AI_MESSAGES.ON_FIRE.length);
        return {
            message: AI_MESSAGES.ON_FIRE[streakIndex],
            suggestion: "Attempt a PR (Safety First)"
        };
    }

    return {
        message: AI_MESSAGES.BEAST_MODE[msgIndex],
        suggestion: workout
    };
}
