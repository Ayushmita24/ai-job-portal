import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function JobDetailPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => { setJob(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id, navigate]);

  const typeColors = {
    'Full-time': 'text-blue-300 bg-blue-500/10 border-blue-400/20',
    'Remote':    'text-green-300 bg-green-500/10 border-green-400/20',
    'Internship':'text-purple-300 bg-purple-500/10 border-purple-400/20',
    'Part-time': 'text-yellow-300 bg-yellow-500/10 border-yellow-400/20',
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1a] via-[#071428] to-[#091b38] flex items-center justify-center">
      <p className="text-white/30">Loading...</p>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1a] via-[#071428] to-[#091b38] flex items-center justify-center">
      <p className="text-white/30">Job not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1a] via-[#071428] to-[#091b38]">
      <Navbar active="jobs" />

      <main className="px-8 py-10 max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate('/jobs')}
          className="text-sm text-white/30 hover:text-blue-300 transition-colors mb-8 bg-transparent border-none cursor-pointer"
        >
          ← Back to Jobs
        </button>

        {/* Header card */}
        <div className="rounded-2xl p-8 border border-white/5 bg-white/[0.03] mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-xl font-medium">
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-medium text-white/90 mb-1">{job.title}</h1>
                <p className="text-sm text-white/50">{job.company}</p>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full border ${typeColors[job.type]}`}>
              {job.type}
            </span>
          </div>

          {/* Meta */}
          <div className="flex gap-6 mb-6">
            <span className="text-sm text-white/40">📍 {job.location}</span>
            <span className="text-sm text-white/40">💼 {job.experience}</span>
            <span className="text-sm text-white/40">💰 {job.salary}</span>
          </div>

          <button className="px-8 py-3 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors">
            Apply Now →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Description */}
            <div className="rounded-2xl p-6 border border-white/5 bg-white/[0.03]">
              <h2 className="text-sm font-medium text-white/70 mb-4">Job Description</h2>
              <p className="text-sm text-white/50 leading-relaxed">{job.description}</p>
            </div>

            {/* AI Match teaser */}
            <div className="rounded-2xl p-6 border border-blue-400/10 bg-blue-500/[0.06]">
              <h2 className="text-sm font-medium text-white/70 mb-2">✨ AI Match Score</h2>
              <p className="text-sm text-white/40 mb-3">
                Complete your profile to see how well you match this job.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors bg-transparent border-none cursor-pointer"
              >
                Complete profile →
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">

            {/* Skills */}
            <div className="rounded-2xl p-6 border border-white/5 bg-white/[0.03]">
              <h2 className="text-sm font-medium text-white/70 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-blue-400/[0.08] text-blue-300/80 border border-blue-400/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="rounded-2xl p-6 border border-white/5 bg-white/[0.03]">
              <h2 className="text-sm font-medium text-white/70 mb-4">About Company</h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-sm font-medium">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-white/70">{job.company}</p>
                  <p className="text-xs text-white/30">{job.location}</p>
                </div>
              </div>
              <p className="text-xs text-white/30">{job.type} · {job.experience} required</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobDetailPage;