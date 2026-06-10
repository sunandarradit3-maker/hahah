import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronRight, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1F]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0080FF] flex items-center justify-center">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                DiTz Store
              </span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-[#00D4FF] px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <Button 
                onClick={() => window.open('https://wa.me/6287739435496?text=Halo%20DiTz%20Store,%20saya%20ingin%20memulai%20project%20website%20baru.', '_blank')}
                size="sm" 
                className="bg-[#00D4FF] text-black hover:bg-[#00B4FF] font-semibold transition-all hover:scale-105"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0A0F1F]/95 backdrop-blur-lg border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-[#00D4FF] block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="px-3 py-2">
              <Button 
                onClick={() => window.open('https://wa.me/6287739435496', '_blank')}
                className="w-full bg-[#00D4FF] text-black hover:bg-[#00B4FF]"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
