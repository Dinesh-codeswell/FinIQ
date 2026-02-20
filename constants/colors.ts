export default {
  // 3-Tier Color System
  accent: '#00D68F',        // Primary Accent (Green) - Wins, active, CTAs
  accentDim: 'rgba(0, 214, 143, 0.15)',
  accentMuted: 'rgba(0, 214, 143, 0.4)',

  energy: '#F5A623',        // Energy Accent (Amber) - Streak ONLY
  energyDim: 'rgba(245, 166, 35, 0.15)',

  alert: '#FF4757',         // Alert (Red) - Losses, warnings
  alertDim: 'rgba(255, 71, 87, 0.15)',

  // Backgrounds & Surfaces
  background: '#0A0A0A',    // True near-black
  surface: '#141414',       // Surface L1 - Cards on background
  cardElevated: '#1E1E1E',  // Surface L2 - Elevated cards
  modal: '#282828',         // Surface L3 - Modals, pills

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9A9A9A',
  textTertiary: '#5A5A5A',

  // Borders
  border: '#242424',
  borderHighlight: '#3A3A3A',

  // Legacy/Specific (Mapped to new system where possible or kept for specific mode identity)
  xpGold: '#F5A623',        // Kept for backward compat, maps to energy
  xpGoldDim: 'rgba(245, 166, 35, 0.15)',
  loss: '#FF4757',
  lossDim: 'rgba(255, 71, 87, 0.15)',

  // Mode specific tints
  sprintTint: '#0D1A12',
  scenarioTint: '#161616',
  memoryTint: '#0D1618',
  classicalTint: '#1A1500',

  scenarioAccent: '#4A90D9', // Kept for mode identity
  memoryAccent: '#00B4CC',   // Kept for mode identity

  // Backward Compatibility (Mapped to new system)
  cardBackground: '#1A1A1A', // Mapped to old value for now, equivalent to surface
  scenarioBlue: '#4A90D9',   // Alias for scenarioAccent
  classicalGold: '#F5A623',  // Alias for energy
};
