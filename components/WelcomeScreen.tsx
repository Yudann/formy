
import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
  onShowResults: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onShowResults }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center">
      <motion.div 
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 md:w-24 md:h-24 bg-indigo-600 text-white rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 shadow-2xl shadow-indigo-500/40"
      >
        <BookOpen size={32} className="md:w-12 md:h-12" strokeWidth={1.5} />
      </motion.div>
      
      <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-4 md:mb-6 tracking-tight max-w-sm md:max-w-xl">
        Fokus Belajar vs <span className="text-indigo-600 dark:text-indigo-400 italic">Doomscrolling</span>
      </h1>
      
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 md:mb-12 max-w-[280px] md:max-w-md leading-relaxed font-medium">
        Bantu kami memetakan kebiasaan scrolling kamu dan temukan cara buat dapetin fokus belajar yang maksimal lagi.
      </p>
      
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 md:mb-12">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500" />
          ±3 Menit
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500" />
          Mahasiswa Saja
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500" />
          13 Pertanyaan
        </div>
      </div>
      
      <button
        onClick={onStart}
        className="group relative w-full md:w-auto px-10 md:px-12 py-4 md:py-5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl md:rounded-[2rem] font-bold text-lg md:text-xl hover:scale-105 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10">Gas, Mulai Sekarang</span>
        <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
      </button>
    </div>
  );
};

export default WelcomeScreen;
