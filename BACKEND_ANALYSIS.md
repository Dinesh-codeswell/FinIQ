# FINIQ Backend Analysis Report

This document outlines the findings from Phase 1 of the Supabase Backend Setup. It details the data structures, user actions, game logic, and persistence needs required to transition from a mock/local-first architecture to a production-ready Supabase backend.

## 1. Data Dependency Map

### USER DATA (Table: `profiles`)
Data currently managed in `GameContext.tsx` and persisted in `AsyncStorage`.

| Field | Type | Source / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Supabase Auth UID |
| `username` | `TEXT` | Set during onboarding |
| `avatar` | `TEXT` | Emoji key (e.g., 'fox', 'bull') |
| `rating` | `INTEGER` | ELO score (Starts at 1000) |
| `xp` | `INTEGER` | Cumulative experience points |
| `coins` | `INTEGER` | Virtual currency (currently 0) |
| `streak` | `INTEGER` | Current daily active streak |
| `last_play_date` | `DATE` | Used for streak calculation |
| `total_duels` | `INTEGER` | Total matches played |
| `wins` | `INTEGER` | Total matches won |
| `longest_streak` | `INTEGER` | Best streak record |
| `badges` | `TEXT[]` | Array of earned badge IDs |
| `interests` | `TEXT[]` | Chosen topics (Onboarding) |
| `difficulty` | `INTEGER` | User level (1: Easy, 2: Medium, 3: Hard) |
| `is_pro` | `BOOLEAN` | Subscription status |
| `selected_frame` | `TEXT` | ID of active avatar frame |

### GAME DATA (Table: `duels`, `duel_questions`)
History of matches and performance analytics.

| Table | Columns | Notes |
| :--- | :--- | :--- |
| `duels` | `id, player_id, opponent_id, mode, won, player_score, opponent_score, rating_change, xp_earned, timestamp` | Records match outcome |
| `duel_questions` | `duel_id, question_id, is_correct, time_taken, user_answer` | Granular performance tracking |
| `topic_stats` | `user_id, topic, total_answered, total_correct, accuracy` | Tracks "Finance Brain" radar map |

### QUESTION DATA (Table: `questions`)
The core content engine.

| Field | Type | Notes |
| :--- | :--- | :--- |
| `id` | `TEXT` | Unique ID (e.g., "MM_E_001") |
| `type` | `ENUM` | `money_math`, `scenario_mcq`, `true_false`, `daily_challenge` |
| `topic` | `ENUM` | `investing`, `banking`, `crypto`, etc. |
| `difficulty` | `INTEGER` | 0 (Starter) to 3 (Hard) |
| `question` | `TEXT` | Prompt text |
| `answer` | `TEXT` | Correct answer value |
| `options` | `JSONB` | Array of 4 options (MCQ only) |
| `explanation` | `TEXT` | Post-match learning content |
| `min_rating` | `INTEGER` | Visibility threshold |

## 2. Game Logic Documentation

### ELO Calculation
Located in `constants/divisions.ts`. Uses standard K-factor of 32.
- **Expected Score**: `1 / (1 + 10^((opp_rating - player_rating) / 400))`
- **Rating Change**: `round(32 * (actual - expected))`
- **Floor/Ceiling**: Wins guaranteed +8 to +20; Losses capped at -15.

### Streak Logic
- Calculated on app launch or profile update.
- If `last_play_date` is yesterday: `streak++`.
- If `last_play_date` is before yesterday: `streak = 1`.

### Question Selection
- **Starter Ratio**: New players see 70% Starter (Difficulty 0) questions, phasing down to 0% after 30 duels or 1050 rating.
- **Difficulty Tiers**: Matches questions to `user.difficulty ± 1`.
- **Mode Filters**: 
    - `Sprint`: Money Math & True/False.
    - `Scenario`: Scenario MCQ only.
    - `Classical`: Mixed.

## 3. User Actions & State

| Action | Current State Update | Persistence |
| :--- | :--- | :--- |
| **Onboarding** | `completeOnboarding` | AsyncStorage `finiq_profile` |
| **Finish Duel** | `recordDuelResult` | AsyncStorage `finiq_profile` |
| **Daily Challenge**| `completeDailyChallenge` | AsyncStorage `finiq_profile` |
| **Update Profile** | `updateProfile` | AsyncStorage `finiq_profile` |
| **Radar Updates** | `updateTopicAccuracy` | AsyncStorage `topic_accuracy` |

## 4. Supabase Integration Strategy

1. **Authentication**: Use Supabase Auth with Google/Email providers.
2. **Real-time**: Use Supabase Realtime for matchmaking (Phase 4).
3. **RLS Policies**: 
    - Users can read all `questions`.
    - Users can read/write their own `profiles` and `duels`.
    - Users can read public profiles for leaderboard.
4. **Edge Functions**: (Future) Handle secure ELO calculations to prevent client-side spoofing.
