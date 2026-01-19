import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, PieChart, Clock, HelpCircle, ShieldAlert } from 'lucide-react';

const Glossary: React.FC = () => {
  const items = [
    {
      title: "Rata-rata Doom Index",
      icon: <ShieldAlert className="text-rose-500" />,
      color: "bg-rose-500/10 text-rose-500",
      desc: "Skor komposit (0-5) yang mengukur tingkat keparahan perilaku doomscrolling. Dihitung dari rata-rata 7 metrik psikologis: Lupa Waktu, Susah Berhenti, Gangguan Fokus, Penundaan, Scrolling saat Belajar, Rasa Kecanduan, dan Refleksi Akhir. Semakin tinggi skor, semakin parah tingkat kecanduannya."
    },
    {
      title: "Latensi Data",
      icon: <Zap className="text-emerald-500" />,
      color: "bg-emerald-500/10 text-emerald-500",
      desc: "Indikator kecepatan respons sistem dalam mengambil dan memproses data dari database (Supabase). Status 'Low' menandakan koneksi stabil dan pengolahan data berjalan real-time tanpa hambatan (< 100ms)."
    },
    {
      title: "Distribusi Platform",
      icon: <PieChart className="text-indigo-500" />,
      color: "bg-indigo-500/10 text-indigo-500",
      desc: "Visualisasi proporsi media sosial yang paling sering memicu doomscrolling. Data diambil dari input multi-pilihan responden, memungkinkan analisis tren platform mana yang paling 'berbahaya' bagi konsentrasi mahasiswa."
    },
    {
      title: "Durasi Penggunaan",
      icon: <Clock className="text-purple-500" />,
      color: "bg-purple-500/10 text-purple-500",
      desc: "Kategorisasi waktu layar harian responden. Grafik ini membantu memetakan seberapa banyak waktu produktif yang hilang akibat scrolling. Kategori '> 5 Jam' seringkali berkorelasi kuat dengan Doom Index yang tinggi."
    },
    {
      title: "Profil Radar (7 Dimensi)",
      icon: <Activity className="text-amber-500" />,
      color: "bg-amber-500/10 text-amber-500",
      desc: "Pemetaan visual kepribadian digital. Grafik jaring laba-laba ini menunjukkan area spesifik mana yang menjadi kelemahan utama responden (misal: kuat di 'Susah Berhenti' tapi rendah di 'Rasa Kecanduan')."
    }
  ];

  return (
    <motion.div 
      key="glossary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24"
    >
      <div className="md:col-span-2 text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-4">
          <HelpCircle size={32} className="text-indigo-500" />
        </div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-2">
          Glosarium & Metodologi
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Panduan lengkap memahami setiap angka dan grafik yang ditampilkan dalam dashboard analisis ini.
        </p>
      </div>

      {items.map((item, i) => (
        <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[2rem] bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${item.color} shrink-0`}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                </div>
                <div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                    </p>
                </div>
            </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Glossary;
