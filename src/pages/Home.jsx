import { useEffect } from 'react';
import Stats from '../components/sections/Stats';
import About from '../components/sections/About';
import Domains from '../components/sections/Domains';
import Prizes from '../components/sections/Prizes';
import Sponsors from '../components/sections/Sponsors';
import People from '../components/sections/People';
import Timeline from '../components/sections/Timeline';
import RulesFAQ from '../components/sections/RulesFAQ';

export default function Home() {
  useEffect(() => {
    // Scroll to hash if present on mount
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-background-900 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40 mix-blend-luminosity transform scale-105"
            style={{ backgroundImage: `url('/src/assets/doom_silhouette.png')` }}
          ></div>
          
          {/* Gradient Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-900 via-background-900/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-900 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background-900 via-transparent to-background-900 opacity-80"></div>
          
          {/* Gamma Core Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-gamma-600/15 rounded-full blur-[150px] pointer-events-none"></div>
          
          {/* Scanlines and Grid */}
          <div className="absolute inset-0 scanline opacity-40"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(57, 255, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 136, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-gamma-400 tracking-[0.4em] font-medium text-sm md:text-base mb-4 uppercase">
            HACK4TECH PRESENTS
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white mb-4 tracking-wider glow-text uppercase drop-shadow-2xl">
            HACK THE <br className="md:hidden" /> DOOM
          </h1>
          <p className="text-xl md:text-3xl text-gamma-500 mb-4 font-bold tracking-[0.2em] uppercase">
            BUILD. BREAK. SURVIVE.
          </p>
          <p className="text-sm md:text-lg text-metal-400 mb-12 uppercase tracking-widest font-mono">
            GLA UNIVERSITY, MATHURA
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a 
              href="/register" 
              className="px-10 py-5 bg-gamma-500 text-background-900 font-bold tracking-widest rounded-sm hover:bg-gamma-400 transition-all glow-box transform hover:-translate-y-1 text-lg uppercase"
            >
              REGISTER NOW
            </a>
            <a 
              href="#about" 
              className="px-10 py-5 bg-background-900/80 backdrop-blur-sm text-white font-bold tracking-widest rounded-sm hover:bg-background-800 transition-all border border-metal-700 hover:border-gamma-500 transform hover:-translate-y-1 text-lg uppercase"
            >
              EXPLORE EVENT
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      <Stats />
      <About />
      <Domains />
      <Prizes />
      <Sponsors />
      <People />
      <Timeline />
      <RulesFAQ />
      
      {/* Final CTA */}
      <section className="py-32 relative bg-background-900 border-t border-background-700 overflow-hidden text-center">
        <div className="absolute inset-0 scanline opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gamma-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-widest mb-6 glow-text uppercase">
            READY TO ENTER <br className="md:hidden" /> THE DOOM?
          </h2>
          <p className="text-2xl md:text-3xl font-display font-bold text-gamma-500 mb-12 tracking-widest uppercase">
            BUILD. BREAK. SURVIVE.
          </p>
          <a 
            href="/register" 
            className="inline-block px-12 py-6 bg-gamma-500 text-background-900 font-bold tracking-widest text-xl rounded-sm hover:bg-gamma-400 transition-all glow-box transform hover:-translate-y-1"
          >
            REGISTER NOW
          </a>
        </div>
      </section>
    </div>
  );
}
