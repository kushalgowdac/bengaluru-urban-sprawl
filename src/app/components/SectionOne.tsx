import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea, Legend } from 'recharts';
import { TrendingUp, Building2, Trees, Droplets, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { motion } from 'motion/react';

const lulcData = [
  { year: 1988, water: 79.0, vegetation: 234.6, builtup: 407.3 },
  { year: 1989, water: 72.2, vegetation: 200.1, builtup: 448.5 },
  { year: 1990, water: 61.7, vegetation: 285.3, builtup: 373.8 },
  { year: 1991, water: 73.5, vegetation: 176.5, builtup: 470.8 },
  { year: 1992, water: 41.0, vegetation: 330.9, builtup: 348.9 },
  { year: 1993, water: 57.6, vegetation: 247.2, builtup: 416.0 },
  { year: 1994, water: 73.3, vegetation: 351.4, builtup: 296.2 },
  { year: 1995, water: 39.0, vegetation: 289.6, builtup: 392.2 },
  { year: 1996, water: 125.3, vegetation: 476.1, builtup: 119.4 },
  { year: 1997, water: 30.5, vegetation: 329.7, builtup: 360.6 },
  { year: 1998, water: 99.6, vegetation: 353.0, builtup: 268.2 },
  { year: 1999, water: 67.4, vegetation: 480.9, builtup: 172.6 },
  { year: 2000, water: 64.9, vegetation: 405.5, builtup: 250.5 },
  { year: 2001, water: 76.7, vegetation: 267.7, builtup: 376.5 },
  { year: 2002, water: 41.7, vegetation: 241.3, builtup: 437.8 },
  { year: 2003, water: 36.0, vegetation: 260.4, builtup: 424.5 },
  { year: 2004, water: 34.5, vegetation: 239.4, builtup: 446.0 },
  { year: 2005, water: 31.0, vegetation: 253.1, builtup: 436.3 },
  { year: 2006, water: 43.7, vegetation: 320.9, builtup: 356.2 },
  { year: 2007, water: 39.3, vegetation: 270.2, builtup: 411.3 },
  { year: 2008, water: 41.6, vegetation: 348.6, builtup: 329.2 },
  { year: 2009, water: 34.6, vegetation: 332.8, builtup: 352.5 },
  { year: 2010, water: 30.4, vegetation: 339.6, builtup: 359.9 },
  { year: 2011, water: 29.8, vegetation: 452.2, builtup: 238.9 },
  { year: 2012, water: 29.4, vegetation: 320.9, builtup: 370.5 },
  { year: 2013, water: 151.2, vegetation: 313.0, builtup: 256.6 },
  { year: 2014, water: 25.1, vegetation: 165.8, builtup: 526.8 },
  { year: 2015, water: 22.8, vegetation: 220.0, builtup: 476.8 },
  { year: 2016, water: 25.9, vegetation: 143.2, builtup: 550.1 },
  { year: 2017, water: 28.3, vegetation: 103.6, builtup: 586.8 },
  { year: 2018, water: 29.1, vegetation: 119.5, builtup: 571.1 },
  { year: 2019, water: 30.6, vegetation: 96.9, builtup: 591.7 },
  { year: 2020, water: 29.7, vegetation: 114.7, builtup: 575.6 },
  { year: 2021, water: 29.6, vegetation: 73.8, builtup: 616.5 },
  { year: 2022, water: 29.6, vegetation: 88.6, builtup: 602.2 },
  { year: 2023, water: 31.8, vegetation: 72.6, builtup: 616.0 },
  { year: 2024, water: 32.3, vegetation: 51.4, builtup: 636.1 },
];

const lulcAnchorData = [
  { year: 1990, water: 61.7, vegetation: 285.3, builtup: 373.8 },
  { year: 1995, water: 39.0, vegetation: 289.6, builtup: 392.2 },
  { year: 2003, water: 36.0, vegetation: 260.4, builtup: 424.5 },
  { year: 2007, water: 39.3, vegetation: 270.2, builtup: 411.3 },
  { year: 2014, water: 25.1, vegetation: 165.8, builtup: 526.8 },
  { year: 2016, water: 25.9, vegetation: 143.2, builtup: 550.1 },
  { year: 2018, water: 29.1, vegetation: 119.5, builtup: 571.1 },
  { year: 2020, water: 29.7, vegetation: 114.7, builtup: 575.6 },
  { year: 2022, water: 29.6, vegetation: 88.6, builtup: 602.2 },
  { year: 2024, water: 32.3, vegetation: 51.4, builtup: 636.1 },
];

const anomalousYears = [1996, 1999, 2013];

const inflectionPoints = [
  { 
    year: 2003, 
    label: 'IT Boom Era', 
    color: '#dc2626', 
    desc: '1995-2003', 
    growth: '+139%',
    details: 'Infosys E-City (1992) & Whitefield ITPB (1994) established. IT industry drives exponential growth.'
  },
  { 
    year: 2011, 
    label: 'Infrastructure Catalyst', 
    color: '#f97316', 
    desc: '2007-2014', 
    growth: '+149%',
    details: 'Airport opened (2008), Metro construction began (2011). Fastest growth period in history.'
  },
  { 
    year: 2019, 
    label: 'Saturation Phase', 
    color: '#eab308', 
    desc: '2014-2024', 
    growth: '-7%',
    details: 'City reaches physical limits. First-ever decline in growth rate despite Metro completion (2017).'
  },
];

export function SectionOne() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [showAllYears, setShowAllYears] = useState(true);
  const [showAnchorOnly, setShowAnchorOnly] = useState(false);
  const [highlightAnomalies, setHighlightAnomalies] = useState(true);
  const [sortColumn, setSortColumn] = useState<'year' | 'water' | 'vegetation' | 'builtup' | 'total'>('year');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [fromYear, setFromYear] = useState(1988);
  const [toYear, setToYear] = useState(2024);

  // Filter and sort table data
  const getFilteredData = () => {
    let filtered = showAnchorOnly ? [...lulcAnchorData] : [...lulcData];
    
    // Sort data
    filtered.sort((a, b) => {
      const aVal = a[sortColumn === 'total' ? 'year' : sortColumn]; // total doesn't exist in data
      const bVal = b[sortColumn === 'total' ? 'year' : sortColumn];
      if (sortDirection === 'asc') {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });
    
    return filtered;
  };

  // Calculate change rates
  const calculateChanges = () => {
    const fromData = lulcData.find(d => d.year === fromYear);
    const toData = lulcData.find(d => d.year === toYear);
    
    if (!fromData || !toData) return null;
    
    const years = toYear - fromYear;
    
    const builtupChange = toData.builtup - fromData.builtup;
    const builtupPercent = ((builtupChange / fromData.builtup) * 100);
    const builtupAnnual = builtupChange / years;
    
    const vegChange = toData.vegetation - fromData.vegetation;
    const vegPercent = ((vegChange / fromData.vegetation) * 100);
    const vegAnnual = vegChange / years;
    
    const waterChange = toData.water - fromData.water;
    const waterPercent = ((waterChange / fromData.water) * 100);
    const waterAnnual = waterChange / years;
    
    return {
      builtup: { absolute: builtupChange, percent: builtupPercent, annual: builtupAnnual },
      vegetation: { absolute: vegChange, percent: vegPercent, annual: vegAnnual },
      water: { absolute: waterChange, percent: waterPercent, annual: waterAnnual }
    };
  };

  const changes = calculateChanges();

  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold text-white mb-3">SECTION 1: THE STORY</h2>
          <p className="text-2xl text-slate-300">Bengaluru's Transformation (1990-2024)</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Graph */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold text-white mb-4">Fig 10.1: Temporal Variation of Land Use</h3>
              
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lulcAnchorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  
                  {/* Shaded regions for each period */}
                  <ReferenceArea x1={1995} x2={2003} fill="#ef4444" fillOpacity={0.08} />
                  <ReferenceArea x1={2007} x2={2014} fill="#f97316" fillOpacity={0.08} />
                  <ReferenceArea x1={2014} x2={2024} fill="#eab308" fillOpacity={0.08} />
                  
                  <XAxis dataKey="year" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" label={{ value: 'Area (km²)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="builtup" stroke="#f97316" strokeWidth={3} name="Built-up" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="vegetation" stroke="#10b981" strokeWidth={3} name="Vegetation" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={3} name="Water" dot={{ r: 4 }} />
                  
                  {/* Inflection Points at midpoints - ALL ON BUILT-UP LINE */}
                  <ReferenceDot x={2003} y={424.5} r={14} fill="#ef4444" stroke="#fff" strokeWidth={3} />
                  <ReferenceDot x={2011} y={469} r={14} fill="#f97316" stroke="#fff" strokeWidth={3} />
                  <ReferenceDot x={2019} y={581} r={14} fill="#eab308" stroke="#fff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>

              {/* Inflection Point Labels */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {inflectionPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div 
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0 border-2 border-white" 
                      style={{ backgroundColor: point.color }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{point.label}</p>
                      <p className="text-xs text-slate-400">{point.desc}</p>
                      <p className="text-xs text-slate-400">{point.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel with Key Numbers */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-600">
              <h3 className="text-lg font-bold text-white mb-6 text-center">1990 → 2024 IMPACT</h3>
              
              <div className="space-y-5">
                {/* Built-up */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <p className="text-sm font-semibold text-orange-400">Built-up</p>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">374</span>
                      <span className="text-slate-400 ml-1">→</span>
                      <span className="text-2xl font-bold text-white ml-1">636</span>
                      <span className="text-sm text-slate-400 ml-1">km²</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">+70%</span>
                    </div>
                  </div>
                </div>

                {/* Vegetation */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <p className="text-sm font-semibold text-green-400">Vegetation</p>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">285</span>
                      <span className="text-slate-400 ml-1">→</span>
                      <span className="text-2xl font-bold text-white ml-1">51</span>
                      <span className="text-sm text-slate-400 ml-1">km²</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">-82%</span>
                    </div>
                  </div>
                </div>

                {/* Water */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <p className="text-sm font-semibold text-blue-400">Water</p>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">62</span>
                      <span className="text-slate-400 ml-1">→</span>
                      <span className="text-2xl font-bold text-white ml-1">32</span>
                      <span className="text-sm text-slate-400 ml-1">km²</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">-48%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Context */}
            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-600">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Key Observations</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>Built-up area increased by 262 km² in 34 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Vegetation declined by 234 km² (-82%) since 1990</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Water bodies show recovery post-2014 rejuvenation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stacked Area Chart */}
        <div className="mt-12 bg-slate-900/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-4">Fig 10.2: Stacked Area Composition (1988-2024)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={lulcData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis domain={[0, 720]} stroke="#94a3b8" label={{ value: 'Area (km²)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="water" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Water Bodies"
              />
              <Area 
                type="monotone" 
                dataKey="vegetation" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.6}
                name="Vegetation"
              />
              <Area 
                type="monotone" 
                dataKey="builtup" 
                stackId="1"
                stroke="#f97316" 
                fill="#f97316"
                fillOpacity={0.6}
                name="Built-up"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Change Rate Calculator */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-4">📊 Change Rate Calculator</h3>
          
          {/* Year Selectors */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-slate-300">From Year:</label>
              <select
                value={fromYear}
                onChange={(e) => setFromYear(Number(e.target.value))}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
              >
                {lulcData.map(d => (
                  <option key={d.year} value={d.year}>{d.year}</option>
                ))}
              </select>
            </div>

            <span className="text-2xl text-slate-400">→</span>

            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-slate-300">To Year:</label>
              <select
                value={toYear}
                onChange={(e) => setToYear(Number(e.target.value))}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
              >
                {lulcData.map(d => (
                  <option key={d.year} value={d.year}>{d.year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {changes && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Built-up Card */}
              <div className="bg-orange-900/20 rounded-lg p-5 border-2 border-orange-500/40">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-orange-400" />
                  <h4 className="font-bold text-orange-400">Built-up Area</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-400">Absolute Change</p>
                    <p className="text-2xl font-bold text-white">{changes.builtup.absolute > 0 ? '+' : ''}{changes.builtup.absolute.toFixed(2)} km²</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Percentage Change</p>
                    <p className="text-xl font-bold text-orange-400">{changes.builtup.percent > 0 ? '+' : ''}{changes.builtup.percent.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Annual Rate</p>
                    <p className="text-lg font-semibold text-white">{changes.builtup.annual > 0 ? '+' : ''}{changes.builtup.annual.toFixed(2)} km²/year</p>
                  </div>
                </div>
              </div>

              {/* Vegetation Card */}
              <div className="bg-green-900/20 rounded-lg p-5 border-2 border-green-500/40">
                <div className="flex items-center gap-2 mb-3">
                  <Trees className="w-5 h-5 text-green-400" />
                  <h4 className="font-bold text-green-400">Vegetation</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-400">Absolute Change</p>
                    <p className="text-2xl font-bold text-white">{changes.vegetation.absolute > 0 ? '+' : ''}{changes.vegetation.absolute.toFixed(2)} km²</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Percentage Change</p>
                    <p className="text-xl font-bold text-green-400">{changes.vegetation.percent > 0 ? '+' : ''}{changes.vegetation.percent.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Annual Rate</p>
                    <p className="text-lg font-semibold text-white">{changes.vegetation.annual > 0 ? '+' : ''}{changes.vegetation.annual.toFixed(2)} km²/year</p>
                  </div>
                </div>
              </div>

              {/* Water Card */}
              <div className="bg-blue-900/20 rounded-lg p-5 border-2 border-blue-500/40">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <h4 className="font-bold text-blue-400">Water Bodies</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-400">Absolute Change</p>
                    <p className="text-2xl font-bold text-white">{changes.water.absolute > 0 ? '+' : ''}{changes.water.absolute.toFixed(2)} km²</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Percentage Change</p>
                    <p className="text-xl font-bold text-blue-400">{changes.water.percent > 0 ? '+' : ''}{changes.water.percent.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Annual Rate</p>
                    <p className="text-lg font-semibold text-white">{changes.water.annual > 0 ? '+' : ''}{changes.water.annual.toFixed(2)} km²/year</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Helpful Tip */}
          <div className="mt-4 bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30">
            <p className="text-sm text-cyan-300">
              💡 <span className="font-semibold">Try this:</span> Compare 2007-2014 to see the maximum growth period during infrastructure expansion!
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-12 bg-slate-900/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-4">📋 Complete Data Table</h3>
          
          {/* Filter Toggles */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <button
              onClick={() => {
                setShowAllYears(!showAllYears);
                setShowAnchorOnly(false);
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                showAllYears 
                  ? 'bg-cyan-600 text-white border-2 border-cyan-400' 
                  : 'bg-slate-700 text-slate-300 border-2 border-slate-600'
              }`}
            >
              Show All Years {showAllYears ? '✓' : ''}
            </button>
            
            <button
              onClick={() => {
                setShowAnchorOnly(!showAnchorOnly);
                if (!showAnchorOnly) setShowAllYears(true);
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                showAnchorOnly 
                  ? 'bg-purple-600 text-white border-2 border-purple-400' 
                  : 'bg-slate-700 text-slate-300 border-2 border-slate-600'
              }`}
            >
              Anchor Years Only {showAnchorOnly ? '✓' : ''}
            </button>

            <button
              onClick={() => setHighlightAnomalies(!highlightAnomalies)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                highlightAnomalies 
                  ? 'bg-yellow-600 text-white border-2 border-yellow-400' 
                  : 'bg-slate-700 text-slate-300 border-2 border-slate-600'
              }`}
            >
              Highlight Anomalies {highlightAnomalies ? '✓' : ''}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-600">
                  <th 
                    className="text-left p-3 text-slate-300 font-bold cursor-pointer hover:text-cyan-400 transition-colors"
                    onClick={() => handleSort('year')}
                  >
                    <div className="flex items-center gap-2">
                      Year
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th 
                    className="text-right p-3 text-blue-400 font-bold cursor-pointer hover:text-blue-300 transition-colors"
                    onClick={() => handleSort('water')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Water (km²)
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th 
                    className="text-right p-3 text-green-400 font-bold cursor-pointer hover:text-green-300 transition-colors"
                    onClick={() => handleSort('vegetation')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Vegetation (km²)
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th 
                    className="text-right p-3 text-orange-400 font-bold cursor-pointer hover:text-orange-300 transition-colors"
                    onClick={() => handleSort('builtup')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Built-up (km²)
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getFilteredData().map((row) => {
                  const isAnomaly = anomalousYears.includes(row.year);
                  return (
                    <tr
                      key={row.year}
                      onClick={() => setSelectedRow(row.year)}
                      className={`border-b border-slate-700 cursor-pointer transition-all ${
                        selectedRow === row.year 
                          ? 'bg-cyan-900/30 border-cyan-500' 
                          : 'hover:bg-slate-800/50'
                      } ${
                        highlightAnomalies && isAnomaly 
                          ? 'bg-yellow-900/20 border-yellow-500/30' 
                          : ''
                      }`}
                    >
                      <td className="p-3 text-white font-semibold">
                        <div className="flex items-center gap-2">
                          {row.year}
                          {highlightAnomalies && isAnomaly && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" title="Anomalous Year" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-right text-blue-300">{row.water.toFixed(1)}</td>
                      <td className="p-3 text-right text-green-300">{row.vegetation.toFixed(1)}</td>
                      <td className="p-3 text-right text-orange-300">{row.builtup.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Anomaly Legend */}
          {highlightAnomalies && (
            <div className="mt-4 bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-300">Anomalous Years Detected</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Years 1996, 1999, and 2013 show unusual classifications likely due to cloud cover, atmospheric conditions, or data processing artifacts.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}