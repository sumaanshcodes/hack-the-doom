import { motion } from 'framer-motion';
import { eventData } from '../../data/eventData';
import { Link2 } from 'lucide-react';
import { cn } from '../../utils/cn';

function PeopleCarousel({ people, speed = "35s" }) {
  if (!people || people.length === 0) {
    return (
      <div className="py-12 border border-dashed border-metal-800 rounded-sm bg-background-900/50">
        <p className="text-metal-500 font-mono text-center tracking-widest uppercase">PERSONNEL TBD - COMING SOON</p>
      </div>
    );
  }

  const duplicatedPeople = [...people, ...people, ...people];

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Edge Gradients */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background-800 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background-800 to-transparent z-10 pointer-events-none"></div>

      <div 
        className="flex gap-6 w-max animate-scroll"
        style={{ animationDuration: speed }}
      >
        {duplicatedPeople.map((person, idx) => (
          <div 
            key={`${person.name}-${idx}`} 
            className="w-[280px] h-[380px] bg-background-900 border border-metal-800 rounded-sm relative group/card shrink-0 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-gamma-500 hover:shadow-[0_0_30px_rgba(57,255,136,0.15)] hover:z-20"
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img 
                src={person.photo} 
                alt={person.name} 
                className="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 transition-all duration-500 opacity-70 group-hover/card:opacity-100 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-900 via-background-900/40 to-transparent"></div>
            </div>

            {/* Content (Bottom aligned) */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
              <span className="text-gamma-500 font-mono text-[10px] tracking-widest uppercase mb-2 border border-gamma-500/30 px-2 py-1 rounded-sm bg-background-900/80 backdrop-blur w-max">
                {person.expertise}
              </span>
              <h4 className="text-xl font-display font-bold text-white mb-1 group-hover/card:text-gamma-400 transition-colors">{person.name}</h4>
              <p className="text-metal-300 text-sm font-bold uppercase tracking-widest mb-1">{person.role}</p>
              <p className="text-metal-500 text-xs uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">{person.organization}</p>
            </div>

            {/* Social Link (Top Right) */}
            {person.linkedin && person.linkedin !== "#" && (
              <a 
                href={person.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute top-4 right-4 w-10 h-10 bg-background-900/80 backdrop-blur border border-metal-700 rounded-sm flex items-center justify-center text-metal-400 hover:bg-gamma-500 hover:text-background-900 hover:border-gamma-500 transition-all opacity-0 group-hover/card:opacity-100 duration-300"
              >
                <Link2 size={18} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function People() {
  return (
    <section id="people" className="py-24 relative bg-background-800 overflow-hidden border-t border-background-700">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Judges */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gamma-500 font-mono tracking-[0.2em] mb-4 uppercase text-sm"
            >
              Evaluation Committee
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider uppercase"
            >
              EXPERT JUDGES
            </motion.h2>
          </div>
          
          <PeopleCarousel people={eventData.judges} speed="45s" />
        </div>

        {/* Mentors */}
        <div>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-metal-400 tracking-wider uppercase"
            >
              MISSION MENTORS
            </motion.h2>
          </div>
          
          <PeopleCarousel people={eventData.mentors} speed="40s" />
        </div>

      </div>
    </section>
  );
}
