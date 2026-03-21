import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Tips from './pages/Tips';
import Onboarding from './pages/Onboarding';
import MyPage from './pages/MyPage';
import './index.css';

function AppShell() {
  return (
    <div className="w-full min-h-[100dvh] bg-slate-100 dark:bg-black flex justify-center selection:bg-blue-500/30">
      <div className="w-full max-w-md bg-white dark:bg-[#0A0A0E] min-h-[100dvh] shadow-2xl relative overflow-x-hidden flex flex-col">
        <Header />
        <main className="flex-1 overflow-x-hidden relative mt-14 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppShell />
      </Router>
    </AppProvider>
  );
}

export default App;
