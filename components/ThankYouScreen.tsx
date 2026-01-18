
import React from 'react';
import { Check, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThankYouScreenProps {
  onReset: () => void;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onReset }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-8"
      >
        <Check size={48} strokeWidth={3} />
      </motion.div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Terima kasih banyak!
      </h1>
      
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-sm leading-relaxed">
        Jawaban kamu sudah kami simpan. Kontribusi kamu sangat berharga untuk penelitian ini.
      </p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl mb-10 text-left border border-slate-100 dark:border-slate-800"
      >
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <Info size={18} className="text-indigo-500" />
          Refleksi Singkat
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Mengurangi durasi scrolling bisa meningkatkan fokus kamu hingga 40% dalam sesi belajar berikutnya. Yuk, coba batasi waktu layar hari ini!
        </p>
      </motion.div>
      
      <button
        onClick={onReset}
        className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors flex items-center gap-2 group"
      >
        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
        Kembali ke awal
      </button>
    </div>
  );
};

export default ThankYouScreen;
