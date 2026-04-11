"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export function TestimonialSlider({ testimonials }: { testimonials: any[] }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto surface-strong p-10 md:p-16 flex flex-col md:flex-row gap-8 items-center min-h-[400px]">
      {/* Left Decoration */}
      <div className="absolute top-10 left-10 text-white/5">
         <Quote className="w-32 h-32 rotate-180" />
      </div>

      <div className="flex-1 relative z-10">
        <p className="text-2xl md:text-4xl font-semibold text-white leading-snug mb-8">
          "{testimonials[current].quote}"
        </p>
        <div>
          <p className="text-xl font-bold text-blue-400">{testimonials[current].author}</p>
          <p className="text-sm text-slate-400 uppercase tracking-widest">{testimonials[current].role} • {testimonials[current].company}</p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex flex-row md:flex-col gap-4 relative z-10 shrink-0">
         {testimonials.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${current === idx ? 'border-blue-500 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'border-white/10 opacity-50 hover:opacity-100'}`}
            >
               <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-bold text-white/50">{idx + 1}</div>
            </button>
         ))}
      </div>
    </div>
  );
}
