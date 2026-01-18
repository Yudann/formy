
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { 
  ChevronLeft, BarChart3, Users, Clock, PieChart, 
  LayoutDashboard, List, TrendingUp, AlertTriangle, 
  Search, Download, Filter, 
  Instagram, Youtube, Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultData {
  id: string;
  created_at: string;
  name: string;
  age: number;
  major: string;
  semester: number;
  social_media: string;
  duration: string;
  unaware_time: number;
  hard_to_stop: number;
  distraction: number;
  procrastination: number;
  scroll_while_study: number;
  addiction_feel: number;
  final_reflection: number;
}

interface ResultsPageProps {
  onBack: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ onBack }) => {
  const [data, setData] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'analysis' | 'raw'>('analysis');
  const [searchQuery, setSearchQuery] = useState('');

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

  // --- ANALYSIS LOGIC ---
  const getSocialStats = () => {
    const stats: Record<string, number> = {};
    data.forEach(r => {
      stats[r.social_media] = (stats[r.social_media] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };

  const getDurationStats = () => {
    const stats: Record<string, number> = {};
    data.forEach(r => {
      stats[r.duration] = (stats[r.duration] || 0) + 1;
    });
    return stats;
  };

  const getPlatformColor = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'instagram': return 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500';
      case 'tiktok': return 'bg-slate-900 dark:bg-slate-700';
      case 'twitter': return 'bg-sky-500';
      case 'youtube': return 'bg-red-600';
      default: return 'bg-indigo-500';
    }
  };

  const getMetricsAvg = () => {
    const keys = [
      'unaware_time', 'hard_to_stop', 'distraction', 
      'procrastination', 'scroll_while_study', 'addiction_feel', 'final_reflection'
    ];
    const labels: Record<string, string> = {
      unaware_time: 'Lupa Waktu',
      hard_to_stop: 'Susah Berhenti',
      distraction: 'Gangguan Fokus',
      procrastination: 'Nunda Tugas',
      scroll_while_study: 'Scroll Pas Belajar',
      addiction_feel: 'Rasa Kecanduan',
      final_reflection: 'Dampak Konsentrasi'
    };

    return keys.map(key => {
      const sum = data.reduce((acc, curr) => acc + (curr[key as keyof ResultData] as number), 0);
      return {
        label: labels[key],
        avg: data.length ? (sum / data.length).toFixed(1) : 0
      };
    });
  };

  const getGlobalAvg = () => {
    if (!data.length) return "0.0";
    const allMetrics = data.map(r => calculateAvgScore(r));
    const sum = allMetrics.reduce((a, b) => a + Number(b), 0);
    return (sum / allMetrics.length).toFixed(1);
  };

  const calculateAvgScore = (resp: ResultData) => {
    const scores = [
      resp.unaware_time, resp.hard_to_stop, resp.distraction,
      resp.procrastination, resp.scroll_while_study, resp.addiction_feel, resp.final_reflection
    ];
    const sum = scores.reduce((a, b) => a + b, 0);
    return (sum / scores.length).toFixed(1);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  const filteredData = data.filter(r => 
    (r.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    r.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const globalAvg = getGlobalAvg();

  return (
    <div className="flex-1 w-full bg-transparent">
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
              Research <span className="text-indigo-400 underline decoration-indigo-500/30">Analytics</span>
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              PBW Research Panel &bull; Live
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 p-1.5 rounded-[1.5rem] border border-white/10 backdrop-blur-md w-full md:w-auto justify-center">
          <button 
            onClick={() => setViewMode('analysis')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'analysis' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <TrendingUp size={16} /> Insight Analysis
          </button>
          <button 
            onClick={() => setViewMode('raw')}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'raw' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <LayoutDashboard size={16} /> Respondent Data
          </button>
        </div>
      </nav>

      {/* Expansive Content Area - Natural Scroll */}
      <main className="w-full px-8 md:px-12 py-10 space-y-12">
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
          
          {/* Hero Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Total Mhs', val: data.length, unit: 'Resp', icon: <Users />, color: 'text-indigo-500' },
              { label: 'Avg Doom Index', val: globalAvg, unit: '/ 5.0', icon: <AlertTriangle />, color: 'text-red-500', bg: 'bg-red-500/5' },
              { label: 'Dominant App', val: getSocialStats()[0]?.[0] || '-', unit: 'Top', icon: <TrendingUp />, color: 'text-amber-500' },
              { label: 'Data Latency', val: 'Low', unit: 'ms', icon: <Clock />, color: 'text-green-500' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-[3rem] ${stat.bg || 'bg-white/50 dark:bg-slate-900/50'} backdrop-blur-md border border-white/10 shadow-2xl shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group hover:border-indigo-500/30 transition-all`}
              >
                <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 w-fit mb-6 ${stat.color}`}>
                  {React.cloneElement(stat.icon as React.ReactElement, { size: 24 })}
                </div>
                <div>
                  <div className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white flex items-end gap-2 capitalize">
                    {stat.val} <span className="text-sm opacity-40 lowercase">{stat.unit}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'analysis' ? (
              <motion.div 
                key="analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-10"
              >
                {/* Visual Distribution - Wide */}
                <div className="xl:col-span-2 bg-white/50 dark:bg-slate-900/50 p-10 rounded-[3.5rem] border border-white/10 shadow-2xl space-y-10 group text-slate-900 dark:text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
                      <LayoutDashboard className="text-indigo-500" size={24} />
                      Platform usage distribution
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    {getSocialStats().map(([platform, count], idx) => {
                      const percentage = ((count / data.length) * 100).toFixed(0);
                      return (
                        <div key={platform} className="space-y-4">
                          <div className="flex justify-between items-center pr-2">
                            <span className="font-black capitalize text-sm flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform)}`} />
                              {platform}
                            </span>
                            <span className="text-sm font-black text-indigo-500">{percentage}%</span>
                          </div>
                          <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden p-1 shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1.5, ease: "circOut" }}
                              className={`h-full min-w-[8px] rounded-full ${getPlatformColor(platform)} shadow-lg shadow-indigo-500/20`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Score Indicators - Vertical Panel */}
                <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl flex flex-col justify-center space-y-10">
                  <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <PieChart className="text-indigo-400" size={24} />
                    Core Metrics
                  </h3>
                  <div className="space-y-8">
                    {getMetricsAvg().map((metric, idx) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-[11px] font-black text-slate-400 mb-3 uppercase tracking-[0.1em]">
                          <span>{metric.label}</span>
                          <span className="text-white bg-white/10 px-2 py-0.5 rounded-lg">{metric.avg}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(Number(metric.avg) / 5) * 100}%` }}
                            transition={{ duration: 1.5, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${Number(metric.avg) > 3.8 ? 'bg-red-500' : Number(metric.avg) > 2.8 ? 'bg-amber-500' : 'bg-indigo-400'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Insight - Ultra Wide Bottom */}
                <div className="xl:col-span-3 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-12 md:p-16 rounded-[4rem] shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
                   <div className="relative z-10 lg:w-1/2">
                      <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">User Behavior Analysis</div>
                      <h3 className="text-4xl md:text-5xl font-black mb-8 leading-none tracking-tighter">How long are they stuck in the <span className="text-indigo-400 italic">loop</span>?</h3>
                      <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        The majority of respondents fall into high-usage categories. Doomscrolling is no longer just a habit; it's a significant time sink for students.
                      </p>
                   </div>
                   <div className="grid grid-cols-2 gap-6 w-full lg:w-auto relative z-10">
                      {Object.entries(getDurationStats()).map(([duration, count]) => (
                        <div key={duration} className="bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] text-center transition-transform hover:-translate-y-2">
                           <div className="text-5xl font-black text-white mb-2">{count}</div>
                           <div className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">{duration.replace('_', ' ')}</div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="raw"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Search & Action Bar */}
                <div className="flex flex-col xl:flex-row gap-6 items-center">
                  <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={24} />
                    <input 
                      type="text" 
                      placeholder="Search respondent by name or major..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white/50 dark:bg-slate-900/50 border-2 border-white/10 outline-none focus:border-indigo-500/50 dark:focus:border-indigo-500/20 font-bold text-lg transition-all dark:text-white"
                    />
                  </div>
                  <div className="flex gap-4 w-full xl:w-auto">
                    <button className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-6 bg-white/40 dark:bg-slate-900/40 rounded-[2rem] border-2 border-white/10 font-black text-slate-500 uppercase text-xs tracking-widest"><Filter size={20} /> Advanced Filter</button>
                    <button className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-10 py-6 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-500/20 font-black uppercase text-xs tracking-widest transition-all hover:scale-105 active:scale-95"><Download size={20} /> Export Dataset</button>
                  </div>
                </div>

                {/* Ultimate Table */}
                <div className="bg-white/50 dark:bg-slate-900/50 rounded-[3.5rem] border border-white/10 shadow-3xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-2xl text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/10">
                          <th className="px-10 py-8">Respondent Profile</th>
                          <th className="px-10 py-8">Academic Info</th>
                          <th className="px-10 py-8">Platform Habits</th>
                          <th className="px-10 py-8 text-center">Doom Level</th>
                          <th className="px-10 py-8">Submission</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredData.map(resp => {
                          const avg = calculateAvgScore(resp);
                          return (
                            <tr key={resp.id} className="text-sm hover:bg-indigo-500/5 transition-colors group">
                              <td className="px-10 py-8">
                                <div className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-xl group-hover:text-indigo-400 transition-colors">{resp.name || 'ANONYMOUS RESPONDENT'}</div>
                                <div className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">{resp.age} Years Old</div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="bg-white/10 dark:bg-slate-800/50 p-3 rounded-2xl border border-white/5">
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate max-w-[150px]">{resp.major}</div>
                                  <div className="text-base font-black text-indigo-500 italic">Semester {resp.semester}</div>
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="flex items-center gap-3 font-black text-slate-900 dark:text-slate-100 uppercase text-xs tracking-widest">
                                   <div className={`w-3 h-3 rounded-full ${getPlatformColor(resp.social_media)} shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                                   {resp.social_media}
                                </div>
                                <div className="text-xs text-slate-500 font-bold mt-2 lowercase italic ml-6">{resp.duration.replace('_', ' ')} daily</div>
                              </td>
                              <td className="px-10 py-8 text-center">
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-[1.5rem] font-black text-white text-xl shadow-2xl ${
                                  Number(avg) >= 4 ? 'bg-red-500 shadow-red-500/40' : Number(avg) >= 2.8 ? 'bg-amber-500 shadow-amber-500/40' : 'bg-green-500 shadow-green-500/40'
                                }`}>
                                  {avg}
                                </div>
                              </td>
                              <td className="px-10 py-8 text-xs text-slate-400 font-black uppercase tracking-widest">
                                {formatDate(resp.created_at)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
