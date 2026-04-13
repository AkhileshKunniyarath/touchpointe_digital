"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const presets: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/* ── Single reveal ── */
interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof presets;
  delay?: number;
  duration?: number;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 0.65,
  amount = 0.15,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={presets[variant]}
      transition={{ duration, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger wrapper ── */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayMs?: number;
  amount?: number;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.09,
  delayMs = 0,
  amount = 0.08,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delayMs / 1000,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Individual stagger item ── */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof presets;
}

export function StaggerItem({
  children,
  className,
  variant = "up",
}: StaggerItemProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={presets[variant]}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
