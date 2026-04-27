'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore, AppId } from '@/store/osStore';
import { X, Minus, Maximize2 } from 'lucide-react';

export default function Window({ id, children, defaultWidth = 800, defaultHeight = 600 }: { id: AppId; children: React.ReactNode; defaultWidth?: number; defaultHeight?: number }) {
  const windowState = useOSStore(state => state.windows[id]);
  const { focusApp, closeApp, minimizeApp, maximizeApp } = useOSStore();

  if (!windowState.isOpen || windowState.isMinimized) return null;

  return (
    <motion.div
      drag={!windowState.isMaximized}
      dragMomentum={false}
      onMouseDown={() => focusApp(id)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`absolute flex flex-col bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl ${windowState.isMaximized ? 'inset-0 w-full h-full rounded-none' : ''}`}
      style={{
        zIndex: windowState.zIndex,
        width: windowState.isMaximized ? '100%' : defaultWidth,
        height: windowState.isMaximized ? '100%' : defaultHeight,
        left: windowState.isMaximized ? 0 : `calc(50% - ${defaultWidth / 2}px)`,
        top: windowState.isMaximized ? 0 : `calc(50% - ${defaultHeight / 2}px)`,
      }}
    >
      {/* Title Bar */}
      <div 
        className="h-10 flex items-center justify-between px-4 border-b border-white/10 bg-white/5 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); closeApp(id); }} className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 flex items-center justify-center group">
            <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); minimizeApp(id); }} className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center group">
            <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); maximizeApp(id); }} className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center group">
            <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="text-xs font-mono text-slate-400 select-none">{windowState.title}</div>
        <div className="w-14" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#050505]">
        {children}
      </div>
    </motion.div>
  );
}