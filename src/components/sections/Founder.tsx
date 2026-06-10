import { motion } from 'motion/react';
import { Crown } from 'lucide-react';

export default function Founder() {
  return (
    <section className="py-24 bg-[#0A0F1F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#00D4FF]/20 to-transparent z-10" />
            <img 
              src="/founder.png" 
              alt="Radit Sunandar"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
              }}
            />
          </motion.div>

          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3 h-3" />
                <span>Founder & Lead Developer</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Radit Sunandar</h2>
              <p className="text-xl text-[#00D4FF] font-medium">Visionary behind DiTz Store Agency</p>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed italic border-l-2 border-[#00D4FF] pl-6 py-2">
              "Kami percaya bahwa setiap bisnis di Indonesia berhak memiliki kehadiran digital kelas dunia. DiTz Store hadir bukan hanya membangun website, tapi membangun pintu kesuksesan digital Anda."
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <div>
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-gray-500 text-sm italic">Tahun Pengalaman</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-gray-500 text-sm italic">Project Berhasil</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
