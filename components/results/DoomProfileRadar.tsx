import React, { useState } from 'react';
import { ResultData } from '../../types';
import { getMetricsAvg } from '../../utils/analytics';
import { Activity, List, Radar as RadarIcon } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

interface DoomProfileRadarProps {
  data: ResultData[];
}

const DoomProfileRadar: React.FC<DoomProfileRadarProps> = ({ data }) => {
  const [showChart, setShowChart] = useState(true);

  const getRadarData = () => {
    return getMetricsAvg(data).map(m => ({
      subject: m.label,
      A: parseFloat(String(m.avg)),
      fullMark: 5
    }));
  };

  const metrics = getMetricsAvg(data);

  return (
    <div className="xl:col-span-2 bg-white/60 dark:bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-xl backdrop-blur-2xl flex flex-col relative overflow-hidden transform-gpu will-change-transform h-[500px]">
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3 text-slate-800 dark:text-white">
          <div className="p-2 bg-indigo-500/10 dark:bg-white/10 rounded-xl text-indigo-500 dark:text-indigo-400">
            <Activity size={20} />
          </div>
          Profil Doomscrolling (Radar)
        </h3>
        <button 
          onClick={() => setShowChart(!showChart)}
          className="p-2 rounded-xl bg-white/10 dark:bg-slate-800 hover:bg-indigo-500/10 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors z-20"
          title={showChart ? "Switch to List View" : "Switch to Chart View"}
        >
          {showChart ? <List size={20} /> : <RadarIcon size={20} />}
        </button>
      </div>

      <div className="flex-1 w-full min-h-0 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {showChart ? (
            <motion.div 
              key="chart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getRadarData()}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar
                    name="Rata-rata Skor"
                    dataKey="A"
                    stroke="#818cf8"
                    strokeWidth={3}
                    fill="#818cf8"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full overflow-y-auto pr-2 space-y-4 custom-scrollbar"
            >
              {metrics.map((metric, idx) => (
                <div key={metric.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.1em]">{metric.label}</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full">{metric.avg}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(Number(metric.avg) / 5) * 100}%` }}
                      transition={{ duration: 1, delay: idx * 0.05 }}
                      className={`h-full rounded-full ${Number(metric.avg) > 3.8 ? 'bg-gradient-to-r from-red-500 to-orange-500' : Number(metric.avg) > 2.8 ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-indigo-400 to-cyan-400'}`}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoomProfileRadar;
