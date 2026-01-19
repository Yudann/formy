import React, { useState } from 'react';
import { ResultData } from '../../types';
import { getPlatformColor, calculateAvgScore } from '../../utils/analytics';
import { Search, Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface RespondentTableProps {
  data: ResultData[];
}

const RespondentTable: React.FC<RespondentTableProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  const filteredData = data.filter(r => 
    (r.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    r.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
            placeholder="Cari responden nama atau jurusan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white/50 dark:bg-slate-900/50 border-2 border-white/10 outline-none focus:border-indigo-500/50 dark:focus:border-indigo-500/20 font-bold text-lg transition-all dark:text-white"
          />
        </div>
        <div className="flex gap-4 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-6 bg-white/40 dark:bg-slate-900/40 rounded-[2rem] border-2 border-white/10 font-black text-slate-500 uppercase text-xs tracking-widest"><Filter size={20} /> Filter Lanjut</button>
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-10 py-6 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-500/20 font-black uppercase text-xs tracking-widest transition-all hover:scale-105 active:scale-95"><Download size={20} /> Export Data</button>
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
                         <div className={`w-3 h-3 rounded-full ${getPlatformColor(resp.social_media.split(',')[0])} shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                         {resp.social_media.split(',')[0]}
                         {resp.social_media.split(',').length > 1 && (
                           <span className="ml-2 text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-300 normal-case tracking-normal">
                            +{resp.social_media.split(',').length - 1}
                           </span>
                         )}
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
  );
};

export default RespondentTable;
