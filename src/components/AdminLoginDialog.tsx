import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AdminLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginDialog({ isOpen, onClose }: AdminLoginDialogProps) {
  const [username, setUsername] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // In production, these should be handled securely.
  // For this context, we check against env or hardcoded (hidden from UI)
  const ADMIN_USER = "DiTz";
  const ADMIN_PIN = "082009";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Artificial delay for realism
    setTimeout(() => {
      if (username === ADMIN_USER && pin === ADMIN_PIN) {
        localStorage.setItem('admin_access', 'true');
        toast.success('Login Berhasil!');
        navigate('/admin');
        onClose();
      } else {
        toast.error('Username atau PIN salah!');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#0D1425] border border-white/10 rounded-3xl p-8 shadow-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00D4FF]/10 rounded-2xl flex items-center justify-center text-[#00D4FF] mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Staff Entrance</h2>
              <p className="text-gray-400 text-sm mt-2">Masukkan kredensial khusus untuk mengakses panel.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <User className="w-4 h-4" /> Username
                </label>
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all"
                  placeholder="Masukkan username..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Security PIN
                </label>
                <input 
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00D4FF] outline-none transition-all tracking-[0.5em]"
                  placeholder="••••••"
                  maxLength={6}
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00D4FF] text-black hover:bg-[#00B4FF] h-12 rounded-xl font-bold mt-6 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                {loading ? 'Memverifikasi...' : 'Akses Panel'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
