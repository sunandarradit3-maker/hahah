import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    price: '1.5jt',
    description: 'Cocok untuk Landing Page sederhana.',
    features: ['Single Page Design', 'Responsive Mobile', 'SEO Friendly', 'Contact Form', '1 Minggu Pengerjaan'],
    popular: false,
    waMessage: 'Halo DiTz Store, saya tertarik dengan paket Starter (Rp 1.5jt). Bisa bantu jelaskan lebih lanjut?'
  },
  {
    name: 'Business',
    price: '3.5jt',
    description: 'Solusi lengkap untuk Company Profile.',
    features: ['Multi-page Design', 'CMS Integration', 'Premium Animation', 'WhatsApp Integration', '2 Minggu Pengerjaan'],
    popular: true,
    waMessage: 'Halo DiTz Store, saya tertarik dengan paket Business (Rp 3.5jt). Paket ini yang paling direkomendasikan ya?'
  },
  {
    name: 'Premium',
    price: '7.5jt',
    description: 'Sistem kompleks & Admin Dashboard.',
    features: ['Custom Web System', 'Database Integration', 'Advanced Security', 'Support Prioritas', '1 Bulan Pengerjaan'],
    popular: false,
    waMessage: 'Halo DiTz Store, saya tertarik dengan paket Premium (Rp 7.5jt) untuk pembangunan sistem custom.'
  }
];

export default function Pricing() {
  const handleSelectPlan = (message: string) => {
    const waUrl = `https://wa.me/6287739435496?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="pricing" className="py-24 bg-[#0A0F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Paket Harga</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Investasi terbaik untuk masa depan bisnis Anda dengan website berkualitas tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl border flex flex-col h-full ${
                plan.popular 
                ? 'bg-gradient-to-b from-white/10 to-transparent border-[#00D4FF] relative overflow-hidden' 
                : 'bg-white/5 border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-[-35px] bg-[#00D4FF] text-black text-[10px] font-bold py-1 px-10 rotate-45">
                  POPULER
                </div>
              )}
              
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-400 font-medium whitespace-nowrap">Mulai dari</span>
                    <span className="text-3xl font-bold text-white whitespace-nowrap">{plan.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">{plan.description}</p>
                </div>

                <div className="space-y-4 pt-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00D4FF]/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00D4FF]" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => handleSelectPlan(plan.waMessage)}
                className={`w-full py-6 font-bold mt-8 ${
                  plan.popular 
                  ? 'bg-[#00D4FF] text-black hover:bg-[#00B4FF]' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Pilih Paket
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
