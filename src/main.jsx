import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Catches render-time crashes so the user sees a readable message instead of a
// blank white page (and the error is logged for debugging).
class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { console.error('App crashed:', error, info) }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 16, lineHeight: 1.5 }}>
              The app hit an unexpected error. Try reloading — if it keeps happening, this message has the details.
            </p>
            <pre style={{ fontSize: 12, color: '#EF4444', background: '#FEF2F2', borderRadius: 8, padding: 12, textAlign: 'left', whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
              {String(this.state.error?.message || this.state.error)}
            </pre>
            <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: '10px 20px', borderRadius: 10, border: 'none', background: '#111827', color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
