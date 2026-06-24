const sections = [
  {
    icon: "⏱️", title: "Intermittent Fasting Protocol", color: "#3B82F6",
    content: [
      { label: "Phase 1 (Weeks 1–3) · 16:8 · 12–8 PM", text: "Eat between 12 PM and 8 PM. Black coffee, plain tea, and water are fine during the fast. This is the adjustment window — your goal is consistency, not perfection. Missing the window by 30 min occasionally is fine." },
      { label: "Phase 2 (Weeks 4–6) · 16:8 · 11 AM–7 PM", text: "Shift the window one hour earlier. The width stays the same — this isn't more restriction, just a time-shift. Eating earlier in the day takes advantage of better insulin sensitivity in the morning and starts building your circadian rhythm." },
      { label: "Phase 3 (Weeks 7–9) · 16:8 · 10 AM–6 PM", text: "Shift another hour earlier. Your last meal is now 6 PM, giving you a longer overnight fast before waking without compressing your eating window. Improved overnight fat oxidation is a free benefit." },
      { label: "Phase 4 (Weeks 10–12) · 16:8 · 10 AM–6 PM", text: "Hold the Phase 3 window. The goal now is discipline and habit solidification — eating between 10 AM and 6 PM should feel completely natural by this point. Your fat loss acceleration in this phase comes from the workout intensity, not from further restricting the window." },
      { label: "Safety Rule", text: "If dizziness, brain fog, or significant workout degradation occurs — dial back to the previous phase's window. The fasting window is a compliance tool, not a punishment. Your deficit is already doing the heavy lifting." },
    ],
  },
  {
    icon: "🥩", title: "Nutrition Framework", color: "#10B981",
    content: [
      { label: "Calorie Targets", text: "Phase 1: 1,400–1,600 kcal. Phase 2: 1,300–1,500 kcal. Phase 3: 1,250–1,450 kcal. Phase 4: 1,200–1,400 kcal. Combined with the IF window, this creates a large daily deficit targeting 1–2 lbs/week fat loss." },
      { label: "Protein Priority", text: "Target 0.7–1g protein per lb of bodyweight daily. This is the single most important nutrition variable — it preserves lean mass on a calorie deficit. Eggs, Greek yogurt, cottage cheese, chicken, canned fish, and protein shakes are your best tools." },
      { label: "Carb Timing", text: "If your eating window allows, have 30–50g of carbs in the 1–2 hours before a workout. On rest days, lean into vegetables, lean protein, and fats — fewer carbs needed." },
      { label: "What to Cut", text: "Liquid calories (juice, lattes, alcohol, soda) are the most common way people unknowingly kill their deficit. Ultra-processed snacks and refined sugars spike insulin and blunt fat burning. These are the first things to remove." },
      { label: "Sample Day (Phase 1)", text: "12 PM: 3 eggs + 150g Greek yogurt + berries. 6 PM: 150g chicken or fish + large salad + ½ cup rice or sweet potato. Snack if needed: cottage cheese or a protein shake." },
      { label: "Sample Day (Phase 4)", text: "10 AM: Protein shake + 2 boiled eggs to break the fast. 1 PM: 200g lean beef or salmon + roasted vegetables + small portion of starchy carb. 5 PM: Light snack if needed — cottage cheese or Greek yogurt." },
    ],
  },
  {
    icon: "🚲", title: "Spin Bike Protocol", color: "#8B5CF6",
    content: [
      { label: "Zone 2 (Weeks 1–3)", text: "Conversational pace. You should be able to say full sentences without gasping. Heart rate ~60–70% of max. This builds your aerobic base and teaches your body to use fat as fuel." },
      { label: "HIIT Intervals (Phase 2+)", text: "30 seconds all-out sprint at high resistance, followed by 30–60 seconds easy spin. The sprint should feel like a 9/10 effort. If you can speak in sentences during the sprint, increase resistance." },
      { label: "Progression", text: "Add 5 minutes to spin sessions every 2 weeks. Increase sprint count from 10 to 12 to 15 across phases. Raise resistance by one level each phase — the same effort should get harder, not easier." },
      { label: "Fasted Cardio (Phase 3–4)", text: "If your schedule allows, doing Zone 2 spin in the morning before breaking your fast can modestly increase fat oxidation. Keep it to Zone 2 only when fasted — HIIT fasted is tough and raises injury risk." },
    ],
  },
  {
    icon: "💪", title: "Bodyweight Exercise Guide", color: "#F59E0B",
    content: [
      { label: "Push-Up Progressions", text: "Can't do a full push-up yet? Start with knees on mat. Once you can do 3×15 knee push-ups, move to full push-ups. Add difficulty by slowing the lower (3 sec down), adding a pause at the bottom, or doing wide/narrow hand positions. Pike push-ups target the shoulders and are a separate movement." },
      { label: "Squat Progressions", text: "Regular squats → slow squats (3 sec down, 1 sec hold) → sumo squats → jump squats. Reverse lunges are your single-leg work throughout — safer on the knees than forward lunges." },
      { label: "Core Progressions", text: "Sit-ups build anterior core strength. Plank and its progressions (shoulder taps, long-lever plank) build stability. Mountain climbers bridge both and add cardio demand. Sequence: sit-ups → higher volume → bicycle crunches → leg raises → hollow body holds." },
      { label: "Rest Between Sets", text: "Phase 1–2: 60–90 seconds. Phase 3: 45–60 seconds. Phase 4: 30–45 seconds. Shorter rest increases metabolic demand without changing the exercises." },
      { label: "When to Progress", text: "If the last 2 reps of a set feel easy, add reps, slow down the tempo, or move to the harder variation. The program auto-increases volume across phases — trust the progression." },
    ],
  },
  {
    icon: "📊", title: "Tracking & Expectations", color: "#EF4444",
    content: [
      { label: "Weigh-In Protocol", text: "Every Monday morning, immediately after waking and using the bathroom, before eating or drinking. This is your only reliable data point. Day-to-day fluctuations of 1–3 lbs are water, not fat — ignore them." },
      { label: "Expected Timeline", text: "Weeks 1–3: 3–6 lbs (mostly water/glycogen). Weeks 4–6: 1–2 lbs/week fat loss. Weeks 7–9: 1–1.5 lbs/week. Weeks 10–12: 0.75–1.5 lbs/week. Total 12-week potential: 18–28 lbs." },
      { label: "Plateau Protocol", text: "If weight doesn't move for 12+ days: add a 30-min fasted walk on rest days, cut 100 kcal from your target, or add one extra spin session. Never drop below 1,200 kcal/day." },
      { label: "Non-Scale Wins to Track", text: "Push-up count improvements, spin session energy levels, how clothes fit, waist measurement, and sleep quality are all valid signals. The scale is one data point, not the whole story." },
      { label: "After 12 Weeks", text: "Transition to 16:8 maintenance at 1,800–2,000 kcal/day for 3–4 weeks before considering another cut. This prevents metabolic adaptation and consolidates your new weight." },
    ],
  },
]

export default function GuideView() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 60px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Program Guide</h1>
        <p style={{ color: '#6B7280', marginTop: 6, fontSize: 14 }}>
          Everything you need to execute this 12-week spin + bodyweight cut safely.
        </p>
      </div>

      <div style={{ background: '#FEF9C3', border: '1.5px solid #FDE68A', borderRadius: 12, padding: '12px 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: '#92400E', fontWeight: 600, marginBottom: 4 }}>⚠️ Medical Note</div>
        <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.5 }}>
          This is an aggressive program. Consult a doctor before starting if you have cardiovascular conditions, diabetes, a history of disordered eating, or are on medications. Stop and seek advice if you experience chest pain, fainting, or severe dizziness.
        </div>
      </div>

      {sections.map((s, i) => (
        <div key={i} style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {s.icon}
            </div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: s.color }}>{s.title}</h2>
          </div>
          {s.content.map((c, ci) => (
            <div key={ci} style={{ padding: '10px 0', borderTop: ci === 0 ? 'none' : '1px solid #F3F4F6' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                {c.label}
              </div>
              <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{c.text}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
