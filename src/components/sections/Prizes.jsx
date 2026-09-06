import { motion } from 'framer-motion';
import { Trophy, Award, Star } from 'lucide-react';
import { eventData } from '../../data/eventData';
import { cn } from '../../utils/cn';

export default function Prizes() {
  const prizes = [
    {
      title: "1ST PLACE BOUNTY",
      amount: "COMING SOON",
      icon: Trophy,
      color: "gamma",
      featured: true,
      perks: ["Direct entry to incubation", "Premium Swag Kit", "1 Year Pro Cloud Credits"]
    },
    {
      title: "2ND PLACE",
      amount: "TBD",
      icon: Award,
      color: "metal",
      featured: false,
      perks: ["Premium Swag Kit", "6 Months Pro Cloud Credits"]
    },
    {
      title: "3RD PLACE",
      amount: "TBD",
      icon: Award,
      color: "metal",
      featured: false,
      perks: ["Swag Kit", "3 Months Pro Cloud Credits"]
    }
  ];

  const specialAwards = [
    "BEST UI/UX DESIGN",
    "MOST INNOVATIVE HACK",
    "BEST SOCIAL IMPACT",
    "BEST ALL-GIRLS TEAM"
  ];

  return (
    <section id="prizes" className="py-24 relative bg-background-800 overflow-hidden border-t border-background-700">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gamma-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gamma-500 font-mono tracking-[0.2em] mb-4 uppercase text-sm"
          >
            Mission Rewards
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider mb-6 uppercase"
          >
            BOUNTY POOL
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-metal-400 max-w-2xl mx-auto"
          >
            Total Prize Pool: <span className="text-gamma-500 font-bold">{eventData.prizePool}</span> (TBD)
          </motion.p>
        </div>

        {/* Main Prizes */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-20 lg:items-stretch">
          {prizes.map((prize, index) => {
            const Icon = prize.icon;
            return (
              <motion.div
                key={prize.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={cn(
                  "relative bg-background-900 border flex flex-col w-full max-w-md",
                  prize.featured 
                    ? "border-gamma-500 shadow-[0_0_30px_rgba(57,255,136,0.15)] lg:-translate-y-8 z-10 rounded-sm" 
                    : "border-metal-800 hover:border-metal-600 rounded-sm"
                )}
              >
                {/* Glow for featured */}
                {prize.featured && (
                  <div className="absolute inset-0 bg-gradient-to-b from-gamma-500/10 to-transparent"></div>
                )}
                
                <div className="p-8 flex flex-col items-center text-center relative z-10 flex-1">
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mb-6",
                    prize.featured ? "bg-gamma-500/20 text-gamma-500 border border-gamma-500" : "bg-metal-800 text-metal-400"
                  )}>
                    <Icon size={40} />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-2 tracking-widest">{prize.title}</h3>
                  
                  <div className={cn(
                    "text-3xl md:text-4xl font-black mb-8 font-display tracking-wider",
                    prize.featured ? "text-gamma-400 glow-text" : "text-metal-300"
                  )}>
                    {prize.amount}
                  </div>
                  
                  <div className="w-full h-px bg-metal-800 mb-6"></div>
                  
                  <ul className="space-y-4 text-sm text-metal-400 text-left w-full mt-auto">
                    {prize.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Star size={16} className={prize.featured ? "text-gamma-500 mt-0.5 shrink-0" : "text-metal-600 mt-0.5 shrink-0"} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Special Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-background-900/80 border border-metal-800 rounded-sm p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-8 text-center uppercase tracking-widest">
              Special Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialAwards.map((award, i) => (
                <div key={i} className="flex items-center gap-4 bg-background-800 border border-metal-800 p-4 rounded-sm hover:border-metal-600 transition-colors">
                  <div className="w-10 h-10 bg-metal-800 rounded-sm flex items-center justify-center text-metal-400 shrink-0">
                    <Star size={18} />
                  </div>
                  <span className="font-bold tracking-widest text-white text-sm md:text-base uppercase">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
