'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Upload, FileImage, Zap, ArrowRight, Download, X, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessedFile {
  name: string;
  originalSize: number;
  optimizedSize: number;
  url?: string;
}

export default function NeuralEngineApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ProcessedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      f => f.type.startsWith('image/')
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        f => f.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processImages = async () => {
    if (files.length === 0) return;
    
    setProcessing(true);
    setResults([]);

    // Simulate processing with realistic delays
    for (let i = 0; i < files.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      
      const file = files[i];
      const optimizedSize = Math.floor(file.size * (0.2 + Math.random() * 0.3));
      
      setResults(prev => [...prev, {
        name: file.name,
        originalSize: file.size,
        optimizedSize,
      }]);
    }

    setProcessing(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const totalSaved = results.reduce((acc, r) => acc + (r.originalSize - r.optimizedSize), 0);
  const avgReduction = results.length > 0 
    ? Math.round(results.reduce((acc, r) => acc + (1 - r.optimizedSize / r.originalSize) * 100, 0) / results.length)
    : 0;

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Neural Image Engine</h1>
            <p className="text-sm text-slate-500">AI-powered image compression</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Queue */}
        <div className="w-64 border-r border-white/10 flex flex-col">
          <div className="p-3 border-b border-white/10">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Input Queue ({files.length})
            </h3>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1">
            {files.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-600 font-mono">
                No files queued...
              </div>
            ) : (
              files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition group"
                >
                  <FileImage className="w-4 h-4 text-slate-500" />
                  <span className="flex-1 text-sm text-slate-400 truncate font-mono">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(i)}
                    className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/10 text-slate-500 hover:text-white transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
          
          {/* Stats */}
          {results.length > 0 && (
            <div className="p-3 border-t border-white/10 bg-white/5">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-white">-{avgReduction}%</div>
                  <div className="text-xs text-slate-500">Avg Reduction</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">{formatSize(totalSaved)}</div>
                  <div className="text-xs text-slate-500">Total Saved</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition cursor-pointer ${
              dragActive 
                ? 'border-sky-500 bg-sky-500/10' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer text-center">
              <Upload className={`w-12 h-12 mx-auto mb-4 transition ${
                dragActive ? 'text-sky-400' : 'text-slate-600'
              }`} />
              <p className="text-slate-400 font-mono mb-2">
                Drop images here or click to upload
              </p>
              <p className="text-xs text-slate-600">
                PNG, JPG, WebP supported
              </p>
            </label>
          </div>

          {/* Process Button */}
          {files.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={processImages}
              disabled={processing}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-400 font-mono hover:bg-violet-500/30 transition disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" />
                  <span>Processing {files.length} images...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Initialize Neural Compression</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          )}

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && !processing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2 overflow-auto max-h-48"
              >
                {results.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-sm text-slate-300">{r.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-mono">
                      <span className="text-red-400">{formatSize(r.originalSize)}</span>
                      <span className="text-slate-600">→</span>
                      <span className="text-emerald-400">{formatSize(r.optimizedSize)}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs">
                        -{Math.round((1 - r.optimizedSize / r.originalSize) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}