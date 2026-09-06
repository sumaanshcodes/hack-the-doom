import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  { text: "INITIALIZING DOOM PROTOCOL...", delay: 0 },
  { text: "SYSTEM CHECK", delay: 800 },
  { text: "████████████████████ 100%", delay: 1500 },
  { text: "GAMMA CORE ........ ONLINE", delay: 2000 },
  { text: "NETWORK ........... ONLINE", delay: 2400 },
  { text: "HACK ENGINE ....... ONLINE", delay: 2800 },
  { text: "DOOM PROTOCOL ..... ACTIVE", delay: 3200 },
];

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timeouts = [];

    bootSequence.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, item.text]);
        
        if (index === bootSequence.length - 1) {
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 1000); // Wait for fade out
          }, 1000);
        }
      }, item.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-background-900 flex flex-col items-center justify-center font-mono text-gamma-500 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 scanline opacity-50"></div>
          
          <div className="w-full max-w-2xl px-6 flex flex-col justify-end min-h-[300px]">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm md:text-base lg:text-lg mb-2"
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-gamma-500 mt-2"
            />
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: lines.length >= bootSequence.length ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-widest glow-text">
              HACK THE DOOM
            </h1>
            <p className="mt-4 text-gamma-400 tracking-[0.2em] text-sm md:text-base">
              BUILD. BREAK. SURVIVE.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
