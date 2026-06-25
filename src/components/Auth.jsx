import { useState } from 'react'
import { supabase } from '../lib/supabase'

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  border: '1.5px solid #E5E7EB', fontSize: 15, outline: 'none',
  marginBottom: 12, boxSizing: 'border-box',
}

const primaryBtn = (loading) => ({
  width: '100%', padding: '12px', borderRadius: 10, border: 'none',
  background: '#111827', color: 'white', fontSize: 15, fontWeight: 600,
  cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
})

const linkBtn = {
  background: 'none', border: 'none', color: '#6B7280',
  fontSize: 13, cursor: 'pointer', textDecoration: 'underline', padding: 0,
}

export default function Auth() {
  const [mode, setMode] = useState('password') // 'password' | 'magic'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
    // On success, App's onAuthStateChange picks up the session and re-renders.
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  const switchMode = (next) => {
    setMode(next)
    setError(null)
    setSent(false)
  }

  const subtitle = sent
    ? 'Check your email for a login link.'
    : mode === 'password'
      ? 'Sign in with your email and password.'
      : 'Enter your email to get a one-time magic link.'

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#F8FAFC', padding: 20,
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: 36,
        width: '100%', maxWidth: 380,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, background: '#111827',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 14px',
          }}>🔥</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>12-Week Cut</h1>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>{subtitle}</p>
        </div>

        {sent ? (
          <div style={{ background: '#F0FDF4', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📬</div>
            <p style={{ fontSize: 14, color: '#166534', lineHeight: 1.5 }}>
              Magic link sent to <strong>{email}</strong>.<br />
              Click it to sign in — no password needed.
            </p>
            <button onClick={() => switchMode('password')} style={{ ...linkBtn, marginTop: 12 }}>
              Back to password sign-in
            </button>
          </div>
        ) : mode === 'password' ? (
          <form onSubmit={handlePasswordLogin}>
            <input
              type="email" required placeholder="your@email.com" autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
            />
            <input
              type="password" required placeholder="Password" autoComplete="current-password"
              value={password} onChange={e => setPassword(e.target.value)} style={inputStyle}
            />
            {error && <p style={{ fontSize: 13, color: '#EF4444', marginBottom: 10 }}>{error}</p>}
            <button type="submit" disabled={loading} style={primaryBtn(loading)}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            <p style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
              First time, or no password set yet?<br />
              <button type="button" onClick={() => switchMode('magic')} style={linkBtn}>
                Email me a magic link instead
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleMagicLink}>
            <input
              type="email" required placeholder="your@email.com" autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
            />
            {error && <p style={{ fontSize: 13, color: '#EF4444', marginBottom: 10 }}>{error}</p>}
            <button type="submit" disabled={loading} style={primaryBtn(loading)}>
              {loading ? 'Sending…' : 'Send magic link'}
            </button>
            <p style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 16 }}>
              <button type="button" onClick={() => switchMode('password')} style={linkBtn}>
                Sign in with a password instead
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
