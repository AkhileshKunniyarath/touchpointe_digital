"use client";

import { useState } from "react";
import { ArrowRight, Code, Box, Smartphone, Database, Zap } from "lucide-react";
import Link from "next/link";

const serviceCategories = [
  { id: "development", label: "Software Engineering", icon: Code },
  { id: "mobile", label: "Mobile Applications", icon: Smartphone },
  { id: "data", label: "Data Intelligence", icon: Database },
  { id: "automation", label: "Workflow Automation", icon: Zap },
  { id: "products", label: "SaaS Products", icon: Box }
];

const categoryDetails: Record<string, { title: string, text: string, list: string[] }> = {
  "development": {
    title: "Enterprise Software Construction",
    text: "We build scalable, distributed systems using Next.js, Node, and Rust designed to handle massive throughput with zero-downtime architecture.",
    list: ["Microservices Architecture", "API Gateway Design", "Legacy System Migration", "Cloud-Native Builds"]
  },
  "mobile": {
    title: "Native & Cross-Platform iOS/Android",
    text: "Fluid, high-performance mobile architectures bridging hardware capabilities directly to your SaaS backend.",
    list: ["React Native", "Swift / Kotlin", "Offline-first sync", "IoT Integrations"]
  },
  "data": {
    title: "BI & Predictive Pipelines",
    text: "Raw data extraction transformed into real-time analytical dashboards using proprietary ETL pipelines.",
    list: ["Data Warehousing", "Machine Learning Models", "Real-time Streaming", "Predictive Analytics"]
  },
  "automation": {
    title: "Hyper-automation & AI Agents",
    text: "Replacing manual overhead with deterministic agent loops and automated API pathways.",
    list: ["Generative AI Implementation", "CRM Workflows", "Custom Chatbots", "RPA Solutions"]
  },
  "products": {
    title: "White-labeled SaaS",
    text: "End-to-end product delivery allowing you to instantly deploy subscription-based platforms.",
    list: ["Multi-tenant Architectures", "Stripe Billing", "Admin Dashboards", "Role-based Access"]
  }
};

export function ServicePicker() {
  const [active, setActive] = useState("development");

  const activeContent = categoryDetails[active];

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-start mt-16 max-w-7xl mx-auto w-full">
       
       {/* Left Chipper */}
       <div className="flex flex-col gap-6">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Hi, I am looking for a team to help me with...
          </h3>
          <div className="flex flex-wrap gap-3">
             {serviceCategories.map((cat) => {
               const Icon = cat.icon;
               const isActive = active === cat.id;
               return (
                 <button
                   key={cat.id}
                   onClick={() => setActive(cat.id)}
                   className={`flex items-center gap-3 px-6 py-4 rounded-full border transition-all ${isActive ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white' : 'bg-slate-900/40 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5'}`}
                 >
                   <Icon className="w-5 h-5" />
                   <span className="font-semibold">{cat.label}</span>
                 </button>
               )
             })}
          </div>
       </div>

       {/* Right Context Window */}
       <div className="surface p-10 md:p-12 w-full flex flex-col h-full min-h-[400px]">
          <h4 className="text-2xl font-bold text-white mb-4">{activeContent.title}</h4>
          <p className="text-[#A1A1AA] leading-relaxed mb-8 text-lg">{activeContent.text}</p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-10 border-t border-white/5 pt-8">
             {activeContent.list.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white font-medium">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   {item}
                </div>
             ))}
          </div>

          <Link href="/services" className="mt-auto inline-flex items-center text-sm font-bold tracking-widest text-blue-400 hover:text-white transition-colors">
             EXPLORE FULL CAPABILITIES <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
       </div>

    </div>
  );
}
