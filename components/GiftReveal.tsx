import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GiftData } from '../types';
import { getGiftImage } from '../utils/giftImages';
import { getGiftModel } from '../utils/giftModels';

// Workaround for TypeScript error with custom element
const ModelViewer = 'model-viewer' as any;

interface GiftRevealProps {
  data: GiftData;
  onReset: () => void;
}

const GiftReveal: React.FC<GiftRevealProps> = ({ data, onReset }) => {
  const giftImage = getGiftImage(data.giftName);
  const giftModel = getGiftModel(data.giftName);
  const isInspirational = data.theme === 'inspiration';
  
  useEffect(() => {
    // Launch confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fbbf24', '#dc2626', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fbbf24', '#dc2626', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleCopy = () => {
    const text = `I got ${data.giftName} for Christmas! "${data.message}" #LumiereDeNoel`;
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard! Share the magic.");
  };

  return (
    <div className="animate-fade-in-up w-full max-w-3xl mx-auto p-4 perspective-1000">
      <div className="glass-card p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden transform-style-3d transition-transform hover:rotate-x-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/20">
        
        {/* Top Decoration */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-80 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        
        <div className="mb-6">
           <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-950/40 text-yellow-200 text-[10px] md:text-xs tracking-[0.2em] uppercase border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] backdrop-blur-md">
             <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
             Official North Pole Delivery
           </span>
        </div>

        <h2 className="font-serif text-4xl md:text-6xl mb-2 text-white tracking-wide drop-shadow-md">
          Merry Christmas
        </h2>
        <h3 className="text-2xl md:text-4xl text-yellow-400/90 font-serif mb-8 italic">
          {data.recipient}
        </h3>

        {/* Gift Showcase Container */}
        <div className={`relative my-8 py-4 px-6 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-inner min-h-[400px] flex flex-col items-center justify-center ${isInspirational ? 'bg-gradient-to-b from-blue-900/30 to-purple-900/30' : ''}`}>
           {/* Background Glow for Image/Model */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[60px] rounded-full pointer-events-none ${isInspirational ? 'bg-blue-400/20' : 'bg-yellow-500/20'}`}></div>

           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0F172A] px-6 py-1 rounded-full text-blue-200 text-xs tracking-widest border border-blue-400/30 uppercase z-20 shadow-lg">
             {isInspirational ? 'Gift of Wisdom' : 'Inside the Box'}
           </div>
           
           {/* 
              Graceful Fallback Logic:
              1. Show Model if available.
              2. Else show Image if available.
              3. Else show nothing (placeholder handled by flex layout).
           */}
           <div className="relative z-10 w-full h-64 md:h-80 mb-6 flex items-center justify-center">
             {giftModel ? (
               <ModelViewer
                 src={giftModel}
                 alt={data.giftName}
                 auto-rotate
                 camera-controls
                 shadow-intensity="1"
                 environment-image="neutral"
                 exposure="1"
                 disable-zoom
                 interaction-prompt="none"
                 className="w-full h-full"
               ></ModelViewer>
             ) : giftImage ? (
               <img 
                 src={giftImage} 
                 alt={data.giftName}
                 className="w-full h-full object-contain mx-auto filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500 animate-float"
                 style={{ 
                    maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                 }}
               />
             ) : null}
           </div>

           <h1 className={`text-3xl md:text-5xl font-bold mb-4 drop-shadow-2xl leading-tight px-2 relative z-10 ${isInspirational ? 'ice-text' : 'gold-text'}`}>
            {data.giftName}
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-200 leading-relaxed font-light px-4 italic relative z-10 font-serif">
            &ldquo;{data.message}&rdquo;
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button 
            onClick={onReset}
            className="group px-10 py-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white rounded-xl font-serif tracking-widest uppercase text-xs shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-0.5 border border-red-400/30"
          >
            Open Another
          </button>
          
          <button 
            onClick={handleCopy}
            className="group px-10 py-4 bg-white/5 hover:bg-white/10 text-yellow-200 border border-yellow-500/30 rounded-xl font-serif tracking-widest uppercase text-xs transition-all backdrop-blur-md flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Share Gift
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftReveal;