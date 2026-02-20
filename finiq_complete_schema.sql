-- FINIQ Complete Database Schema
-- Last Updated: 2024-02-21

-- ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. QUESTIONS TABLE
CREATE TYPE question_type AS ENUM ('money_math', 'scenario_mcq', 'true_false', 'daily_challenge', 'term_match');
CREATE TYPE topic_type AS ENUM ('investing', 'personal_finance', 'banking', 'macroeconomics', 'crypto', 'mental_math', 'equity_markets', 'derivatives', 'taxation', 'insurance');

CREATE TABLE public.questions (
    id TEXT PRIMARY KEY,
    type question_type NOT NULL,
    topic topic_type NOT NULL,
    difficulty INTEGER NOT NULL DEFAULT 1,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    options JSONB, -- For MCQ and Math options
    explanation TEXT,
    time_limit INTEGER DEFAULT 15,
    min_rating INTEGER DEFAULT 0,
    is_starter BOOLEAN DEFAULT FALSE,
    event_context TEXT, -- For Daily Challenges
    fun_fact TEXT,      -- For Daily Challenges
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES TABLE
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    avatar TEXT DEFAULT 'fox',
    rating INTEGER DEFAULT 1000,
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    last_play_date DATE,
    total_duels INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    badges TEXT[] DEFAULT '{}',
    interests TEXT[] DEFAULT '{}',
    difficulty INTEGER DEFAULT 1,
    is_pro BOOLEAN DEFAULT FALSE,
    selected_frame TEXT DEFAULT 'none',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DUELS TABLE
CREATE TABLE public.duels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    opponent_id TEXT, -- Can be a BOT name or another player UUID
    mode TEXT DEFAULT 'classical', -- classical, sprint, scenario
    won BOOLEAN NOT NULL,
    player_score INTEGER NOT NULL,
    opponent_score INTEGER NOT NULL,
    rating_change INTEGER DEFAULT 0,
    xp_earned INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DUEL QUESTIONS (Per-question performance)
CREATE TABLE public.duel_questions (
    id BIGSERIAL PRIMARY KEY,
    duel_id UUID REFERENCES public.duels(id) ON DELETE CASCADE,
    question_id TEXT REFERENCES public.questions(id),
    is_correct BOOLEAN NOT NULL,
    time_taken INTEGER, -- in milliseconds
    user_answer TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TOPIC ACCURACY (Radar Map data)
CREATE TABLE public.topic_stats (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    topic topic_type NOT NULL,
    total_answered INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    accuracy FLOAT DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, topic)
);

-- ROW LEVEL SECURITY (RLS)

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duel_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_stats ENABLE ROW LEVEL SECURITY;

-- Questions: Everyone can read
CREATE POLICY "Allow public read access to questions" ON public.questions FOR SELECT USING (true);

-- Profiles: 
-- 1. Users can read all profiles (required for leaderboard/social)
-- 2. Users can only update their own profile
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Duels:
-- Users can only see their own duels
CREATE POLICY "Users can see own duels" ON public.duels FOR SELECT USING (auth.uid() = player_id);
CREATE POLICY "Users can insert own duels" ON public.duels FOR INSERT WITH CHECK (auth.uid() = player_id);

-- Duel Questions:
-- Users can only see/insert their own duel questions
CREATE POLICY "Users can see own duel questions" ON public.duel_questions FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.duels d WHERE d.id = duel_id AND d.player_id = auth.uid()));

CREATE POLICY "Users can insert own duel questions" ON public.duel_questions FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.duels d WHERE d.id = duel_id AND d.player_id = auth.uid()));

-- Topic Stats:
CREATE POLICY "Users can see own topic stats" ON public.topic_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own topic stats" ON public.topic_stats FOR ALL USING (auth.uid() = user_id);

-- FUNCTIONS & TRIGGERS

-- 1. Handle New User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar)
  VALUES (new.id, new.raw_user_meta_data->>'username', COALESCE(new.raw_user_meta_data->>'avatar', 'fox'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Updated At Timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
