import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    title: "What is your local pace?",
    description: "Are you a meticulous planner or a spontaneous wanderer?",
    options: [
      { id: 'turtle', text: '🐢 Slow & Steady (Turtle)', subtext: 'I want to soak in every detail of the neighborhood.' },
      { id: 'rabbit', text: '⚡ Fast & Furious (Rabbit)', subtext: 'I want to hit all the hot spots quickly!' }
    ]
  },
  {
    id: 2,
    title: "What's your priority tonight?",
    description: "When the sun goes down in Seoul...",
    options: [
      { id: 'food', text: '🍖 K-BBQ & Soju', subtext: 'Take me to the best local restaurants.' },
      { id: 'culture', text: '🏮 Night Markets & Views', subtext: 'I want to see the city lights and street food.' }
    ]
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[step].id]: optionId }));
    
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 400);
    } else {
      setTimeout(() => navigate('/'), 600);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center bg-gradient-to-b from-slate-950 to-blue-950/20">
      
      <div className="w-full max-w-sm mb-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <span className="text-3xl">✈️</span>
        </motion.div>
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Travel Persona</h1>
        <p className="text-slate-400">Let's find your perfect local flow.</p>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-sm relative h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0"
          >
            <h2 className="text-2xl font-bold mb-2 text-center">{QUESTIONS[step].title}</h2>
            <p className="text-sm text-slate-400 text-center mb-8">{QUESTIONS[step].description}</p>
            
            <div className="space-y-4">
              {QUESTIONS[step].options.map(option => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${
                    answers[QUESTIONS[step].id] === option.id 
                    ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'glass border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{option.text}</div>
                  <div className="text-xs text-slate-400">{option.subtext}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
