import { motion } from 'framer-motion';
import { eventData } from '../../data/eventData';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';

function SponsorCarousel({ sponsors, direction = "left", speed = "30s" }) {
  if (!sponsors || sponsors.length === 0) {
    return (
      <div className="py-12 border border-dashed border-metal-800 rounded-sm bg-background-900/50">
        <p className="text-metal-500 font-mono text-center tracking-widest uppercase">SPONSORS TBD - COMING SOON</p>
      </div>
    );
  }

  // Duplicate the array to create an infinite loop effect
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Edge Gradients */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background-900 to-transparent z-10 pointer-events-none"></div>

      <div 
        className={cn(
          "flex gap-6 w-max",
          direction === "left" ? "animate-scroll" : "animate-scroll" // Could adjust animation for right-to-left
        )}
        style={{ animationDuration: speed }}
      >
        {duplicatedSponsors.map((sponsor, idx) => (
          <div 
            key={`${sponsor.name}-${idx}`} 
            className="w-[300px] h-[200px] bg-background-800 border border-metal-800 rounded-sm relative group/card shrink-0 flex items-center justify-center p-6 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-gamma-500 hover:shadow-[0_0_30px_rgba(57,255,136,0.15)] hover:z-20"
          >
            {/* Background Blur on siblings - managed by group hover in Tailwind with peer/has logic if needed, but easier to just let scale pop it out */}
            
            <img 
              src={sponsor.logoUrl} 
              alt={sponsor.name} 
              className="max-w-full max-h-full object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-300 opacity-60 group-hover/card:opacity-20"
            />
            
            {/* Hover Details Overlay */}
            <div className="absolute inset-0 bg-background-900/90 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              <span className="text-gamma-500 font-mono text-[10px] tracking-widest uppercase mb-2 border border-gamma-500/30 px-2 py-1 rounded-sm bg-gamma-500/10">
                {sponsor.category}
              </span>
              <h4 className="text-lg font-display font-bold text-white mb-2">{sponsor.name}</h4>
              <p className="text-metal-400 text-xs mb-4">{sponsor.description}</p>
              {sponsor.url && sponsor.url !== "#" && (
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gamma-500 flex items-center gap-1 text-xs uppercase tracking-widest font-bold transition-colors">
                  <ExternalLink size={14} /> Visit
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 relative bg-background-900 overflow-hidden border-t border-background-700">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Event Sponsors */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gamma-500 font-mono tracking-[0.2em] mb-4 uppercase text-sm"
            >
              Strategic Partners
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider mb-6 uppercase"
            >
              EVENT SPONSORS
            </motion.h2>
          </div>
          
          <SponsorCarousel sponsors={eventData.sponsors} speed="40s" />
        </div>

        {/* Past Sponsors */}
        <div>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-metal-500 tracking-wider mb-6 uppercase"
            >
              PAST SPONSORS
            </motion.h2>
          </div>
          
          {/* We use a slightly different animation speed for visual interest */}
          <SponsorCarousel sponsors={eventData.pastSponsors} speed="35s" />
        </div>

      </div>
    </section>
  );
}
