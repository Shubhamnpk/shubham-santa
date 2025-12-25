import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import AudioPlayer from './components/AudioPlayer';
import GiftBox from './components/GiftBox';
import GiftReveal from './components/GiftReveal';
import { generateChristmasGift } from './services/geminiService';
import { GiftData } from './types';

const LOADING_MESSAGES = [
  "Checking the Secret List...",
  "Consulting Shubham Santa...",
  "Loading Sleigh with Goodies...",
  "Wrapping your surprise...",
  "Ho Ho Ho! Almost there..."
];

type AppStep = 'welcome' | 'thank_you' | 'input' | 'processing' | 'not_in_list' | 'ready_to_open' | 'revealed';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [urlUser, setUrlUser] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [giftData, setGiftData] = useState<GiftData | null>(null);
  const [step, setStep] = useState<AppStep>('welcome');

  // Check URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');
    if (user) {
      setUrlUser(user);
      setName(user);
    }
  }, []);

  // Cycle loading messages
  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[i]);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleSameToYou = () => {
    setStep('thank_you');
  };

  const processGiftGeneration = async (recipientName: string) => {
    setStep('processing');
    setIsProcessing(true);

    try {
      // Magic delay for anticipation
      const minWait = new Promise(resolve => setTimeout(resolve, 3000));
      const giftPromise = generateChristmasGift(recipientName);
      
      const [result] = await Promise.all([giftPromise, minWait]);

      const data: GiftData = {
        recipient: recipientName,
        giftName: result.giftName,
        message: result.message,
        theme: result.theme as any,
        isInList: result.isInList
      };

      setGiftData(data);
      setIsProcessing(false);
      
      // Decision Logic: Is user in list?
      if (result.isInList) {
        setStep('ready_to_open'); // Go straight to box for nice list people
      } else {
        setStep('not_in_list'); // Intercept with modal for others
      }

    } catch (error) {
      console.error(error);
      setStep('input');
      setIsProcessing(false);
    }
  };

  const handleCheckList = () => {
    if (urlUser) {
      // Skip input step if user comes from URL
      processGiftGeneration(urlUser);
    } else {
      setStep('input');
    }
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    processGiftGeneration(name);
  };

  const handleProceedFromModal = () => {
    setStep('ready_to_open');
  };

  const handleReveal = () => {
    if (isOpeningBox) return;
    setIsOpeningBox(true);
    // Wait for animation before showing content (1.5s matches the css transitions)
    setTimeout(() => {
      setStep('revealed');
      setIsOpeningBox(false);
    }, 1500);
  };
  
  const handleReset = () => {
    setGiftData(null);
    if (!urlUser) {
        setName('');
    }
    setStep('welcome'); 
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans text-slate-100">
      <Snowfall />
      <AudioPlayer />

      {/* Transparent overlay to let snowy body background show through but darken slightly for text contrast */}
      <div className="absolute inset-0 bg-[#0B1026]/70 z-0"></div>
      
      {/* Additional gradient for depth */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#0B1026] to-transparent pointer-events-none z-0"></div>

      <div className="z-10 w-full max-w-5xl px-4 flex flex-col items-center min-h-[600px] justify-center text-center">
        
        {/* STEP 1: WELCOME */}
        {step === 'welcome' && (
          <div className="glass-card p-10 md:p-16 rounded-[2rem] w-full max-w-xl shadow-2xl animate-fade-in-up border border-blue-200/20">
            <div className="mb-6 text-6xl md:text-8xl animate-float">🎄</div>
            <h1 className="christmas-font text-6xl md:text-8xl text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] leading-tight">
              Happy Christmas{urlUser ? <span className="block text-yellow-300 mt-2">{urlUser}!</span> : '!'}
            </h1>
            <button 
              onClick={handleSameToYou}
              className="mt-8 px-10 py-4 bg-gradient-to-r from-green-700 to-green-500 rounded-full text-white font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.5)] border border-green-400"
            >
              Same To You! 🎅
            </button>
          </div>
        )}

        {/* STEP 2: THANK YOU & NEW YEAR */}
        {step === 'thank_you' && (
          <div className="glass-card p-10 md:p-16 rounded-[2rem] w-full max-w-2xl shadow-2xl animate-slide-in border border-blue-200/20 overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
             
             <h2 className="serif text-3xl md:text-5xl text-yellow-200/90 mb-6 italic tracking-wide">
               Thank You{urlUser ? `, ${urlUser}` : ''}!
             </h2>
             
             <div className="relative py-8 my-6 border-t border-b border-white/10 bg-white/5 backdrop-blur-md rounded-xl">
               <p className="text-xl text-blue-100/80 font-light mb-2 uppercase tracking-[0.2em]">
                 Wishing you a prosperous
               </p>
               <h1 className="title-font text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 font-bold drop-shadow-2xl">
                 2026
               </h1>
               <p className="text-lg text-yellow-400 font-serif mt-2 italic">
                 in Advance
               </p>
             </div>
             
             <div className="flex justify-center mt-8">
               <button 
                 onClick={handleCheckList}
                 className="group relative px-10 py-5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 rounded-full text-white text-lg font-bold shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all transform hover:-translate-y-1"
               >
                 {urlUser ? "Check My Gift" : "Check Your Gift List"} &rarr;
               </button>
             </div>
          </div>
        )}

        {/* STEP 3: INPUT */}
        {step === 'input' && (
          <div className="glass-card p-8 md:p-14 rounded-[2rem] w-full max-w-xl text-center shadow-2xl animate-slide-in border border-blue-200/20">
            <h1 className="christmas-font text-5xl md:text-6xl text-white mb-2 tracking-wide">
              Shubham Santa's List
            </h1>
            <p className="font-sans text-blue-100/80 mb-10 text-lg">
              Are you on the list? Let's check.
            </p>

            <form onSubmit={handleStart} className="flex flex-col gap-6">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..." 
                className="w-full bg-blue-900/30 border border-blue-200/30 rounded-2xl px-6 py-5 text-white text-2xl placeholder-blue-200/30 outline-none focus:border-white/60 focus:ring-1 focus:ring-white/50 transition-all text-center font-serif"
              />
              
              <button 
                type="submit"
                disabled={!name.trim()}
                className="group relative px-8 py-5 bg-gradient-to-r from-red-700 to-red-600 rounded-2xl text-white font-bold tracking-[0.1em] uppercase transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden border border-red-400/30"
              >
                <span className="relative z-10 text-xl">Check List & Get Gift</span>
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: PROCESSING */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center animate-fade-in-up">
             <div className="relative">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/20 blur-[80px] rounded-full animate-pulse`}></div>
                <GiftBox 
                  onClick={() => {}} 
                  isOpening={false} 
                  className="animate-float cursor-wait"
                />
             </div>
             
             <div className="mt-16 h-20 text-center">
                 <p className="text-blue-100 font-serif text-2xl animate-pulse">
                    {loadingMsg}
                 </p>
             </div>
          </div>
        )}

        {/* STEP 5: NOT IN LIST MODAL */}
        {step === 'not_in_list' && (
          <div className="glass-card p-1 md:p-2 rounded-[2rem] w-full max-w-2xl shadow-2xl animate-slide-in border border-red-200/20 relative overflow-hidden bg-[#fffdf5]">
             {/* Paper Texture Effect */}
             <div className="w-full h-full bg-[#0B1026] p-6 rounded-[1.8rem]">
               <div className="bg-[#fff1f1] text-slate-800 p-8 md:p-12 rounded-xl relative border border-red-900/10 shadow-inner">
                  
                  {/* Wax Seal */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-red-700 shadow-lg flex items-center justify-center border-4 border-red-800 text-red-900 font-bold text-xs transform rotate-12">
                     SANTA<br/>OFFICIAL
                  </div>

                  <h2 className="christmas-font text-5xl md:text-6xl text-red-700 mb-6 leading-tight">
                    From the Desk of Santa
                  </h2>
                  
                  <div className="text-left font-serif text-lg md:text-xl leading-relaxed text-slate-700 space-y-4">
                     <p>
                       <strong>Dear {name},</strong>
                     </p>
                     <p>
                       We checked the list twice, and it seems the elves might have missed a page! But here at the North Pole...
                     </p>
                     <p className="text-xl md:text-2xl text-red-600 font-bold italic py-2 border-l-4 border-red-400 pl-4 bg-red-50">
                       “Shubham Santa won't do discrimination!”
                     </p>
                     <p>
                       Even if you weren't on the list, kindness is for everyone. I have prepared a special gift just for you.
                     </p>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={handleProceedFromModal}
                      className="group relative px-10 py-4 bg-gradient-to-r from-green-700 to-green-600 rounded-xl text-white font-bold text-lg transition-all hover:scale-105 shadow-xl border border-green-500/50 flex items-center gap-3"
                    >
                      <span>🎁</span> Collect Your Gift
                    </button>
                  </div>
               </div>
             </div>
          </div>
        )}

        {/* STEP 6: READY TO OPEN */}
        {step === 'ready_to_open' && (
          <div className="flex flex-col items-center justify-center animate-fade-in-up">
             <div className="relative">
                {/* Gold Glow for Ready State - Fades out on Open */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/20 blur-[80px] rounded-full transition-opacity duration-1000 ${isOpeningBox ? 'opacity-0' : 'animate-pulse'}`}></div>
                
                <GiftBox 
                  onClick={handleReveal} 
                  isOpening={isOpeningBox} 
                  giftName={giftData?.giftName}
                  // Stop floating when opening to avoid jumpy animation
                  className={isOpeningBox ? '' : 'animate-float cursor-pointer'}
                />
             </div>
             
             <div 
               className={`mt-24 h-20 text-center transition-all duration-500 ${isOpeningBox ? 'opacity-0 translate-y-10' : 'opacity-100'}`}
               onClick={handleReveal}
             >
                <div className="animate-bounce cursor-pointer">
                    <p className="text-white font-serif text-3xl drop-shadow-lg gold-text mb-2">
                       {giftData?.isInList ? "Gift Found!" : "A Gift For You!"}
                    </p>
                    <p className="text-blue-200/70 text-sm uppercase tracking-widest">Tap to Open</p>
                </div>
             </div>
          </div>
        )}

        {/* STEP 7: REVEAL */}
        {step === 'revealed' && giftData && (
          <GiftReveal data={giftData} onReset={handleReset} />
        )}

      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center">
         <p className="text-white/20 text-xs tracking-widest">Made with ❄️ by Shubham Santa</p>
      </div>
    </div>
  );
};

export default App;