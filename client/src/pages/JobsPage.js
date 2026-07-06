import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    // Protect route
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    // Fetch jobs
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Filter + search logic
  const filtered = jobs.filter(job => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || job.type === filter;
    return matchSearch && matchFilter;
  });

  const typeColors = {
    'Full-time': { bg: 'rgba(42,111,196,0.15)', color: '#7eb8f7', border: 'rgba(126,184,247,0.3)' },
    'Remote': { bg: 'rgba(50,180,120,0.12)', color: '#6edba8', border: 'rgba(110,219,168,0.3)' },
    'Internship': { bg: 'rgba(180,120,255,0.12)', color: '#c8a0ff', border: 'rgba(200,160,255,0.3)' },
    'Part-time': { bg: 'rgba(255,180,50,0.12)', color: '#ffd080', border: 'rgba(255,208,128,0.3)' },
  };

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
          <span className="text-sm font-medium" style={{ color: '#7eb8f7' }}>Jobs</span>
          <span
            className="text-sm cursor-pointer transition-colors"
            style={{ color: 'rgba(184,216,255,0.45)' }}
            onClick={() => navigate('/dashboard')}
            onMouseEnter={e => e.target.style.color = '#c8deff'}
            onMouseLeave={e => e.target.style.color = 'rgba(184,216,255,0.45)'}
          >
            Dashboard
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{ border: '0.5px solid rgba(180,210,255,0.2)', color: 'rgba(184,216,255,0.6)', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,100,100,0.4)'; e.currentTarget.style.color = '#ffaaaa'; e.currentTarget.style.background = 'rgba(255,100,100,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(180,210,255,0.2)'; e.currentTarget.style.color = 'rgba(184,216,255,0.6)'; e.currentTarget.style.background = 'transparent' }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="relative z-10 px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium mb-2" style={{ color: '#e4f0ff' }}>
            Browse <span style={{ color: '#7eb8f7' }}>Jobs</span>
          </h1>
          <p className="text-sm" style={{ color: 'rgba(184,216,255,0.4)' }}>
            {filtered.length} jobs available — find your perfect match
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Search by title, company or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            style={{ background: 'rgba(180,210,255,0.06)', border: '0.5px solid rgba(180,210,255,0.15)', color: '#e4f0ff' }}
            onFocus={e => e.target.style.borderColor = 'rgba(126,184,247,0.55)'}
            onBlur={e => e.target.style.borderColor = 'rgba(180,210,255,0.15)'}
          />
          <div className="flex gap-2">
            {['All', 'Full-time', 'Remote', 'Internship', 'Part-time'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className="px-4 py-2 rounded-full text-xs transition-all"
                style={{
                  background: filter === type ? 'rgba(42,111,196,0.3)' : 'rgba(180,210,255,0.06)',
                  border: filter === type ? '0.5px solid rgba(126,184,247,0.5)' : '0.5px solid rgba(180,210,255,0.15)',
                  color: filter === type ? '#7eb8f7' : 'rgba(184,216,255,0.5)',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20" style={{ color: 'rgba(184,216,255,0.4)' }}>
            Loading jobs...
          </div>
        )}

        {/* No results */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: 'rgba(184,216,255,0.4)' }}>
            No jobs found for "{search}"
          </div>
        )}

        {/* Job cards grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(job => {
              const tc = typeColors[job.type] || typeColors['Full-time'];
              return (
                <div
                  key={job._id}
                  className="rounded-2xl p-6 cursor-pointer transition-all flex flex-col gap-4"
                  style={{ background: 'rgba(180,210,255,0.05)', border: '0.5px solid rgba(180,210,255,0.12)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(180,210,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(180,210,255,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(180,210,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(180,210,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium flex-shrink-0"
                      style={{ background: 'rgba(42,111,196,0.2)', color: '#7eb8f7' }}
                    >
                      {job.company.charAt(0)}
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: tc.bg, color: tc.color, border: `0.5px solid ${tc.border}` }}
                    >
                      {job.type}
                    </span>
                  </div>

                  {/* Job info */}
                  <div>
                    <h3 className="font-medium mb-1" style={{ color: '#e4f0ff' }}>{job.title}</h3>
                    <p className="text-sm mb-1" style={{ color: 'rgba(184,216,255,0.55)' }}>{job.company}</p>
                    <p className="text-xs" style={{ color: 'rgba(184,216,255,0.35)' }}>📍 {job.location} · {job.experience}</p>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(184,216,255,0.4)' }}>
                    {job.description.slice(0, 100)}...
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-lg"
                        style={{ background: 'rgba(126,184,247,0.08)', color: 'rgba(184,216,255,0.6)', border: '0.5px solid rgba(126,184,247,0.15)' }}
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-lg" style={{ color: 'rgba(184,216,255,0.35)' }}>
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '0.5px solid rgba(180,210,255,0.08)' }}>
                    <span className="text-sm font-medium" style={{ color: '#7eb8f7' }}>{job.salary}</span>
                    <span className="text-xs" style={{ color: 'rgba(184,216,255,0.35)' }}>
                      View details →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default JobsPage;