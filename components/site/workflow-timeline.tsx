"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function WorkflowTimeline({ steps }: { steps: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Maps the glowing vertical line mapping explicitly down the exact progress of scrolling
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto py-10">
      {/* Static dashed background line */}
      <div className="absolute left-[34px] md:left-1/2 top-0 bottom-0 w-px border-l border-dashed border-white/20 md:-translate-x-1/2 z-0" />

      {/* Dynamic scrolling neon line */}
      <motion.div
        className="absolute left-[34px] md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-500 md:-translate-x-1/2 z-0 origin-top shadow-[0_0_30px_rgba(59,130,246,0.9)] rounded-full"
        style={{ scaleY }}
      />

      <div className="grid gap-16 md:gap-24 relative z-10">
        {steps.map((step, idx) => (
          <WorkflowStepItem key={idx} step={step} idx={idx} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function WorkflowStepItem({ step, idx, scrollYProgress }: { step: any; idx: number; scrollYProgress: any }) {
  const isEven = idx % 2 === 0;

  // Parallax float effect for the cards
  const moveY = useTransform(scrollYProgress, [0, 1], [30 - idx * 5, -30 + idx * 5]);

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""} group`}>
      {/* Tracker Dot in the middle */}
      <motion.div
        className="absolute left-[26px] md:left-1/2 mt-1 md:mt-0 top-8 md:top-1/2 md:-translate-y-1/2 md:-translate-x-[50%] w-5 h-5 rounded-full bg-[#030303] border-2 border-slate-600 transition-all duration-500 z-20 flex items-center justify-center"
        whileInView={{
          scale: 1.5,
          borderColor: "#3b82f6",
          backgroundColor: "#3b82f6",
          boxShadow: "0 0 25px rgba(59,130,246,0.9)"
        }}
        viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      <div className={`w-full md:w-1/2 pl-[80px] md:pl-0 ${isEven ? "md:pr-20 md:text-right flex md:justify-end" : "md:pl-20 text-left flex md:justify-start"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: moveY }}
          className={`surface relative z-10 w-full max-w-lg p-8 sm:p-10 lg:p-12 transition-all duration-500 border-white/5 
                      hover:border-blue-500/40 hover:bg-gradient-to-br hover:from-blue-900/20 hover:to-[#030303] 
                      overflow-hidden ${isEven ? "hover:-translate-x-4 md:rounded-r-none border-r-4 border-r-transparent hover:border-r-blue-500 rounded-[2rem]"
                                                : "hover:translate-x-4 md:rounded-l-none border-l-4 border-l-transparent hover:border-l-blue-500 rounded-[2rem]"}`}
        >
          <span className={`absolute -top-6 ${isEven ? "left-4" : "right-4"} text-[10rem] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-blue-500/[0.05] transition-colors duration-700 leading-none`}>
            {step.id || String(idx + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 relative z-20 group-hover:text-blue-100 transition-colors">
            {step.title}
          </h3>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed relative z-20">
             {step.desc}
          </p>
        </motion.div>
      </div>

      <div className="hidden md:block w-1/2" />
    </div>
  );
}
