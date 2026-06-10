import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db, collection, onSnapshot, query, orderBy } from '@/lib/firebase';
import type { Project } from '@/types';

const defaultProjects = [
  {
    id: '1',
    title: 'Modern E-Commerce',
    slug: 'modern-ecommerce',
    description: 'Platform e-commerce modern dengan fitur lengkap.',
    category: 'E-Commerce',
    thumbnail: '/project-1.png',
    fallback: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    techStack: ['Next.js', 'Tailwind', 'Stripe'],
    tech: ['Next.js', 'Tailwind', 'Stripe'], // Keep for backward compat in component
    liveDemo: '#',
    github: '#'
  },
  {
    id: '2',
    title: 'SaaS Dashboard',
    slug: 'saas-dashboard',
    description: 'Dashboard analitik untuk platform SaaS.',
    category: 'Web App',
    thumbnail: '/project-2.png',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    techStack: ['React', 'D3.js', 'Firebase'],
    tech: ['React', 'D3.js', 'Firebase'],
    liveDemo: '#',
    github: '#'
  }
];

export default function Portfolio() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(projectsData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const displayProjects = projects.length > 0 ? projects : (loading ? [] : (defaultProjects as unknown as Project[]));

  return (
    <section id="portfolio" className="py-24 bg-[#0A0F1F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Project Pilihan</h2>
            <p className="text-gray-400 max-w-xl">
              Beberapa hasil karya terbaik kami yang telah membantu bisnis klien mencapai target mereka.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/5">
            <a href="https://wa.me/6287739435496?text=Halo%20DiTz%20Store,%20saya%20ingin%20melihat%20lebih%20banyak%20portfolio." target="_blank" rel="noreferrer">
              Lihat Semua Project
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = (project as any).fallback || 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#00D4FF] px-2 py-1 rounded bg-[#00D4FF]/10">
                    {project.category}
                  </span>
                  <div className="flex gap-3">
                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors" title="Github Link">
                      <Terminal className="w-5 h-5" />
                    </a>
                    <a href={project.liveDemo} className="text-gray-400 hover:text-white transition-colors" title="Live Demo">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00D4FF] transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
