import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, BarChart, Bar, Cell } from 'recharts';
import { Droplets, Trees, AlertTriangle } from 'lucide-react';
import jakkurLake from 'figma:asset/c23ba3e70d2bbe102dfb603fb851113d66def1bd.png';
import floods2013 from 'figma:asset/b490ff517efc3e562ff7b136228f2f1a4adfcb82.png';
import bellandurAerial from 'figma:asset/a0082c3a55ff7cbc16114a8628e06515bd5a2e4a.png';

const waterData = [
  { year: 1988, water: 78.9, label: 'Garden City' },
  { year: 1995, water: 39.0, label: '' },
  { year: 2013, water: 151.2, label: 'Anomaly', isAnomaly: true },
  { year: 2014, water: 25.1, label: 'Nadir' },
  { year: 2024, water: 32.3, label: 'Recovery' },
];

const vegetationLossData = [
  { period: '1988-2007', rate: 2.4, color: '#10b981', label: 'Least Severe' },
  { period: '2007-2014', rate: 10.6, color: '#eab308', label: 'Severe' },
  { period: '2014-2024', rate: 11.4, color: '#ef4444', label: 'Catastrophic' },
];

export function SectionTwo() {
  return (
    <section className="py-16">
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">SECTION 2: THE CRISIS</h2>
          <p className="text-xl text-slate-300">Environmental Collapse in Data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Water Body Story */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Water Body Timeline</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={waterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="year" stroke="#cbd5e1" />
                  <YAxis 
                    stroke="#cbd5e1" 
                    domain={[0, 160]}
                    label={{ value: 'Water Area (km²)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="water" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (payload.isAnomaly) {
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={8} 
                            fill="#fbbf24" 
                            stroke="#fff" 
                            strokeWidth={2}
                            strokeDasharray="3 3"
                          />
                        );
                      }
                      return <circle cx={cx} cy={cy} r={5} fill="#3b82f6" />;
                    }}
                  />
                  
                  {/* Key Points */}
                  <ReferenceDot x={1988} y={78.9} r={10} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                  <ReferenceDot x={2013} y={151.2} r={12} fill="#fbbf24" stroke="#fff" strokeWidth={3} strokeDasharray="4 4" />
                  <ReferenceDot x={2014} y={25.1} r={10} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                  <ReferenceDot x={2024} y={32.3} r={10} fill="#10b981" stroke="#fff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>

              {/* Key Events */}
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-3 bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-300">1988: 78.9 km² - Garden City Era</p>
                    <p className="text-xs text-slate-400">~79 lakes, pre-IT boom baseline</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-700/50 rounded-lg p-3 border border-slate-500/30">
                  <div className="w-3 h-3 rounded-full bg-slate-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-300">1995: 39.0 km² - Rapid Encroachment</p>
                    <p className="text-xs text-slate-400">IT boom drives lake conversion to real estate</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-300">2013: 151.2 km² - ⚠️ ANOMALY</p>
                    <p className="text-xs text-slate-400">Nov 23 floods - Seasonal monsoon flooding (NOT real lake area increase)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-300">2014: 25.1 km² - Nadir</p>
                    <p className="text-xs text-slate-400">Lowest point - Post-flood drainage improvements</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-300">2024: 32.3 km² - AMRUT Effect</p>
                    <p className="text-xs text-slate-400">+7.2 km² (+29% recovery) from lake rejuvenation programs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Evidence */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
                <img
                  src={jakkurLake}
                  alt="Bellandur Lake Before and After"
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-white">Bellandur Lake - Before (1989) & After (2017)</p>
                  <p className="text-xs text-slate-400">Dramatic transformation of India's largest lake (Credit: The News Minute)</p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-red-500/30">
                <img
                  src={floods2013}
                  alt="Nov 2013 Bengaluru Floods"
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 bg-red-900/20">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <p className="text-sm font-bold text-red-300">Nov 23, 2013 - Bengaluru Flooded</p>
                  </div>
                  <p className="text-xs text-slate-400">Historic flooding from rapid urbanization (Source: Deccan Herald)</p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
                <img
                  src={bellandurAerial}
                  alt="Jakkur Lake Aerial View"
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-white">Jakkur Lake - Aerial View</p>
                  <p className="text-xs text-slate-400">Post-restoration satellite imagery showing recovery</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Vegetation Crisis */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
              <div className="flex items-center gap-2 mb-4">
                <Trees className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Vegetation Loss Rate Analysis</h3>
              </div>

              <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vegetationLossData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="period" stroke="#cbd5e1" />
                    <YAxis 
                      stroke="#cbd5e1" 
                      domain={[0, 12]}
                      label={{ value: 'Loss Rate (km²/year)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      formatter={(value) => [`-${value} km²/year`, 'Loss Rate']}
                    />
                    <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                      {vegetationLossData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-green-300">1988-2007</p>
                    <p className="text-xl font-bold text-white">-2.4 km²/year</p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '21%' }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Least Severe - Pre-infrastructure era</p>
                </div>

                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-yellow-300">2007-2014</p>
                    <p className="text-xl font-bold text-white">-10.6 km²/year</p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '93%' }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Severe - Metro + Airport expansion phase</p>
                </div>

                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-red-300">2014-2024</p>
                    <p className="text-xl font-bold text-white">-11.4 km²/year</p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Catastrophic - Peak loss rate despite regulations</p>
                </div>
              </div>

              {/* Policy Failure Alert */}
              <div className="bg-orange-900/30 rounded-xl p-4 border border-orange-500/50 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-orange-300 mb-2">ACCELERATION DESPITE POLICY</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      RMP 2031 (2016) promised green space preservation
                      <br />
                      → Loss rate increased from 10.6 to 11.4 km²/year
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-6 border border-orange-500/30">
              <h4 className="text-lg font-bold text-white mb-4">Critical Impact (1988-2024)</h4>
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">Total Water Loss:</span>
                    <span className="text-xl font-bold text-blue-400">-46.6 km²</span>
                  </div>
                  <p className="text-xs text-slate-400">From 78.9 → 32.3 km² (-59%)</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">Total Vegetation Loss:</span>
                    <span className="text-xl font-bold text-orange-400">~380 km²</span>
                  </div>
                  <p className="text-xs text-slate-400">Catastrophic green cover collapse</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">Loss Rate Acceleration:</span>
                    <span className="text-xl font-bold text-red-400">4.8x</span>
                  </div>
                  <p className="text-xs text-slate-400">Post-2007 vs pre-2007 period</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-orange-500/30">
                <p className="text-sm text-slate-300 leading-relaxed">
                  The rate of environmental degradation increased nearly 5x after 2007, coinciding with major infrastructure development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}