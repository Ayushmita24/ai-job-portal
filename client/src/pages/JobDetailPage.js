import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function JobDetailPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error('Failed to fetch job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const typeColors = {
    'Full-time': { bg: 'rgba(42,111,196,0.15)', color: '#7eb8f7', border: 'rgba(126,184,247,0.3)' },
    'Remote': { bg: 'rgba(50,180,120,0.12)', color: '#6edba8', border: 'rgba(110,219,168,0.3)' },
    'Internship': { bg: 'rgba(180,120,255,0.12)', color: '#c8a0ff', border: 'rgba(200,160,255,0.3)' },
    'Part-time': { bg: 'rgba(255,180,50,0.12)', color: '#ffd080', border: 'rgba(255,208,128,0.3)' },
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(150deg,#050d1a 0%,#071428 50%,#091b38 100%)' }}>
      <p style={{ color: 'rgba(184,216,255,0.4)' }}>Loading job details...</p>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(150deg,#050d1a 0%,#071428 50%,#091b38 100%)' }}>
      <p style={{ color: 'rgba(184,216,255,0.4)' }}>Job not found.</p>
    </div>
  );

  const tc = typeColors[job.type] || typeColors['Full-time'];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg,#050d1a 0%,#071428 50%,#091b38 100%)' }}
    >
      {/* Glow orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', top: '-150px', right: '-100px', background: 'radial-gradient(circle, rgba(42,111,196,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', bottom: '-100px', left: '-100px', background: 'radial-gradient(circle, rgba(126,184,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 relative z-10" style={{ borderBottom: '0.5px solid rgba(180,210,255,0.1)' }}>
        <div
          className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
          style={{ background: 'rgba(42,111,196,0.2)', border: '0.5px solid rgba(126,184,247,0.3)', color: '#7eb8f7' }}
          onClick={() => navigate('/dashboard')}
        >
          ✦ JobAI
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm cursor-pointer transition-colors" style={{ color: 'rgba(184,216,255,0.45)' }}
            onClick={() => navigate('/jobs')}
            onMouseEnter={e => e.target.style.color = '#c8deff'}
            onMouseLeave={e => e.target.style.color = 'rgba(184,216,255,0.45)'}
          >Jobs</span>
          <span className="text-sm cursor-pointer transition-colors" style={{ color: 'rgba(184,216,255,0.45)' }}
            onClick={() => navigate('/dashboard')}
            onMouseEnter={e => e.target.style.color = '#c8deff'}
            onMouseLeave={e => e.target.style.color = 'rgba(184,216,255,0.45)'}
          >Dashboard</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{ border: '0.5px solid rgba(180,210,255,0.2)', color: 'rgba(184,216,255,0.6)', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,100,100,0.4)'; e.currentTarget.style.color = '#ffaaaa'; e.currentTarget.style.background = 'rgba(255,100,100,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(180,210,255,0.2)'; e.currentTarget.style.color = 'rgba(184,216,255,0.6)'; e.currentTarget.style.background = 'transparent' }}
          >Logout</button>
        </div>
      </nav>

      <main className="relative z-10 px-8 py-10 max-w-4xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-sm mb-8 transition-colors"
          style={{ color: 'rgba(184,216,255,0.45)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color = '#7eb8f7'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(184,216,255,0.45)'}
        >
          ← Back to Jobs
        </button>

        {/* Job header card */}
        <div
          className="rounded-2xl p-8 mb-6"
          style={{ background: 'rgba(180,210,255,0.05)', border: '0.5px solid rgba(180,210,255,0.12)' }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-medium flex-shrink-0"
                style={{ background: 'rgba(42,111,196,0.2)', color: '#7eb8f7' }}
              >
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-medium mb-1" style={{ color: '#e4f0ff' }}>{job.title}</h1>
                <p className="text-sm" style={{ color: 'rgba(184,216,255,0.55)' }}>{job.company}</p>
              </div>
            </div>
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: tc.bg, color: tc.color, border: `0.5px solid ${tc.border}` }}
            >
              {job.type}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { icon: '📍', text: job.location },
              { icon: '💼', text: job.experience },
              { icon: '💰', text: job.salary },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-sm" style={{ color: 'rgba(184,216,255,0.5)' }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Apply button */}
          <button
            className="px-8 py-3 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'linear-gradient(135deg, #1a5fa8 0%, #2a6fc4 50%, #3a85e0 100%)',
              color: '#e8f3ff',
              boxShadow: '0 4px 20px rgba(42,111,196,0.3)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(42,111,196,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(42,111,196,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Apply Now →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left — description */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Description */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(180,210,255,0.05)', border: '0.5px solid rgba(180,210,255,0.12)' }}
            >
              <h2 className="text-sm font-medium mb-4" style={{ color: '#c8deff' }}>Job Description</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(184,216,255,0.55)' }}>
                {job.description}
              </p>
            </div>

            {/* AI Match teaser */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(42,111,196,0.08)', border: '0.5px solid rgba(126,184,247,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span>✨</span>
                <h2 className="text-sm font-medium" style={{ color: '#c8deff' }}>AI Match Score</h2>
              </div>
              <p className="text-sm mb-4" style={{ color: 'rgba(184,216,255,0.4)' }}>
                Complete your profile to see how well you match this job and get personalized skill gap analysis.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="text-sm font-medium transition-colors"
                style={{ color: '#7eb8f7', background: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#b8d8ff'}
                onMouseLeave={e => e.currentTarget.style.color = '#7eb8f7'}
              >
                Complete profile →
              </button>
            </div>
          </div>

          {/* Right — skills */}
          <div className="flex flex-col gap-6">
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(180,210,255,0.05)', border: '0.5px solid rgba(180,210,255,0.12)' }}
            >
              <h2 className="text-sm font-medium mb-4" style={{ color: '#c8deff' }}>Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(126,184,247,0.1)', color: '#a8d0ff', border: '0.5px solid rgba(126,184,247,0.2)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Company card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(180,210,255,0.05)', border: '0.5px solid rgba(180,210,255,0.12)' }}
            >
              <h2 className="text-sm font-medium mb-4" style={{ color: '#c8deff' }}>About Company</h2>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium"
                  style={{ background: 'rgba(42,111,196,0.2)', color: '#7eb8f7' }}
                >
                  {job.company.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#c8deff' }}>{job.company}</p>
                  <p className="text-xs" style={{ color: 'rgba(184,216,255,0.35)' }}>{job.location}</p>
                </div>
              </div>
              <p className="text-xs" style={{ color: 'rgba(184,216,255,0.35)' }}>
                {job.type} · {job.experience} experience required
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobDetailPage;