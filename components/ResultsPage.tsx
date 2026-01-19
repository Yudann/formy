import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { 
  BarChart3, LayoutDashboard, TrendingUp, ChevronLeft, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultData } from '../types';

// Components
import HeroSummary from './results/HeroSummary';
import PlatformDistribution from './results/PlatformDistribution';
import DoomProfileRadar from './results/DoomProfileRadar';
import DurationChart from './results/DurationChart';
import RespondentTable from './results/RespondentTable';
import Glossary from './results/Glossary';

interface ResultsPageProps {
  onBack: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ onBack }) => {
  const [data, setData] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'analysis' | 'raw' | 'glossary'>('analysis');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data: responses, error } = await supabase
        .from('responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(responses || []);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-[4px] border-indigo-500 border-t-transparent rounded-full shadow-lg shadow-indigo-500/20"
        />
        <p className="font-bold tracking-widest text-xs uppercase animate-pulse">Sinkronisasi Database...</p>
      </div>
    );
  }

  const navItems = [
    { id: 'analysis', label: 'Analisis Insight', icon: <TrendingUp size={24} /> },
    { id: 'raw', label: 'Data Responden', icon: <LayoutDashboard size={24} /> },
    { id: 'glossary', label: 'Glosarium & Info', icon: <BookOpen size={24} /> },
  ];

  return (
    <div className="flex-1 w-full bg-transparent relative">
      {/* Ultra-Modern Transparent Header */}
      <nav className="px-8 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between bg-white/5 dark:bg-slate-900/5 backdrop-blur-xl sticky top-0 z-40 border-b border-white/10 gap-6">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack} 
            className="p-3 rounded-2xl bg-white/10 dark:bg-slate-800/20 backdrop-blur-md border border-white/20 text-slate-400 hover:text-white transition-all shadow-xl"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <div className="h-10 w-px bg-white/10 mx-2 hidden md:block" />
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-3">
              <BarChart3 className="text-indigo-500" size={28} />
              Analisis <span className="text-indigo-400 underline decoration-indigo-500/30">Riset</span>
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Panel Riset PBW &bull; Live
            </div>
          </div>
        </div>
      </nav>

      {/* Expansive Content Area */}
      <main className="w-full px-8 md:px-12 py-10 transform-gpu will-change-transform pb-40">
        <div className="max-w-[1600px] mx-auto space-y-12">
          
          <HeroSummary data={data} />

          <AnimatePresence mode="wait">
            {viewMode === 'analysis' ? (
              <motion.div 
                key="analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-8"
              >
                <PlatformDistribution data={data} />
                <DoomProfileRadar data={data} />
                <DurationChart data={data} />
              </motion.div>
            ) : viewMode === 'raw' ? (
              <RespondentTable data={data} />
            ) : (
              <Glossary />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-2 rounded-full border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-indigo-500/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setViewMode(item.id as any)}
              className={`relative group p-4 rounded-full transition-all duration-300 ${
                viewMode === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-100' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              {/* Tooltip */}
              <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl transform translate-y-2 group-hover:translate-y-0 duration-200">
                {item.label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 dark:bg-white rotate-45" />
              </span>
              
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
