import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronUp, ChevronDown, Package, Activity } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  type: 'STITCH' | 'SYSTEM' | 'NETWORK';
  message: string;
  status: 'SUCCESS' | 'WAITING' | 'ERROR';
}

const StitchTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: Log['type'] = 'STITCH', status: Log['status'] = 'SUCCESS') => {
    const newLog: Log = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      message,
      status
    };
    setLogs(prev => [...prev.slice(-19), newLog]);
  };

  useEffect(() => {
    // Initial logs
    addLog('Stitch MCP Core Initialized', 'SYSTEM');
    addLog('Connecting to local project repository...', 'NETWORK');
    addLog('Handshake successful. Assembly-on-Demand active.', 'STITCH');

    const handleNodeClick = (e: any) => {
      const { label, type } = e.detail;
      addLog(`Requesting context for ${type}: ${label}...`, 'NETWORK', 'WAITING');
      setTimeout(() => {
        addLog(`[STITCH] Connecting ${type} Node: ${label} to project files... SUCCESS.`, 'STITCH');
      }, 800);
    };

    window.addEventListener('stitch-node-click', handleNodeClick);
    return () => window.removeEventListener('stitch-node-click', handleNodeClick);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed bottom-6 right-6 z-40 mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[400px] h-[300px] glass-card border-cyan/20 flex flex-col mb-4 overflow-hidden"
          >
            <div className="bg-cyan/10 px-4 py-2 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-cyan">
                <TerminalIcon size={12} />
                Command Center_v1.0.4
              </div>
              <Activity size={12} className="text-cyan animate-pulse" />
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto text-[10px] space-y-1 terminal-scroll"
            >
              {logs.map(log => (
                <div key={log.id} className="flex gap-2 leading-relaxed">
                  <span className="text-zinc-600">[{log.timestamp}]</span>
                  <span className={
                    log.type === 'STITCH' ? 'text-purple' : 
                    log.type === 'SYSTEM' ? 'text-cyan' : 'text-zinc-400'
                  }>[{log.type}]</span>
                  <span className="text-white">{log.message}</span>
                  {log.status === 'WAITING' && <span className="animate-pulse text-cyan">...</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 glass-card border-cyan/30 text-cyan hover:border-cyan transition-all glow-cyan"
      >
        <Package size={18} />
        <span className="text-xs font-bold uppercase tracking-widest">
          Stitch Interface: {isOpen ? 'Online' : 'Standby'}
        </span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </motion.button>
    </div>
  );
};

export default StitchTerminal;
