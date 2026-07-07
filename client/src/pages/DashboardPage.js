import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) { navigate('/login'); return; }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1a] via-[#071428] to-[#091b38]">
      <Navbar active="dashboard" />

      <main className="px-8 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <p className="text-sm text-white/40 mb-1">Good to see you back 👋</p>
          <h1 className="text-3xl font-medium text-white/90">
            Welcome, <span className="text-blue-300">{user.name}</span>
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Jobs Matched', value: '0', icon: '🎯' },
            { label: 'Applications', value: '0', icon: '📋' },
            { label: 'Profile Score', value: '--', icon: '⚡' },
          ].map((stat, i) => (
            <div
              key={i}
              onClick={() => i === 0 && navigate('/jobs')}
              className="rounded-2xl p-6 border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <p className="text-3xl font-medium text-blue-300 mb-1">{stat.value}</p>
              <p className="text-sm text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h2 className="text-base font-medium text-white/70 mb-4">Get started</h2>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { title: 'Browse Jobs', desc: 'Explore AI-matched job listings.', icon: '🔍', action: 'Browse →', path: '/jobs' },
            { title: 'Complete Profile', desc: 'Add skills to get better AI matches.', icon: '👤', action: 'Setup →', path: '/profile' },
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="rounded-2xl p-6 border border-blue-400/10 bg-blue-500/[0.06] hover:bg-blue-500/[0.1] hover:-translate-y-1 transition-all cursor-pointer flex items-start gap-4"
            >
              <div className="text-xl bg-blue-400/10 p-3 rounded-xl">{item.icon}</div>
              <div>
                <h3 className="font-medium text-white/80 mb-1">{item.title}</h3>
                <p className="text-sm text-white/40 mb-2">{item.desc}</p>
                <span className="text-sm text-blue-300">{item.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Account info */}
        <div className="rounded-2xl p-4 border border-white/5 bg-white/[0.02] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-white/70">{user.name}</p>
            <p className="text-xs text-white/30">{user.email} · {user.role}</p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default DashboardPage;