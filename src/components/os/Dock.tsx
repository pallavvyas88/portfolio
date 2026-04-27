'use client';

import { useOSStore, AppId } from '@/store/osStore';
import { Terminal, Cpu, Layers, Zap, Mail, Command } from 'lucide-react';
import { motion } from 'framer-motion';

const apps = [
  { id: 'terminal' as AppId, name: 'Terminal', icon: Terminal, color: 'text-emerald-400', shortcut: '⌘1' },
  { id: 'about' as AppId, name: 'System Specs', icon: Cpu, color: 'text-sky-400', shortcut: '⌘2' },
  { id: 'portfolio' as AppId, name: 'Active Processes', icon: Layers, color: 'text-fuchsia-400', shortcut: '⌘3' },
  { id: 'logiwa' as AppId, name: 'Logiwa WMS', icon: Zap, color: 'text-orange-400', shortcut: '⌘4' },
  { id: 'neural' as AppId, name: 'Neural Engine', icon: Zap, color: 'text-purple-400', shortcut: '⌘5' },
  { id: 'contact' as AppId, name: 'Comm Link', icon: Mail, color: 'text-amber-400', shortcut: '⌘6' },
];

export default function Dock() {
  const { openApp, windows, activeWindow } = useOSStore();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-center gap-1 p-2 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
        {apps.map((app) => {
          const isOpen = windows[app.id].isOpen && !windows[app.id].isMinimized;
          const isActive = activeWindow === app.id;

          return (
            <div key={app.id} className="relative group">
              <button
                onClick={() => openApp(app.id)}
                className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'hover:bg-white/5 hover:-translate-y-2'
                }`}
              >
                <app.icon className={`w-6 h-6 ${app.color} transition-transform ${isOpen && !isActive ? 'scale-90 opacity-70' : 'scale-100'}`} />
              </button>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.name} <span className="text-slate-500 ml-1">{app.shortcut}</span>
              </div>

              {/* Open Indicator */}
              {windows[app.id].isOpen && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/50" />
              )}
            </div>
          );
        })}
        
        <div className="w-px h-8 bg-white/10 mx-2" />
        
        <div className="relative group">
           <button
             onClick={() => {
                // To be implemented: Command Palette trigger
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
             }}
             className="relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 hover:-translate-y-2 transition-all"
           >
             <Command className="w-6 h-6 text-slate-400" />
           </button>
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
             Command Palette (⌘K)
           </div>
        </div>
      </div>
    </div>
  );
}