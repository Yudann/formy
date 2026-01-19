import React, { useState } from 'react';
import { LayoutDashboard, PieChart as PieChartIcon, List } from 'lucide-react';
import { ResultData } from '../../types';
import { getSocialStats, getPlatformColor } from '../../utils/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PlatformDistributionProps {
  data: ResultData[];
}

const COLORS = ['#6366f1', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4'];

const PlatformDistribution: React.FC<PlatformDistributionProps> = ({ data }) => {
  const [showChart, setShowChart] = useState(true);
  const socialStats = getSocialStats(data);

  const getPieData = () => {
    return socialStats.map(([name, value]) => ({
      name,
      value
    }));
  };

  return (
    <div className="xl:col-span-1 bg-white/60 dark:bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/20 shadow-xl backdrop-blur-2xl flex flex-col transform-gpu will-change-transform h-[500px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3 text-slate-800 dark:text-white">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
            <LayoutDashboard size={20} />
          </div>
          Distribusi Platform
        </h3>
        <button 
          onClick={() => setShowChart(!showChart)}
          className="p-2 rounded-xl bg-white/10 dark:bg-slate-800 hover:bg-indigo-500/10 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors"
          title={showChart ? "Switch to List View" : "Switch to Chart View"}
        >
          {showChart ? <List size={20} /> : <PieChartIcon size={20} />}
        </button>
      </div>

      <div className="flex-1 w-full min-h-0 relative overflow-hidden">
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
                <PieChart>
                  <Pie
                    data={getPieData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getPieData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }} 
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar"
            >
              {socialStats.map(([platform, count]) => {
                const percentage = ((count / data.length) * 100).toFixed(0);
                return (
                  <div key={platform} className="space-y-2">
                    <div className="flex justify-between items-center pr-1">
                      <span className="font-black capitalize text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${getPlatformColor(platform)}`} />
                        {platform}
                      </span>
                      <span className="text-xs font-black text-indigo-500">{percentage}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden p-0.5 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className={`h-full min-w-[6px] rounded-full ${getPlatformColor(platform)} shadow-sm opacity-90`}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlatformDistribution;
