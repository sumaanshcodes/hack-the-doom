import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eventData } from '../../data/eventData';

export default function MissionIntelligence() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    if (!eventData.eventDate) {
      setIsCountdownActive(false);
      return;
    }

    const targetDate = new Date(eventData.eventDate).getTime();
    if (isNaN(targetDate)) {
      setIsCountdownActive(false);
      return;
    }

    setIsCountdownActive(true);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="py-8 relative bg-background-800 border-y border-metal-800 z-20 shadow-2xl">
      <div className="absolute inset-0 scanline opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Mission Status Strip (Left) */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-8 w-full lg:w-auto flex-1">
            <div className="flex flex-col border-l-2 border-gamma-500 pl-4 py-1">
              <span className="text-metal-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">MISSION STATUS</span>
              <span className="text-white font-display font-bold uppercase tracking-wider text-sm md:text-base">
                {eventData.eventDate ? "SYSTEM ONLINE" : "COMING SOON"}
              </span>
            </div>
            
            <div className="flex flex-col border-l-2 border-metal-700 pl-4 py-1">
              <span className="text-metal-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">TEAM SIZE</span>
              <span className="text-white font-display font-bold uppercase tracking-wider text-sm md:text-base">
                {eventData.teamSize.isTbd ? "TBD" : `${eventData.teamSize.min} - ${eventData.teamSize.max} MEMBERS`}
              </span>
            </div>

            <div className="flex flex-col border-l-2 border-metal-700 pl-4 py-1">
              <span className="text-metal-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">TRACKS</span>
              <span className="text-white font-display font-bold uppercase tracking-wider text-sm md:text-base">
                {eventData.domains.length} DOMAINS
              </span>
            </div>

            <div className="flex flex-col border-l-2 border-metal-700 pl-4 py-1">
              <span className="text-metal-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">EVENT MODE</span>
              <span className="text-white font-display font-bold uppercase tracking-wider text-sm md:text-base">
                {eventData.eventMode || "TBD"}
              </span>
            </div>
          </div>

          {/* Countdown (Right) */}
          <div className="flex items-center gap-2 bg-background-900 border border-metal-800 p-3 rounded-sm shadow-inner min-w-[300px] justify-center">
            {isCountdownActive ? (
              <>
                <div className="flex flex-col items-center px-3">
                  <span className="text-2xl font-display font-bold text-white glow-text">{timeLeft.days}</span>
                  <span className="text-metal-500 font-mono text-[10px] uppercase">DAYS</span>
                </div>
                <span className="text-gamma-500 font-display text-xl pb-3">:</span>
                <div className="flex flex-col items-center px-3">
                  <span className="text-2xl font-display font-bold text-white glow-text">{timeLeft.hours}</span>
                  <span className="text-metal-500 font-mono text-[10px] uppercase">HRS</span>
                </div>
                <span className="text-gamma-500 font-display text-xl pb-3">:</span>
                <div className="flex flex-col items-center px-3">
                  <span className="text-2xl font-display font-bold text-white glow-text">{timeLeft.minutes}</span>
                  <span className="text-metal-500 font-mono text-[10px] uppercase">MIN</span>
                </div>
                <span className="text-gamma-500 font-display text-xl pb-3">:</span>
                <div className="flex flex-col items-center px-3">
                  <span className="text-2xl font-display font-bold text-white glow-text">{timeLeft.seconds}</span>
                  <span className="text-metal-500 font-mono text-[10px] uppercase">SEC</span>
                </div>
              </>
            ) : (
              <div className="px-6 py-2">
                <span className="text-xl font-display font-bold text-gamma-500 tracking-[0.3em] glow-text">COMING SOON</span>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
