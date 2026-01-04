
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import { Activity, BarChart3, Home, Info, BrainCircuit } from 'lucide-react';
import AnalysisOne from './pages/AnalysisOne';
import AnalysisTwo from './pages/AnalysisTwo';
import HomePage from './pages/HomePage';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Azure Analytics
          </span>
        </Link>
        
        <div className="flex items-center gap-1 md:gap-4">
          <NavLink to="/" active={location.pathname === '/'} icon={<Home size={18}/>}>Dashboard</NavLink>
          <NavLink to="/analysis-1" active={location.pathname === '/analysis-1'} icon={<BarChart3 size={18}/>}>Analysis 1</NavLink>
          <NavLink to="/analysis-2" active={location.pathname === '/analysis-2'} icon={<BrainCircuit size={18}/>}>Analysis 2</NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string, active: boolean, children: React.ReactNode, icon: React.ReactNode }> = ({ to, active, children, icon }) => (
  <Link 
    to={to} 
    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
      active ? 'text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="hidden sm:inline font-medium">{children}</span>
    {active && (
      <motion.div 
        layoutId="active-nav"
        className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
      />
    )}
  </Link>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 selection:bg-blue-500/30">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis-1" element={<AnalysisOne />} />
            <Route path="/analysis-2" element={<AnalysisTwo />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="mt-20 border-t border-white/5 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2024 Azure Analytics Pro. Powered by Gemini AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
