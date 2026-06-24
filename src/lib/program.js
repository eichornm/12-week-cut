// ─── PHASES ──────────────────────────────────────────────────────────────────

export const PHASES = [
  {
    id: "phase1", label: "Phase 1", name: "Foundation", weeks: "Weeks 1–3",
    color: "#3B82F6", bg: "#EFF6FF",
    description: "16:8 fasting (12–8 PM). Build the habit: Zone 2 spin, intro bodyweight moves.",
  },
  {
    id: "phase2", label: "Phase 2", name: "Build", weeks: "Weeks 4–6",
    color: "#10B981", bg: "#F0FDF4",
    description: "16:8 fasting, window shifts earlier (11 AM–7 PM). HIIT intervals begin, bodyweight volume increases.",
  },
  {
    id: "phase3", label: "Phase 3", name: "Acceleration", weeks: "Weeks 7–9",
    color: "#8B5CF6", bg: "#F5F3FF",
    description: "16:8 fasting, window shifts earlier (10 AM–6 PM). Longer spin blocks, harder bodyweight circuits.",
  },
  {
    id: "phase4", label: "Phase 4", name: "Peak Burn", weeks: "Weeks 10–12",
    color: "#EF4444", bg: "#FEF2F2",
    description: "16:8 fasting, window held early (10 AM–6 PM). Max-intensity HIIT, advanced bodyweight progressions.",
  },
]

export const WEEK_PHASES = [0,0,0, 1,1,1, 2,2,2, 3,3,3]

export const DAY_NAMES = ["Tue","Wed","Thu","Fri","Sat","Sun","Mon"]

// ─── DAY TEMPLATES ───────────────────────────────────────────────────────────

export const DAY_TEMPLATES = {
  phase1: {
    A: {
      label: "Spin + Upper Body",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 12 PM – 8 PM" },
        { id: "water",   label: "Drink 2.5 L water throughout the day" },
        { id: "spin",    label: "Spin bike – 20 min Zone 2 (conversational pace, moderate resistance)" },
        { id: "pu",      label: "Push-ups 3×8 (knee push-ups if needed)" },
        { id: "yd",      label: "Pike push-ups (shoulder focus) 3×8" },
        { id: "sit",     label: "Sit-ups 3×10" },
        { id: "stretch", label: "5 min upper-body stretch on yoga mat" },
        { id: "log",     label: "Log food (target: 1,400–1,600 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    B: {
      label: "Spin + Lower Body",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 12 PM – 8 PM" },
        { id: "water",   label: "Drink 2.5 L water" },
        { id: "spin",    label: "Spin bike – 20 min Zone 2" },
        { id: "sq",      label: "Bodyweight squats 3×15" },
        { id: "lunge",   label: "Reverse lunges 3×10 per leg" },
        { id: "gb",      label: "Glute bridges 3×20" },
        { id: "cr",      label: "Calf raises 3×20" },
        { id: "stretch", label: "10 min lower-body stretch / yoga on mat" },
        { id: "log",     label: "Log food (target: 1,400–1,600 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    C: {
      label: "Core + Active Recovery",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 12 PM – 8 PM" },
        { id: "water",   label: "Drink 2.5 L water" },
        { id: "walk",    label: "20–30 min brisk walk" },
        { id: "plank",   label: "Plank 3×20 sec" },
        { id: "db",      label: "Dead bugs 3×8 per side" },
        { id: "yoga",    label: "10 min yoga / mobility on mat" },
        { id: "log",     label: "Log food (target: 1,400–1,600 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    R: {
      label: "Rest Day",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 12 PM – 8 PM" },
        { id: "water",   label: "Drink 2.5 L water" },
        { id: "meal",    label: "Meal prep / plan food for next 3 days" },
        { id: "log",     label: "Log food (target: 1,400–1,600 kcal)" },
        { id: "weigh",   label: "Weigh in (morning, before eating)" },
        { id: "reflect", label: "Review last week – what worked, what to adjust" },
      ],
    },
  },

  phase2: {
    A: {
      label: "Spin HIIT + Push",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 11 AM – 7 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "spin",    label: "Spin bike – 30 min: 5 min warm-up, 10×30s sprint / 45s easy, 5 min cool-down" },
        { id: "pu",      label: "Push-ups 3×12 (full if possible, elevate hands to scale)" },
        { id: "sit",     label: "Sit-ups 3×12" },
        { id: "pike",    label: "Pike push-ups 3×10" },
        { id: "core",    label: "Plank 3×30 sec" },
        { id: "stretch", label: "5 min stretch" },
        { id: "log",     label: "Log food (target: 1,300–1,500 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    B: {
      label: "Lower Body Circuit",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 11 AM – 7 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "sq",      label: "Bodyweight squats 4×20" },
        { id: "lunge",   label: "Walking lunges 3×12 per leg" },
        { id: "sls",     label: "Single-leg glute bridges 3×12 per side" },
        { id: "sumo",    label: "Sumo squats 3×15 (slow, 3 sec down)" },
        { id: "cr",      label: "Calf raises 3×25" },
        { id: "core",    label: "Mountain climbers 3×20 reps" },
        { id: "stretch", label: "10 min yoga cool-down" },
        { id: "log",     label: "Log food (target: 1,300–1,500 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    C: {
      label: "Full Body Bodyweight",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 11 AM – 7 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "circ",    label: "3 rounds: 15 squats → 10 push-ups → 20 mountain climbers → 10 reverse lunges/leg → 30s rest" },
        { id: "spin",    label: "Spin bike – 15 min Zone 2 finish" },
        { id: "core",    label: "Dead bugs 3×10 per side" },
        { id: "stretch", label: "5 min stretch" },
        { id: "log",     label: "Log food (target: 1,300–1,500 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    R: {
      label: "Active Rest",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 11 AM – 7 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "walk",    label: "30 min easy walk" },
        { id: "yoga",    label: "15 min yoga / stretch on mat" },
        { id: "log",     label: "Log food (target: 1,300–1,500 kcal)" },
        { id: "weigh",   label: "Weigh in (morning, before eating)" },
      ],
    },
  },

  phase3: {
    A: {
      label: "Spin HIIT + Upper",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "spin",    label: "Spin bike – 35 min: 5 warm-up, 12×30s all-out / 30s easy, 5 cool-down, remainder Zone 2" },
        { id: "pu",      label: "Push-ups 4×15 (add a pause at bottom for difficulty)" },
        { id: "sit",     label: "Sit-ups 4×15" },
        { id: "pike",    label: "Pike push-ups 3×12" },
        { id: "plank",   label: "Plank 3×45 sec" },
        { id: "stretch", label: "5 min stretch" },
        { id: "log",     label: "Log food (target: 1,250–1,450 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    B: {
      label: "Lower + Core Blast",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "jump",    label: "Jump squats 4×12 (low impact option: fast squats)" },
        { id: "lunge",   label: "Reverse lunges 4×12 per leg" },
        { id: "sls",     label: "Single-leg glute bridges 4×15 per side" },
        { id: "sit",     label: "Sit-ups 3×15" },
        { id: "core1",   label: "Bicycle crunches 3×20" },
        { id: "core2",   label: "Leg raises 3×12" },
        { id: "stretch", label: "10 min yoga cool-down" },
        { id: "log",     label: "Log food (target: 1,250–1,450 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    C: {
      label: "Metabolic Circuit",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "circ",    label: "4 rounds: 20 squats → 12 push-ups → 15 mountain climbers/side → 12 sit-ups → 12 reverse lunges/leg → 45s rest" },
        { id: "spin",    label: "Spin bike – 20 min: alternating 2 min hard / 1 min easy" },
        { id: "stretch", label: "5 min stretch" },
        { id: "log",     label: "Log food (target: 1,250–1,450 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    R: {
      label: "Active Rest",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3 L water" },
        { id: "walk",    label: "35 min brisk walk" },
        { id: "yoga",    label: "20 min yoga / deep stretch on mat" },
        { id: "log",     label: "Log food (target: 1,250–1,450 kcal)" },
        { id: "weigh",   label: "Weigh in (morning, before eating)" },
        { id: "photo",   label: "Optional: progress photo (same time, same pose)" },
      ],
    },
  },

  phase4: {
    A: {
      label: "Spin HIIT + Push Strength",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3–3.5 L water" },
        { id: "spin",    label: "Spin bike – 40 min: 5 warm-up, 10×1 min all-out / 1 min easy, 5 cool-down, remainder Zone 2" },
        { id: "pu",      label: "Push-ups 4×max (aim for 15+)" },
        { id: "sit",     label: "Sit-ups 4×20" },
        { id: "pike",    label: "Pike push-ups 4×12" },
        { id: "plank",   label: "Plank 3×60 sec" },
        { id: "stretch", label: "5 min stretch" },
        { id: "log",     label: "Log food (target: 1,200–1,400 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    B: {
      label: "Lower Body + Core",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3–3.5 L water" },
        { id: "jump",    label: "Jump squats 4×15 (or rapid bodyweight squats)" },
        { id: "sls",     label: "Single-leg glute bridges 4×15 per side" },
        { id: "lunge",   label: "Reverse lunges 4×12 per leg" },
        { id: "sit",     label: "Sit-ups 4×20" },
        { id: "core1",   label: "Hollow body hold 3×30 sec" },
        { id: "core2",   label: "Bicycle crunches 3×25" },
        { id: "core3",   label: "Leg raises 3×15" },
        { id: "stretch", label: "10 min yoga cool-down" },
        { id: "log",     label: "Log food (target: 1,200–1,400 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    C: {
      label: "Peak Metabolic Circuit",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3–3.5 L water" },
        { id: "circ",    label: "5 rounds: 20 jump squats → 15 push-ups → 20 mountain climbers/side → 15 sit-ups → 12 reverse lunges/leg → 60s rest" },
        { id: "spin",    label: "Spin bike – 20 min: 5 on / 2 off repeats (high resistance sprints)" },
        { id: "stretch", label: "5 min stretch" },
        { id: "log",     label: "Log food (target: 1,200–1,400 kcal)" },
        { id: "sleep",   label: "7–8 hrs sleep" },
      ],
    },
    R: {
      label: "Active Rest",
      tasks: [
        { id: "fast",    label: "16:8 fast – eat only between 10 AM – 6 PM" },
        { id: "water",   label: "Drink 3–3.5 L water" },
        { id: "walk",    label: "40 min brisk walk (fasted walk = bonus fat burn)" },
        { id: "yoga",    label: "20 min yoga / deep stretch on mat" },
        { id: "log",     label: "Log food (target: 1,200–1,400 kcal)" },
        { id: "weigh",   label: "Weigh in (morning, before eating)" },
        { id: "photo",   label: "Optional: progress photo" },
        { id: "reflect", label: "Review last 3 weeks – note strength / endurance gains" },
      ],
    },
  },
}

// ─── WEEK SCHEDULE ────────────────────────────────────────────────────────────

export const WEEK_SCHEDULES = [
  ["A","B","C","R","A","B","R"],
  ["A","B","C","R","A","B","R"],
  ["A","B","C","R","A","C","R"],
  ["A","B","C","R","A","C","R"],
  ["A","B","C","R","A","B","R"],
  ["A","B","C","A","B","C","R"],
  ["A","B","C","A","B","C","R"],
  ["A","B","C","A","B","C","R"],
  ["A","B","C","A","C","B","R"],
  ["A","B","C","A","B","C","R"],
  ["A","B","C","A","B","C","R"],
  ["A","B","C","A","B","C","R"],
]

// ─── BUILD FRESH PROGRAM ──────────────────────────────────────────────────────

export function buildProgram() {
  return Array.from({ length: 12 }, (_, w) => {
    const phase = PHASES[WEEK_PHASES[w]]
    return {
      weekIndex: w,
      phase,
      days: WEEK_SCHEDULES[w].map((dayType, d) => {
        const tmpl = DAY_TEMPLATES[phase.id][dayType]
        return {
          dayIndex: d,
          dayType,
          label: tmpl.label,
          tasks: tmpl.tasks.map(t => ({ ...t, done: false })),
          notes: "",
          weight: "",
        }
      }),
    }
  })
}
