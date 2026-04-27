'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore, type AppId } from '@/store/osStore';
import { Search, X, Terminal, User, Briefcase, Brain, Radio, Zap, Server, Package, ArrowRight } from 'lucide-react';

const bootSteps = [
  { text: 'Initializing VyOS v2.4...', duration: 400 },
  { text: 'Loading Shopify Plus modules...', duration: 300 },
  { text: 'Connecting to Logiwa WMS API...', duration: 500 },
  { text: 'Booting Neural Image Engine...', duration: 400 },
  { text: 'System Ready. Awaiting Input.', duration: 0 },
];

const commandSuggestions = [
  { cmd: 'scan', label: 'Run diagnostic scan', icon: Zap },
  { cmd: 'about', label: 'View system specs', icon: User },
  { cmd: 'projects', label: 'Active processes', icon: Briefcase },
  { cmd: 'neural', label: 'Open Neural Engine', icon: Brain },
  { cmd: 'contact', label: 'Establish comm link', icon: Radio },
];

export default function BootSequence() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [scanResults, setScanResults] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { openApp, setBootSequenceComplete } = useOSStore();

  useEffect(() => {
    if (currentStep >= bootSteps.length) {
      setTimeout(() => setShowInput(true), 500);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLines(prev => [...prev, bootSteps[currentStep].text]);
      setCurrentStep(prev => prev + 1);
    }, bootSteps[currentStep]?.duration || 200);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    setBootSequenceComplete(true);
  }, [setBootSequenceComplete]);

  const runScan = async (url: string) => {
    setIsScanning(true);
    setScanResults(null);
    
    // Simulate scanning process
    const steps = [
      'Analyzing store architecture...',
      'Scanning Liquid templates...',
      'Checking API response times...',
      'Evaluating image payload...',
      'Assessing fulfillment integration...',
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 600));
      setDisplayedLines(prev => [...prev, step]);
    }

    // Generate fake but believable results
    setScanResults({
      url,
      issues: [
        { severity: 'critical', label: 'Unoptimized Images', value: '47MB payload', detail: '23 images exceeding 500KB' },
        { severity: 'warning', label: 'API Latency', value: '340ms', detail: 'Shopify API calls could be batched' },
        { severity: 'warning', label: 'DOM Depth', value: 'Level 8', detail: 'Nested sections affecting LCP' },
        { severity: 'info', label: 'Recharge Integration', value: 'Active', detail: 'Subscription flow optimized' },
      ],
      score: 67,
    });
    
    setIsScanning(false);
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    
    if (command === 'scan' || command.startsWith('scan ')) {
      const url = command.replace('scan ', '').trim();
      if (url) {
        runScan(url);
      } else {
        setDisplayedLines(prev => [...prev, 'Usage: scan <store-url>']);
      }
      return;
    }

    const commandMap: Record<string, AppId> = {
      'about': 'about',
      'system': 'about',
      'specs': 'about',
      'projects': 'portfolio',
      'processes': 'portfolio',
      'work': 'portfolio',
      'neural': 'neural',
      'engine': 'neural',
      'tool': 'neural',
      'contact': 'contact',
      'comm': 'contact',
      'hire': 'contact',
    };

    if (commandMap[command]) {
      openApp(commandMap[command]);
    } else {
      setDisplayedLines(prev => [...prev, `Command not found: ${command}. Type 'help' for available commands.`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  if (!showInput && currentStep < bootSteps.length) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        <div className="font-mono text-sm md:text-base text-slate-300 w-full max-w-2xl px-8">
          {displayedLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 py-1"
            >
              <span className="text-sky-500">›</span>
              <span>{line}</span>
              {line.includes('Ready') && (
                <span className="ml-auto text-emerald-500 animate-pulse">●</span>
              )}
            </motion.div>
          ))}
          <div className="flex items-center gap-3 py-1">
            <span className="text-sky-500">›</span>
            <span className="w-3 h-4 bg-slate-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
      
      {/* Main Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-2xl bg-black/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-500 font-mono">VyOS Terminal v2.4</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm min-h-[400px]">
          {/* Previous output */}
          {displayedLines.map((line, i) => (
            <div key={i} className="flex items-center gap-3 py-0.5 text-slate-400">
              <span className="text-sky-600">›</span>
              <span className={line.includes('Ready') ? 'text-emerald-400' : ''}>{line}</span>
            </div>
          ))}

          {/* Scan Results */}
          {scanResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-400 font-medium">Diagnostic Complete</span>
                <span className="text-2xl font-bold text-white">{scanResults.score}<span className="text-slate-500 text-sm">/100</span></span>
              </div>
              <div className="space-y-2">
                {scanResults.issues.map((issue: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        issue.severity === 'critical' ? 'bg-red-500' : 
                        issue.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-slate-300">{issue.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">{issue.detail}</span>
                      <button 
                        onClick={() => openApp('contact')}
                        className="px-2 py-1 rounded bg-sky-500/20 text-sky-400 text-xs hover:bg-sky-500/30 transition"
                      >
                        Fix →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sky-500">›</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isScanning ? 'Scanning...' : 'Enter command or store URL...'}
              disabled={isScanning}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 font-mono"
              autoFocus
            />
          </div>

          {/* Command Suggestions */}
          {!scanResults && !isScanning && (
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-slate-600 text-xs mb-3">Available commands:</p>
              <div className="flex flex-wrap gap-2">
                {commandSuggestions.map((cmd) => (
                  <button
                    key={cmd.cmd}
                    onClick={() => {
                      setInputValue(cmd.cmd);
                      handleCommand(cmd.cmd);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs hover:bg-white/10 hover:text-white transition"
                  >
                    <cmd.icon className="w-3 h-3" />
                    <span>{cmd.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex gap-3"
      >
        <button
          onClick={() => openApp('about')}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 hover:text-white transition flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          System Specs
        </button>
        <button
          onClick={() => openApp('neural')}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 hover:text-white transition flex items-center gap-2"
        >
          <Brain className="w-4 h-4" />
          Neural Engine
        </button>
        <button
          onClick={() => openApp('contact')}
          className="px-4 py-2 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 text-sm hover:bg-sky-500/30 transition flex items-center gap-2"
        >
          <Radio className="w-4 h-4" />
          Comm Link
        </button>
      </motion.div>
    </div>
  );
}