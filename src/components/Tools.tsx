'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Download, Image as ImageIcon, UploadCloud, RefreshCw, Layers, X, Zap } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type CompressionResult = {
  name: string;
  newName: string;
  originalUrl: string;
  originalSize: string;
  finalSize: string;
  reduction: string;
  downloadUrl: string;
  blob: Blob;
  error: string | null;
};

export default function Tools() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState('webp');
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const [results, setResults] = useState<CompressionResult[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<CompressionResult | null>(null);
  const [elapsedTime, setElapsedTime] = useState('0.00');

  // File drop logic
  const handleFileSelection = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setFiles(Array.from(selectedFiles));
    setResults([]);
    setSelectedPreview(null);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const compressFile = async (file: File): Promise<CompressionResult> => {
    const originalUrl = URL.createObjectURL(file);
    const image = await loadImage(originalUrl);
    const canvas = document.createElement('canvas');
    
    // Scale logic to prevent massive canvas crashes (e.g. max 2000px)
    const scale = Math.min(2000 / image.naturalWidth, 2000 / image.naturalHeight, 1);
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background for transparent images converted to JPEG
      if (format === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    const outputType = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp';
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outputType, quality));

    if (!blob) throw new Error('Compression failed');
    
    const optimizedUrl = URL.createObjectURL(blob);
    const nameParts = file.name.split('.');
    const namePart = nameParts.length > 1 ? nameParts.slice(0, -1).join('.') : file.name;
    const ext = format === 'jpeg' ? 'jpg' : (format === 'png' ? 'png' : 'webp');
    const outputFilename = `${namePart}.${ext}`;

    const reduction = ((file.size - blob.size) / file.size * 100).toFixed(2);

    return {
      name: file.name,
      newName: outputFilename,
      originalUrl: originalUrl,
      originalSize: (file.size / 1024).toFixed(2) + ' KB',
      finalSize: (blob.size / 1024).toFixed(2) + ' KB',
      reduction: reduction + '%',
      downloadUrl: optimizedUrl,
      blob: blob,
      error: null
    };
  };

  const processImages = async () => {
    if (!files.length) return;
    setIsCompressing(true);
    setResults([]);
    const start = Date.now();

    try {
      const compressedStats = await Promise.all(files.map(compressFile));
      setResults(compressedStats);
      if (compressedStats.length > 0) {
        setSelectedPreview(compressedStats[0]);
      }
    } catch (error) {
      console.error(error);
      alert('Error compressing images. Ensure they are valid image files.');
    } finally {
      setIsCompressing(false);
      setElapsedTime(((Date.now() - start) / 1000).toFixed(2));
    }
  };

  const handleDownloadZip = async () => {
    if (results.length === 0) return;
    
    const zip = new JSZip();
    results.forEach(res => {
      if (res.blob && !res.error) {
        zip.file(res.newName, res.blob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'optimized-images.zip');
  };

  return (
    <section id="tools" className="relative py-32 bg-slate-950 overflow-hidden text-white">
      {/* Immersive Dark AI Background */}
      <div className="absolute inset-0 bg-[#050505] transition-colors duration-500" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_100%)]" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-sm font-medium tracking-widest text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <Layers className="h-4 w-4" />
            Neural Image Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6">
            Lossless Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Compression.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Upload massive image assets and watch our intelligent browser engine slash sizes by up to 80% instantly and securely.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
          
          {/* Left Panel: Upload & Controls */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl"
            >
              {/* Dropzone */}
              <div
                className="group relative rounded-[1.5rem] border-2 border-dashed border-slate-700 bg-black/40 hover:bg-black/60 p-10 text-center transition-all hover:border-sky-500/50 flex flex-col items-center justify-center min-h-[280px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFileSelection(e.dataTransfer.files); }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                    <UploadCloud className="h-8 w-8 text-sky-400" />
                  </div>
                  <p className="text-xl font-bold text-white mb-2">Drop files to compress</p>
                  <p className="text-sm text-slate-400 mb-8">Supports PNG, JPEG, WEBP</p>
                  
                  <label className="cursor-pointer rounded-full bg-white text-black px-8 py-3.5 text-sm font-bold transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Select Images
                    <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={(e) => handleFileSelection(e.target.files)} />
                  </label>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-300 uppercase tracking-wider">Output Format</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['webp', 'jpeg', 'png'].map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setFormat(fmt)}
                          className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                            format === fmt 
                              ? 'border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]' 
                              : 'border-white/10 bg-black/40 text-slate-400 hover:bg-white/5'
                          }`}
                        >
                          {fmt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-300 uppercase tracking-wider">Quality</label>
                      <span className="text-sm font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                        {Math.round(quality * 100)}%
                      </span>
                    </div>
                    <div className="pt-2">
                      <input
                        type="range" min="0.4" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-black/40 rounded-2xl border border-white/5 p-4 max-h-[180px] overflow-y-auto custom-scrollbar space-y-2">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{files.length} Files Queued</span>
                          <button onClick={() => setFiles([])} className="text-xs text-rose-400 hover:text-rose-300">Clear All</button>
                        </div>
                        {files.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <ImageIcon className="w-4 h-4 text-sky-400 shrink-0" />
                              <span className="text-sm text-slate-300 truncate">{file.name}</span>
                            </div>
                            <button onClick={() => removeFile(idx)} className="text-slate-500 hover:text-white p-1">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={processImages}
                        disabled={isCompressing}
                        className="mt-6 w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center justify-center gap-2">
                          {isCompressing ? (
                            <><RefreshCw className="w-5 h-5 animate-spin" /> Compressing Neural Weights...</>
                          ) : (
                            <><Zap className="w-5 h-5" /> Execute Compression</>
                          )}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Results & Preview */}
          <div className="flex flex-col h-full min-h-[600px]">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col relative"
            >
              {results.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-500">
                  <div className="w-24 h-24 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-6">
                    <ImageIcon className="w-10 h-10 opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">Awaiting Image Data</h3>
                  <p className="max-w-xs">Upload files and execute compression to see intelligent before/after comparisons.</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  {/* Results Header */}
                  <div className="p-6 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between bg-black/20">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-400" />
                        Optimization Complete
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">Processed in {elapsedTime}s</p>
                    </div>
                    {results.length > 1 && (
                      <button
                        onClick={handleDownloadZip}
                        className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-500/30 px-5 py-2.5 text-sm font-semibold text-sky-400 transition hover:bg-sky-500/20 hover:scale-105"
                      >
                        <Download className="w-4 h-4" />
                        Download ZIP Archive
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                    {/* File List */}
                    <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/40 overflow-y-auto custom-scrollbar">
                      {results.map((stat, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedPreview(stat)}
                          className={`w-full text-left p-4 border-b border-white/5 transition-colors flex flex-col gap-2 ${
                            selectedPreview?.newName === stat.newName 
                              ? 'bg-sky-500/10 border-l-2 border-l-sky-500' 
                              : 'hover:bg-white/5 border-l-2 border-l-transparent'
                          }`}
                        >
                          <p className="text-sm font-medium text-slate-200 truncate">{stat.name}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">{stat.finalSize}</span>
                            <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">-{stat.reduction}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Image Preview & Details */}
                    <div className="flex-1 p-6 flex flex-col bg-[#050505] relative overflow-hidden">
                      {selectedPreview ? (
                        <>
                          {/* Image Comparison Container */}
                          <div className="flex-1 min-h-[300px] relative rounded-2xl border border-white/10 bg-black/50 overflow-hidden group flex items-center justify-center">
                             
                             <div className="absolute inset-4 flex items-center justify-center">
                                <div className="w-full h-full relative">
                                  {/* Original Image (Underneath) */}
                                  <img 
                                    src={selectedPreview.originalUrl} 
                                    alt="Original" 
                                    className="absolute inset-0 w-full h-full object-contain opacity-40 group-hover:opacity-0 transition-opacity duration-500" 
                                  />
                                  {/* Optimized Image (On Top) */}
                                  <img 
                                    src={selectedPreview.downloadUrl} 
                                    alt="Optimized" 
                                    className="absolute inset-0 w-full h-full object-contain opacity-100 group-hover:opacity-100 transition-opacity duration-500" 
                                  />
                                  
                                  {/* Labels */}
                                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 border border-white/10 opacity-100 group-hover:opacity-0 transition-opacity z-10">
                                    Original: {selectedPreview.originalSize}
                                  </div>
                                  <div className="absolute top-4 right-4 bg-sky-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-sky-300 border border-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Optimized: {selectedPreview.finalSize}
                                  </div>
                                  
                                  {/* Interaction Hint */}
                                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-white shadow-xl opacity-100 group-hover:opacity-0 transition-opacity z-10 pointer-events-none">
                                    Hover to view optimized image
                                  </div>
                                </div>
                             </div>
                          </div>

                          {/* Action Bar for single file */}
                          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex gap-4 items-center text-sm font-mono">
                              <div className="flex flex-col">
                                <span className="text-slate-500">Reduction</span>
                                <span className="text-emerald-400 font-bold text-lg">{selectedPreview.reduction}</span>
                              </div>
                              <div className="w-px h-8 bg-white/10 mx-2" />
                              <div className="flex flex-col">
                                <span className="text-slate-500">Format</span>
                                <span className="text-sky-400 font-bold text-lg">{format.toUpperCase()}</span>
                              </div>
                            </div>
                            <a
                              href={selectedPreview.downloadUrl}
                              download={selectedPreview.newName}
                              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-bold transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                              Download Single <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
