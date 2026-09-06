import { useState } from 'react';
import { motion } from 'framer-motion';
import { eventData } from '../../data/eventData';
import DomainModal from './DomainModal';
import { ArrowUpRight, Cpu } from 'lucide-react';

export default function Domains() {
  const [selectedDomain, setSelectedDomain] = useState(null);

  return (
    <section id="domains" className="py-24 relative bg-background-900 overflow-hidden border-t border-background-700">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-gamma-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gamma-500 font-mono tracking-[0.2em] mb-4 uppercase text-sm"
          >
            Operation Sectors
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider mb-6 uppercase"
          >
            DOMAINS & TRACKS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-metal-400 max-w-2xl mx-auto"
          >
            Select a domain to access detailed problem statements, technical constraints, and expected outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {eventData.domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedDomain(domain)}
                className="group relative bg-background-800/50 backdrop-blur-sm border border-metal-800 rounded-sm p-6 cursor-pointer overflow-hidden hover:border-gamma-500 transition-all duration-300"
              >
                {/* Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-gamma-500/0 to-gamma-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gamma-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-background-900 border border-metal-700 group-hover:border-gamma-500/50 rounded-sm flex items-center justify-center text-metal-400 group-hover:text-gamma-500 transition-colors">
                      <Icon size={24} />
                    </div>
                    <span className="text-metal-600 font-mono text-xs font-bold tracking-widest group-hover:text-gamma-500/50 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-2 tracking-wide uppercase group-hover:text-gamma-400 transition-colors">
                    {domain.name}
                  </h3>
                  
                  <p className="text-metal-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
                    {domain.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-metal-800/50 pt-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-metal-500 group-hover:text-white transition-colors">
                      <Cpu size={14} /> 
                      {domain.problemStatements?.length || 0} Problems
                    </div>
                    <ArrowUpRight size={16} className="text-metal-600 group-hover:text-gamma-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <DomainModal 
        isOpen={!!selectedDomain} 
        domain={selectedDomain} 
        onClose={() => setSelectedDomain(null)} 
      />
    </section>
  );
}
