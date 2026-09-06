import { motion } from 'framer-motion';
import { eventData } from '../../data/eventData';
import { cn } from '../../utils/cn';
import { Clock } from 'lucide-react';

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 relative bg-background-900 overflow-hidden border-t border-background-700">
      <div className="absolute top-1/2 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gamma-500/5 via-background-900 to-background-900 pointer-events-none -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gamma-500 font-mono tracking-[0.2em] mb-4 uppercase text-sm"
          >
            Mission Operations
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider mb-6 uppercase"
          >
            EVENT TIMELINE
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Central Energy Rail */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-metal-800 -translate-x-1/2">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full bg-gamma-500 shadow-[0_0_15px_rgba(57,255,136,1)]"
            ></motion.div>
          </div>

          <div className="space-y-16 relative z-10">
            {eventData.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="flex flex-col md:flex-row items-center md:items-start relative group">
                  
                  {/* Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-background-900 border-4 border-gamma-500 -translate-x-1/2 mt-1 shadow-[0_0_15px_rgba(57,255,136,0.8)] z-20 transition-transform duration-300 group-hover:scale-125 group-hover:bg-gamma-500"></div>

                  {/* Content Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className={cn(
                      "ml-16 md:ml-0 md:w-1/2 pl-0 flex flex-col w-full",
                      isEven ? "md:pr-12 md:items-end md:text-right" : "md:pl-12 md:ml-auto md:items-start text-left"
                    )}
                  >
                    {/* Phase HUD Indicator */}
                    <div className={cn(
                      "flex items-center gap-2 mb-2",
                      isEven ? "md:flex-row-reverse" : "flex-row"
                    )}>
                      <span className="text-gamma-500 font-mono text-[10px] uppercase tracking-widest border border-gamma-500/30 bg-gamma-500/10 px-2 py-1 rounded-sm">
                        {item.phase || `PHASE ${index + 1}`}
                      </span>
                    </div>

                    {/* Main Panel */}
                    <div className="bg-background-800/80 backdrop-blur-sm border border-metal-800 p-6 rounded-sm hover:border-gamma-500 transition-colors relative w-full group-hover:shadow-[0_0_30px_rgba(57,255,136,0.1)]">
                      {/* Corner Accent */}
                      <div className={cn(
                        "absolute top-0 w-4 h-4 border-t-2 border-gamma-500",
                        isEven ? "right-0 border-r-2" : "left-0 border-l-2"
                      )}></div>

                      <h4 className="text-xl md:text-2xl font-display font-bold text-white tracking-widest uppercase mb-3">
                        {item.title}
                      </h4>
                      
                      <div className={cn(
                        "flex items-center gap-2 mb-4 text-metal-400 font-mono text-sm tracking-widest uppercase",
                        isEven ? "md:justify-end" : "justify-start"
                      )}>
                        <Clock size={14} className="text-gamma-500" />
                        <span>{item.date} {item.time && `| ${item.time}`}</span>
                      </div>
                      
                      <p className="text-metal-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
