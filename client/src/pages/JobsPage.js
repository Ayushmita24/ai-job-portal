import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => { setJobs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  const filtered = jobs.filter(job => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || job.type === filter;
    return matchSearch && matchFilter;
  });

  const typeColors = {
    'Full-time': 'text-blue-300 bg-blue-500/10 border-blue-400/20',
    'Remote':    'text-green-300 bg-green-500/10 border-green-400/20',
    'Internship':'text-purple-300 bg-purple-500/10 border-purple-400/20',
    'Part-time': 'text-yellow-300 bg-yellow-500/10 border-yellow-400/20',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1a] via-[#071428] to-[#091b38]">
      <Navbar active="jobs" />

      <main className="px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white/90 mb-1">
            Browse <span className="text-blue-300">Jobs</span>
          </h1>
          <p className="text-sm text-white/40">{filtered.length} jobs available</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Search by title, company or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-white/80 outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
          />
          <div className="flex gap-2">
            {['All', 'Full-time', 'Remote', 'Internship', 'Part-time'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                  filter === type
                    ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                    : 'bg-white/[0.03] border-white/10 text-white/40 hover:text-white/60'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {loading && <p className="text-center text-white/30 py-20">Loading jobs...</p>}
        {!loading && filtered.length === 0 && <p className="text-center text-white/30 py-20">No jobs found.</p>}

        {/* Job cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(job => (
              <div
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="rounded-2xl p-6 border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer flex flex-col gap-4"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-sm font-medium">
                    {job.company.charAt(0)}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border ${typeColors[job.type]}`}>
                    {job.type}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-medium text-white/90 mb-1">{job.title}</h3>
                  <p className="text-sm text-white/50 mb-1">{job.company}</p>
                  <p className="text-xs text-white/30">📍 {job.location} · {job.experience}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-white/30 leading-relaxed">
                  {job.description.slice(0, 100)}...
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-lg bg-blue-400/[0.08] text-blue-300/70 border border-blue-400/10">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-xs text-white/25">+{job.skills.length - 3} more</span>
                  )}
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                  <span className="text-sm font-medium text-blue-300">{job.salary}</span>
                  <span className="text-xs text-white/25">View details →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default JobsPage;