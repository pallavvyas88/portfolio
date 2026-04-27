'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Download, Image as ImageIcon, UploadCloud, RefreshCw, Layers, X, Zap } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useEffect } from 'react';

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

function FileThumbnail({ file }: { file: File }) {
  const [url, setUrl] = useState<string>('');
  
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!url) return <ImageIcon className="w-8 h-8 p-1.5 rounded bg-white/5 text-sky-400 shrink-0" />;
  
  return (
    <img 
      src={url} 
      alt={file.name} 
      className="w-8 h-8 rounded object-cover shrink-0 border border-white/10 bg-black/50" 
    />
  );
}

export default function ImageOptimizerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState('webp');
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState<number | ''>(2000);
  const [seoPrefix, setSeoPrefix] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [results, setResults] = useState<CompressionResult[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<CompressionResult | null>(null);
  const [elapsedTime, setElapsedTime] = useState('0.00');
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // File drop logic
  const handleFileSelection = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    const incomingFiles = Array.from(selectedFiles);
    const validFiles = incomingFiles.filter(f => validTypes.includes(f.type));
    
    if (validFiles.length !== incomingFiles.length) {
      setUploadError('Invalid file type. Please upload PNG, JPG, or WEBP.');
    } else {
      setUploadError(null);
    }

    if (validFiles.length > 0) {
      setFiles(prev => {
        // Prevent duplicates based on name and size
        const existingIdentifiers = new Set(prev.map(f => `${f.name}-${f.size}`));
        const newUniqueFiles = validFiles.filter(f => !existingIdentifiers.has(`${f.name}-${f.size}`));
        return [...prev, ...newUniqueFiles];
      });
      setResults([]);
      setSelectedPreview(null);
    }
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
    
    // Scale logic to prevent massive canvas crashes or explicitly resize
    const limit = typeof maxWidth === 'number' && maxWidth > 0 ? maxWidth : 2000;
    const scale = Math.min(limit / image.naturalWidth, limit / image.naturalHeight, 1);
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
    
    const suffix = seoPrefix.trim() ? `-${seoPrefix.trim().replace(/[^a-zA-Z0-9-]/g, '-')}` : '';
    const outputFilename = `${namePart}${suffix}.${ext}`;

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
    <section id="tools" className="relative py-16 md:py-24 bg-slate-950 overflow-hidden text-white">
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
          className="text-center mb-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-sm font-medium tracking-widest text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <Layers className="h-4 w-4" />
            Neural Image Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6">
            Lossless Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Compression.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Upload massive image assets and watch our intelligent browser engine slash sizes by up to 80% instantly and securely.
          </p>

          {/* Prominent Privacy Banner */}
          <div className="mx-auto max-w-2xl bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-center gap-3 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
               <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20" data-view-component="true" className="fill-current"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
            </div>
            <div className="text-left">
              <p className="text-emerald-400 font-bold text-sm">100% Secure & Private</p>
              <p className="text-slate-300 text-xs">All processing happens locally in your browser. No files are ever uploaded or stored on our servers.</p>
            </div>
          </div>
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
                role="button"
                tabIndex={0}
                aria-label="File upload dropzone"
                className="group relative rounded-[1.5rem] border-2 border-dashed border-slate-700 bg-black/40 hover:bg-black/60 p-10 text-center transition-all hover:border-sky-500/50 flex flex-col items-center justify-center min-h-[280px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFileSelection(e.dataTransfer.files); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    document.getElementById('file-upload')?.click();
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                    <UploadCloud className="h-8 w-8 text-sky-400" />
                  </div>
                  <p className="text-xl font-bold text-white mb-2">Drop files to compress</p>
                  <p className="text-sm text-slate-400 mb-6">Supports PNG, JPEG, WEBP</p>
                  
                  <div className="mb-6 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                    <svg height="14" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="14" data-view-component="true" className="fill-current"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                    100% Local & Secure. No Uploads.
                  </div>

                  <AnimatePresence>
                    {uploadError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-400"
                      >
                        {uploadError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <label className="cursor-pointer rounded-full bg-white text-black px-8 py-3.5 text-sm font-bold transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 focus-within:ring-offset-black">
                    Select Images
                    <input id="file-upload" type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={(e) => handleFileSelection(e.target.files)} aria-label="Select images to compress" />
                  </label>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
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

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-300 uppercase tracking-wider">Max Width (px)</label>
                    <input
                      type="number"
                      placeholder="e.g. 2048"
                      value={maxWidth === '' ? '' : maxWidth}
                      onChange={(e) => setMaxWidth(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-300 uppercase tracking-wider">SEO Suffix</label>
                    <input
                      type="text"
                      placeholder="e.g. optimized-for-shopify"
                      value={seoPrefix}
                      onChange={(e) => setSeoPrefix(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
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
                          <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5 overflow-hidden">
                            <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                              <FileThumbnail file={file} />
                              <span className="text-sm text-slate-300 truncate">{file.name}</span>
                            </div>
                            <button onClick={() => removeFile(idx)} className="text-slate-500 hover:text-white p-1 shrink-0 ml-2">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* CRO Lead Capture for bulk uploads */}
                      {files.length > 10 && (
                        <div className="mt-4 p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 text-sm">
                          <p className="font-bold text-white mb-2">Wow, that&apos;s a lot of images!</p>
                          <p className="text-slate-300 mb-3">Manually downloading these is slow. Want me to automate this across your entire Shopify store?</p>
                          <a href="/#contact?subject=I need help automating my Shopify image optimization" className="inline-block bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Let&apos;s Talk Automation
                          </a>
                        </div>
                      )}

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
                  <div className="p-6 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between bg-black/20" aria-live="polite">
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
                          className={`w-full text-left p-4 border-b border-white/5 transition-colors flex flex-col gap-2 overflow-hidden ${
                            selectedPreview?.newName === stat.newName 
                              ? 'bg-sky-500/10 border-l-2 border-l-sky-500' 
                              : 'hover:bg-white/5 border-l-2 border-l-transparent'
                          }`}
                        >
                          <p className="text-sm font-medium text-slate-200 truncate w-full">{stat.name}</p>
                          <div className="flex items-center justify-between text-xs w-full">
                            <span className="text-slate-500 shrink-0">{stat.finalSize}</span>
                            <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded shrink-0 ml-2">-{stat.reduction}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Image Preview & Details */}
                    <div className="flex-1 p-6 flex flex-col bg-[#050505] relative overflow-hidden">
                      {selectedPreview ? (
                        <>
                          {/* Image Comparison Container */}
                          <div className="flex-1 min-h-[300px] relative rounded-2xl border border-white/10 bg-black/50 overflow-hidden flex items-center justify-center">
                             
                             <div className="absolute inset-4 flex items-center justify-center">
                                <div 
                                     className="w-full h-full relative cursor-ew-resize touch-none select-none"
                                     onMouseDown={(e) => {
                                        setIsDragging(true);
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                                        setSliderValue((x / rect.width) * 100);
                                     }}
                                     onMouseUp={() => setIsDragging(false)}
                                     onMouseLeave={() => setIsDragging(false)}
                                     onMouseMove={(e) => {
                                        if (!isDragging) return;
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                                        setSliderValue((x / rect.width) * 100);
                                     }}
                                     onTouchStart={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                                        setSliderValue((x / rect.width) * 100);
                                     }}
                                     onTouchMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                                        setSliderValue((x / rect.width) * 100);
                                     }}
                                >
                                  {/* Original Image (Underneath) */}
                                  <img 
                                    src={selectedPreview.originalUrl} 
                                    alt="Original" 
                                    className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
                                  />
                                  {/* Optimized Image (On Top) */}
                                  <img 
                                    src={selectedPreview.downloadUrl} 
                                    alt="Optimized" 
                                    className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
                                    style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
                                  />

                                  {/* Slider Handle */}
                                  <div 
                                    className="absolute top-0 bottom-0 w-0.5 bg-white/50 pointer-events-none flex items-center justify-center z-20"
                                    style={{ left: `${sliderValue}%` }}
                                  >
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m15 18-6-6 6-6"/></svg>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                    </div>
                                  </div>
                                  
                                  {/* Labels */}
                                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 border border-white/10 z-10 pointer-events-none max-w-[40%] sm:max-w-xs truncate">
                                    Optimized: {selectedPreview.finalSize}
                                  </div>
                                  <div className="absolute top-4 right-4 bg-sky-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-sky-300 border border-sky-500/30 z-10 pointer-events-none max-w-[40%] sm:max-w-xs truncate">
                                    Original: {selectedPreview.originalSize}
                                  </div>
                                  
                                  {/* Interaction Hint */}
                                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-white shadow-xl z-10 pointer-events-none opacity-50">
                                    Slide to compare
                                  </div>
                                </div>
                             </div>
                          </div>

                          {/* Action Bar for single file */}
                          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex flex-wrap gap-4 items-center text-sm font-mono">
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
