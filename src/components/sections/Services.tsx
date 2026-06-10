import { motion } from 'motion/react';
import { Layout, Globe, ShoppingBag, Terminal, Smartphone, Settings } from 'lucide-react';

const services = [
  {
    title: 'Landing Page',
    description: 'Halaman web tunggal fokus konversi tinggi.',
    icon: <Layout className="w-6 h-6" />,
    color: '#00D4FF'
  },
  {
    title: 'Company Profile',
    description: 'Website resmi untuk identitas bisnis Anda.',
    icon: <Globe className="w-6 h-6" />,
    color: '#0080FF'
  },
  {
    title: 'E-Commerce',
    description: 'Toko online lengkap dengan sistem pembayaran.',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: '#FFD700'
  },
  {
    title: 'Admin Dashboard',
    description: 'Sistem manajemen internal bisnis custom.',
    icon: <Terminal className="w-6 h-6" />,
    color: '#FF4D4D'
  },
  {
    title: 'Custom Web App',
    description: 'Aplikasi web kompleks sesuai kebutuhan.',
    icon: <Smartphone className="w-6 h-6" />,
    color: '#9D50BB'
  },
  {
    title: 'Maintenance',
    description: 'Dukungan teknis dan update berkala.',
    icon: <Settings className="w-6 h-6" />,
    color: '#6E7272'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0A0F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Layanan Unggulan</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Kami menyediakan berbagai solusi website untuk membantu bisnis Anda berkembang di era digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00D4FF]/50 transition-all group"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15`, color: service.color }}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
