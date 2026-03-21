import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Tips from './pages/Tips';
import Onboarding from './pages/Onboarding';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50 relative pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/onboarding" element={<Onboarding />} />
          {/* Placeholder for mypage */}
          <Route path="/mypage" element={<div className="p-8 mt-10">My Page</div>} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
