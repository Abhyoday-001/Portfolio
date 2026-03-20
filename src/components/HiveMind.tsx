import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, ExternalLink, Terminal as TerminalIcon } from 'lucide-react';
import { certificates } from '../data';

const Hexagon = ({ cert, index, onVerify }: { cert: any, index: number, onVerify: (cert: any) => void }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.1 
      }}
      whileHover={{ zIndex: 10 }}
      onClick={() => onVerify(cert)}
      className="relative w-[180px] h-[200px] cursor-pointer group"
    >
      <div className="hive-hexagon w-full h-full flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-2 text-cyan/60 group-hover:text-cyan transition-colors">
          {cert.id === 'ecell-iitb' ? <Trophy size={24} /> : <Award size={24} />}
        </div>
        <h3 className="text-[10px] font-bold text-white mono leading-tight mb-1">{cert.title}</h3>
        <p className="text-[8px] text-zinc-500 mono uppercase tracking-tighter">{cert.org}</p>
        
        <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={12} className="text-cyan" />
        </div>
      </div>
    </motion.div>
  );
};

const HiveMind = () => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleVerify = (cert: any) => {
    setShowTerminal(true);
    setTerminalLogs([
      `[STITCH_SYSTEM]: Accessing encrypted credential for ${cert.title}...`,
      `[STITCH_SYSTEM]: Analyzing organization metadata: ${cert.org}`,
      `[STITCH_SYSTEM]: Verification successful. Routing to source...`
    ]);

    setTimeout(() => {
      if (cert.link !== '#') {
        window.open(cert.link, '_blank');
      }
      setTimeout(() => setShowTerminal(false), 2000);
    }, 1500);
  };

  return (
    <section id="awards" className="py-32 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold mb-4 mono uppercase tracking-widest">Hive Mind</h2>
          <p className="text-zinc-500 mono text-sm flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            Honeycomb Achievement Map // Synchronized Credentials
          </p>
        </div>

        <motion.div 
          className="floating-hive flex flex-wrap justify-center gap-y-[-50px] gap-x-1 max-w-4xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Row 1 */}
          <div className="flex justify-center gap-1 w-full">
            {certificates.slice(0, 3).map((cert, i) => (
              <Hexagon key={cert.id} cert={cert} index={i} onVerify={handleVerify} />
            ))}
          </div>
          {/* Row 2 (Offset) */}
          <div className="flex justify-center gap-1 w-full mt-[-50px]">
            {certificates.slice(3, 5).map((cert, i) => (
              <Hexagon key={cert.id} cert={cert} index={i + 3} onVerify={handleVerify} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 right-10 w-80 glass-card p-4 border-cyan bg-black/90 z-50 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4 border-b border-cyan/20 pb-2">
              <div className="flex items-center gap-2 text-cyan">
                <TerminalIcon size={14} />
                <span className="text-[10px] mono uppercase">Verification_Console</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            <div className="space-y-2">
              {terminalLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.4 }}
                  className="text-[10px] mono text-cyan/80 leading-relaxed"
                >
                  {log}
                </motion.div>
              ))}
            </div>
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-3 bg-cyan mt-2"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default HiveMind;
