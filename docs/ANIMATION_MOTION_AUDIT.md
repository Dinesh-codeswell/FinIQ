# FinIQ Onboarding — Animation & Motion Design Audit

Expert review of onboarding and introduction animations, with fixes applied and recommendations to match top-tier mobile apps (e.g. Duolingo) without compromising performance.

---

## 1. Summary of Issues Found & Fixes Applied

### 1.1 RadarChart (Slide 2 — “Every answer makes you sharper”)

| Issue | Impact | Fix applied |
|-------|--------|-------------|
| **Worklet calling JS function** | Crash: `TypeError: Object is not a function` in `useAnimatedProps` when `getPoint()` ran on UI thread. | Moved `getPoint` to a **worklet** (`'worklet'` directive) so it runs on the UI thread. |
| **Hooks inside `.map()`** | Invalid: `useRef(DOMAINS.map(() => useSharedValue(0)))` violates rules of hooks. | Replaced with 6 explicit `useSharedValue(0)` calls and `useRef([v0..v5]).current`. |

**Result:** RadarChart now animates smoothly without crashing; polygon fill animates from center outward on appear.

---

### 1.2 DuelScene (Slide 1 — “Duel. Compete. Dominate.”)

| Issue | Impact | Fix applied |
|-------|--------|-------------|
| **Raw SharedValues in style** | `{ transform: [{ scale: leftScale }] }` passed as plain object; Reanimated expects style driven by `useAnimatedStyle` for reliable UI-thread updates. | Replaced with `leftScaleStyle`, `rightScaleStyle`, `vsScaleStyle` from `useAnimatedStyle(() => ({ transform: [{ scale: leftScale.value }] }))` (and same for right, VS). |

**Result:** You / VS / Opponent scales now animate reliably on the UI thread with spring; aura pulses unchanged and correct.

---

### 1.3 PrefStep5Commitment (Step 5 of 6 — Time commitment cards)

| Issue | Impact | Fix applied |
|-------|--------|-------------|
| **Hooks inside `.map()`** | `useAnimatedStyle` called inside `COMMITMENT_OPTIONS.map()` → violates rules of hooks, risk of crashes and “Object is not a function”. | Extracted **`CommitmentCard`** component; each card calls `useAnimatedStyle` once at top level. |
| **Misuse of `withSpring`/`withTiming` in worklets** | `withSpring(isSelected ? 1.05 : 1)` inside `useAnimatedStyle` starts new animations every frame instead of driving style from values. | Selection-driven animation moved to **`useEffect`**: update shared values (`scale`, `borderOpacity`, `bgOpacity`) with `withSpring`/`withTiming` when `isSelected` changes; worklet only **reads** `.value`. |
| **Text overlap** | “BLITZ MODE 10 MIN” and “The sweet spot” overlapping on the middle card. | Adjusted layout: `minHeight: 120`, `paddingVertical: 12`, `numberOfLines={1}` on label, `numberOfLines={2}` on subtitle, smaller `tileLabel` font and `paddingHorizontal` on mode text. |

**Result:** No hooks-in-loop; selection animates scale and border/background; copy no longer overlaps.

---

### 1.4 OnboardingProgress (Top progress bars)

| Issue | Impact | Fix applied |
|-------|--------|-------------|
| **No animation** | Segments jumped from 0% to 100% when changing slide. | Introduced **`fillProgress`** shared value and **`ProgressSegmentFill`**; `fillProgress` animated with `withTiming(currentIndex, { duration: 280 })`; each segment uses `useAnimatedStyle` + `interpolate(..., Extrapolation.CLAMP)` to derive width and color. |

**Result:** Progress bars fill smoothly when moving between slides (Duolingo-style).

---

## 2. Animation Inventory & Best Practices Applied

| Screen / Component | What animates | Pattern used | Performance note |
|--------------------|---------------|--------------|------------------|
| **Slide 1 – DuelScene** | Avatar circles scale in (staggered), VS pop, aura pulse (infinite) | `withDelay` + `withSpring`; aura: `withRepeat(withSequence(...))` | Runs on UI thread; no JS during animation. |
| **Slide 2 – RadarChart** | Polygon fill from 0 → values (staggered springs) | `useAnimatedProps` + worklet `getPoint`; shared values per axis | UI-thread only; single SVG polygon. |
| **Slide 2 – ELO bar** | Bar width 0 → 78% | `useSharedValue` + `withDelay` + `withTiming` in `useEffect`; `useAnimatedStyle` for width | Percentage width in style; consider fixed pixel width if layout issues appear. |
| **Slide 3 – Trophy / ELITE** | Badge translateY + glow pulse | `withSpring` for position; `withRepeat(withSequence(...))` for opacity/scale | Standard Reanimated pattern. |
| **Slide 3 – LeaderboardStack** | Cards translateY in (staggered) | `withDelay` + `withSpring`; shared values per card | No layout thrashing. |
| **OnboardingProgress** | Segment fill width | `withTiming` on index; `interpolate` + clamp in worklet | Short, lightweight animation. |
| **OnboardingCTA (NEXT)** | Button scale on press; glint on slide 3 | `withTiming(0.97)` on press in, `withSpring(1)` on press out; glint `withRepeat` | Good feedback; glint only on last slide. |
| **PrefStep5Commitment** | Card scale, border, background on select | Shared values updated in `useEffect` with `withSpring`/`withTiming`; worklet reads values | No withSpring/withTiming inside worklet. |
| **Carousel** | Background color by scroll; content fade/slide on step change | `interpolateColor(scrollX)`; `fadeAnim`/`slideAnim` in `animateTransition` | Uses `runOnJS` for step callback only. |

---

## 3. Recommendations for Duolingo-Level Polish (Without Sacrificing Speed)

1. **Staggered text reveals (Slide 1–3)**  
   “Duel.” / “Compete.” / “Dominate.” and “Rise.” / “Be ranked.” could use `FadeInUp` or `FadeIn` with `.delay()` and `.springify()` per line so copy doesn’t appear all at once.

2. **+15 XP / ELO badges (Slide 1)**  
   Floating “+15 XP” and “1,240 ELO” could use `FadeInUp.delay(...).springify()` or a small scale-in so they feel like rewards.

3. **ELO bar (Slide 2)**  
   Keep current implementation; if you see jank, drive an explicit pixel width (e.g. `segmentWidth * xpWidth.value`) instead of percentage in the worklet.

4. **Reducing re-renders**  
   Carousel `scrollX` is already a shared value; ensure `handleScroll` doesn’t do heavy work. `scrollEventThrottle={16}` is appropriate.

5. **Haptics**  
   Already used on NEXT and commitment cards; consider light haptic on progress segment change (optional).

6. **Reduce infinite animations when off-screen**  
   DuelScene aura and trophy glow use `withRepeat(..., -1)`. When the user leaves the slide, consider canceling or pausing (e.g. track visibility and skip starting repeat when `isVisible` is false); current implementation only starts when `isVisible` is true, so no animation runs on inactive slides.

---

## 4. What Was Not Changed (Verified OK)

- **LeaderboardStack**: `cardStyle(animatedY)` returns `useAnimatedStyle(...)`; each card gets a stable function reference, so hooks are not in a loop.
- **Slide3Glory**: Trophy and glow use shared values and `useAnimatedStyle` correctly.
- **OnboardingCTA**: Scale and glint driven from shared values; no worklet misuse.
- **Parallax on slides**: `interpolate(scrollX.value, ...)` in `useAnimatedStyle` is correct.

---

## 5. Checklist for Future Animation Work

- [ ] **Worklets**: Any function called from `useAnimatedStyle` / `useAnimatedProps` / `useDerivedValue` must be a worklet or inlined (no JS-only functions on UI thread).
- [ ] **Hooks**: Never call `useSharedValue` / `useAnimatedStyle` inside `.map()`, `.filter()`, or conditionals; extract a subcomponent per item if needed.
- [ ] **withSpring / withTiming**: Call these in `useEffect` or event handlers to *start* animations; in worklets only *read* shared values (e.g. `scale.value`), don’t run new animations every frame.
- [ ] **Layout overlap**: Use `numberOfLines`, `minHeight`, and padding for labels + subtitles so text doesn’t overlap on small or varying screens.
- [ ] **Performance**: Prefer UI-thread animation (Reanimated) over JS-driven setState for 60fps; keep worklets small and avoid heavy logic.

This audit and the applied fixes address the crashes, rendering issues, and overlap you saw, and align the motion design with best practices used in animation-heavy consumer apps while keeping latency and speed in mind.
