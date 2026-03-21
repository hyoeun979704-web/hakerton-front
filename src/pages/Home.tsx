import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Coffee, Train, Navigation, AlertCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen pt-12 px-6 pb-24 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
      
      <header className="mb-10 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 mb-4 block w-max mx-auto">
            Beta Version
          </span>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent mb-2">
            LocalFlow
          </h1>
          <p className="text-slate-400 font-medium">Flow like a local in Seoul.</p>
        </motion.div>
      </header>
      
      {/* App 4 Feature: Live Locality Pulse (Seoul Now) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Seoul Now
          </h2>
          <span className="text-xs text-slate-500">Live Pulse</span>
        </div>
        
        <motion.div 
          className="glass rounded-3xl p-5 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-slate-800/50 rounded-2xl">
              <MapPin className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Hongdae Street</h3>
              <p className="text-xs text-slate-400">Current Location Context</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-1 text-slate-300"><Users size={14} /> Local Ratio</span>
                <span className="font-bold text-emerald-400">78% Local</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 bg-slate-800/50 rounded-2xl p-3 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
                <Clock className="text-amber-400 mb-1" size={18} />
                <span className="text-2xl font-bold">15m</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Wait</span>
              </div>
              
              <div className="flex-1 bg-slate-800/50 rounded-2xl p-3 flex flex-col justify-center items-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                 <Navigation className="text-blue-400 mb-1" size={18} />
                 <span className="text-2xl font-bold text-center">Crowded</span>
                 <span className="text-[10px] text-slate-400 uppercase tracking-wider">Vibe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* App 5 Feature: Situational Help Widget */}
      <section>
        <h2 className="text-2xl font-bold mb-4">I'm at a...</h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-2xl p-5 cursor-pointer flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden border border-white/5 bg-gradient-to-b from-white/5 to-transparent"
          >
            <div className="p-4 bg-orange-500/20 rounded-full text-orange-400">
              <Coffee size={28} />
            </div>
            <span className="font-bold">Cafe / Restauraunt</span>
            <span className="text-xs text-slate-400 w-full truncate">Order in Korean, Etiquette</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-2xl p-5 cursor-pointer flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden border border-white/5 bg-gradient-to-b from-white/5 to-transparent"
          >
             <div className="p-4 bg-indigo-500/20 rounded-full text-indigo-400">
              <Train size={28} />
            </div>
            <span className="font-bold">Subway / Bus</span>
             <span className="text-xs text-slate-400 w-full truncate">Transit maps, Transfers</span>
          </motion.div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 glass rounded-2xl p-4 cursor-pointer flex items-center justify-between border border-red-500/20 bg-red-500/5"
        >
          <div className="flex items-center gap-3">
             <div className="p-2 bg-red-500/20 rounded-full text-red-400">
              <AlertCircle size={20} />
            </div>
            <span className="font-bold text-red-200">Emergency & Help</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
