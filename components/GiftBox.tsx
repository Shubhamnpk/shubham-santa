import React from 'react';
import { getGiftImage } from '../utils/giftImages';

interface GiftBoxProps {
  onClick: () => void;
  isOpening: boolean;
  className?: string;
  giftName?: string;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onClick, isOpening, className, giftName }) => {
  const giftImage = getGiftImage(giftName);

  return (
    <div 
      className={`relative w-48 h-48 transition-transform duration-500 ${isOpening ? 'cursor-default' : 'cursor-pointer group hover:scale-105'} ${className}`}
      onClick={onClick}
    >
        {/* Shadow - Fades out when opening */}
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/40 blur-xl rounded-[100%] transition-all duration-1000 ${isOpening ? 'opacity-0 scale-50' : 'group-hover:w-32 group-hover:bg-black/20'}`}></div>

        {/* Inner Light / Magic - Appears when opening behind everything */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-400 blur-[50px] rounded-full transition-all duration-1000 ease-out z-0 ${isOpening ? 'opacity-100 scale-[4]' : 'opacity-0 scale-0'}`}></div>
        
        {/* The Gift Item Popping Out (REALISTIC IMAGE) */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpening ? '-translate-y-48 scale-150 opacity-100' : 'translate-y-0 scale-50 opacity-0'}`}>
            <div className="relative w-32 h-32">
                <img 
                    src={giftImage} 
                    alt="The Gift" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-pulse"
                    style={{ 
                        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                    }}
                />
            </div>
        </div>
        
        {/* Sparkles Effect */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none transition-opacity duration-500 ${isOpening ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute -top-32 -left-24 text-yellow-300 text-4xl animate-pulse">✨</div>
            <div className="absolute -top-40 left-12 text-white text-3xl animate-bounce">✨</div>
            <div className="absolute -top-24 right-24 text-yellow-200 text-4xl animate-pulse">✨</div>
        </div>

        {/* Box Body */}
        <div className={`absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-br from-red-600 to-red-900 rounded-b-xl rounded-t-sm shadow-2xl border border-red-500/30 overflow-hidden z-20 transition-all duration-1000 ${isOpening ? 'translate-y-20 opacity-0 blur-sm' : ''}`}>
             {/* Texture */}
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
             {/* Ribbons */}
             <div className="absolute left-1/2 -translate-x-1/2 w-10 h-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 shadow-lg border-x border-yellow-600/20"></div>
             <div className="absolute top-0 w-full h-2 bg-black/20 blur-sm"></div>
        </div>

        {/* Lid Group */}
        <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-52 h-14 z-30 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${isOpening ? '-translate-y-64 rotate-12 opacity-0' : 'group-hover:-translate-y-1'}`}>
            {/* Lid Main */}
            <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-red-800 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-b border-red-900">
                {/* Horizontal Ribbon on Lid */}
                 <div className="absolute left-1/2 -translate-x-1/2 w-10 h-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 shadow-sm"></div>
            </div>

            {/* Bow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-20 filter drop-shadow-xl">
                 {/* Center Knot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 z-50 box-shadow-inner"></div>
                {/* Loops */}
                <div className="absolute left-2 top-0 w-16 h-16 rounded-tl-[30px] rounded-br-[30px] bg-gradient-to-tr from-yellow-500 to-yellow-200 border-2 border-yellow-600 transform -rotate-12 translate-y-2 origin-bottom-right"></div>
                <div className="absolute right-2 top-0 w-16 h-16 rounded-tr-[30px] rounded-bl-[30px] bg-gradient-to-tl from-yellow-500 to-yellow-200 border-2 border-yellow-600 transform rotate-12 translate-y-2 origin-bottom-left"></div>
            </div>
        </div>
      
        {/* Text prompt - Fades out immediately on open */}
        <div className={`mt-24 text-center absolute w-full top-full left-0 transition-opacity duration-300 ${isOpening ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
            <p className="text-yellow-200 font-serif tracking-[0.2em] text-xs uppercase animate-pulse">Tap to Open</p>
        </div>
    </div>
  );
};

export default GiftBox;