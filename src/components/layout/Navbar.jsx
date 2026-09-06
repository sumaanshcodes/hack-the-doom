import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Domains', href: '/#domains' },
  { name: 'Prizes', href: '/#prizes' },
  { name: 'Sponsors', href: '/#sponsors' },
  { name: 'Judges', href: '/#judges' },
  { name: 'Mentors', href: '/#mentors' },
  { name: 'Timeline', href: '/#timeline' },
  { name: 'Rules', href: '/#rules' },
  { name: 'FAQ', href: '/#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-background-900/80 backdrop-blur-md py-4 border-gamma-500/20" 
            : "bg-transparent py-6 border-transparent"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm bg-gamma-500 flex items-center justify-center text-background-900 font-display font-bold group-hover:glow-box transition-all">
              H4T
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              HACK<span className="text-gamma-500">4</span>TECH
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-metal-400 hover:text-gamma-400 transition-colors uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gamma-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            <Link
              to="/register"
              className="ml-4 px-6 py-2.5 bg-gamma-500 text-background-900 font-bold tracking-wider rounded-sm hover:bg-gamma-400 transition-all glow-box transform hover:-translate-y-0.5"
            >
              REGISTER NOW
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white hover:text-gamma-500 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background-900/95 backdrop-blur-xl flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button 
                className="text-white hover:text-gamma-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 pb-20">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold text-white hover:text-gamma-500 hover:glow-text uppercase tracking-widest transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 w-full max-w-sm"
              >
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-4 bg-gamma-500 text-background-900 font-bold text-lg tracking-widest rounded-sm hover:bg-gamma-400 transition-all glow-box"
                >
                  REGISTER NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
