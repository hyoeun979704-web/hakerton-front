import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Tips from './pages/Tips';
import Onboarding from './pages/Onboarding';
import './index.css';

function App() {
  return (
    <Router>
      <div className="w-full min-h-[100dvh] bg-slate-50 dark:bg-black font-sans flex justify-center text-slate-900 dark:text-slate-50 selection:bg-blue-500/30">
        <div className="w-full max-w-md bg-white dark:bg-[#0A0A0E] min-h-[100dvh] shadow-2xl relative overflow-x-hidden flex flex-col pb-20">
          <Header />
          <main className="flex-1 overflow-x-hidden relative mt-16 scroll-smooth">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/mypage" element={<div className="p-8 mt-10">My Page</div>} />
            </Routes>
          </main>
          <Navbar />
        </div>
      </div>
    </Router>
  );
}

export default App;
