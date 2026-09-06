import { eventData } from '../../data/eventData';
import { Mail, Link2, Camera, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-background-900 border-t border-metal-800 pt-24 pb-12 overflow-hidden">
      {/* Background Texture & Particles */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 scanline opacity-30"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-gamma-600/10 blur-[100px] rounded-t-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <h3 className="text-gamma-400 font-mono text-xs tracking-[0.3em] mb-2 uppercase">A PROJECT BY HACK4TECH</h3>
            <h2 className="text-3xl font-display font-black text-white tracking-widest uppercase mb-4">
              HACK THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gamma-500 to-gamma-400">DOOM</span>
            </h2>
            <p className="text-metal-400 text-sm leading-relaxed mb-6">
              BUILD. BREAK. SURVIVE. <br/>
              An elite national-level hackathon experience at GLA University, Mathura.
            </p>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 className="text-white font-display font-bold tracking-widest uppercase mb-6 border-l-2 border-gamma-500 pl-3">Navigation</h4>
            <ul className="space-y-3 font-mono text-sm uppercase tracking-widest">
              {['Home', 'About', 'Domains', 'Prizes', 'Timeline', 'FAQ'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-metal-400 hover:text-gamma-500 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="/register" className="text-gamma-400 hover:text-gamma-300 transition-colors flex items-center gap-2 group font-bold">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Register Now
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-display font-bold tracking-widest uppercase mb-6 border-l-2 border-gamma-500 pl-3">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${eventData.socialLinks.email}`} className="text-metal-400 hover:text-white transition-colors flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-sm bg-metal-800 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-gamma-500" />
                  </div>
                  {eventData.socialLinks.email}
                </a>
              </li>
              <li>
                <a href={eventData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-sm bg-metal-800 flex items-center justify-center shrink-0">
                    <Link2 size={14} className="text-gamma-500" />
                  </div>
                  LinkedIn / Hack4Tech
                </a>
              </li>
              <li>
                <a href={eventData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-sm bg-metal-800 flex items-center justify-center shrink-0">
                    <Camera size={14} className="text-gamma-500" />
                  </div>
                  Instagram / Hack4Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Location Col */}
          <div>
            <h4 className="text-white font-display font-bold tracking-widest uppercase mb-6 border-l-2 border-gamma-500 pl-3">Location</h4>
            <div className="flex items-start gap-3 text-metal-400 text-sm">
              <div className="w-8 h-8 rounded-sm bg-metal-800 flex items-center justify-center shrink-0 mt-1">
                <MapPin size={14} className="text-gamma-500" />
              </div>
              <p className="leading-relaxed">
                GLA University<br/>
                17km Stone, NH-2<br/>
                Mathura-Delhi Road<br/>
                Chaumuhan, Mathura<br/>
                Uttar Pradesh 281406
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-metal-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-metal-500 text-xs font-mono uppercase tracking-widest text-center md:text-left">
            © 2026 HACK4TECH • GLA UNIVERSITY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4">
            <span className="w-1.5 h-1.5 bg-gamma-500 rounded-full animate-pulse"></span>
            <span className="text-metal-500 text-[10px] font-mono tracking-widest">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
