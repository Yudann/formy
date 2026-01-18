
import React from 'react';
import { Sparkles, Target, ArrowRight, ChevronLeft, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onStart: () => void;
  onBack: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, onBack }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col p-6 md:p-12"
    >
      <motion.button 
        variants={itemVariants}
        onClick={onBack}
        className="mb-4 md:mb-6 flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-fit group"
      >
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-wider md:text-sm">Kembali</span>
      </motion.button>

      <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8 max-w-2xl mx-auto w-full">
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4 leading-tight">Kenapa riset ini penting?</h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Pernah ngerasa waktu 2 jam hilang gitu aja gara-gara "scroll bentar"? Algoritma emang didesain buat bikin kita betah, tapi dampaknya nyata banget.
          </p>
        </motion.div>

        <div className="grid gap-3 md:gap-4">
          <motion.div 
            variants={itemVariants}
            className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10"
          >
            <div className="bg-indigo-600 p-2 md:p-2.5 rounded-lg md:rounded-xl text-white shadow-lg shadow-indigo-500/10 shrink-0">
              <Target size={18} className="md:w-5 md:h-5" />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Target Kita</h4>
              <p className="text-[12px] md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Mencari pola hubungan antara durasi layar dan penurunan konsentrasi belajar.</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100 dark:border-purple-500/10"
          >
            <div className="bg-purple-600 p-2 md:p-2.5 rounded-lg md:rounded-xl text-white shadow-lg shadow-purple-500/10 shrink-0">
              <Globe size={18} className="md:w-5 md:h-5" />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Dampak Nyata</h4>
              <p className="text-[12px] md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Hasil riset bakal dipake buat rekomendasi manajemen waktu belajar yang lebih sehat.</p>
            </div>
          </motion.div>
        </div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full group py-4 md:py-5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 relative overflow-hidden shrink-0"
        >
          <span className="relative z-10">Siap, Mari Mulai!</span>
          <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default IntroScreen;
