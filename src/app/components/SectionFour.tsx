import React from 'react';
import { TrendingUp, MapPin, AlertCircle, CheckCircle2, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { motion } from 'motion/react';
import validationMap from 'figma:asset/16c0963ec685a1f58e26c486d57be732a9be6e8f.png';
import prediction2030 from 'figma:asset/67a5db9a8323546a53b5747f353be5e32ffb3d78.png';
import prediction2035 from 'figma:asset/c05f8d347fdff6231ac3269cbf91a5125e6a4810.png';

const threeBarData = [
  { 
    year: '2024', 
    builtUp: 636.1, 
    vegetation: 51.4, 
    water: 32.3,
    label: '✅ ACTUAL'
  },
  { 
    year: '2030', 
    builtUp: 673.37, 
    vegetation: 14.13, 
    water: 31.63,
    label: '📊 PREDICTED'
  },
  { 
    year: '2035', 
    builtUp: 678.57, 
    vegetation: 8.94, 
    water: 29.47,
    label: '📊 PREDICTED'
  },
];

const hotspots = [
  { zone: 'Devanahalli-Airport Corridor (North)', growth: 'Primary', color: '#ef4444', icon: '🔴' },
  { zone: 'Whitefield Metro Extension (East)', growth: 'Primary', color: '#ef4444', icon: '🔴' },
  { zone: 'Kengeri Metro Line (Southwest)', growth: 'Primary', color: '#ef4444', icon: '🔴' },
  { zone: 'Peripheral Outward Expansion', growth: 'Secondary', color: '#eab308', icon: '🟡' },
  { zone: 'Metro Station Catchment Areas', growth: 'Secondary', color: '#eab308', icon: '🟡' },
  { zone: 'IT Corridor Densification', growth: 'Secondary', color: '#eab308', icon: '🟡' },
];

export function SectionFour() {
  return (
    <section className="py-16 pb-8">
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">SECTION 4: THE FUTURE</h2>
          <p className="text-xl text-slate-300">Predictions & Model Validation (2024-2035)</p>
        </div>

        {/* Three-Bar Chart: 2024, 2030, 2035 */}
        <div className="mb-12">
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-6">Land Use Prediction (2024-2035)</h3>
            
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={threeBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="year" stroke="#cbd5e1" />
                <YAxis 
                  stroke="#cbd5e1"
                  label={{ value: 'Area (km²)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="builtUp" name="Built-up Area" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vegetation" name="Vegetation" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="water" name="Water" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Data Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left text-slate-300 font-semibold py-3 px-4">Year</th>
                    <th className="text-right text-slate-300 font-semibold py-3 px-4">Built-up Area</th>
                    <th className="text-right text-slate-300 font-semibold py-3 px-4">Vegetation</th>
                    <th className="text-right text-slate-300 font-semibold py-3 px-4">Water</th>
                    <th className="text-center text-slate-300 font-semibold py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700 bg-green-500/10">
                    <td className="py-3 px-4 text-white font-bold">2024</td>
                    <td className="py-3 px-4 text-right text-white">636.1 km²</td>
                    <td className="py-3 px-4 text-right text-white">51.4 km²</td>
                    <td className="py-3 px-4 text-right text-white">32.3 km²</td>
                    <td className="py-3 px-4 text-center text-green-400 font-semibold">✅ ACTUAL</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-blue-500/10">
                    <td className="py-3 px-4 text-white font-bold">2030</td>
                    <td className="py-3 px-4 text-right text-white">673.37 km²</td>
                    <td className="py-3 px-4 text-right text-white">14.13 km²</td>
                    <td className="py-3 px-4 text-right text-white">31.63 km²</td>
                    <td className="py-3 px-4 text-center text-blue-400 font-semibold">📊 PREDICTED</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-blue-500/10">
                    <td className="py-3 px-4 text-white font-bold">2035</td>
                    <td className="py-3 px-4 text-right text-white">678.57 km²</td>
                    <td className="py-3 px-4 text-right text-white">8.94 km²</td>
                    <td className="py-3 px-4 text-right text-white">29.47 km²</td>
                    <td className="py-3 px-4 text-center text-blue-400 font-semibold">📊 PREDICTED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Model Validation Panel */}
        <div className="mb-12">
          <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-xl font-bold text-white">✅ MODEL VALIDATION</h3>
                <p className="text-sm text-slate-300">Predicted 2025 vs Actual 2025</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Validation Image */}
              <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
                <img
                  src={validationMap}
                  alt="2025 Actual vs Predicted Comparison"
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-white mb-1">CA-Markov Model Validation</p>
                  <p className="text-xs text-slate-400">Comparison of actual and predicted land use maps for 2025</p>
                </div>
              </div>

              {/* Validation Stats */}
              <div className="space-y-3">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <p className="text-sm font-semibold text-green-300">High Spatial Agreement</p>
                  </div>
                  <p className="text-xs text-slate-400">Model validated using 2025 actual vs predicted comparison</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2">Actual 2025 Data:</p>
                  <div className="space-y-1">
                    <p className="text-sm text-white">→ Built-up: <span className="font-bold">652.51 km²</span></p>
                    <p className="text-sm text-white">→ Vegetation: <span className="font-bold">35.00 km²</span></p>
                    <p className="text-sm text-white">→ Water: <span className="font-bold">32.33 km²</span></p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2">Predicted 2025 Data:</p>
                  <div className="space-y-1">
                    <p className="text-sm text-white">→ Built-up: <span className="font-bold">653.89 km²</span></p>
                    <p className="text-sm text-white">→ Vegetation: <span className="font-bold">33.61 km²</span></p>
                    <p className="text-sm text-white">→ Water: <span className="font-bold">32.33 km²</span></p>
                  </div>
                </div>

                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <p className="text-sm font-bold text-green-300 mb-1">Strong Validation</p>
                  <p className="text-xs text-slate-300">Model demonstrates reliable predictive capability for future scenarios</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Maps: 2030 & 2035 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Future Land Use Predictions</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 2030 Prediction */}
            <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
              <img
                src={prediction2030}
                alt="Bengaluru LULC 2030 Predicted"
                className="w-full h-auto"
              />
              <div className="p-4 bg-blue-900/20">
                <p className="text-base font-bold text-white mb-2">📊 2030 PREDICTION</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-slate-400">Built-up</p>
                    <p className="text-white font-semibold">673.37 km²</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Vegetation</p>
                    <p className="text-white font-semibold">14.13 km²</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Water</p>
                    <p className="text-white font-semibold">31.63 km²</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2035 Prediction */}
            <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-600">
              <img
                src={prediction2035}
                alt="Bengaluru LULC 2035 Predicted"
                className="w-full h-auto"
              />
              <div className="p-4 bg-blue-900/20">
                <p className="text-base font-bold text-white mb-2">📊 2035 PREDICTION</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-slate-400">Built-up</p>
                    <p className="text-white font-semibold">678.57 km²</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Vegetation</p>
                    <p className="text-white font-semibold">8.94 km²</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Water</p>
                    <p className="text-white font-semibold">29.47 km²</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spatial Hotspots and Critical Warnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Spatial Hotspots */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-white">Spatial Hotspots (2024-2030)</h3>
            </div>
            
            <div className="mb-4 bg-red-900/20 rounded-lg p-3 border border-red-500/30">
              <p className="text-sm font-bold text-red-300 mb-2">🔴 PRIMARY GROWTH ZONES</p>
            </div>

            <div className="space-y-3 mb-6">
              {hotspots.filter(h => h.growth === 'Primary').map((hotspot, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3 border border-red-500/20">
                  <span className="text-lg">{hotspot.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{hotspot.zone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 bg-yellow-900/20 rounded-lg p-3 border border-yellow-500/30">
              <p className="text-sm font-bold text-yellow-300 mb-2">🟡 SECONDARY GROWTH</p>
            </div>

            <div className="space-y-3">
              {hotspots.filter(h => h.growth === 'Secondary').map((hotspot, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3 border border-yellow-500/20">
                  <span className="text-lg">{hotspot.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{hotspot.zone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Warnings Box */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-semibold text-white">⚠️ 2024 → 2035 FORECAST</h3>
            </div>
            
            <div className="space-y-4">
              {/* Built-up */}
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <p className="text-sm font-bold text-blue-300">🏙️ Built-up Growth</p>
                </div>
                <p className="text-lg font-bold text-white mb-1">+52 km²</p>
                <p className="text-xs text-slate-400">Equivalent to 5,778 football fields</p>
              </div>

              {/* Vegetation */}
              <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-500/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <p className="text-sm font-bold text-orange-300">🌳 Vegetation Catastrophe</p>
                </div>
                <p className="text-lg font-bold text-white mb-2">Will drop to 8.94 km²</p>
                <div className="space-y-2 text-xs text-slate-300">
                  <p className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">→</span>
                    <span><span className="font-bold text-orange-300">97% total loss</span> since 1988</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">→</span>
                    <span>Critical threshold breached</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">→</span>
                    <span>Ecosystem collapse risk</span>
                  </p>
                </div>
              </div>

              {/* Key Forecast Points */}
              <div className="rounded-lg p-4 border bg-red-900/30 border-red-500/50">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-sm font-bold text-red-300">
                    💡 Critical Forecast Points
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">→</span>
                    <span>Core city 100% saturated by 2030</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">→</span>
                    <span>Vegetation drops below 10 km² by 2035</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">→</span>
                    <span>Traffic congestion worsens significantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">→</span>
                    <span>Urban heat island effect +2-3°C</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final Summary Banner */}
        <div className="bg-gradient-to-r from-red-900/40 via-orange-900/40 to-yellow-900/40 rounded-xl p-6 border border-orange-500/50">
          <h4 className="text-xl font-bold text-white mb-4 text-center">🚨 The Bottom Line</h4>
          <p className="text-center text-slate-200 leading-relaxed mb-4">
            Without immediate intervention, Bengaluru will lose <span className="font-bold text-orange-400">97% of its vegetation</span> by 2035 
            (from 285.3 km² in 1988 to just 8.94 km²). The city that was once known as the <span className="font-bold text-green-400">"Garden City of India"</span> is 
            rapidly transforming into a concrete jungle.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-900/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-400 mb-1">1988 Baseline</p>
              <p className="text-2xl font-bold text-green-400">285.3</p>
              <p className="text-xs text-slate-400">km² vegetation</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-400 mb-1">2024 Current</p>
              <p className="text-2xl font-bold text-orange-400">51.4</p>
              <p className="text-xs text-slate-400">km² vegetation</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-400 mb-1">2035 Predicted</p>
              <p className="text-2xl font-bold text-red-400">8.94</p>
              <p className="text-xs text-slate-400">km² vegetation</p>
            </div>
          </div>
          <p className="text-center text-slate-300 text-sm mt-4">
            Infrastructure-driven growth, while economically beneficial, has come at an <span className="font-bold text-red-400">enormous environmental cost</span>.
          </p>
        </div>
      </div>
    </section>
  );
}