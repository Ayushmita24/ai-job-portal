import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg,#050d1a 0%,#071428 50%,#091b38 100%)' }}
    >

      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        borderRadius: '50%', top: '-100px', right: '-100px',
        background: 'radial-gradient(circle, rgba(42,111,196,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '50%', bottom: '-80px', left: '-80px',
        background: 'radial-gradient(circle, rgba(126,184,247,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl p-10 relative"
        style={{
          background: 'rgba(180,210,255,0.05)',
          border: '0.5px solid rgba(180,210,255,0.15)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)'
        }}
      >

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(42,111,196,0.2)',
              border: '0.5px solid rgba(126,184,247,0.3)',
              color: '#7eb8f7'
            }}
          >
            ✦ JobAI
          </div>
        </div>

        <h2
          className="text-3xl font-medium text-center mb-2"
          style={{ color: '#e4f0ff' }}
        >
          Welcome Back 👋
        </h2>
        <p className="text-center mb-8 text-sm" style={{ color: 'rgba(184,216,255,0.4)' }}>
          Login to your JobAI account
        </p>

        {/* Error */}
        {error && (
          <div
            className="mb-5 px-4 py-2 rounded-xl text-sm text-center"
            style={{
              background: 'rgba(255,100,100,0.1)',
              border: '0.5px solid rgba(255,100,100,0.3)',
              color: '#ffaaaa'
            }}
          >
            {error}
          </div>
        )}

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: '#c8deff' }}>
            Email
          </label>
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base"
              style={{ color: 'rgba(126,184,247,0.5)' }}
            >
              ✉
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all"
              style={{
                background: 'rgba(180,210,255,0.06)',
                border: '0.5px solid rgba(180,210,255,0.15)',
                color: '#e4f0ff'
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(126,184,247,0.55)';
                e.target.style.background = 'rgba(180,210,255,0.09)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(180,210,255,0.15)';
                e.target.style.background = 'rgba(180,210,255,0.06)';
              }}
            />
          </div>
        </div>

        {/* Password input */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2" style={{ color: '#c8deff' }}>
            Password
          </label>
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base"
              style={{ color: 'rgba(126,184,247,0.5)' }}
            >
              🔒
            </span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all"
              style={{
                background: 'rgba(180,210,255,0.06)',
                border: '0.5px solid rgba(180,210,255,0.15)',
                color: '#e4f0ff'
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(126,184,247,0.55)';
                e.target.style.background = 'rgba(180,210,255,0.09)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(180,210,255,0.15)';
                e.target.style.background = 'rgba(180,210,255,0.06)';
              }}
            />
          </div>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-full font-medium text-sm transition-all disabled:opacity-60"
          style={{
            background: 'linear-gradient(135deg, #1a5fa8 0%, #2a6fc4 50%, #3a85e0 100%)',
            color: '#e8f3ff',
            boxShadow: '0 4px 20px rgba(42,111,196,0.3)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(42,111,196,0.55)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(42,111,196,0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {loading ? 'Logging in...' : 'Login →'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: 'rgba(180,210,255,0.1)' }} />
          <span className="text-xs" style={{ color: 'rgba(184,216,255,0.3)' }}>or</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(180,210,255,0.1)' }} />
        </div>

        <p className="text-center text-sm" style={{ color: 'rgba(184,216,255,0.4)' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="cursor-pointer font-medium transition-colors"
            style={{ color: '#7eb8f7' }}
            onMouseEnter={e => e.target.style.color = '#b8d8ff'}
            onMouseLeave={e => e.target.style.color = '#7eb8f7'}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;