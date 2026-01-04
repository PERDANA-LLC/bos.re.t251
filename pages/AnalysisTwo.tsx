
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, ShieldAlert, ListChecks, Network, Coins, 
  ArrowRight, CheckCircle2, AlertTriangle, Briefcase, 
  FileText, Smartphone, Layout, Search, Zap, Wand2,
  ChevronRight, MessageSquare, Scale, Calculator,
  TrendingUp, Layers
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PhaseCard: React.FC<{ number: string; title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ number, title, children, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-blue-500/20 transition-all relative group"
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
      {icon}
    </div>
    <div className="flex items-center gap-4 mb-6">
      <span className="text-4xl font-black text-blue-500/20">{number}</span>
      <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
    </div>
    <div className="space-y-4 text-slate-400 leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const ServiceSKU: React.FC<{ title: string; fiverr: string; price: string; margin: string; icon: React.ReactNode; description: string }> = ({ title, fiverr, price, margin, icon, description }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col h-full hover:bg-white/10 transition-all">
    <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-4 text-blue-400">{icon}</div>
    <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
    <p className="text-sm text-slate-400 mb-6 flex-grow">{description}</p>
    <div className="space-y-3 pt-4 border-t border-white/5">
      <div className="flex justify-between text-xs">
        <span className="text-slate-500 font-bold uppercase">Fiverr Cost</span>
        <span className="text-slate-300">{fiverr}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500 font-bold uppercase">Target Price</span>
        <span className="text-blue-400 font-bold">{price}</span>
      </div>
      <div className="mt-2 pt-2 bg-emerald-500/10 rounded-lg p-2 text-center">
        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Margin: {margin}</span>
      </div>
    </div>
  </div>
);

const IaaSModeler: React.FC = () => {
  const [volA, setVolA] = useState(5); // presentation packages
  const [volB, setVolB] = useState(10); // AI system subscribers
  const [volC, setVolC] = useState(50); // Staged photos

  const metrics = useMemo(() => {
    // Service A: One-time high ticket
    const costA = volA * 40;
    const revA = volA * 399;
    
    // Service B: Recurring MRR
    const costB = volB * 75; // initial setup/overhead average
    const revB = volB * 297;
    
    // Service C: Volume play
    const costC = volC * 7.5;
    const revC = volC * 42.5;

    const totalCost = costA + costB + costC;
    const totalRev = revA + revB + revC;
    const totalProfit = totalRev - totalCost;
    
    return {
      totalRev,
      totalProfit,
      mrr: revB,
      oneTime: revA + revC,
      margin: totalRev > 0 ? (totalProfit / totalRev) * 100 : 0
    };
  }, [volA, volB, volC]);

  return (
    <div className="my-16 bg-slate-900/40 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
            <Calculator className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">IaaS Profit Modeler</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Based on Phase 1 Architecture Data</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-slate-300">Package A: Buyer Presentations</label>
                <span className="text-blue-400 font-bold">{volA} sales</span>
              </div>
              <input 
                type="range" min="0" max="20" value={volA} 
                onChange={(e) => setVolA(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-[10px] text-slate-500 italic">One-time setups at $399 per agent.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-slate-300">Package B: AI Nurture (MRR)</label>
                <span className="text-indigo-400 font-bold">{volB} subs</span>
              </div>
              <input 
                type="range" min="0" max="50" value={volB} 
                onChange={(e) => setVolB(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <p className="text-[10px] text-slate-500 italic">Monthly recurring revenue at $297/mo.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-slate-300">Package C: Virtual Staging</label>
                <span className="text-emerald-400 font-bold">{volC} photos</span>
              </div>
              <input 
                type="range" min="0" max="200" step="10" value={volC} 
                onChange={(e) => setVolC(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-[10px] text-slate-500 italic">Volume photo processing at $42.50 avg price.</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/5 flex flex-col justify-between relative">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Monthly MRR</p>
                  <p className="text-2xl font-bold text-indigo-400">${metrics.mrr.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black mb-1">One-Time Revenue</p>
                  <p className="text-2xl font-bold text-blue-400">${metrics.oneTime.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Projected Total Gross Profit</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white tracking-tighter">${Math.round(metrics.totalProfit).toLocaleString()}</span>
                  <span className="text-emerald-400 font-bold text-sm bg-emerald-400/10 px-2 py-0.5 rounded-full">{Math.round(metrics.margin)}% Margin</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex items-center gap-4">
              <TrendingUp className="text-blue-500 shrink-0" />
              <p className="text-[11px] text-slate-400 leading-tight">
                This model assumes mid-point Fiverr costs ($40 presentation, $75 AI overhead, $7.50 staging) as defined in the masterclass data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisTwo: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const roadmapSteps = [
    { day: "1-3", task: "Set up Agency Website (HighLevel/Squarespace). Brand as '2025 Agent Scale System'." },
    { day: "4-7", task: "Hire/Vet Fiverr talent for Virtual Staging & Video Editing." },
    { day: "8-9", task: "Create 'Buyer Representation' templates & scrape 50 Zillow Premier Agents." },
    { day: "10-11", task: "Launch 'Audit' Cold Email campaign & Gap Analysis outreach." },
    { day: "12-30", task: "Close first 3 clients. Manually bridge work. Automate in month 2." },
  ];

  const fetchAIInsight = async (topic: string) => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide an expert consulting insight on this real estate arbitrage topic: ${topic}. Focus on 2025-2026 market trends, NAR settlement compliance, and scalability.`,
      });
      setAiAnalysis(response.text || "Strategic insight unavailable.");
    } catch (e) {
      setAiAnalysis("The NAR settlement creates a massive 'Compliance Gap' that top-tier agents are desperate to fill with productized services.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-16"
    >
      {/* Header section */}
      <header className="relative py-12">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 blur-3xl -z-10 rounded-full" />
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded mb-4 inline-block border border-blue-500/20">
          Masterclass: Real Estate Arbitrage 2025-2026
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
          The Arbitrage Flywheel <br /><span className="text-blue-500 italic">Implementation Protocol</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          Synthesized from 20+ years of strategy to bridge the "Execution Gap" paralyzing North American Agents post-NAR settlement.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          
          {/* Executive Summary Card */}
          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl shadow-blue-500/20 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap size={24} /> The Executive Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-blue-50 font-medium leading-relaxed">
                  Agents are losing 46% of leads to missed calls and are burning out trying to justify commissions post-NAR Settlement.
                </p>
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="p-2 bg-emerald-400 rounded-lg text-emerald-900"><Coins size={20}/></div>
                  <div>
                    <div className="text-xs uppercase font-black opacity-70">The Opportunity</div>
                    <div className="font-bold">Labor Arbitrage at 1/10th Cost</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950/20 p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Zillow Lead Cost</span>
                  <span className="font-bold">$1,000+ /mo</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full w-full" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Your Conversion Cost</span>
                  <span className="font-bold text-emerald-400">~$100 /mo</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[10%]" />
                </div>
              </div>
            </div>
          </section>

          {/* Phase 1: Architecture */}
          <PhaseCard number="01" title="The Architecture" icon={<Layout size={48}/>}>
            <p>Do not sell "marketing." Sell <strong>Infrastructure as a Service (IaaS)</strong>. You are building a Drop Servicing Agency for the "Killer" SKUs.</p>
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <ServiceSKU 
                title="NAR Compliance" 
                description="Digital presentation decks to get buyer agreements signed immediately."
                fiverr="$30 - $50" 
                price="$499" 
                margin="90%"
                icon={<FileText size={20}/>}
              />
              <ServiceSKU 
                title="AI Nurture" 
                description="24/7 SMS & Voice follow-up for Zillow leads that go cold."
                fiverr="$50 setup" 
                price="$297/mo" 
                margin="Recurring"
                icon={<Smartphone size={20}/>}
              />
              <ServiceSKU 
                title="Virtual Staging" 
                description="High-speed AI renovation photos for listings with 24h turnaround."
                fiverr="$10/photo" 
                price="$50/photo" 
                margin="80%"
                icon={<Zap size={20}/>}
              />
            </div>
          </PhaseCard>

          {/* Interactive Modeler Section */}
          <IaaSModeler />

          {/* Phase 2: Supply Chain */}
          <PhaseCard number="02" title="The Supply Chain" icon={<Network size={48}/>}>
            <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-6">
              <h4 className="font-bold text-white flex items-center gap-2">
                <ListChecks size={20} className="text-blue-400" />
                Vetting Protocol (The McKinsey Standard)
              </h4>
              <ul className="space-y-4">
                {[
                  { t: "The Search Hack", d: "Don't search 'Video Editor'. Use 'Real Estate Reels Premiere Pro'." },
                  { t: "Commercial Rights", d: "Source Fiverr CR terms. Must have Full Broadcast Rights for ads." },
                  { t: "The Test Flight", d: "Test 5 sellers on 1 task. Winner is Primary; Runner-up is Backup." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 size={14} className="text-blue-400" />
                    </div>
                    <div>
                      <span className="text-slate-200 font-bold block">{item.t}</span>
                      <span className="text-sm">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </PhaseCard>

          {/* Phase 3: Acquisition */}
          <PhaseCard number="03" title="Acquisition Sniper" icon={<Target size={48}/>}>
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-dashed border-white/10 space-y-12">
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/40" />
                  <h5 className="font-bold text-white mb-2">Identify "Bleeding" Whales</h5>
                  <p className="text-sm">Filter Zillow for "Premier Agents." If they pay Zillow, they have budget but are likely losing 46% of leads to conversion gaps.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/40" />
                  <h5 className="font-bold text-white mb-2">The "Audit" Hook Script</h5>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 italic text-slate-300 text-sm">
                    "I see you're a Premier Agent in [City]. I called your office and it went to voicemail. I want to install a 24/7 AI receptionist so you never miss a $100 Zillow lead again..."
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-purple-500 rounded-full shadow-lg shadow-purple-500/40" />
                  <h5 className="font-bold text-white mb-2">The "Resume" Hook</h5>
                  <p className="text-sm">Target agents with &lt;5 sales on Zillow. Sell them the "Top 1% Profile Package" to bridge their credibility gap.</p>
                </div>
              </div>
            </div>
          </PhaseCard>

          {/* Phase 5: Compliance */}
          <section className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="text-red-400" />
              Compliance & Risk Mitigation
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-red-400 font-bold text-sm uppercase">RESPA</div>
                <p className="text-xs text-slate-400">Do not pay referral fees for settlement services. Stick to Marketing IaaS models.</p>
              </div>
              <div className="space-y-2">
                <div className="text-red-400 font-bold text-sm uppercase">TCPA</div>
                <p className="text-xs text-slate-400">AI bots must announce themselves as automated assistants to comply with privacy laws.</p>
              </div>
              <div className="space-y-2">
                <div className="text-red-400 font-bold text-sm uppercase">Unlicensed</div>
                <p className="text-xs text-slate-400">Virtual Assistants cannot negotiate terms. Keep services strictly administrative/marketing.</p>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Roadmap & AI */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* AI Advisor */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md sticky top-24">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Wand2 className="text-blue-400" size={18} />
              Arbitrage AI Advisor
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => fetchAIInsight("NAR Settlement Lead Conversion")}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Post-NAR Strategy</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-300">How to pitch "Buyer Agreements"</div>
              </button>
              
              <button 
                onClick={() => fetchAIInsight("Scaling Real Estate IaaS")}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Scaling</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-slate-300">Unit Economics of IaaS models</div>
              </button>
            </div>

            <AnimatePresence>
              {(isAiLoading || aiAnalysis) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl"
                >
                  {isAiLoading ? (
                    <div className="flex items-center gap-3 py-4">
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-blue-300 font-bold uppercase tracking-widest">Consulting...</span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{aiAnalysis}"
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-12 border-t border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Zero-to-Hero Roadmap</h4>
              <div className="space-y-6">
                {roadmapSteps.map((s, idx) => (
                  <div key={idx} className="flex gap-4 group cursor-default">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black group-hover:bg-blue-600 transition-colors">
                        {s.day}
                      </div>
                      {idx !== roadmapSteps.length - 1 && <div className="w-px h-full bg-white/10 my-1" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight pt-1">
                      {s.task}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/5 flex flex-col items-center text-center">
            <Scale className="text-blue-500 mb-4" size={32} />
            <h4 className="text-white font-bold mb-2">Legal Compliance Ready</h4>
            <p className="text-xs text-slate-500 mb-6">Fully synthesized with RESPA, TCPA, and Unlicensed Assistant guidelines.</p>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all">
              Download Full Report PDF
            </button>
          </div>

        </aside>
      </div>
    </motion.div>
  );
};

export default AnalysisTwo;
