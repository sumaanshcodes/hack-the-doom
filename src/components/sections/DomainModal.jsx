import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldAlert, Cpu, Download } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function DomainModal({ domain, isOpen, onClose }) {
  if (!isOpen || !domain) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background-900/90 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-full bg-background-800 border border-metal-700 shadow-2xl overflow-hidden flex flex-col rounded-sm"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background-800 via-gamma-500 to-background-800"></div>
          
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-metal-800 bg-background-900/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-gamma-500/10 border border-gamma-500 flex items-center justify-center text-gamma-500">
                <domain.icon size={24} />
              </div>
              <div>
                <h3 className="text-metal-500 font-mono text-xs tracking-widest uppercase mb-1">DOMAIN INTELLIGENCE</h3>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-widest uppercase">{domain.name}</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-metal-400 hover:text-gamma-500 transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            
            {/* Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <h4 className="text-gamma-400 font-mono text-sm tracking-widest uppercase mb-3 border-l-2 border-gamma-500 pl-3">Objective</h4>
                <p className="text-metal-400 leading-relaxed text-lg">{domain.objective}</p>
              </div>
              <div>
                <h4 className="text-metal-500 font-mono text-sm tracking-widest uppercase mb-3">Parameters</h4>
                <div className="space-y-4">
                  <div>
                    <span className="block text-xs text-metal-600 uppercase tracking-wider mb-1">Difficulty</span>
                    <span className="inline-block px-3 py-1 bg-background-900 border border-metal-700 text-white text-sm rounded-sm">{domain.difficulty}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-metal-600 uppercase tracking-wider mb-1">Tech Stack Focus</span>
                    <div className="flex flex-wrap gap-2">
                      {domain.technologies.map(tech => (
                        <span key={tech} className="text-xs text-gamma-500 bg-gamma-500/10 border border-gamma-500/20 px-2 py-1 rounded-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Statements */}
            <div>
              <h4 className="text-white font-display font-bold text-xl tracking-widest uppercase mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-gamma-500" />
                Problem Statements
              </h4>
              
              <div className="space-y-6">
                {domain.problemStatements.map((ps, index) => (
                  <div key={ps.id} className="bg-background-900 border border-metal-800 rounded-sm p-6 relative group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-metal-800 group-hover:bg-gamma-500 transition-colors"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="inline-block px-2 py-1 bg-metal-800/50 text-metal-400 text-xs font-mono mb-2 rounded-sm">{ps.id}</span>
                        <h5 className="text-lg font-bold text-white tracking-wide">{ps.title}</h5>
                      </div>
                      {ps.pdfLink && ps.pdfLink !== '#' && (
                        <a href={ps.pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gamma-500 bg-gamma-500/10 px-4 py-2 rounded-sm border border-gamma-500/30 hover:bg-gamma-500 hover:text-background-900 transition-colors shrink-0">
                          <Download size={14} /> Download Details
                        </a>
                      )}
                    </div>
                    
                    <p className="text-metal-400 text-sm leading-relaxed mb-4">{ps.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-metal-800">
                      <div>
                        <h6 className="text-metal-500 text-xs font-mono uppercase tracking-widest mb-2 flex items-center gap-1"><ShieldAlert size={12} /> Requirements</h6>
                        <p className="text-metal-300 text-sm">{ps.requirements}</p>
                      </div>
                      <div>
                        <h6 className="text-metal-500 text-xs font-mono uppercase tracking-widest mb-2">Constraints</h6>
                        <p className="text-metal-300 text-sm">{ps.constraints}</p>
                      </div>
                      <div className="md:col-span-2 mt-2">
                        <h6 className="text-metal-500 text-xs font-mono uppercase tracking-widest mb-2">Expected Outcome</h6>
                        <p className="text-white text-sm bg-background-800 p-3 rounded-sm border border-metal-800/50">{ps.expectedOutcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-metal-800 bg-background-900/80 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-metal-800 text-white font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-metal-700 transition-colors"
            >
              Close Intelligence
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
