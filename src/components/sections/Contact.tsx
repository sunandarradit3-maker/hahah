import React from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addDoc, collection, db, serverTimestamp } from '@/lib/firebase';
import { toast } from 'sonner';

export default function Contact() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('whatsapp') as string,
      message: formData.get('message') as string,
      status: 'New',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'leads'), data);
      toast.success('Pesan terkirim! Kami akan segera menghubungi Anda.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Hubungi Kami</h2>
              <p className="text-gray-400">
                Punya pertanyaan atau ingin mulai membangun website impian Anda? Tim kami siap membantu.
              </p>
            </div>

      <div className="space-y-6">
              <a 
                href="https://wa.me/6287739435496" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF] group-hover:bg-[#00D4FF]/10 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">WhatsApp</div>
                  <div className="text-white font-medium">+62 877-3943-5496</div>
                </div>
              </a>

              <a 
                href="mailto:ditzstoreofficial@gmail.com"
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF] group-hover:bg-[#00D4FF]/10 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Email</div>
                  <div className="text-white font-medium">ditzstoreofficial@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF] group-hover:bg-[#00D4FF]/10 transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Konsultasi</div>
                  <div className="text-white font-medium">Gratis 24/7</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Nama Lengkap</label>
                  <Input name="name" required placeholder="John Doe" className="bg-[#0A0F1F] border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">WhatsApp</label>
                  <Input name="whatsapp" required placeholder="0812..." className="bg-[#0A0F1F] border-white/10 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <Input name="email" type="email" placeholder="john@example.com" className="bg-[#0A0F1F] border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Pesan</label>
                <Textarea name="message" required placeholder="Ceritakan kebutuhan website Anda..." className="bg-[#0A0F1F] border-white/10 text-white min-h-[150px]" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-[#00D4FF] text-black hover:bg-[#00B4FF] py-6 font-bold">
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
