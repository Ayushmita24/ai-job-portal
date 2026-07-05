import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null; // Don't render until user is loaded

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg,#050d1a 0%,#071428 50%,#091b38 100%)' }}
    >

      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        borderRadius: '50%', top: '-200px', right: '-150px',
        background: 'radial-gradient(circle, rgba(42,111,196,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '50%', bottom: '-100px', left: '-100px',
        background: 'radial-gradient(circle, rgba(126,184,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-8 py-4 relative z-10"
        style={{ borderBottom: '0.5px solid rgba(180,210,255,0.1)' }}
      >
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

        <div className="flex items-center gap-6">
          <span
            className="text-sm cursor-pointer transition-colors"
            style={{ color: 'rgba(184,216,255,0.45)' }}
            onMouseEnter={e => e.target.style.color = '#c8deff'}
            onMouseLeave={e => e.target.style.color = 'rgba(184,216,255,0.45)'}
          >
            Jobs
          </span>
          <span
            className="text-sm cursor-pointer transition-colors"
            style={{ color: 'rgba(184,216,255,0.45)' }}
            onMouseEnter={e => e.target.style.color = '#c8deff'}
            onMouseLeave={e => e.target.style.color = 'rgba(184,216,255,0.45)'}
          >
            Profile
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{
              border: '0.5px solid rgba(180,210,255,0.2)',
              color: 'rgba(184,216,255,0.6)',
              background: 'transparent'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,100,100,0.4)';
              e.currentTarget.style.color = '#ffaaaa';
              e.currentTarget.style.background = 'rgba(255,100,100,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(180,210,255,0.2)';
              e.currentTarget.style.color = 'rgba(184,216,255,0.6)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 px-8 py-12">

        {/* Welcome section */}
        <div className="mb-12">
          <p className="text-sm mb-2" style={{ color: 'rgba(184,216,255,0.4)' }}>
            Good to see you back 👋
          </p>
          <h1 className="text-4xl font-medium mb-3" style={{ color: '#e4f0ff' }}>
            Welcome, <span style={{ color: '#7eb8f7' }}>{user.name}</span>
          </h1>
          <p className="text-sm" style={{ color: 'rgba(184,216,255,0.4)' }}>
            Here's what's happening with your job search today.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Jobs Matched', value: '0', icon: '🎯', color: '#7eb8f7' },
            { label: 'Applications', value: '0', icon: '📋', color: '#a8d0ff' },
            { label: 'Profile Score', value: '--', icon: '⚡', color: '#c8deff' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-all"
              style={{
                background: 'rgba(180,210,255,0.05)',
                border: '0.5px solid rgba(180,210,255,0.12)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(180,210,255,0.09)';
                e.currentTarget.style.borderColor = 'rgba(180,210,255,0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(180,210,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(180,210,255,0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <p className="text-3xl font-medium mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm" style={{ color: 'rgba(184,216,255,0.4)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4" style={{ color: '#c8deff' }}>
            Get started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Browse Jobs', desc: 'Explore AI-matched job listings tailored to your skills.', icon: '🔍', action: 'Browse →' },
              { title: 'Complete your profile', desc: 'Add your skills and experience to get better AI matches.', icon: '👤', action: 'Setup →' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 cursor-pointer transition-all flex items-start gap-4"
                style={{
                  background: 'rgba(42,111,196,0.08)',
                  border: '0.5px solid rgba(126,184,247,0.15)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(42,111,196,0.14)';
                  e.currentTarget.style.borderColor = 'rgba(126,184,247,0.35)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(42,111,196,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(126,184,247,0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="text-xl rounded-xl p-3 flex-shrink-0"
                  style={{ background: 'rgba(126,184,247,0.1)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: '#c8deff' }}>{item.title}</h3>
                  <p className="text-sm mb-3" style={{ color: 'rgba(184,216,255,0.4)' }}>{item.desc}</p>
                  <span className="text-sm font-medium" style={{ color: '#7eb8f7' }}>{item.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account info */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{
            background: 'rgba(180,210,255,0.04)',
            border: '0.5px solid rgba(180,210,255,0.1)'
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
            style={{ background: 'rgba(42,111,196,0.25)', color: '#7eb8f7' }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#c8deff' }}>{user.name}</p>
            <p className="text-xs" style={{ color: 'rgba(184,216,255,0.35)' }}>{user.email} · {user.role}</p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default DashboardPage;