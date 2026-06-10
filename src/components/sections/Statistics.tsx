import { motion } from 'motion/react';

const stats = [
  { label: 'Project Selesai', value: '150+' },
  { label: 'Client Puas', value: '120+' },
  { label: 'Tahun Pengalaman', value: '5+' },
  { label: 'Layanan Aktif', value: '12' },
];

export default function Statistics() {
  return (
    <section className="py-12 bg-[#0A0F1F] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
