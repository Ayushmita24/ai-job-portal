import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">JobAI 🚀</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-blue-600 font-medium">
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium">
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Find Your Dream Job <br />
          <span className="text-blue-600">Powered by AI 🤖</span>
        </h2>
        <p className="text-gray-500 text-xl mb-10 max-w-xl">
          Upload your resume and get AI-powered job matches instantly.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">
            Get Started Free
          </button>
          <button
            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50">
            Learn More
          </button>
        </div>
      </div>

      <div id="features" className="bg-white py-16 px-8">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose JobAI?</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">

          <div className="bg-blue-50 rounded-2xl p-8 text-center flex-1">
            <div className="text-4xl mb-4">📄</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">AI Resume Analyzer</h4>
            <p className="text-gray-500">Upload your resume and get an instant score with improvement tips.</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 text-center flex-1">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Smart Job Matching</h4>
            <p className="text-gray-500">AI matches your skills to the right jobs by compatibility.</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 text-center flex-1">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">One Click Apply</h4>
            <p className="text-gray-500">Apply to multiple jobs and track applications in one place.</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 text-center flex-1">
            <div className="text-4xl mb-4">📈</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Track Applications</h4>
            <p className="text-gray-500">See all your job applications and their status in one dashboard.</p>
          </div>

        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-6">
        <p className="text-gray-400">© 2026 JobAI — Built by Ayushmita Bhattacharjee</p>
      </footer>

    </div>
  );
}

export default LandingPage;