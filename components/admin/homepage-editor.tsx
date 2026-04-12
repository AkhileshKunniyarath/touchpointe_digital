"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, LayoutTemplate, GitCommitVertical, Star, Settings, TextQuote, Box } from "lucide-react";
import { cn } from "@/lib/utils";

const COLOR_MAPPINGS = [
  { label: "Sapphire Glow", value: "from-blue-600/20", border: "border-blue-500", bg: "bg-blue-500" },
  { label: "Amethyst Glow", value: "from-purple-600/20", border: "border-purple-500", bg: "bg-purple-500" },
  { label: "Deep Indigo Glow", value: "from-indigo-600/20", border: "border-indigo-500", bg: "bg-indigo-500" },
  { label: "Violet Glow", value: "from-violet-600/20", border: "border-violet-500", bg: "bg-violet-500" },
];

const COPY_FIELDS_TAB_1 = [
  { key: "heroTitle1", label: "Hero Title (Line 1)" },
  { key: "heroTitleGradient", label: "Hero Title (Main Highlight)" },
  { key: "heroTitle3", label: "Hero Title (Line 3)" },
  { key: "heroBtnText", label: "Hero Primary Button Text" },
  { key: "ctaHeadline", label: "Pre-Footer CTA Headline" },
  { key: "ctaBtn", label: "Pre-Footer Button Text" },
  { key: "whyHeadline", label: "Why Touchpointe Headline" },
  { key: "clientHeadline", label: "Testimonial Slider Headline" },
  { key: "industriesHeadline", label: "Industries Grid Headline" },
  { key: "exploreHeadline", label: "Services Picker Headline" }
];

const COPY_FIELDS_TAB_2 = [
  { key: "credibilityHeadline", label: "Stats Section Headline" },
  { key: "credibilitySub", label: "Stats Section Paragraph" },
  { key: "capabilitiesHeadline", label: "Capabilities Headline" },
  { key: "capabilitiesSub", label: "Capabilities Paragraph" },
  { key: "intelligenceEyebrow", label: "AI Features Eyebrow Text" },
  { key: "intelligenceHeadline", label: "AI Features Headline" },
  { key: "intelligenceSub", label: "AI Features Paragraph" },
  { key: "processEyebrow", label: "Timeline Process Eyebrow Text" },
  { key: "processHeadline", label: "Timeline Process Headline" },
  { key: "labBadge", label: "Incubation Badge Text" },
  { key: "labHeadline", label: "Incubation Headline" },
  { key: "labSub", label: "Incubation Paragraph" },
  { key: "productsHeadline", label: "Internal Products Headline" },
  { key: "productsSub", label: "Internal Products Paragraph" },
];

export function HomepageEditor({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"text" | "headers" | "arrays1" | "arrays2" | "solutions" | "testimonials">("text");

  const [copy, setCopy] = useState(initialData.copy || {});
  
  const [data, setData] = useState({
    clients: initialData?.clients || [],
    industries: initialData?.industries || [],
    workflowSteps: initialData?.workflowSteps || [],
    aiSolutions: initialData?.aiSolutions || [],
    testimonials: initialData?.testimonials || [],
    capabilities: initialData?.capabilities || [],
    stats: initialData?.stats || [],
    productsList: initialData?.productsList || [],
    labMetrics: initialData?.labMetrics || [],
    labSteps: initialData?.labSteps || [],
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const sanitizedWorkflowSteps = data.workflowSteps.map((step: any, idx: number) => ({
       ...step,
       id: String(idx + 1).padStart(2, '0')
    }));

    const sanitizedPayload = {
       copy,
       ...data,
       workflowSteps: sanitizedWorkflowSteps
    };

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedPayload)
      });
      if (res.ok) router.refresh();
      else alert("Warning: Could not save configuration. Check all required fields.");
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  const updateCopy = (key: string, val: string) => setCopy({ ...copy, [key]: val });
  
  const updateSimpleArray = (field: "clients" | "industries", idx: number, val: string) => {
    const updated = [...data[field]];
    updated[idx] = val;
    setData({ ...data, [field]: updated });
  };
  const addSimpleArray = (field: "clients" | "industries") => setData({ ...data, [field]: [...data[field], ""] });
  const removeSimpleArray = (field: "clients" | "industries", idx: number) => setData({ ...data, [field]: data[field].filter((_: any, i: number) => i !== idx) });

  const updateArrayObj = (field: keyof typeof data, idx: number, key: string, val: string) => {
    const updated: any[] = [...(data[field] as any[])];
    updated[idx] = { ...updated[idx], [key]: val };
    setData({ ...data, [field]: updated });
  };
  const removeArrayObj = (field: keyof typeof data, idx: number) => {
    const updated = (data[field] as any[]).filter((_: any, i: number) => i !== idx);
    setData({ ...data, [field]: updated });
  };

  return (
    <div className="space-y-8 pb-32">
      {/* GLOBAL ACTIONS & INSTRUCTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-950/20 p-6 rounded-2xl border border-blue-500/20 gap-4 sticky top-[80px] z-30 backdrop-blur-3xl shadow-2xl shadow-blue-500/5">
         <div>
            <h3 className="text-xl font-bold text-white mb-1">Global Static Text Controller</h3>
            <p className="text-sm text-blue-200/60 max-w-xl">EVERY single line of text on your homepage is mapped here. There are no hardcoded limits anymore.</p>
         </div>
         <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all whitespace-nowrap shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Save className="w-5 h-5"/> {isSaving ? "Synchronizing to DB..." : "Publish Website Hooks"}
         </button>
      </div>

      <div className="flex overflow-x-auto space-x-2 border-b border-white/10 pb-4 custom-scrollbar">
         <TabButton active={activeTab === "text"} onClick={() => setActiveTab("text")} icon={<TextQuote className="w-4 h-4"/>} label="Primary Headings" />
         <TabButton active={activeTab === "headers"} onClick={() => setActiveTab("headers")} icon={<TextQuote className="w-4 h-4"/>} label="Section Contexts" />
         <TabButton active={activeTab === "arrays1"} onClick={() => setActiveTab("arrays1")} icon={<Box className="w-4 h-4"/>} label="Core Grids & Stats" />
         <TabButton active={activeTab === "arrays2"} onClick={() => setActiveTab("arrays2")} icon={<Box className="w-4 h-4"/>} label="Complex Frameworks" />
         <TabButton active={activeTab === "solutions"} onClick={() => setActiveTab("solutions")} icon={<Settings className="w-4 h-4"/>} label="AI Settings" />
         <TabButton active={activeTab === "testimonials"} onClick={() => setActiveTab("testimonials")} icon={<Star className="w-4 h-4"/>} label="Testimonials & Brands" />
      </div>

      <div className="py-4">
         
         {/* -- TAB 1: Primary Typography -- */}
         {activeTab === "text" && (
           <div className="grid lg:grid-cols-2 gap-8">
             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">
                <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-6">Master Typography Routing</h4>
                {COPY_FIELDS_TAB_1.map(field => (
                  <div key={field.key}>
                    <label className="text-xs font-semibold text-white/50 uppercase tracking-widest pl-1 mb-2 block">{field.label}</label>
                    <input value={copy[field.key] || ""} onChange={e => updateCopy(field.key, e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" />
                  </div>
                ))}
             </div>
             
             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-4">Why Touchpointe Narrative</h4>
                  <textarea value={copy.whyText1 || ""} onChange={e => updateCopy("whyText1", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none h-24 mb-4" />
                  <textarea value={copy.whyText2 || ""} onChange={e => updateCopy("whyText2", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none h-24" />
                </div>
             </div>
           </div>
         )}

         {/* -- TAB 2: Section Contexts -- */}
         {activeTab === "headers" && (
           <div className="grid lg:grid-cols-2 gap-8">
             {COPY_FIELDS_TAB_2.map(field => (
               <div key={field.key} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                 <label className="text-xs font-semibold text-white/50 uppercase tracking-widest pl-1 mb-2 block">{field.label}</label>
                 {field.key.toLowerCase().includes("sub") || field.key.toLowerCase().includes("para") ? (
                   <textarea value={copy[field.key] || ""} onChange={e => updateCopy(field.key, e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none h-20 focus:border-blue-500" />
                 ) : (
                   <input value={copy[field.key] || ""} onChange={e => updateCopy(field.key, e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500" />
                 )}
               </div>
             ))}
           </div>
         )}

         {/* -- TAB 3: CORE GRIDS & STATS -- */}
         {activeTab === "arrays1" && (
           <div className="space-y-12">
             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Credibility Statistics Block</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.stats.map((st: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                      <input value={st.value} onChange={e => updateArrayObj("stats", i, "value", e.target.value)} className="w-1/3 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="e.g. 500+" />
                      <input value={st.label} onChange={e => updateArrayObj("stats", i, "label", e.target.value)} className="w-2/3 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="Label" />
                      <button onClick={() => removeArrayObj("stats", i)} className="text-red-500 p-2"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
                </div>
                <button onClick={() => setData({...data, stats: [...data.stats, { label: "", value: "" }]})} className="mt-4 px-4 py-2 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-bold">Add Stat</button>
             </div>

             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Capabilities Map</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.capabilities.map((cap: any, i: number) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 relative">
                      <button onClick={() => removeArrayObj("capabilities", i)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-4 h-4"/></button>
                      <input value={cap.title} onChange={e => updateArrayObj("capabilities", i, "title", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none mb-3" placeholder="Title" />
                      <textarea value={cap.desc} onChange={e => updateArrayObj("capabilities", i, "desc", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none h-16" placeholder="Description" />
                      <input
                        value={cap.slug || ""}
                        onChange={e => updateArrayObj("capabilities", i, "slug", e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none mt-3"
                        placeholder="service-slug (optional)"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setData({ ...data, capabilities: [...data.capabilities, { title: "", desc: "", slug: "" }] })}
                  className="mt-4 px-4 py-2 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-bold"
                >
                  Add Capability Card
                </button>
             </div>

             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Internal SaaS Products</h4>
                <div className="grid gap-4">
                  {data.productsList.map((prod: any, i: number) => (
                    <div key={i} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex-1 space-y-2">
                        <input value={prod.title} onChange={e => updateArrayObj("productsList", i, "title", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none" placeholder="Product Name" />
                        <input value={prod.tagline} onChange={e => updateArrayObj("productsList", i, "tagline", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none" placeholder="Tagline (e.g. Platform)" />
                        <textarea value={prod.desc} onChange={e => updateArrayObj("productsList", i, "desc", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none" placeholder="Description..." />
                      </div>
                      <button onClick={() => removeArrayObj("productsList", i)} className="text-red-500 p-2 h-fit"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
                </div>
                <button onClick={() => setData({...data, productsList: [...data.productsList, { title: "", desc: "", tagline: "" }]})} className="mt-4 px-4 py-2 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-bold">Add Product Showcase</button>
             </div>
           </div>
         )}
         
         {/* -- TAB 4: COMPLEX FRAMEWORKS -- */}
         {activeTab === "arrays2" && (
           <div className="space-y-12">
             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-2">&quot;How We Execute&quot; Framework</h4>
                <div className="grid gap-6 md:grid-cols-2 mt-8">
                   {data.workflowSteps.map((step: any, i: number) => (
                      <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 relative">
                         <button onClick={() => removeArrayObj("workflowSteps", i)} className="absolute top-4 right-4 text-red-500/30 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                         <div className="pointer-events-none mb-2"><span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-black">{(i + 1).toString().padStart(2, '0')}</span></div>
                         <div><input value={step.title} onChange={e => updateArrayObj("workflowSteps", i, "title", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none mt-1" placeholder="Step Headline" /></div>
                         <div><textarea value={step.desc} onChange={e => updateArrayObj("workflowSteps", i, "desc", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white h-24" placeholder="Description..." /></div>
                      </div>
                   ))}
                   <button onClick={() => setData({...data, workflowSteps: [...data.workflowSteps, { id: "xx", title: "", desc: "" }]})} className="min-h-[280px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/10 rounded-2xl p-6 font-semibold text-slate-500 hover:text-white"><Plus className="w-8 h-8"/><span>Add Framework Step</span></button>
                </div>
             </div>
             
             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Touchpointe LAB Incubation Steps</h4>
                <div className="grid gap-4">
                  {data.labSteps.map((st: any, i: number) => (
                    <div key={i} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex-1 space-y-2">
                        <input value={st.title} onChange={e => updateArrayObj("labSteps", i, "title", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Step Title" />
                        <input value={st.linkText} onChange={e => updateArrayObj("labSteps", i, "linkText", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white" placeholder="Hyperlink Label" />
                        <textarea value={st.desc} onChange={e => updateArrayObj("labSteps", i, "desc", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white h-20" placeholder="Description" />
                      </div>
                      <button onClick={() => removeArrayObj("labSteps", i)} className="text-red-500 p-2 h-fit"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
                  <button onClick={() => setData({...data, labSteps: [...data.labSteps, { title: "", desc: "", linkText: "" }]})} className="px-4 py-3 border border-indigo-500/30 text-indigo-400 rounded-lg text-sm font-bold">Add Lab Sequence Step</button>
                </div>
             </div>
             
             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Touchpointe LAB Financial Metrics</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {data.labMetrics.map((mt: any, i: number) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 relative">
                      <button onClick={() => removeArrayObj("labMetrics", i)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-4 h-4"/></button>
                      <input value={mt.value} onChange={e => updateArrayObj("labMetrics", i, "value", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white mb-2 text-xl font-black text-indigo-400" placeholder="$15mn+" />
                      <input value={mt.label} onChange={e => updateArrayObj("labMetrics", i, "label", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-xs uppercase" placeholder="Funds Raised" />
                    </div>
                  ))}
                </div>
                <button onClick={() => setData({...data, labMetrics: [...data.labMetrics, { label: "", value: "" }]})} className="mt-4 px-4 py-2 border border-indigo-500/30 text-indigo-400 rounded-lg text-sm font-bold">Add Lab Metric</button>
             </div>
           </div>
         )}

         {/* -- TAB 5: AI SOLUTIONS -- */}
         {activeTab === "solutions" && (
           <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">AI Capabilities Layout Block</h4>
              <div className="grid gap-6 md:grid-cols-2">
                 {data.aiSolutions.map((sol: any, i: number) => (
                    <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 relative">
                       <button onClick={() => removeArrayObj("aiSolutions", i)} className="absolute top-4 right-4 text-red-500/30 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                       <div><input value={sol.title} onChange={e => updateArrayObj("aiSolutions", i, "title", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none mt-1" placeholder="Title" /></div>
                       <div>
                          <div className="grid grid-cols-2 gap-2 mt-4 mb-2">
                             {COLOR_MAPPINGS.map(color => (
                               <button 
                                 key={color.value} type="button"
                                 onClick={() => updateArrayObj("aiSolutions", i, "color", color.value)}
                                 className={cn("py-2 px-3 rounded-lg border flex items-center gap-2 text-xs font-semibold", sol.color === color.value ? `bg-white/10 ${color.border} text-white` : "border-white/10 text-slate-400")}
                               >
                                  <div className={`w-3 h-3 rounded-full ${color.bg}`} /><span className="truncate">{color.label.split(' ')[0]}</span>
                               </button>
                             ))}
                          </div>
                       </div>
                       <div><textarea value={sol.desc} onChange={e => updateArrayObj("aiSolutions", i, "desc", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white h-20" /></div>
                    </div>
                 ))}
                 <button onClick={() => setData({...data, aiSolutions: [...data.aiSolutions, { title: "", desc: "", color: "from-blue-600/20" }]})} className="min-h-[300px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/10 rounded-2xl p-6 font-semibold text-slate-500"><Plus className="w-8 h-8"/><span>Add Intelligent Tier</span></button>
              </div>
           </div>
         )}

         {/* -- TAB 6: TESTIMONIALS & BRANDS -- */}
         {activeTab === "testimonials" && (
           <div className="space-y-12">
             <div className="grid lg:grid-cols-2 gap-8">
               <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                  <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Infinite Marquee Clients</h4>
                  <div className="space-y-3">
                     {data.clients.map((c: string, i: number) => (
                       <div key={i} className="flex items-center gap-3">
                          <input value={c} onChange={e => updateSimpleArray("clients", i, e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500" placeholder="e.g. GLOBEX CORP" />
                          <button onClick={() => removeSimpleArray("clients", i)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white"><Trash2 className="w-5 h-5"/></button>
                       </div>
                     ))}
                     <button onClick={() => addSimpleArray("clients")} className="w-full py-4 mt-2 border-2 border-dashed border-white/10 rounded-xl font-semibold text-slate-400 hover:text-white hover:border-white/30">+ Add Client Name</button>
                  </div>
               </div>

               <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                  <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Service Industries</h4>
                  <div className="space-y-3">
                     {data.industries.map((ind: string, i: number) => (
                       <div key={i} className="flex items-center gap-3">
                          <input value={ind} onChange={e => updateSimpleArray("industries", i, e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500" placeholder="e.g. Healthcare" />
                          <button onClick={() => removeSimpleArray("industries", i)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white"><Trash2 className="w-5 h-5"/></button>
                       </div>
                     ))}
                     <button onClick={() => addSimpleArray("industries")} className="w-full py-4 mt-2 border-2 border-dashed border-white/10 rounded-xl font-semibold text-slate-400 hover:text-white hover:border-white/30">+ Add Industry</button>
                  </div>
               </div>
             </div>

             <div className="bg-[#030303] border border-white/10 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Client Success Quotes</h4>
                <div className="grid gap-6 md:grid-cols-2">
                   {data.testimonials.map((t: any, i: number) => (
                      <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 relative">
                         <button onClick={() => removeArrayObj("testimonials", i)} className="absolute top-4 right-4 text-red-500/30 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                         <div><input value={t.author} onChange={e => updateArrayObj("testimonials", i, "author", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Executive Name" /></div>
                         <div className="grid grid-cols-2 gap-4">
                           <div><input value={t.role} onChange={e => updateArrayObj("testimonials", i, "role", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Role" /></div>
                           <div><input value={t.company} onChange={e => updateArrayObj("testimonials", i, "company", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Company" /></div>
                         </div>
                         <div><textarea value={t.quote} onChange={e => updateArrayObj("testimonials", i, "quote", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white h-24" placeholder="Quote..." /></div>
                      </div>
                   ))}
                   <button onClick={() => setData({...data, testimonials: [...data.testimonials, { quote: "", author: "", role: "", company: "" }]})} className="min-h-[250px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/10 rounded-2xl p-6 font-semibold text-slate-500 hover:text-white"><Plus className="w-8 h-8"/><span>Add Partner Quote</span></button>
                </div>
             </div>
           </div>
         )}
      </div>
    </div>
  );
}

function TabButton({ active, label, icon, onClick }: { active: boolean, label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("flex flex-row items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap", active ? "bg-white text-slate-900 shadow-md scale-100" : "bg-white/5 text-slate-300 hover:bg-white/10 scale-95 opacity-80")}>
      {icon} {label}
    </button>
  );
}
