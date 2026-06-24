import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

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
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>
            {sent ? 'Check your email for a login link.' : 'Enter your email to get a magic link.'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid #E5E7EB', fontSize: 15, outline: 'none',
                marginBottom: 12, boxSizing: 'border-box',
              }}
            />
            {error && (
              <p style={{ fontSize: 13, color: '#EF4444', marginBottom: 10 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px', borderRadius: 10, border: 'none',
                background: '#111827', color: 'white', fontSize: 15, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Sending…' : 'Send magic link'}
            </button>
          </form>
        ) : (
          <div style={{
            background: '#F0FDF4', borderRadius: 10, padding: 16, textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📬</div>
            <p style={{ fontSize: 14, color: '#166534', lineHeight: 1.5 }}>
              Magic link sent to <strong>{email}</strong>.<br />
              Click it to sign in — no password needed.
            </p>
            <button
              onClick={() => { setSent(false); setEmail('') }}
              style={{
                marginTop: 12, background: 'none', border: 'none',
                color: '#6B7280', fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
              }}
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
