"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialSlider({ testimonials }: { testimonials: any[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials?.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const handleNext = () => {
    setDirection(1);
    setCurrent(c => (c + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto min-h-[500px] flex items-center justify-center">
      {/* Background Decorators */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40px]">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] mix-blend-screen" />
         <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] mix-blend-screen" />
      </div>

      <div className="surface w-full p-8 md:p-16 lg:p-20 relative z-10 glass overflow-hidden grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-center">
         <div className="absolute top-10 left-10 text-blue-500/10 pointer-events-none">
            <Quote className="w-40 h-40 rotate-180" />
         </div>

         <div className="relative z-10 min-h-[280px] flex flex-col justify-center">
            <div className="flex gap-1.5 mb-8">
               {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
            </div>

            <div className="relative w-full overflow-hidden">
               <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                     <p className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-white leading-[1.3] mb-12 tracking-tight">
                        &quot;{testimonials[current].quote}&quot;
                     </p>
                     
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
                           <div className="w-full h-full rounded-full bg-[#030303] flex items-center justify-center text-xl font-black text-white">
                              {testimonials[current].author.charAt(0)}
                           </div>
                        </div>
                        <div>
                           <h4 className="text-xl font-bold text-white">{testimonials[current].author}</h4>
                           <p className="text-[#A1A1AA] text-sm uppercase tracking-[0.2em] mt-1 font-semibold text-blue-400">
                             {testimonials[current].role} <span className="text-slate-600 mx-2">•</span> {testimonials[current].company}
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>

         {/* Navigation Board */}
         <div className="relative z-10 flex flex-col gap-6 w-full items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
            <div className="flex lg:flex-col gap-3 w-full">
               {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setDirection(idx > current ? 1 : -1);
                      setCurrent(idx);
                    }}
                    className={`h-2 transition-all rounded-full ${current === idx ? 'w-full bg-blue-500' : 'w-12 lg:w-full bg-white/10 hover:bg-white/20'}`}
                  />
               ))}
            </div>

            <div className="flex gap-4 mt-8 w-full justify-start lg:justify-end">
               <button 
                 onClick={handlePrev} 
                 className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 text-white transition-all hover:scale-110 active:scale-95"
               >
                  <ArrowLeft className="w-6 h-6" />
               </button>
               <button 
                 onClick={handleNext} 
                 className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 text-white transition-all hover:scale-110 active:scale-95"
               >
                  <ArrowRight className="w-6 h-6" />
               </button>
            </div>

            <div className="mt-8">
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 text-left lg:text-right">Trusted globally by {testimonials.length}+ enterprise leaders.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
