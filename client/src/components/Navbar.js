import { useNavigate } from 'react-router-dom';

function Navbar({ active }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-white/5">
      <span onClick={() => navigate('/dashboard')} className="text-sm text-blue-300 border border-blue-400/30 bg-blue-500/10 px-4 py-2 rounded-full cursor-pointer">
        ✦ JobAI
      </span>
      <div className="flex items-center gap-6">
        <span onClick={() => navigate('/jobs')} className={`text-sm cursor-pointer ${active === 'jobs' ? 'text-blue-300' : 'text-white/40 hover:text-white/70'}`}>
          Jobs
        </span>
        <span onClick={() => navigate('/profile')} className={`text-sm cursor-pointer ${active === 'profile' ? 'text-blue-300' : 'text-white/40 hover:text-white/70'}`}>
          Profile
        </span>
        <button onClick={logout} className="text-sm text-white/50 border border-white/10 px-4 py-2 rounded-full hover:text-red-300 hover:border-red-400/30 transition-colors">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;