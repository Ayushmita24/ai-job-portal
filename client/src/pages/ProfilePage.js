import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProfilePage() {
  const [form, setForm] = useState({
    bio: '',
    skills: '',
    experience: '',
    education: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }

      setSuccess('Profile saved successfully!');
      setLoading(false);
    } catch (err) {
      setError('Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1a] via-[#071428] to-[#091b38]">
      <Navbar active="profile" />

      <main className="px-8 py-10 max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white/90 mb-1">
            Your <span className="text-blue-300">Profile</span>
          </h1>
          <p className="text-sm text-white/40">Add your details to get better AI job matches.</p>
        </div>

        <div className="rounded-2xl p-8 border border-white/5 bg-white/[0.03] flex flex-col gap-5">

          {success && <p className="text-sm text-green-300 bg-green-500/10 border border-green-400/20 px-4 py-2 rounded-xl">{success}</p>}
          {error && <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/20 px-4 py-2 rounded-xl">{error}</p>}

          {/* Bio */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell us a little about yourself..."
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-white/80 outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20 resize-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Skills <span className="text-white/25">(comma separated)</span></label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React.js, Node.js, Python, MongoDB"
              className="w-full rounded-xl px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-white/80 outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Experience</label>
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="e.g. 2 years of full-stack development"
              className="w-full rounded-xl px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-white/80 outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Education</label>
            <input
              name="education"
              value={form.education}
              onChange={handleChange}
              placeholder="e.g. MCA, Kalyani University"
              className="w-full rounded-xl px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-white/80 outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Kolkata, West Bengal"
              className="w-full rounded-xl px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-white/80 outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/20"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>

        </div>
      </main>
    </div>
  );
}

export default ProfilePage;