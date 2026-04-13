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

const categoryDetails: Record<string, { title: string; text: string; list: string[] }> = {
  development: {
    title: "Enterprise Software Construction",
    text: "We build scalable, distributed systems using Next.js, Node, and Rust designed to handle massive throughput with zero-downtime architecture.",
    list: ["Microservices Architecture", "API Gateway Design", "Legacy System Migration", "Cloud-Native Builds"]
  },
  mobile: {
    title: "Native & Cross-Platform iOS/Android",
    text: "Fluid, high-performance mobile architectures bridging hardware capabilities directly to your SaaS backend.",
    list: ["React Native", "Swift / Kotlin", "Offline-first sync", "IoT Integrations"]
  },
  data: {
    title: "BI & Predictive Pipelines",
    text: "Raw data extraction transformed into real-time analytical dashboards using proprietary ETL pipelines.",
    list: ["Data Warehousing", "Machine Learning Models", "Real-time Streaming", "Predictive Analytics"]
  },
  automation: {
    title: "Hyper-automation & AI Agents",
    text: "Replacing manual overhead with deterministic agent loops and automated API pathways.",
    list: ["Generative AI Implementation", "CRM Workflows", "Custom Chatbots", "RPA Solutions"]
  },
  products: {
    title: "White-labeled SaaS",
    text: "End-to-end product delivery allowing you to instantly deploy subscription-based platforms.",
    list: ["Multi-tenant Architectures", "Stripe Billing", "Admin Dashboards", "Role-based Access"]
  }
};

export function ServicePicker() {
  const [active, setActive] = useState("development");
  const activeContent = categoryDetails[active];

  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start mt-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
          Hi, I am looking for a team to help me with&hellip;
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-lg border text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-[#7C3AED] hover:text-[#7C3AED]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8 w-full flex flex-col h-full min-h-[340px]">
        <h4 className="text-xl font-bold text-slate-900 mb-3">{activeContent.title}</h4>
        <p className="text-slate-500 leading-relaxed mb-6 text-sm">{activeContent.text}</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-8 border-t border-slate-100 pt-6">
          {activeContent.list.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-slate-800 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Link href="/services" className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors">
          Explore Full Capabilities <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
