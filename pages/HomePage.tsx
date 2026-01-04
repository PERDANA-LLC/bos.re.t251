
import React from 'react';
import { motion } from 'framer-motion';
// Fixed: Added 'Activity' to the imports from 'lucide-react'
import { ArrowRight, Sparkles, Shield, Zap, Globe, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16"
    >
      <section className="text-center py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6 inline-block">
            Next-Gen Data Visualization
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Analytics Reimagined <br /> For The Future
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
            Harness the power of real-time data streaming and AI-powered insights. Our platform transforms complex datasets into beautiful, actionable narratives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/analysis-1" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/analysis-2" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold backdrop-blur-md transition-all">
              View Insights
            </Link>
          </div>
        </motion.div>
      </section>

      <motion.section 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <FeatureCard 
          variants={item}
          icon={<Zap className="text-yellow-400" />}
          title="Real-time Speed"
          description="Latency-free data updates with our high-performance streaming architecture."
        />
        <FeatureCard 
          variants={item}
          icon={<Shield className="text-green-400" />}
          title="Secure by Design"
          description="Enterprise-grade encryption for all your sensitive data assets."
        />
        <FeatureCard 
          variants={item}
          icon={<Sparkles className="text-purple-400" />}
          title="AI Insights"
          description="Gemini-powered natural language analysis for deeper understanding."
        />
        <FeatureCard 
          variants={item}
          icon={<Globe className="text-blue-400" />}
          title="Global Reach"
          description="Monitor performance across multiple regions and deployments."
        />
      </motion.section>

      <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Experience the difference in clarity</h2>
            <p className="text-slate-400 mb-8">
              We focus on removing the noise so you can focus on the signals. Our adaptive infographics automatically adjust to highlight the most important metrics for your business.
            </p>
            <ul className="space-y-4">
              {['Dynamic scaling charts', 'Customizable dashboard tiles', 'Predictive trend modeling'].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 rounded-2xl p-4 shadow-2xl border border-white/5">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl">
               <div className="text-center">
                  <Activity className="w-16 h-16 text-blue-400 mx-auto animate-pulse mb-4" />
                  <p className="text-blue-200 font-medium">Live System Status: Optimal</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string, variants: any }> = ({ icon, title, description, variants }) => (
  <motion.div 
    variants={variants}
    className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
  >
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default HomePage;
