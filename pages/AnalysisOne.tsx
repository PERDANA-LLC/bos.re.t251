
import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Clock, MousePointer2, Wand2, 
  ChevronRight, ArrowUpRight, CheckCircle2, Search, 
  Settings, Zap, BarChart3, ShieldCheck, Globe2,
  Calculator, DollarSign, PieChart as PieChartIcon,
  Briefcase
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SectionHeader: React.FC<{ title: string; subtitle?: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="mb-8 mt-16 first:mt-0">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-400 border-l-2 border-blue-500/30 pl-4 py-1">{subtitle}</p>}
  </div>
);

type ServiceKey = 'staging' | 'video' | 'leads' | 'maintenance';

const ArbitrageCalculator: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<Set<ServiceKey>>(new Set(['staging', 'video']));
  const [volume, setVolume] = useState(10);
  const [markup, setMarkup] = useState(150); // percentage

  // Data synced exactly with Table 1.1 "The Arbitrage Value Matrix"
  const serviceData: Record<ServiceKey, { name: string; fiverrCost: number; unit: string; traditionalCost: number }> = {
    staging: { name: 'Virtual Staging', fiverrCost: 25, unit: 'Photo', traditionalCost: 90 },
    video: { name: 'Video Editing', fiverrCost: 45, unit: 'Asset', traditionalCost: 125 },
    leads: { name: 'Lead Qual (ISA)', fiverrCost: 11, unit: 'Hour', traditionalCost: 40 },
    maintenance: { name: 'Listing Maintenance', fiverrCost: 299, unit: 'Month', traditionalCost: 3333 }
  };

  const toggleService = (key: ServiceKey) => {
    const newSelection = new Set(selectedServices);
    if (newSelection.has(key)) {
      if (newSelection.size > 1) {
        newSelection.delete(key);
      }
    } else {
      newSelection.add(key);
    }
    setSelectedServices(newSelection);
  };

  const totals = useMemo(() => {
    let cost = 0;
    let revenue = 0;
    let traditionalValue = 0;
    
    selectedServices.forEach((key: ServiceKey) => {
      const s = serviceData[key];
      const unitCost = s.fiverrCost;
      const unitSell = unitCost * (1 + markup / 100);
      
      cost += volume * unitCost;
      revenue += volume * unitSell;
      traditionalValue += volume * s.traditionalCost;
    });

    const profit = revenue - cost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const marketSavings = traditionalValue - revenue;

    return { cost, revenue, profit, margin, marketSavings };
  }, [selectedServices, volume, markup]);

  return (
    <div className="bg-slate-900/60 border border-blue-500/20 rounded-3xl p-8 my-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Calculator size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/20">
            <Calculator className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Arbitrage Profit Projection</h3>
            <p className="text-sm text-slate-400">Synced with Chapter 1 Arbitrage Matrix data.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Service Selection</label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(serviceData) as Array<ServiceKey>).map((key) => (
                  <button
                    key={key}
                    onClick={() => toggleService(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedServices.has(key) 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20' 
                      : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {selectedServices.has(key) && <CheckCircle2 size={14} />}
                    {serviceData[key].name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Monthly Volume (per service)
                </label>
                <span className="text-blue-400 font-bold">{volume}</span>
              </div>
              <input 
                type="range" min="1" max="100" value={volume} 
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-[10px] text-slate-500 mt-2 italic">
                Simulating {volume} units for each of the {selectedServices.size} active products.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Pricing Markup (%)</label>
                <span className="text-emerald-400 font-bold">{markup}%</span>
              </div>
              <input 
                type="range" min="20" max="500" step="10" value={markup} 
                onChange={(e) => setMarkup(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-[10px] text-slate-500 mt-2">
                Typical real estate digital arbitrage targets 150% - 300% markup.
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            
            <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Production Cost</p>
                <p className="text-2xl font-bold text-white">${totals.cost.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Agency Revenue</p>
                <p className="text-2xl font-bold text-white">${Math.round(totals.revenue).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10 relative z-10">
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Net Arbitrage Profit</p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="text-5xl font-black text-emerald-400 tracking-tight">
                  ${Math.round(totals.profit).toLocaleString()}
                </p>
                <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-sm font-bold">
                  {Math.round(totals.margin)}% Net Margin
                </span>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Client Market Value Savings</p>
                  <p className="text-blue-300 font-bold text-lg">${Math.round(totals.marketSavings).toLocaleString()}</p>
                </div>
                <Briefcase className="text-blue-500/30" size={32} />
              </div>

              <p className="text-slate-500 text-[10px] mt-4 uppercase tracking-widest text-center">
                Sync Data: Staging (${serviceData.staging.fiverrCost}), Video (${serviceData.video.fiverrCost}), ISA (${serviceData.leads.fiverrCost}), Maint (${serviceData.maintenance.fiverrCost})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArbitrageTable: React.FC = () => (
  <div className="overflow-x-auto my-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-white/5">
          <th className="p-4 text-xs uppercase tracking-wider text-slate-500 font-bold">Category</th>
          <th className="p-4 text-xs uppercase tracking-wider text-slate-500 font-bold">Traditional US Agency Cost</th>
          <th className="p-4 text-xs uppercase tracking-wider text-slate-500 font-bold">Fiverr (Global)</th>
          <th className="p-4 text-xs uppercase tracking-wider text-blue-400 font-bold">Margin Potential</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {[
          { cat: 'Virtual Staging', us: '$80-$100', fv: '$20-$30', margin: '~70%' },
          { cat: 'Video Editing', us: '$100-$150', fv: '$30-$60', margin: '~60-80%' },
          { cat: 'Lead Qual (ISA)', us: '$3,000/mo', fv: '$7-$15/hr', margin: '~50-60%' },
          { cat: 'Listing Maint', us: '$3,333/mo', fv: '$299/mo', margin: 'Recurring' },
        ].map((row, i) => (
          <tr key={i} className="hover:bg-white/5 transition-colors group">
            <td className="p-4 font-medium text-slate-200">{row.cat}</td>
            <td className="p-4 text-slate-400">{row.us}</td>
            <td className="p-4 text-slate-400">{row.fv}</td>
            <td className="p-4 font-bold text-emerald-400 group-hover:scale-110 transition-transform origin-left">{row.margin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FlywheelDiagram: React.FC = () => (
  <div className="relative h-64 md:h-80 flex items-center justify-center my-12">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-48 h-48 md:w-64 md:h-64 border-2 border-dashed border-blue-500/30 rounded-full"
    />
    <div className="grid grid-cols-1 gap-12 relative z-10 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40">
          <Zap className="text-white" size={20} />
        </div>
        <span className="font-bold text-white uppercase tracking-tighter">The Hub (SOPs)</span>
      </div>
    </div>
    <div className="absolute top-0 flex flex-col items-center -translate-y-1/2">
      <div className="bg-slate-900 border border-blue-500/50 px-4 py-2 rounded-xl text-blue-400 font-bold text-xs uppercase">Attract</div>
    </div>
    <div className="absolute bottom-0 flex flex-col items-center translate-y-1/2">
      <div className="bg-slate-900 border border-emerald-500/50 px-4 py-2 rounded-xl text-emerald-400 font-bold text-xs uppercase">Delight</div>
    </div>
    <div className="absolute right-0 flex flex-col items-center translate-x-1/2">
      <div className="bg-slate-900 border border-indigo-500/50 px-4 py-2 rounded-xl text-indigo-400 font-bold text-xs uppercase">Engage</div>
    </div>
  </div>
);

const AnalysisOne: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const fetchAIInsight = async (topic: string) => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following strategic concept for a real estate business: ${topic}. Provide a brief, high-level executive insight on implementation risks and ROI potential.`,
      });
      setAiAnalysis(response.text || "Insight unavailable.");
    } catch (e) {
      setAiAnalysis("Strategic alignment suggests high ROI potential via labor arbitrage, provided quality control SOPs are strictly enforced.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="relative">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[60]" style={{ scaleX }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 space-y-12"
        >
          <header className="mb-16">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded mb-4 inline-block border border-blue-500/20">
              Whitepaper / Strategy Report
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              The Zillow-Fiverr Arbitrage Protocol
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-3xl">
              Architecting a Scalable Drop Servicing Flywheel for the North American Real Estate Market.
            </p>
          </header>

          <section id="chapter-1">
            <SectionHeader 
              title="1. Macro-Economic Thesis" 
              subtitle="The divergence of decentralized gig talent and luxury real estate demand."
              icon={<Globe2 size={20} />}
            />
            <div className="prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed">
              <p>
                The foundational premise rests on inefficiencies in the real estate marketing ecosystem. Agents are under pressure to be multimedia broadcasters, yet their time is best spent on revenue-generating activities like prospecting.
              </p>
              <ArbitrageTable />
              <p>
                We shift from the "Funnel" model to the "Flywheel." By acting as the central axle, we reduce friction through technology and apply force through quality control SOPs.
              </p>
              <FlywheelDiagram />
            </div>
          </section>

          <section id="calculator">
            <SectionHeader 
              title="Arbitrage Profit Model" 
              subtitle="Interactive simulation of monthly gross profit based on the Fiverr supply chain."
              icon={<Calculator size={20} />}
            />
            <ArbitrageCalculator />
          </section>

          <section id="skus">
            <SectionHeader 
              title="2. Productized Service Architecture" 
              subtitle="Defining three core SKUs for the Zillow Premier Agent."
              icon={<Zap size={20} />}
            />
            <div className="grid md:grid-cols-3 gap-6 my-8">
              {[
                { title: 'SKU A: Visual Assets', desc: 'Virtual Staging & Renovation. 24h turnaround.', price: '$45/ea', icon: <ArrowUpRight className="text-blue-400" /> },
                { title: 'SKU B: Content Engine', desc: 'Vertical Video (Reels/TikTok) Monthly Retainer.', price: '$599/mo', icon: <TrendingUp className="text-indigo-400" /> },
                { title: 'SKU C: Growth Layer', desc: 'Lead Qualification & Listing Maintenance.', price: '$1,999/mo', icon: <Users className="text-emerald-400" /> },
              ].map((sku, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                  <div className="mb-4">{sku.icon}</div>
                  <h4 className="font-bold text-white mb-2">{sku.title}</h4>
                  <p className="text-sm text-slate-400 mb-4">{sku.desc}</p>
                  <div className="text-lg font-bold text-blue-400">{sku.price}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="tech">
            <SectionHeader 
              title="3. The Headless Agency" 
              subtitle="Automating the fulfillment layer with middleware and white-labeled portals."
              icon={<Settings size={20} />}
            />
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-bold text-xs">01</span>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">Service Provider Pro (SPP)</h5>
                  <p className="text-slate-400 text-sm">Centralized client portal for asynchronous order intake and file delivery.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <span className="text-indigo-400 font-bold text-xs">02</span>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">Make.com Orchestration</h5>
                  <p className="text-slate-400 text-sm">Automated handoffs between client intake and the Virtual Bench of freelancers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <span className="text-purple-400 font-bold text-xs">03</span>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">The Review Loop</h5>
                  <p className="text-slate-400 text-sm">Integration with Frame.io for precise, timestamped video feedback.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="acquisition">
            <SectionHeader 
              title="4. Acquisition Systems" 
              subtitle="From Zero to First Client via the 'Tripwire' strategy."
              icon={<Search size={20} />}
            />
            <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-8 rounded-3xl border border-blue-500/20">
              <h4 className="text-lg font-bold text-white mb-4">The 'Free Sample' Protocol</h4>
              <p className="text-slate-300 italic mb-6">"I noticed 123 Main St has a vacant living room. I took the liberty of virtually staging one photo just to show you what it could look like. No strings attached."</p>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-sm text-slate-200">Leverages reciprocity bias</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-sm text-slate-200">Demonstrates speed (24h turnaround)</span>
              </div>
            </div>
          </section>

          <section id="scaling">
            <SectionHeader 
              title="5. Scaling & Unit Economics" 
              subtitle="Removing yourself from the day-to-day operations."
              icon={<BarChart3 size={20} />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-emerald-400" size={18}/> 
                  The Retention Layer
                </h5>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The 'Listing Maintenance' subscription reduces churn because the agent relies on you for weekly seller updates. If they fire you, they resume the administrative drag themselves.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="text-blue-400" size={18}/> 
                  Infrastructure Hires
                </h5>
                <p className="text-sm text-slate-400 leading-relaxed">
                  At $10k MRR, hire a full-time Project Manager ($800-$1,200/mo) to manage the Virtual Bench and handle Quality Control.
                </p>
              </div>
            </div>
          </section>
        </motion.div>

        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Wand2 className="text-blue-400" size={18} />
              AI Strategy Assistant
            </h3>
            <div className="space-y-4">
              <button 
                onClick={() => fetchAIInsight("Zillow Fiverr Arbitrage Scalability")}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-blue-400 font-bold uppercase text-[10px]">Macro View</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-slate-300">Summarize Arbitrage Risks</span>
              </button>

              <button 
                onClick={() => fetchAIInsight("Flywheel vs Funnel in Real Estate Marketing")}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-indigo-400 font-bold uppercase text-[10px]">Operation</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-slate-300">Flywheel Implementation</span>
              </button>

              <button 
                onClick={() => fetchAIInsight("Future of AI in Virtual Staging 2026")}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-purple-400 font-bold uppercase text-[10px]">Future Look</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-slate-300">2026 AI Evolution</span>
              </button>
            </div>

            {(isAiLoading || aiAnalysis) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl"
              >
                {isAiLoading ? (
                  <div className="flex items-center gap-3 py-4">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-blue-300 font-medium">Gemini is thinking...</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{aiAnalysis}"
                  </p>
                )}
              </motion.div>
            )}
          </div>

          <div className="p-6 rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900 to-slate-950">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Table of Contents</h4>
            <nav className="space-y-3">
              {['Executive Summary', 'Chapter 1: The Macro Thesis', 'Calculator', 'Chapter 2: SKU Architecture', 'Chapter 3: Technical Setup', 'Chapter 4: Scaling Strategy'].map((item, idx) => (
                <div key={idx} className="text-sm text-slate-400 hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-500/50 rounded-full group-hover:w-2 transition-all" />
                  {item}
                </div>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AnalysisOne;
