import React from 'react';
import { ResultData } from '../../types';
import { getDurationStats } from '../../utils/analytics';
import { Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';

interface DurationChartProps {
  data: ResultData[];
}

const DurationChart: React.FC<DurationChartProps> = ({ data }) => {
  const getBarData = () => {
    const stats = getDurationStats(data);
    const order = ['under_1', '1_to_3', '3_to_5', 'over_5'];
    const labels: Record<string, string> = {
      under_1: '< 1 Jam',
      '1_to_3': '1-3 Jam',
      '3_to_5': '3-5 Jam',
      over_5: '> 5 Jam'
    };
    
    return order.map(key => ({
      name: labels[key],
      count: stats[key] || 0
    }));
  };

  return (
    <div className="xl:col-span-3 bg-white/60 dark:bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/20 shadow-xl backdrop-blur-2xl h-[500px] flex flex-col">
      <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3 mb-6 text-slate-800 dark:text-white">
        <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
          <Clock size={20} />
        </div>
        Durasi Penggunaan Harian
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getBarData()}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              domain={[0, 20]}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.1)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
            />
            <Bar 
              dataKey="count" 
              fill="url(#colorCount)" 
              radius={[12, 12, 12, 12]} 
              barSize={60}
            >
              {getBarData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#6366f1', '#a855f7', '#ec4899', '#f43f5e'][index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DurationChart;
