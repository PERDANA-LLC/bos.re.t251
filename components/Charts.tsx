
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-white/10 p-3 rounded-lg backdrop-blur-md shadow-xl">
        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-bold">{label}</p>
        <p className="text-blue-400 font-bold text-lg">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const MetricAreaChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke="#3b82f6" 
        strokeWidth={3}
        fillOpacity={1} 
        fill="url(#colorVal)" 
        animationDuration={2000}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export const MetricBarChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
      <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const MetricPieChart: React.FC<{ data: any[] }> = ({ data }) => {
  const COLORS = ['#3b82f6', '#6366f1', '#a855f7', '#ec4899'];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          animationDuration={1500}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const MetricRadarChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid stroke="#334155" />
      <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
      <PolarRadiusAxis stroke="#334155" />
      <Radar
        name="Performance"
        dataKey="A"
        stroke="#3b82f6"
        fill="#3b82f6"
        fillOpacity={0.6}
        animationDuration={2000}
      />
    </RadarChart>
  </ResponsiveContainer>
);
