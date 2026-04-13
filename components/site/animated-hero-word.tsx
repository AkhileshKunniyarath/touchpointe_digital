"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const words = ["Business", "Vision", "Growth"];

export function AnimatedHeroWord() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // trigger fade out
      setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setFade(true); // trigger fade in
      }, 400); // 400ms for fade out transition
    }, 2500); // Wait 2.5 seconds per word

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={cn(
        "text-[#EA4335] inline-block transition-opacity duration-300",
        fade ? "opacity-100" : "opacity-0"
      )}
    >
      {words[index]}
    </span>
  );
}
