
import React, { useState, useEffect } from 'react';
import { AppState, FormData, Theme } from './types';
import { QUESTIONS } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import IntroScreen from './components/IntroScreen';
import OnboardingFlow from './components/OnboardingFlow';
import ThankYouScreen from './components/ThankYouScreen';
import ResultsPage from './components/ResultsPage';
import ThemeToggle from './components/ThemeToggle';
import { supabase } from './supabase';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    // Hidden routing for presentation
    const handleHashChange = () => {
      if (window.location.hash === '#/results') {
        setAppState(AppState.RESULTS);
      } else if (window.location.hash === '' || window.location.hash === '#/') {
        setAppState(AppState.WELCOME);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStartWelcome = () => setAppState(AppState.INTRO);
  
  const handleStartQuestions = () => {
    setAppState(AppState.QUESTIONS);
    setCurrentStep(0);
  };

  const handleNext = async () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step reached, submit to Supabase
      await submitToSupabase();
    }
  };

  const submitToSupabase = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('responses')
        .insert([formData]);

      if (error) {
        console.error('Error submitting to Supabase:', error.message);
      }
      setAppState(AppState.THANK_YOU);
    } catch (err) {
      console.error('Failed to submit:', err);
      setAppState(AppState.THANK_YOU);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setAppState(AppState.INTRO);
    }
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({});
    setCurrentStep(0);
    setAppState(AppState.WELCOME);
  };

  return (
    <div className={`min-h-screen w-screen flex flex-col relative transition-colors duration-300 overflow-x-hidden ${appState !== AppState.RESULTS ? 'h-screen h-[100svh] overflow-hidden' : ''}`}>
      {/* Decorative background blobs - reduced opacity for cleaner look */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <div className={`flex-1 w-full ${appState === AppState.RESULTS ? 'max-w-none' : 'max-w-4xl'} mx-auto flex flex-col relative z-10 transition-all duration-500`}>
        <AnimatePresence mode="wait">
          {appState === AppState.WELCOME && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="flex-1 flex flex-col"
            >
              <WelcomeScreen onStart={handleStartWelcome} />
            </motion.div>
          )}

          {appState === AppState.INTRO && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="flex-1 flex flex-col"
            >
              <IntroScreen onStart={handleStartQuestions} onBack={() => setAppState(AppState.WELCOME)} />
            </motion.div>
          )}

          {appState === AppState.QUESTIONS && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="flex-1 flex flex-col"
            >
              <OnboardingFlow
                questions={QUESTIONS}
                currentStep={currentStep}
                formData={formData}
                onUpdate={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}

          {appState === AppState.THANK_YOU && (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="flex-1 flex flex-col"
            >
              <ThankYouScreen onReset={handleReset} />
            </motion.div>
          )}

          {appState === AppState.RESULTS && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col"
            >
              <ResultsPage onBack={() => {
                window.location.hash = '';
                setAppState(AppState.WELCOME);
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        
      </div>
    </div>
  );
};

export default App;
