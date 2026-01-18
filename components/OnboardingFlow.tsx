
import React from 'react';
import { Question, FormData } from '../types';
import QuestionRenderer from './QuestionRenderer';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingFlowProps {
  questions: Question[];
  currentStep: number;
  formData: FormData;
  onUpdate: (field: string, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  questions,
  currentStep,
  formData,
  onUpdate,
  onNext,
  onBack,
  isSubmitting = false,
}) => {
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isValueMissing = currentQuestion.required && !formData[currentQuestion.id];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Top Header - more compact */}
      <div className="px-4 py-3 md:px-6 md:py-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>
        
        <div className="flex flex-col items-center gap-1 flex-1 mx-2">
          <div className="flex gap-1 md:gap-1.5">
            {questions.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-4 md:w-6 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : idx < currentStep ? 'w-1.5 md:w-2 bg-indigo-300 dark:bg-indigo-700' : 'w-1.5 md:w-2 bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
            Progress {Math.round(progress)}%
          </span>
        </div>
        
        <div className="w-8 md:w-10" />
      </div>

      {/* Content - adjusted padding */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-4 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <QuestionRenderer
              question={currentQuestion}
              value={formData[currentQuestion.id]}
              onChange={(val) => onUpdate(currentQuestion.id, val)}
              onEnter={!isValueMissing ? onNext : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - more compact */}
      <div className="p-6 md:p-8 space-y-4">
        <motion.button
          whileHover={!isValueMissing ? { scale: 1.01 } : {}}
          whileTap={!isValueMissing ? { scale: 0.98 } : {}}
          onClick={onNext}
          disabled={isValueMissing || isSubmitting}
          className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2 ${
            isValueMissing || isSubmitting
              ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-300 dark:text-slate-700 cursor-not-allowed' 
              : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/10 hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={20} />
              </motion.div>
              Menyimpan...
            </>
          ) : (
            <>
              {currentStep === questions.length - 1 ? 'Selesai & Kirim' : 'Lanjut'}
              {!isValueMissing && <ChevronRight size={20} />}
            </>
          )}
        </motion.button>
        <p className="text-center text-[10px] md:text-xs text-slate-400 dark:text-slate-600">
          Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 font-sans">ENTER</kbd> untuk lebih cepat
        </p>
      </div>
    </div>
  );
};

export default OnboardingFlow;
