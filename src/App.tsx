import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import Statistics from './components/sections/Statistics';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import Blog from './components/sections/Blog';
import Founder from './components/sections/Founder';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import AdminPage from './pages/Admin';
import { Toaster } from '@/components/ui/sonner';

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <Services />
        <Portfolio />
        <Blog />
        <Founder />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0F1F] text-white selection:bg-[#00D4FF]/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Toaster position="top-right" theme="dark" />
      </div>
    </Router>
  );
}
