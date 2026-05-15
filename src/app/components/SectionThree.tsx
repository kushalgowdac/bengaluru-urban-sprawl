import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Building2, Plane, Train } from 'lucide-react';
import metroConstruction from 'figma:asset/a265bd6bd80bcba7871282b1d355905fc50f6841.png';
import airportAerial from 'figma:asset/d25ec6def2b3eefa37fbcf53e394fae90fe0139d.png';
import electronicsCity from 'figma:asset/88d0dea7ea5efd91bf2444a8d3cf29fd9493a27a.png';
import nammaMetro from 'figma:asset/f133cc05ae41eb1b9e5b5f752c92252423a1163f.png';

const growthRateData = [
  { period: '1988-1995', rate: 1.8, acceleration: 'Baseline', event: 'Pre-IT era', color: '#94a3b8' },
  { period: '1995-2003', rate: 4.3, acceleration: '+139% ⬆️', event: 'IT Boom', color: '#f97316' },
  { period: '2003-2007', rate: 4.7, acceleration: '+9%', event: 'Expansion', color: '#fb923c' },
  { period: '2007-2014', rate: 11.7, acceleration: '+149% ⬆️⬆️', event: 'Airport + Metro', color: '#dc2626' },
  { period: '2014-2024', rate: 10.9, acceleration: '-7% ⬇️', event: 'Saturation', color: '#fbbf24' },
];

const timelineEvents = [
  { 
    year: 1992, 
    month: 'Sep', 
    title: 'Infosys E-City', 
    description: 'Electronics City campus opens',
    impact: 'Birth of IT hub',
    icon: Building2,
    color: 'bg-orange-500'
  },
  { 
    year: 1994, 
    month: 'Aug', 
    title: 'Whitefield ITPB', 
    description: 'IT Park established',
    impact: 'Eastern corridor begins',
    icon: Building2,
    color: 'bg-orange-600'
  },
  { 
    year: 2008, 
    month: 'May 24', 
    title: 'Airport Opens', 
    description: 'Kempegowda International',
    impact: 'Northern sprawl catalyst',
    icon: Plane,
    color: 'bg-red-600'
  },
  { 
    year: 2011, 
    month: 'Oct 20', 
    title: 'Metro P1 Opens', 
    description: 'Purple Line partial',
    impact: 'Construction impact begins',
    icon: Train,
    color: 'bg-red-700'
  },
  { 
    year: 2017, 
    month: 'Jun 19', 
    title: 'Metro P1 Complete', 
    description: 'Full Purple Line operational',
    impact: 'Peak infrastructure phase',
    icon: Train,
    color: 'bg-red-800'
  },
  { 
    year: 2023, 
    month: 'Mar 26', 
    title: 'Whitefield Metro', 
    description: 'Purple Line extension',
    impact: 'Eastern expansion complete',
    icon: Train,
    color: 'bg-yellow-600'
  },
];

export function SectionThree() {
  return (
    <section className="py-16">
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">SECTION 3: THE CAUSES</h2>
          <p className="text-xl text-slate-300">Infrastructure Events That Triggered Transformation</p>
        </div>

        {/* Horizontal Timeline */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            Infrastructure Catalyst Timeline
          </h3>
          
          <div className="relative bg-slate-900/50 rounded-xl p-8 border border-slate-600">
            {/* Timeline Line */}
            <div className="absolute top-16 left-12 right-12 h-1 bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500" />
            
            {/* Timeline Events */}
            <div className="grid grid-cols-6 gap-4 relative">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={index} className="flex flex-col items-center">
                    {/* Year Marker */}
                    <div className={`${event.color} w-4 h-4 rounded-full ring-4 ring-slate-900 mb-2 z-10`} />
                    
                    {/* Event Card */}
                    <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-600 text-center min-h-[140px] flex flex-col">
                      <Icon className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                      <p className="text-lg font-bold text-white mb-1">{event.year}</p>
                      <p className="text-xs text-slate-400 mb-2">{event.month}</p>
                      <p className="text-sm font-semibold text-slate-200 mb-1">{event.title}</p>
                      <p className="text-xs text-slate-400 mb-2">{event.description}</p>
                      <p className="text-xs text-orange-300 mt-auto italic">{event.impact}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Growth Rate Arrows */}
            <div className="mt-8 pt-6 border-t border-slate-600">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 bg-orange-500/10 rounded-lg p-3 border border-orange-500/30">
                  <p className="text-xs text-slate-400 mb-1">1988-1995</p>
                  <p className="text-2xl font-bold text-white">1.8 km²/yr</p>
                </div>
                <div className="col-span-1 bg-orange-600/10 rounded-lg p-3 border border-orange-600/30">
                  <p className="text-xs text-slate-400 mb-1">Growth</p>
                  <p className="text-2xl font-bold text-orange-400">+139% ⬆️</p>
                  <p className="text-lg text-white mt-1">→ 4.3 km²/yr</p>
                </div>
                <div className="col-span-1 bg-red-600/10 rounded-lg p-3 border border-red-600/30">
                  <p className="text-xs text-slate-400 mb-1">Growth</p>
                  <p className="text-2xl font-bold text-red-400">+149% ⬆️⬆️</p>
                  <p className="text-lg text-white mt-1">→ 11.7 km²/yr</p>
                </div>
                <div className="col-span-1 bg-yellow-600/10 rounded-lg p-3 border border-yellow-600/30">
                  <p className="text-xs text-slate-400 mb-1">Growth</p>
                  <p className="text-2xl font-bold text-yellow-400">-7% ⬇️</p>
                  <p className="text-lg text-white mt-1">→ 10.9 km²/yr</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Rate Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* LEFT: Chart */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Built-up Growth Rate Analysis</h3>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={growthRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="period" 
                  stroke="#cbd5e1" 
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#cbd5e1" 
                  domain={[0, 13]}
                  label={{ value: 'Growth Rate (km²/year)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  formatter={(value) => [`${value} km²/year`, 'Growth Rate']}
                />
                <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                  {growthRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 bg-red-900/20 rounded-lg p-4 border border-red-500/30">
              <p className="text-sm font-bold text-red-300 mb-2">🔥 PEAK GROWTH: 2007-2014</p>
              <p className="text-xs text-slate-300">
                Airport (2008) + Metro construction (2011-2017) triggered unprecedented 11.7 km²/year expansion - 6.5x faster than pre-IT era
              </p>
            </div>
          </div>

          {/* RIGHT: Data Table */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Exact Growth Rate Data</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left text-slate-300 font-semibold py-3 px-2">Period</th>
                    <th className="text-right text-slate-300 font-semibold py-3 px-2">Growth</th>
                    <th className="text-right text-slate-300 font-semibold py-3 px-2">Change</th>
                    <th className="text-left text-slate-300 font-semibold py-3 px-2">Event</th>
                  </tr>
                </thead>
                <tbody>
                  {growthRateData.map((row, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
                      style={{ backgroundColor: `${row.color}10` }}
                    >
                      <td className="py-3 px-2 text-white font-medium">{row.period}</td>
                      <td className="py-3 px-2 text-right text-white font-bold">{row.rate} km²/yr</td>
                      <td className="py-3 px-2 text-right font-semibold" style={{ color: row.color }}>
                        {row.acceleration}
                      </td>
                      <td className="py-3 px-2 text-slate-300">{row.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-3">
              <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/30">
                <p className="text-sm font-bold text-orange-300">IT Boom Impact (1995-2003)</p>
                <p className="text-xs text-slate-400">Growth rate more than doubled from 1.8 to 4.3 km²/year</p>
              </div>

              <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                <p className="text-sm font-bold text-red-300">Infrastructure Explosion (2007-2014)</p>
                <p className="text-xs text-slate-400">Airport + Metro construction caused 149% acceleration - fastest period in history</p>
              </div>

              <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                <p className="text-sm font-bold text-yellow-300">Saturation Phase (2014-2024)</p>
                <p className="text-xs text-slate-400">First-ever decline in growth rate (-7%) as city reaches physical limits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Evidence Grid */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Infrastructure Photographic Evidence</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metro Construction */}
            <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
              <img
                src={metroConstruction}
                alt="Bengaluru Metro Construction"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Train className="w-5 h-5 text-purple-400" />
                  <p className="text-base font-bold text-white">Metro Construction (2011-2017)</p>
                </div>
                <p className="text-sm text-slate-300 mb-2">Purple Line construction pillars under development</p>
                <p className="text-xs text-slate-500">Credit: Wikimedia Commons</p>
              </div>
            </div>

            {/* Airport */}
            <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
              <img
                src={airportAerial}
                alt="Kempegowda International Airport"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5 text-blue-400" />
                  <p className="text-base font-bold text-white">Kempegowda International Airport (2008)</p>
                </div>
                <p className="text-sm text-slate-300 mb-2">Opened May 24, 2008 - Triggered northern sprawl</p>
                <p className="text-xs text-slate-500">Credit: Times Content.com</p>
              </div>
            </div>

            {/* Electronics City */}
            <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
              <img
                src={electronicsCity}
                alt="Electronics City Tech Park"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-orange-400" />
                  <p className="text-base font-bold text-white">Electronic City</p>
                </div>
                <p className="text-sm text-slate-300 mb-2">Established 1992 - Birthplace of Bengaluru's IT revolution</p>
                <p className="text-xs text-slate-500">Credit: Adobe Stock</p>
              </div>
            </div>

            {/* Namma Metro */}
            <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
              <img
                src={nammaMetro}
                alt="Namma Metro Purple Line"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Train className="w-5 h-5 text-purple-400" />
                  <p className="text-base font-bold text-white">Namma Metro Purple Line Operational</p>
                </div>
                <p className="text-sm text-slate-300 mb-2">Completed 2017 - Urban spine connecting IT corridors</p>
                <p className="text-xs text-slate-500">Credit: The News Minute</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight Box */}
        <div className="mt-8 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-500/50">
          <h4 className="text-xl font-bold text-white mb-3">🔍 Critical Insight</h4>
          <p className="text-slate-200 leading-relaxed mb-4">
            Each major infrastructure project triggered exponential urban sprawl. The 2007-2014 period saw the <span className="font-bold text-red-300">highest acceleration in history (+149%)</span>, directly linked to Airport opening (2008) and Metro construction beginning (2011).
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Pre-Infrastructure</p>
              <p className="text-2xl font-bold text-slate-300">1.8</p>
              <p className="text-xs text-slate-400">km²/year (1988-1995)</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Peak Infrastructure</p>
              <p className="text-2xl font-bold text-red-400">11.7</p>
              <p className="text-xs text-slate-400">km²/year (2007-2014)</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Multiplication Factor</p>
              <p className="text-2xl font-bold text-orange-400">6.5x</p>
              <p className="text-xs text-slate-400">Faster than baseline</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}