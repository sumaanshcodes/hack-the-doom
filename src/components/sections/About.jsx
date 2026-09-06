import { motion } from 'framer-motion';
import { Terminal, Users, Cpu, Trophy, Target, Presentation } from 'lucide-react';
import { eventData } from '../../data/eventData';

export default function About() {
  const reasons = [
    { icon: Terminal, title: "BUILD", desc: "Build meaningful technology to solve real-world problems." },
    { icon: Target, title: "COMPETE", desc: "Compete with talented builders from across the region." },
    { icon: Cpu, title: "LEARN", desc: "Learn through mentors, workshops, and industry exposure." },
    { icon: Users, title: "NETWORK", desc: "Connect with developers, innovators and professionals." },
    { icon: Trophy, title: "WIN", desc: "Compete for prizes, recognition and exclusive opportunities." },
    { icon: Presentation, title: "SHOWCASE", desc: "Present your innovative solution to expert judges." },
  ];

  return (
    <section id="about" className="py-24 relative bg-background-800 overflow-hidden border-t border-background-700">
      {/* Background elements */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gamma-500/5 blur-[150px] pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gamma-500 font-mono tracking-[0.2em] mb-4 uppercase text-sm"
          >
            Mission Briefing
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider mb-6"
          >
            ABOUT <span className="text-gamma-400">HACK THE DOOM</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-metal-400 text-lg leading-relaxed"
          >
            {eventData.description} Set in the high-tech environment of {eventData.institution}, {eventData.location}, we challenge you to push the boundaries of innovation under the theme: <strong className="text-white">Build. Break. Survive.</strong>
          </motion.p>
        </div>

        <div className="mb-12 text-center">
          <h3 className="text-2xl font-display font-bold text-white tracking-widest uppercase border-l-4 border-gamma-500 pl-4 inline-block">Why Participate?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div 
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background-900/80 backdrop-blur p-8 rounded-sm border border-metal-800 hover:border-gamma-500/50 group transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gamma-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                
                <div className="w-12 h-12 bg-background-800 rounded-sm flex items-center justify-center mb-6 group-hover:bg-gamma-500/20 transition-colors border border-metal-700 group-hover:border-gamma-500/50">
                  <Icon className="text-metal-400 group-hover:text-gamma-400 transition-colors" size={24} />
                </div>
                
                <h4 className="text-xl font-display font-bold text-white mb-3 tracking-wider group-hover:text-gamma-400 transition-colors">
                  {reason.title}
                </h4>
                <p className="text-metal-400 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
