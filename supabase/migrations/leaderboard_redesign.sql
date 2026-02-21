-- ============================================================
-- STEP 1: Add missing columns to profiles table
-- ============================================================
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  tournament_xp INTEGER DEFAULT 0;            -- weekly tournament XP (resets weekly)
  
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  total_xp INTEGER DEFAULT 0;                 -- all-time accumulated XP

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  weekly_rank INTEGER DEFAULT NULL;           -- cached weekly rank (updated by function)

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  global_rank INTEGER DEFAULT NULL;           -- cached global rank by rating

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  rank_change INTEGER DEFAULT 0;              -- delta since last calculation (+3/-2/0)

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  previous_rating INTEGER DEFAULT 1000;       -- rating before last duel (for delta display)

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  win_count INTEGER DEFAULT 0;
  
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  loss_count INTEGER DEFAULT 0;
  
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  current_streak INTEGER DEFAULT 0;
  
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  is_online BOOLEAN DEFAULT FALSE;            -- updated by presence system

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS 
  last_active_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================================
-- STEP 2: Create tournaments table
-- ============================================================
CREATE TABLE IF NOT EXISTS tournaments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,                         -- "Finance Sprint Championship"
  type TEXT NOT NULL,                         -- 'weekly' | 'daily' | 'special'
  division_filter TEXT DEFAULT 'all',         -- 'all' | 'bronze' | 'silver' etc
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  prize_xp INTEGER DEFAULT 500,
  prize_coins INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',               -- 'active' | 'ended' | 'upcoming'
  winner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STEP 3: Create tournament_participants table
-- ============================================================
CREATE TABLE IF NOT EXISTS tournament_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  xp_earned INTEGER DEFAULT 0,               -- XP earned DURING this tournament
  rank INTEGER DEFAULT NULL,                  -- their rank at tournament end
  division TEXT NOT NULL,                     -- division at time of joining
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- ============================================================
-- STEP 4: Create duel_results table (for server-side verification)
-- ============================================================
CREATE TABLE IF NOT EXISTS duel_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player1_id UUID REFERENCES profiles(id),
  player2_id UUID REFERENCES profiles(id),
  winner_id UUID REFERENCES profiles(id),
  player1_score INTEGER NOT NULL,
  player2_score INTEGER NOT NULL,
  player1_rating_before INTEGER NOT NULL,
  player2_rating_before INTEGER NOT NULL,
  player1_rating_after INTEGER NOT NULL,
  player2_rating_after INTEGER NOT NULL,
  player1_xp_earned INTEGER DEFAULT 0,
  player2_xp_earned INTEGER DEFAULT 0,
  duel_mode TEXT NOT NULL,                    -- 'sprint' | 'scenario' | 'classical'
  total_questions INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  verified BOOLEAN DEFAULT FALSE,             -- set to true by Edge Function
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STEP 5: Create leaderboard_history table (for weekly archive)
-- ============================================================
CREATE TABLE IF NOT EXISTS leaderboard_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  final_rank INTEGER NOT NULL,
  final_rating INTEGER NOT NULL,
  tournament_xp INTEGER DEFAULT 0,
  division TEXT NOT NULL,
  promoted BOOLEAN DEFAULT FALSE,
  demoted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STEP 6: Enable Row Level Security
-- ============================================================
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE duel_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_history ENABLE ROW LEVEL SECURITY;

-- Tournaments: everyone can read
CREATE POLICY "tournaments_public_read" ON tournaments 
  FOR SELECT USING (true);

-- Tournament participants: users see all ranks
CREATE POLICY "participants_public_read" ON tournament_participants
  FOR SELECT USING (true);

-- Duel results: users can only insert their own results
-- (Edge Function will handle verification and updates)
CREATE POLICY "duel_results_insert" ON duel_results
  FOR INSERT WITH CHECK (
    auth.uid() = player1_id OR auth.uid() = player2_id
  );
CREATE POLICY "duel_results_select" ON duel_results
  FOR SELECT USING (true);

-- ============================================================
-- STEP 7: Enable Realtime on profiles table
-- ============================================================
-- Ensure realtime is enabled for the tables
-- We use the supabase dashboard for this usually, but SQL works too:
-- Ensure the tables are added to the supabase_realtime publication
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE tournament_participants;

-- ============================================================
-- STEP 8: Create rank calculation function
-- ============================================================
CREATE OR REPLACE FUNCTION update_global_ranks()
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET 
    rank_change = CASE 
      WHEN global_rank IS NULL THEN 0 
      ELSE global_rank - ranked.rank 
    END,
    global_rank = ranked.rank
  FROM (
    SELECT id, RANK() OVER (ORDER BY rating DESC) as rank
    FROM profiles
    WHERE rating > 0
  ) AS ranked
  WHERE profiles.id = ranked.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- STEP 9: Create weekly tournament reset function
-- ============================================================
CREATE OR REPLACE FUNCTION reset_weekly_tournament()
RETURNS void AS $$
DECLARE
  current_tournament_id UUID;
  week_start_date DATE;
  week_end_date DATE;
BEGIN
  week_start_date := date_trunc('week', NOW())::DATE;
  week_end_date := (date_trunc('week', NOW()) + INTERVAL '6 days')::DATE;
  
  -- Archive current leaderboard to history
  INSERT INTO leaderboard_history (
    user_id, week_start, week_end, final_rank, 
    final_rating, tournament_xp, division
  )
  SELECT 
    id,
    week_start_date,
    week_end_date,
    global_rank,
    rating,
    tournament_xp,
    CASE
      WHEN rating >= 2100 THEN 'elite'
      WHEN rating >= 1800 THEN 'diamond'
      WHEN rating >= 1500 THEN 'platinum'
      WHEN rating >= 1200 THEN 'gold'
      WHEN rating >= 1000 THEN 'silver'
      ELSE 'bronze'
    END
  FROM profiles
  WHERE tournament_xp > 0;
  
  -- Reset tournament XP for all users
  UPDATE profiles SET tournament_xp = 0;
  
  -- Close old tournaments
  UPDATE tournaments SET status = 'ended' WHERE status = 'active' AND ends_at <= NOW();
  
  -- Create new tournament
  INSERT INTO tournaments (name, type, starts_at, ends_at, prize_xp)
  VALUES (
    'Finance Sprint Championship',
    'weekly',
    date_trunc('week', NOW()),
    date_trunc('week', NOW()) + INTERVAL '7 days',
    500
  );
  
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
