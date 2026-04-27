'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, RefreshCw, Package, Truck, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

const syncLogs = [
  { time: '14:32:01', type: 'info', message: 'Initiating Logiwa WMS connection...' },
  { time: '14:32:02', type: 'success', message: 'Authentication successful' },
  { time: '14:32:03', type: 'info', message: 'Fetching pending orders from Shopify...' },
  { time: '14:32:05', type: 'success', message: 'Retrieved 23 new orders' },
  { time: '14:32:06', type: 'info', message: 'Syncing inventory levels...' },
  { time: '14:32:08', type: 'success', message: 'Updated 156 SKU quantities' },
  { time: '14:32:09', type: 'warning', message: '3 items require manual review' },
  { time: '14:32:10', type: 'success', message: 'Sync cycle complete. Next in 5m.' },
];

const metrics = [
  { label: 'Orders Synced', value: '1,247', change: '+12%', icon: Package },
  { label: 'Inventory Updates', value: '8.4K', change: '+8%', icon: RefreshCw },
  { label: 'Avg Sync Time', value: '340ms', change: '-15%', icon: Zap },
  { label: 'Errors Today', value: '0', change: '100%', icon: CheckCircle },
];

const pendingItems = [
  { sku: 'SKU-1024', product: 'Premium Widget', qty: 50, status: 'synced' },
  { sku: 'SKU-1025', product: 'Deluxe Package', qty: 12, status: 'pending' },
  { sku: 'SKU-1026', product: 'Basic Unit', qty: 200, status: 'synced' },
];

export default function LogiwaApp() {
  const [logs, setLogs] = useState(syncLogs);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate live log updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: Math.random() > 0.7 ? 'warning' : 'info',
        message: ['Checking inventory...', 'Processing webhook...', 'Validating SKU mapping...', 'Syncing fulfillment status...'][Math.floor(Math.random() * 4)],
      };
      setLogs(prev => [...prev.slice(-6), newLog]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-orange-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Logiwa WMS Integration</h1>
            <p className="text-sm text-slate-500">Warehouse management sync</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-xs font-mono">{isConnected ? 'CONNECTED' : 'OFFLINE'}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Metrics */}
        <div className="w-1/2 border-r border-white/10 p-4 space-y-4 overflow-auto">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            System Metrics
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="w-3 h-3 text-slate-500" />
                  <span className="text-xs text-slate-500">{metric.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold text-white">{metric.value}</span>
                  <span className={`text-xs ${
                    metric.change.startsWith('+') || metric.change.startsWith('-') 
                      ? 'text-emerald-400' 
                      : 'text-emerald-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pending Items */}
          <div>
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
              Pending Sync
            </h3>
            <div className="space-y-1">
              {pendingItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm text-white">{item.product}</div>
                      <div className="text-xs text-slate-500">{item.sku}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">×{item.qty}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      item.status === 'synced' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Live Logs */}
        <div className="w-1/2 flex flex-col">
          <div className="p-3 border-b border-white/10">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Live Sync Log
            </h3>
          </div>
          <div className="flex-1 overflow-auto p-3 font-mono text-xs space-y-1">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2 py-1"
              >
                <span className="text-slate-600">{log.time}</span>
                <span className={`${
                  log.type === 'success' ? 'text-emerald-400' :
                  log.type === 'warning' ? 'text-yellow-400' :
                  log.type === 'error' ? 'text-red-400' :
                  'text-slate-400'
                }`}>
                  {log.type === 'success' ? '✓' :
                   log.type === 'warning' ? '⚠' :
                   log.type === 'error' ? '✕' : '›'}
                </span>
                <span className="text-slate-300">{log.message}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}