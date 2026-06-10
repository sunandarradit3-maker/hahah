import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0A0F1F]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#00D4FF] text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span>Solusi Website Modern Untuk UMKM & Bisnis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            Website Profesional Untuk <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] via-[#0080FF] to-[#00D4FF] animate-gradient">
              Bisnis Modern
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Membantu UMKM, Startup dan Perusahaan memiliki website premium yang cepat, aman dan menghasilkan pelanggan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/6287739435496?text=Halo%20DiTz%20Store,%20saya%20ingin%20konsultasi%20gratis%20mengenai%20pembuatan%20website.', '_blank')}
              className="bg-[#00D4FF] text-black hover:bg-[#00B4FF] px-8 h-12 font-bold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Konsultasi Gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="border-white/10 text-white hover:bg-white/5 px-8 h-12 font-semibold w-full sm:w-auto"
            >
              <a href="#portfolio">Lihat Portfolio</a>
            </Button>
          </motion.div>
        </div>

        {/* Floating elements or preview could go here */}
      </div>
    </section>
  );
}
