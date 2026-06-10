import React from 'react';
import { Globe, Users, Terminal, Mail, Phone, MapPin } from 'lucide-react';
import AdminLoginDialog from './AdminLoginDialog';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isAdminOpen, setIsAdminOpen] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  const handleHiddenTrigger = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 2) {
      setIsAdminOpen(true);
      setClickCount(0);
    }
    // Reset click count after 3 seconds
    setTimeout(() => setClickCount(0), 3000);
  };

  return (
    <footer className="bg-[#0A0F1F] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">DiTz Store</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solusi Website Modern Untuk UMKM, Startup & Bisnis Indonesia. Kualitas premium dengan harga kompetitif.
            </p>
            <div className="flex space-x-4">
              <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://instagram.com', '_blank'); }} className="text-gray-400 hover:text-[#00D4FF] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://linkedin.com', '_blank'); }} className="text-gray-400 hover:text-[#00D4FF] transition-colors">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://github.com', '_blank'); }} className="text-gray-400 hover:text-[#00D4FF] transition-colors">
                <Terminal className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Layanan</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Landing Page</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Company Profile</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">E-Commerce</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">Admin Dashboard</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Perusahaan</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#portfolio" className="hover:text-[#00D4FF] transition-colors">Portfolio</a></li>
              <li><a href="#blog" className="hover:text-[#00D4FF] transition-colors">Blog</a></li>
              <li><a href="#about" className="hover:text-[#00D4FF] transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-[#00D4FF] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Kontak</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <a href="mailto:ditzstoreofficial@gmail.com" className="flex items-center gap-3 hover:text-[#00D4FF] transition-colors">
                  <Mail className="w-4 h-4 text-[#00D4FF]" />
                  <span>ditzstoreofficial@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a href="https://wa.me/6287739435496" target="_blank" className="flex items-center gap-3 hover:text-[#00D4FF] transition-colors" rel="noreferrer">
                  <Phone className="w-4 h-4 text-[#00D4FF]" />
                  <span>+62 877-3943-5496</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#00D4FF]" />
                <span>Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            <span 
              onClick={handleHiddenTrigger}
              className="cursor-default select-none pr-1"
            >
              ©
            </span> 
            {currentYear} DiTz Store Agency. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      <AdminLoginDialog 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </footer>
  );
}
