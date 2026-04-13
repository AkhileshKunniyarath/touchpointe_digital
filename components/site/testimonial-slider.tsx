"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialSlider({ testimonials }: { testimonials: any[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!testimonials || testimonials.length === 0) return null;

  function go(idx: number) {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }

  function prev() {
    go((current - 1 + testimonials.length) % testimonials.length);
  }

  function next() {
    go((current + 1) % testimonials.length);
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Quote watermark */}
        <div className="absolute top-6 left-10 select-none pointer-events-none z-0 opacity-10">
          <Quote className="w-32 h-32 rotate-180 text-violet-500 fill-violet-500" />
        </div>

        <div className="relative z-10 p-10 md:p-14 min-h-[280px] flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-2xl md:text-[1.75rem] font-semibold text-slate-900 leading-snug mb-8 max-w-2xl">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-[#7C3AED]">
                    {testimonials[current].author?.[0] ?? "T"}
                  </span>
                </div>
                <div>
                  <p className="text-base font-bold text-[#7C3AED]">
                    {testimonials[current].author}
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">
                    {testimonials[current].role} &bull; {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls bar */}
        <div className="border-t border-slate-100 px-10 md:px-14 py-4 flex items-center justify-between bg-slate-50/60">
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === idx
                    ? "w-8 bg-[#7C3AED]"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
