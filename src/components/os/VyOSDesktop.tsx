'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore, type AppId } from '@/store/osStore';
import BootSequence from '@/components/os/BootSequence';
import Dock from '@/components/os/Dock';
import Window from '@/components/os/Window';
import SystemApp from '@/components/os/apps/SystemApp';
import PortfolioApp from '@/components/os/apps/PortfolioApp';
import NeuralEngineApp from '@/components/os/apps/NeuralEngineApp';
import CommLinkApp from '@/components/os/apps/CommLinkApp';
import LogiwaApp from '@/components/os/apps/LogiwaApp';

const appConfig: Record<AppId, { icon: string; component: React.ReactNode }> = {
  terminal: { icon: '⚡', component: <div className="p-4 text-slate-400 font-mono text-sm">Terminal - Use command palette</div> },
  about: { icon: '⚙️', component: <SystemApp /> },
  portfolio: { icon: '📁', component: <PortfolioApp /> },
  neural: { icon: '🧠', component: <NeuralEngineApp /> },
  contact: { icon: '📡', component: <CommLinkApp /> },
  logiwa: { icon: '🔗', component: <LogiwaApp /> },
};

export default function VyOSDesktop() {
  const { 
    windows, 
    activeWindow, 
    bootSequenceComplete,
    openApp, 
    closeApp, 
    minimizeApp, 
    focusApp 
  } = useOSStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
        const keyMap: Record<string, AppId> = {
          '1': 'terminal',
          '2': 'about',
          '3': 'portfolio',
          '4': 'logiwa',
          '5': 'neural',
          '6': 'contact',
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          openApp(keyMap[e.key]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openApp]);

  // Show boot sequence if not complete
  if (!bootSequenceComplete) {
    return <BootSequence />;
  }

  return (
    <main className="fixed inset-0 bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial_gradient(ellipse_at_bottom_right,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Command Palette Trigger */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => openApp('terminal')}
        className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 border border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-400 transition backdrop-blur-md z-50"
      >
        <span className="text-xs">Search apps or type command...</span>
        <kbd className="px-2 py-0.5 rounded bg-white/10 text-xs font-mono">⌘K</kbd>
      </motion.button>

      {/* Windows Container */}
      <div className="absolute inset-0 pb-20">
        <AnimatePresence>
          {Object.entries(windows).map(([id, window]) => {
            if (!window.isOpen || window.isMinimized) return null;
            
            const config = appConfig[id as AppId];
            const isActive = activeWindow === id;
            
            return (
              <Window
                key={id}
                id={id as AppId}
                title={window.title}
                icon={<span>{config.icon}</span>}
                isActive={isActive}
                isMinimized={window.isMinimized}
                position={{ x: 50 + (parseInt(id) * 30), y: 50 + (parseInt(id) * 30) }}
                size={{ 
                  width: id === 'portfolio' ? 800 : id === 'neural' ? 750 : 600, 
                  height: id === 'portfolio' || id === 'neural' ? 550 : 500 
                }}
                onClose={() => closeApp(id as AppId)}
                onMinimize={() => minimizeApp(id as AppId)}
                onFocus={() => focusApp(id as AppId)}
              >
                {config.component}
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <Dock activeApp={activeWindow} onAppClick={(id) => openApp(id as AppId)} />
    </main>
  );
}