import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Tips from './pages/Tips';
import Saved from './pages/Saved';
import Emergency from './pages/Emergency';
import Submit from './pages/Submit';
import Situations from './pages/Situations';
import Companions from './pages/Companions';
import Onboarding from './pages/Onboarding';
import MyPage from './pages/MyPage';
import Live from './pages/Live';
import Travel from './pages/Travel';
import './index.css';

const FULLSCREEN_ROUTES = ['/chat'];

function AppShell() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);

  if (isFullscreen) {
    return (
      <div className="w-full min-h-[100dvh] bg-slate-100 dark:bg-black flex justify-center selection:bg-blue-500/30">
        <div className="w-full max-w-md bg-white dark:bg-[#0A0A0E] min-h-[100dvh] shadow-2xl relative overflow-hidden">
          <Routes>
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] bg-slate-100 dark:bg-black flex justify-center selection:bg-blue-500/30">
      <div className="w-full max-w-md bg-white dark:bg-[#0A0A0E] min-h-[100dvh] shadow-2xl relative overflow-x-hidden flex flex-col">
        <Header />
        <main className="flex-1 overflow-x-hidden relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/search" element={<Tips />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/situations" element={<Situations />} />
            <Route path="/companions" element={<Companions />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/live" element={<Live />} />
            <Route path="/travel" element={<Travel />} />
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
