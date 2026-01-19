import React from 'react';
import { ResultData } from '../../types';
import { getSocialStats, getGlobalAvg } from '../../utils/analytics';
import { Users, AlertTriangle, TrendingUp, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSummaryProps {
  data: ResultData[];
}

const HeroSummary: React.FC<HeroSummaryProps> = ({ data }) => {
  const globalAvg = getGlobalAvg(data);
  const socialStats = getSocialStats(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { label: 'Total Mhs', val: data.length, unit: 'Org', icon: <Users />, color: 'text-indigo-400', gradient: 'from-indigo-500/20 to-blue-500/20' },
        { label: 'Rata2 Doom Index', val: globalAvg, unit: '/ 5.0', icon: <AlertTriangle />, color: 'text-rose-400', gradient: 'from-rose-500/20 to-red-500/20' },
        { label: 'Aplikasi Teratas', val: socialStats[0]?.[0] || '-', unit: 'Top', icon: <Activity />, color: 'text-amber-400', gradient: 'from-amber-500/20 to-orange-500/20' },
        { label: 'Latensi Data', val: 'Low', unit: 'ms', icon: <Zap />, color: 'text-emerald-400', gradient: 'from-emerald-500/20 to-green-500/20' }
      ].map((stat, i) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-8 rounded-[2.5rem] bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative"
        >
          <div className={`absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-br ${stat.gradient} blur-[60px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity`} />
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className={`p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 w-fit ${stat.color} shadow-sm`}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 28 })}
            </div>
            <div>
              <div className="text-slate-500 dark:text-slate-400 font-bold text-[11px] uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white flex items-end gap-2 tracking-tighter">
                {stat.val} <span className="text-sm font-bold opacity-50 mb-1.5 lowercase">{stat.unit}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroSummary;
