import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db, collection, onSnapshot, query, orderBy } from '@/lib/firebase';
import type { BlogPost } from '@/types';

const defaultPosts = [
  {
    id: '1',
    title: 'Pentingnya Website Untuk UMKM di Era Digital 2024',
    slug: 'pentingnya-website-umkm',
    content: 'Isi konten artikel...',
    excerpt: 'Mengapa bisnis Anda membutuhkan kehadiran online yang kuat untuk bersaing...',
    date: '10 Jun 2026',
    author: 'Radit Sunandar',
    thumbnail: '/blog-1.png',
    fallback: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Blog() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setPosts(postsData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const displayPosts = posts.length > 0 ? posts : (loading ? [] : (defaultPosts as unknown as BlogPost[]));

  return (
    <section id="blog" className="py-24 bg-[#0A0F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Update Terbaru</h2>
            <p className="text-gray-400 max-w-xl">
              Wawasan dan berita terbaru seputar teknologi, desain, dan strategi digital untuk bisnis Anda.
            </p>
          </div>
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
            Lihat Semua Artikel
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col md:flex-row gap-8 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00D4FF]/30 transition-all"
            >
              <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={(post as any).image || (post as any).thumbnail} 
                  alt={post.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = (post as any).fallback || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{(post as any).date || (post as any).createdAt?.toDate().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author || 'DiTz Store'}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00D4FF] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {post.excerpt || (post as any).content?.substring(0, 100) + '...'}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#00D4FF] text-sm font-semibold hover:gap-3 transition-all pt-2">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
