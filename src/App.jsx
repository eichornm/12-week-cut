import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from './lib/supabase'
import { PHASES, WEEK_PHASES, DAY_NAMES, buildProgram } from './lib/program'
import Auth from './components/Auth'
import GuideView from './components/GuideView'

// ─── SUPABASE PERSISTENCE ────────────────────────────────────────────────────

async function loadProgress(userId) {
  const { data, error } = await supabase
    .from('progress')
    .select('state, active_week')
    .eq('user_id', userId)
    .single()
  if (error || !data) return null
  return { program: data.state, activeWeek: data.active_week ?? 0 }
}

async function saveProgress(userId, program, activeWeek) {
  const { error } = await supabase
    .from('progress')
    .upsert({ user_id: userId, state: program, active_week: activeWeek, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' })
  if (error) throw error
}

// ─── SMALL UI COMPONENTS ─────────────────────────────────────────────────────

function ProgressRing({ pct, color, size = 44 }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${circ * pct / 100} ${circ * (1 - pct / 100)}`}
        strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.4s ease' }} />
    </svg>
  )
}

function TaskItem({ task, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid #F3F4F6' }}>
      <div style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
        border: task.done ? 'none' : '2px solid #D1D5DB',
        background: task.done ? '#10B981' : 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
      }}>
        {task.done && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <input type="checkbox" checked={task.done} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ fontSize: 14, color: task.done ? '#9CA3AF' : '#374151', textDecoration: task.done ? 'line-through' : 'none', transition: 'all 0.2s', lineHeight: 1.4 }}>
        {task.label}
      </span>
    </label>
  )
}

function DayCard({ day, weekIndex, dayIndex, phaseColor, onToggle, onNote, onWeight, isSelected, onSelect }) {
  const done = day.tasks.filter(t => t.done).length
  const total = day.tasks.length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div style={{
      border: isSelected ? `2px solid ${phaseColor}` : '2px solid transparent',
      borderRadius: 16, background: 'white', overflow: 'hidden',
      boxShadow: isSelected ? `0 0 0 4px ${phaseColor}22` : '0 1px 4px rgba(0,0,0,0.08)',
      cursor: 'pointer', transition: 'all 0.2s',
    }}>
      <div onClick={onSelect} style={{
        background: isSelected ? phaseColor : '#F9FAFB',
        padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: isSelected ? 'rgba(255,255,255,0.7)' : '#9CA3AF', textTransform: 'uppercase' }}>
            {DAY_NAMES[dayIndex]}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: isSelected ? 'white' : '#111827', marginTop: 1 }}>
            {day.label}
          </div>
        </div>
        <div style={{ position: 'relative', width: 44, height: 44 }}>
          <ProgressRing pct={pct} color={isSelected ? 'white' : phaseColor} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: isSelected ? 'white' : phaseColor }}>
            {pct}%
          </div>
        </div>
      </div>

      {isSelected && (
        <div style={{ padding: '0 16px 16px' }} onClick={e => e.stopPropagation()}>
          <div style={{ marginTop: 12 }}>
            {day.tasks.map((task, ti) => (
              <TaskItem key={task.id} task={task} onChange={() => onToggle(weekIndex, dayIndex, ti)} />
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Weight (lbs/kg)</label>
            <input value={day.weight} onChange={e => onWeight(weekIndex, dayIndex, e.target.value)}
              placeholder="e.g. 195 lbs"
              style={{ width: '100%', marginTop: 4, padding: '6px 10px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginTop: 10 }}>
            <label style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Notes</label>
            <textarea value={day.notes} onChange={e => onNote(weekIndex, dayIndex, e.target.value)}
              placeholder="Energy level, how the workout felt, adjustments…" rows={2}
              style={{ width: '100%', marginTop: 4, padding: '6px 10px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 13, resize: 'vertical', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#9CA3AF' }}>{done}/{total} tasks complete</div>
        </div>
      )}

      {!isSelected && (
        <div style={{ padding: '8px 16px 10px' }}>
          <div style={{ fontSize: 12, color: '#6B7280' }}>{done}/{total} tasks</div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = loading
  const [program, setProgram] = useState(null)
  const [activeWeek, setActiveWeek] = useState(0)
  const [selectedDay, setSelectedDay] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [syncStatus, setSyncStatus] = useState('idle') // idle | saving | saved | error
  const [view, setView] = useState('program')
  const saveTimer = useRef(null)

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  // Load progress when session is ready
  useEffect(() => {
    if (!session) { setDataLoading(false); return }
    setDataLoading(true)
    loadProgress(session.user.id).then(saved => {
      if (saved?.program?.length === 12) {
        setProgram(saved.program)
        setActiveWeek(saved.activeWeek ?? 0)
      } else {
        setProgram(buildProgram())
      }
      setDataLoading(false)
    }).catch(() => {
      setProgram(buildProgram())
      setDataLoading(false)
    })
  }, [session])

  // Debounced save — batches rapid checkbox taps into one write
  const persist = useCallback((prog, week) => {
    setSyncStatus('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      try {
        await saveProgress(session.user.id, prog, week)
        setSyncStatus('saved')
      } catch (e) {
        console.error('Save failed:', e)
        setSyncStatus('error')
      }
    }, 800)
  }, [session])

  const toggleTask = useCallback((wi, di, ti) => {
    setProgram(prev => {
      const next = prev.map((w, wIdx) => wIdx !== wi ? w : {
        ...w, days: w.days.map((d, dIdx) => dIdx !== di ? d : {
          ...d, tasks: d.tasks.map((t, tIdx) => tIdx !== ti ? t : { ...t, done: !t.done }),
        }),
      })
      persist(next, activeWeek)
      return next
    })
  }, [activeWeek, persist])

  const updateNote = useCallback((wi, di, val) => {
    setProgram(prev => {
      const next = prev.map((w, wIdx) => wIdx !== wi ? w : {
        ...w, days: w.days.map((d, dIdx) => dIdx !== di ? d : { ...d, notes: val }),
      })
      persist(next, activeWeek)
      return next
    })
  }, [activeWeek, persist])

  const updateWeight = useCallback((wi, di, val) => {
    setProgram(prev => {
      const next = prev.map((w, wIdx) => wIdx !== wi ? w : {
        ...w, days: w.days.map((d, dIdx) => dIdx !== di ? d : { ...d, weight: val }),
      })
      persist(next, activeWeek)
      return next
    })
  }, [activeWeek, persist])

  const changeWeek = (w) => {
    setActiveWeek(w)
    setSelectedDay(null)
    if (program) persist(program, w)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setProgram(null)
    setActiveWeek(0)
    setSelectedDay(null)
  }

  const resetAll = () => {
    if (window.confirm('Reset ALL 12 weeks of progress? This cannot be undone.')) {
      const fresh = buildProgram()
      setProgram(fresh)
      setActiveWeek(0)
      setSelectedDay(null)
      persist(fresh, 0)
    }
  }

  // ── Render states ────────────────────────────────────────────────────────────

  if (session === undefined || dataLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚲</div>
          <div style={{ color: '#374151', fontWeight: 600, marginBottom: 4 }}>
            {session === undefined ? 'Loading…' : 'Syncing your progress…'}
          </div>
          <div style={{ color: '#9CA3AF', fontSize: 13 }}>
            {session ? `Signed in as ${session.user.email}` : ''}
          </div>
        </div>
      </div>
    )
  }

  if (!session) return <Auth />

  const allTasks = program.flatMap(w => w.days.flatMap(d => d.tasks))
  const totalDone = allTasks.filter(t => t.done).length
  const overallPct = allTasks.length ? Math.round((totalDone / allTasks.length) * 100) : 0

  const currentWeek = program[activeWeek]
  const phase = currentWeek.phase
  const weekTasks = currentWeek.days.flatMap(d => d.tasks)
  const weekDone = weekTasks.filter(t => t.done).length
  const weekPct = weekTasks.length ? Math.round((weekDone / weekTasks.length) * 100) : 0

  const phaseGroups = PHASES.map((p, pi) => ({
    phase: p,
    weekIndices: program.map((_, wi) => wi).filter(wi => WEEK_PHASES[wi] === pi),
  }))

  const syncDot = syncStatus === 'saved' ? '#10B981' : syncStatus === 'saving' ? '#F59E0B' : syncStatus === 'error' ? '#EF4444' : '#D1D5DB'
  const syncLabel = syncStatus === 'saving' ? 'Saving…' : syncStatus === 'saved' ? 'Saved' : syncStatus === 'error' ? 'Save failed' : ''

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh', background: '#F8FAFC', color: '#111827' }}>
      {/* Nav */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 14 }}>🔥</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>12-Week Cut</span>
          {syncLabel && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: syncDot }} />
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{syncLabel}</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['program', 'guide'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
              background: view === v ? '#111827' : 'transparent', color: view === v ? 'white' : '#6B7280', transition: 'all 0.2s',
            }}>{v === 'program' ? 'Tracker' : 'Guide'}</button>
          ))}
          <button onClick={handleSignOut} style={{ padding: '5px 12px', borderRadius: 20, border: '1px solid #E5E7EB', background: 'none', cursor: 'pointer', fontSize: 12, color: '#9CA3AF' }}>
            Sign out
          </button>
        </div>
      </div>

      {view === 'guide' ? <GuideView /> : (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px 16px 60px' }}>

          {/* Overall progress */}
          <div style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Overall Progress</div>
                <div style={{ fontSize: 26, fontWeight: 800, marginTop: 2 }}>{overallPct}%</div>
              </div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>{totalDone} / {allTasks.length} tasks</div>
            </div>
            <div style={{ background: '#F3F4F6', borderRadius: 99, height: 8, overflow: 'hidden' }}>
              <div style={{ width: `${overallPct}%`, height: '100%', background: 'linear-gradient(90deg, #3B82F6, #10B981, #8B5CF6, #EF4444)', borderRadius: 99, transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              {PHASES.map((p, pi) => {
                const pt = program.filter((_, wi) => WEEK_PHASES[wi] === pi).flatMap(w => w.days.flatMap(d => d.tasks))
                const pd = pt.filter(t => t.done).length
                const pp = pt.length ? Math.round((pd / pt.length) * 100) : 0
                return (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 5, background: p.bg, borderRadius: 99, padding: '3px 10px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
                    <span style={{ fontSize: 12, color: p.color, fontWeight: 600 }}>{p.label} {pp}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Phase + week tabs */}
          {phaseGroups.map(({ phase: ph, weekIndices }) => (
            <div key={ph.id} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: ph.color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, paddingLeft: 4 }}>
                {ph.label} · {ph.name} · {ph.weeks}
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, overflowX: 'auto', paddingBottom: 2 }}>
                {weekIndices.map(wi => {
                  const wk = program[wi]
                  const wt = wk.days.flatMap(d => d.tasks)
                  const wd = wt.filter(t => t.done).length
                  const isActive = wi === activeWeek
                  return (
                    <button key={wi} onClick={() => changeWeek(wi)} style={{
                      flexShrink: 0, padding: '7px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                      background: isActive ? ph.color : 'white', color: isActive ? 'white' : '#6B7280',
                      fontWeight: isActive ? 700 : 500, fontSize: 13,
                      boxShadow: isActive ? `0 2px 8px ${ph.color}44` : '0 1px 3px rgba(0,0,0,0.08)',
                      transition: 'all 0.2s',
                    }}>
                      <div>Wk {wi + 1}</div>
                      <div style={{ fontSize: 10, opacity: 0.8 }}>{wd}/{wt.length}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Active week header */}
          <div style={{ borderRadius: 14, padding: '14px 18px', marginBottom: 16, background: phase.bg, border: `1.5px solid ${phase.color}33` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: phase.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Week {activeWeek + 1} · {phase.label} — {phase.name}
                </span>
                <div style={{ fontSize: 13, color: '#4B5563', marginTop: 3 }}>{phase.description}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: phase.color }}>{weekPct}%</div>
                <div style={{ fontSize: 11, color: '#9CA3AF' }}>this week</div>
              </div>
            </div>
          </div>

          {/* Day cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            {currentWeek.days.map((day, di) => (
              <DayCard key={di} day={day} weekIndex={activeWeek} dayIndex={di} phaseColor={phase.color}
                onToggle={toggleTask} onNote={updateNote} onWeight={updateWeight}
                isSelected={selectedDay?.week === activeWeek && selectedDay?.day === di}
                onSelect={() => setSelectedDay(
                  selectedDay?.week === activeWeek && selectedDay?.day === di ? null : { week: activeWeek, day: di }
                )} />
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#D1D5DB' }}>{session.user.email}</span>
            <button onClick={resetAll} style={{ background: 'none', border: '1px solid #FECACA', color: '#EF4444', borderRadius: 8, padding: '5px 14px', fontSize: 12, cursor: 'pointer' }}>
              Reset all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
