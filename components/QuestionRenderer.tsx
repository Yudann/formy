
import React, { useEffect, useRef } from 'react';
import { Question } from '../types';
import { motion } from 'framer-motion';

interface QuestionRendererProps {
  question: Question;
  value: string | number | undefined;
  onChange: (val: string | number) => void;
  onEnter?: () => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  value,
  onChange,
  onEnter
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only auto-focus on desktop to prevent heavy layout shifts on mobile (keyboard slide-up)
    // which causes animation lag
    if (window.innerWidth >= 768 && (question.type === 'text' || question.type === 'number')) {
      inputRef.current?.focus();
    }
  }, [question.id]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            ref={inputRef}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={question.placeholder}
            className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-400 py-3 md:py-4 text-xl md:text-3xl font-medium text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        );
      case 'number':
        return (
          <input
            ref={inputRef}
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={question.placeholder}
            min={question.validation?.min}
            max={question.validation?.max}
            className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-400 py-3 md:py-4 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        );
      case 'choice':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            {question.options?.map((opt) => {
              const currentVal = String(value || '');
              const isSelected = question.multiSelect 
                ? currentVal.split(',').includes(String(opt.value))
                : currentVal === String(opt.value);

              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={opt.value}
                  onClick={() => {
                    if (question.multiSelect) {
                      const selected = currentVal ? currentVal.split(',') : [];
                      const valStr = String(opt.value);
                      let newSelected;
                      if (selected.includes(valStr)) {
                        newSelected = selected.filter(s => s !== valStr);
                      } else {
                        newSelected = [...selected, valStr];
                      }
                      onChange(newSelected.join(','));
                    } else {
                      onChange(opt.value);
                    }
                  }}
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-4 ring-indigo-600/10'
                      : 'border-slate-100 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{opt.label}</span>
                    {isSelected && (
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        );
      case 'scale':
        return (
          <div className="w-full">
            <div className="flex items-center justify-between gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  key={num}
                  onClick={() => onChange(num)}
                  className={`flex-1 aspect-square md:aspect-auto md:h-20 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                    value === num
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-xl shadow-indigo-500/30'
                      : 'border-slate-100 dark:border-slate-800/50 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {num}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between px-1 text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              <span>Nggak Pernah</span>
              <span>Sering Banget</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={question.id + '-title'}
        className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4 leading-tight"
      >
        {question.question}
      </motion.h2>
      {question.description && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs md:text-base text-slate-500 dark:text-slate-400 mb-6 md:mb-8 font-medium"
        >
          {question.description}
        </motion.p>
      )}
      <div className="mt-4">
        {renderInput()}
      </div>
    </div>
  );
};

export default QuestionRenderer;
