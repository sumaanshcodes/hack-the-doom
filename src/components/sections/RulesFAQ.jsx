import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventData } from '../../data/eventData';
import { ChevronDown, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

function FAQAccordion({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-metal-800 rounded-sm bg-background-800/50 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-background-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gamma-500 group"
      >
        <span className="font-display font-bold text-lg text-white tracking-wider pr-8 group-hover:text-gamma-400 transition-colors">
          {faq.question}
        </span>
        <ChevronDown 
          size={20} 
          className={cn(
            "text-gamma-500 transition-transform duration-300 flex-shrink-0",
            isOpen ? "rotate-180" : "rotate-0"
          )} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 text-metal-400 leading-relaxed border-t border-metal-800/30">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RulesFAQ() {
  return (
    <section id="faq" className="py-24 relative bg-background-800 overflow-hidden border-t border-background-700">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gamma-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Rules / Left Col */}
          <div className="lg:w-1/3">
            {/* 
              ============================================================
              IMPORTANT: OFFICIAL PDF INTEGRATION INSTRUCTIONS
              ============================================================
              When the official Rulebook PDF is provided:
              1. Extract the EXACT content.
              2. Preserve all wording, numbering, and headings.
              3. DO NOT paraphrase or "improve" official wording.
              4. Replace the dummy text below with the exact rules.
              ============================================================
            */}
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gamma-500 font-mono tracking-[0.2em] mb-4 uppercase text-sm"
            >
              Guidelines
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-white tracking-wider mb-6 uppercase"
            >
              RULES & CONDUCT
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-metal-400 mb-8"
            >
              All participants must adhere to the official hackathon rules. Misrepresentation, plagiarism, or breaking conduct guidelines will result in immediate disqualification.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              id="rules"
            >
              <a 
                href="/participant-guide.pdf" // Placeholder URL
                target="_blank"
                className="inline-flex items-center gap-3 px-6 py-4 bg-background-900 border border-gamma-500 text-white font-bold tracking-widest rounded-sm hover:bg-gamma-500 hover:text-background-900 transition-all group w-full justify-center"
              >
                <FileText size={20} className="group-hover:text-background-900 text-gamma-500" />
                <span>DOWNLOAD PARTICIPANT GUIDE</span>
              </a>
              <p className="text-metal-600 text-xs mt-3 text-center uppercase tracking-widest">
                Comprehensive Rules & FAQs (PDF)
              </p>
            </motion.div>
          </div>

          {/* FAQs / Right Col */}
          <div className="lg:w-2/3">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold text-white tracking-wider mb-8 uppercase"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>
            
            <div className="space-y-4">
              {eventData.faqs.map((faq, index) => (
                <FAQAccordion key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
