import React from 'react';
import MainIllustration from './doodles/MainIllustration';
import { WashiTape } from './doodles/WashiTape';

export default function IllustrationSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      <div className="doodle-box bg-[var(--paper)] p-4 sm:p-8 relative overflow-hidden">
        <WashiTape width="w-32" rotate="-rotate-2" className="-top-3 left-4" />
        <WashiTape width="w-24" rotate="rotate-3" className="-bottom-3 right-8" color="var(--mustard)" />
        
        <div className="w-full flex justify-center items-center">
            {/* The SVG is huge and complex, rendering it safely */}
            <MainIllustration className="w-full max-w-5xl h-auto drop-shadow-sm" />
        </div>
      </div>
    </section>
  );
}
