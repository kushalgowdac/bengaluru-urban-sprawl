import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ExternalLink, Users, Shield, BookOpen, AlertCircle, Building2, Leaf, BarChart3, Globe } from 'lucide-react';

// ── Validation sources (official government + research) ──
const validationSources = [
  {
    name: 'ISRO / NRSC LULC Atlas',
    description: 'National Remote Sensing Centre has conducted annual LULC mapping since 2005–06 under the Natural Resources Census programme. 17 cycles completed. 200+ institutions have used this data.',
    url: 'https://www.nrsc.gov.in/nrscnew/resources_atlas_LULC.php',
    urlLabel: 'nrsc.gov.in/LULC Atlas',
    verifyHow: 'Compare our yearly built-up / vegetation / water km² against NRSC\'s 56m-resolution annual LULC layers for Karnataka',
    icon: '🛰️',
    color: 'border-orange-500/40 bg-orange-500/10',
    textColor: 'text-orange-300',
    type: 'National',
  },
  {
    name: 'Bhuvan — ISRO Geoportal',
    description: 'Hosts thematic LULC layers, urban sprawl maps, and water body extent data for India. Provides OGC WMS services usable directly in QGIS and ArcGIS.',
    url: 'https://bhuvan.nrsc.gov.in',
    urlLabel: 'bhuvan.nrsc.gov.in',
    verifyHow: 'Load the "Urban Sprawl" and "Water Bodies" WMS layers for Bengaluru district and overlay with our classification outputs',
    icon: '🗺️',
    color: 'border-blue-500/40 bg-blue-500/10',
    textColor: 'text-blue-300',
    type: 'National',
  },
  {
    name: 'BBMP Land Use Maps (Official)',
    description: 'BBMP publishes Revised Master Plan 2015 land use maps by planning district. Covers BBMP jurisdiction (~800 km²). Series-1 and Series-2 maps are publicly available.',
    url: 'https://site.bbmp.gov.in/landusemaps.html',
    urlLabel: 'bbmp.gov.in/landusemaps',
    verifyHow: 'Compare our built-up classification within BBMP limits against their official planning zone boundaries and existing land use',
    icon: '🏙️',
    color: 'border-cyan-500/40 bg-cyan-500/10',
    textColor: 'text-cyan-300',
    type: 'Bengaluru',
  },
  {
    name: 'BDA Revised Master Plan 2031',
    description: 'Bangalore Development Authority\'s RMP 2031 includes Existing Land Use maps for all 30+ planning districts. Official govt GIS data available on opencity.in.',
    url: 'https://data.opencity.in/dataset/bda-revised-master-plan-2031',
    urlLabel: 'data.opencity.in/BDA-RMP',
    verifyHow: 'Cross-check our predicted 2030/2035 growth zones against BDA\'s planned development areas in the RMP 2031',
    icon: '📋',
    color: 'border-purple-500/40 bg-purple-500/10',
    textColor: 'text-purple-300',
    type: 'Bengaluru',
  },
  {
    name: 'BMRDA Structure Plan',
    description: 'Bengaluru Metropolitan Region Development Authority covers 8,005 km² (vs BBMP\'s ~800 km²). Their Land Utilization Plan 2031 covers peri-urban areas where our predictions show maximum growth.',
    url: 'https://bmrda.karnataka.gov.in/english',
    urlLabel: 'bmrda.karnataka.gov.in',
    verifyHow: 'Validate our peri-urban growth predictions (Devanahalli, Whitefield, Kengeri corridors) against BMRDA\'s planned expansion zones',
    icon: '🌐',
    color: 'border-green-500/40 bg-green-500/10',
    textColor: 'text-green-300',
    type: 'Bengaluru Metro',
  },
  {
    name: 'Karnataka Bhoomi (Land Records)',
    description: 'State government\'s land records system covering 176 taluks. Land use change and mutation records available. Useful for correlating built-up expansion with formal land conversion events.',
    url: 'https://landrecords.karnataka.gov.in',
    urlLabel: 'landrecords.karnataka.gov.in',
    verifyHow: 'Correlate peak built-up growth years in our data (2007–2014) with mutation rates in Yelahanka, Devanahalli, and Whitefield taluks',
    icon: '📜',
    color: 'border-slate-400/40 bg-slate-500/10',
    textColor: 'text-slate-300',
    type: 'Karnataka State',
  },
];

// ── Novelty cards ──
const noveltyPoints = [
  {
    icon: '⚙️',
    title: 'End-to-End Automated Pipeline',
    problem: 'Existing work: Manual LULC maps from ISRO or ArcGIS. No automation.',
    ours: 'GEE → preprocessing → RF classification → CA-Markov prediction in one automated flow. No manual digitization needed.',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    icon: '📅',
    title: '36-Year Multi-Sensor Coverage',
    problem: 'Most papers: Single sensor, 10–20 year span, or pre-classified data.',
    ours: 'Landsat 5 + 7 + 9 continuously from 1988–2024. Cross-sensor radiometric normalization to maintain temporal consistency.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    icon: '🏷️',
    title: 'Dual Labeling Strategy',
    problem: 'Pre-2014: No OSM data exists. Most papers either skip old years or use inaccurate static labels.',
    ours: 'OSM for 2014–present. Trend-based spectral labeling for 1988–2013. Preserves historical continuity without label hallucination.',
    color: 'border-green-500/30 bg-green-500/5',
  },
  {
    icon: '✅',
    title: 'Validated Against 2025 Reality',
    problem: 'Most CA-Markov papers predict future years that haven\'t happened yet — unverifiable.',
    ours: 'We predicted 2025, then compared against actual 2025 satellite data. Built-up error: just 1.38 km² (0.21%). Water: exact match.',
    color: 'border-orange-500/30 bg-orange-500/5',
  },
  {
    icon: '🔬',
    title: 'Systematic 5×5 Model Search',
    problem: 'Typical papers: One RF variant, one feature set, single run.',
    ours: '5 feature sets × 5 RF variants = 25 combinations evaluated. Conservative + shallow models emerged as optimal for multi-year LULC.',
    color: 'border-red-500/30 bg-red-500/5',
  },
  {
    icon: '🌍',
    title: 'City-Agnostic Framework (In Progress)',
    problem: 'Every city-specific paper requires rebuilding the pipeline from scratch.',
    ours: 'Our pipeline is parameterized. Upload any city\'s shapefile → same preprocessing → same classifier → same CA-Markov. Bengaluru is proof-of-concept.',
    color: 'border-cyan-500/30 bg-cyan-500/5',
  },
];

// ── End User personas ──
const endUsers = [
  {
    icon: Building2,
    title: 'Urban Planners',
    org: 'BDA / BBMP / BMRDA / GBDA',
    problem: 'Master plans are made once every 10–15 years using manual surveys',
    value: 'Annual satellite-derived LULC + 10-year predictions to update zone boundaries and infrastructure allocation',
    examples: [
      'BDA RMP 2031 revision with satellite-validated growth corridors',
      'BBMP ward-level infrastructure budget based on built-up growth rate',
      'GBDA satellite town planning for Devanahalli, Nelamangala, Bidadi',
    ],
    colorClass: 'from-blue-900/30 to-blue-800/10 border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    icon: Leaf,
    title: 'Environmental Agencies',
    org: 'NGT / KSPCB / Forest Dept / BWSSB',
    problem: 'Lake encroachment and vegetation loss detected after damage is done',
    value: 'Early-warning system: detect deforestation/encroachment 1–2 years before formal complaints',
    examples: [
      'NGT can use predicted encroachment maps to pre-empt violations',
      'BWSSB can correlate lake shrinkage with water supply stress',
      'KSPCB can target urban heat island zones for green cover mandates',
    ],
    colorClass: 'from-green-900/30 to-green-800/10 border-green-500/30',
    iconColor: 'text-green-400',
  },
  {
    icon: BarChart3,
    title: 'Research Institutions',
    org: 'IISc / IIIT-B / IITs / KSRSAC',
    problem: 'No publicly available year-by-year Bengaluru LULC dataset with preprocessing done',
    value: 'Our labeled 1988–2024 spatiotemporal dataset + validated pipeline is itself a research contribution',
    examples: [
      'KSRSAC (Karnataka State Remote Sensing Application Centre) can adopt the pipeline for statewide monitoring',
      'IISc urban ecology researchers can use our vegetation loss dataset',
      'IDP / thesis students can extend the model with socioeconomic layers',
    ],
    colorClass: 'from-purple-900/30 to-purple-800/10 border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    icon: Globe,
    title: 'Policy Makers',
    org: 'DULT / Smart Cities Mission / MoHUA',
    problem: 'Policy decisions made without real-time land use evidence',
    value: 'Forecast-backed land acquisition, satellite town zoning, and FSI policy decisions',
    examples: [
      'Smart Cities Mission can validate their green cover targets against our satellite baseline',
      'DULT can correlate metro expansion plans with predicted built-up growth corridors',
      'WRI India used satellite analysis to inform Karnataka\'s Nava Karnataka 2025 roadmap',
    ],
    colorClass: 'from-orange-900/30 to-orange-800/10 border-orange-500/30',
    iconColor: 'text-orange-400',
  },
];

export function SectionFive() {
  const [activeSource, setActiveSource] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'National' | 'Bengaluru' | 'Bengaluru Metro' | 'Karnataka State'>('all');

  const filteredSources = activeFilter === 'all'
    ? validationSources
    : validationSources.filter(s => s.type === activeFilter);

  return (
    <section className="py-16 pb-8">
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">SECTION 5: CREDIBILITY & IMPACT</h2>
          <p className="text-xl text-slate-300">Validation Sources · Project Novelty · End Users · Policy Context</p>
        </div>

        {/* ── PART A: VALIDATION SOURCES ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-7 h-7 text-green-400" />
            <h3 className="text-2xl font-bold text-white">Official Validation Sources</h3>
          </div>

           {/*<div className="bg-green-900/10 rounded-xl p-4 border border-green-500/20 mb-6">
           <p className="text-sm text-slate-300">
             <span className="text-green-300 font-semibold">Teacher's question: "Can you validate with government data?"</span>
              — Yes. The sources below allow direct comparison of our satellite-derived LULC outputs against 
              official government maps. Our built-up predictions for 2025 were validated against actual data with 
              <span className="text-green-300 font-semibold"> only 0.21% error</span>.
            </p>
          </div>*/}

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {['all', 'National', 'Bengaluru', 'Bengaluru Metro', 'Karnataka State'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-slate-200 text-slate-900'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {filter === 'all' ? 'All Sources' : filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.map((source, idx) => (
              <motion.div
                key={idx}
                className={`rounded-xl p-5 border cursor-pointer transition-all ${source.color} ${
                  activeSource === idx ? 'ring-2 ring-white/20' : 'hover:scale-[1.01]'
                }`}
                onClick={() => setActiveSource(activeSource === idx ? null : idx)}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{source.icon}</span>
                    <div>
                      <p className={`text-sm font-bold ${source.textColor}`}>{source.name}</p>
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-400 mt-1">
                        {source.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">{source.description}</p>

                {activeSource === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-slate-900/60 rounded-lg p-3 mb-3 border border-slate-600"
                  >
                    <p className="text-xs font-semibold text-yellow-300 mb-1">How to validate:</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{source.verifyHow}</p>
                  </motion.div>
                )}

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`inline-flex items-center gap-1 text-xs ${source.textColor} hover:underline`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {source.urlLabel}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-3">Click any card to see how to validate your data against it</p>
        </motion.div>

        {/* ── PART B: NOVELTY ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-7 h-7 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Project Novelty</h3>
          </div>

          {/*<div className="bg-purple-900/10 rounded-xl p-4 border border-purple-500/20 mb-6">
            <p className="text-sm text-slate-300">
              <span className="text-purple-300 font-semibold">Teacher's question: "What's new about this?"</span>
              — CA-Markov and LULC classification exist individually. Our novelty is the 
              integrated end-to-end pipeline, the dual labeling strategy, the 36-year span, 
              and the actual 2025 validation. Below is the honest side-by-side.
            </p> 
          </div>*/}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {noveltyPoints.map((point, idx) => (
              <div key={idx} className={`rounded-xl p-5 border ${point.color}`}>
                <div className="text-2xl mb-3">{point.icon}</div>
                <h4 className="text-sm font-bold text-white mb-3">{point.title}</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">✗</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{point.problem}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 text-xs mt-0.5 flex-shrink-0">✓</span>
                    <p className="text-xs text-slate-200 leading-relaxed">{point.ours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── PART C: END USERS ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-7 h-7 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">Who Uses This?</h3>
          </div>

         {/* <div className="bg-cyan-900/10 rounded-xl p-4 border border-cyan-500/20 mb-6">
            <p className="text-sm text-slate-300">
              <span className="text-cyan-300 font-semibold">Teacher's question: "Common people can't use this."</span>
              — Correct. This is a <strong className="text-white">B2G (Business-to-Government) decision support tool</strong>, 
              like how ISRO's Bhuvan platform serves planners, not civilians. The end beneficiaries are the citizens of 
              Bengaluru — but the direct users are urban planners and policy bodies.
            </p>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {endUsers.map((user, idx) => {
              const Icon = user.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-xl p-6 border bg-gradient-to-br ${user.colorClass}`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon className={`w-8 h-8 ${user.iconColor} flex-shrink-0`} />
                    <div>
                      <h4 className="text-base font-bold text-white">{user.title}</h4>
                      <p className="text-xs text-slate-400">{user.org}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="bg-slate-900/40 rounded-lg p-3">
                      <p className="text-xs text-red-300 font-semibold mb-1">CURRENT PROBLEM:</p>
                      <p className="text-xs text-slate-300">{user.problem}</p>
                    </div>
                    <div className="bg-slate-900/40 rounded-lg p-3">
                      <p className="text-xs text-green-300 font-semibold mb-1">OUR VALUE:</p>
                      <p className="text-xs text-slate-300">{user.value}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-semibold mb-2">CONCRETE USE CASES:</p>
                    <ul className="space-y-1">
                      {user.examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className={`${user.iconColor} mt-0.5 flex-shrink-0`}>→</span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── PART D: POLICY CONTEXT ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-7 h-7 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Are Policy Makers Using This Already?</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-slate-900/50 rounded-xl p-5 border border-orange-500/30">
              <h4 className="text-sm font-bold text-orange-300 mb-3">What They Currently Do</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-0.5">•</span>
                  BBMP/BDA: Manual surveys + census data for master plans (updated every 15 yrs)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-0.5">•</span>
                  KSRSAC provides static LULC maps to state departments — no prediction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-0.5">•</span>
                  WRI India provided satellite-based analysis for Karnataka's Nava Karnataka 2025 plan
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-0.5">•</span>
                  NRSC provides annual 56m-res LULC layers — but no city-specific prediction
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-5 border border-green-500/30">
              <h4 className="text-sm font-bold text-green-300 mb-3">The Gap We Fill</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">→</span>
                  30m-resolution (vs NRSC's 56m) — finer detail for city-scale decisions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">→</span>
                  10-year forward predictions (2025, 2030, 2035) — not available in any govt tool
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">→</span>
                  Open-source, replicable pipeline — not a black box
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">→</span>
                  Framework can be extended to any Indian city via shapefile upload
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/30">
              <h4 className="text-sm font-bold text-blue-300 mb-3">Who to Contact Next</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-white">KSRSAC (Primary)</p>
                  <p className="text-xs text-slate-400">Karnataka State Remote Sensing Application Centre — direct technical arm of state govt</p>
                  <a
                    href="https://ksrsac.karnataka.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline mt-1"
                  >
                    ksrsac.karnataka.gov.in <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">BMRDA (Policy)</p>
                  <p className="text-xs text-slate-400">Currently planning satellite towns for Devanahalli, Nelamangala — your 2030 predictions are directly relevant</p>
                  <a
                    href="https://bmrda.karnataka.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline mt-1"
                  >
                    bmrda.karnataka.gov.in <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">BBMP Town Planning Wing</p>
                  <p className="text-xs text-slate-400">Urban planning authority for city limits — direct consumer of LULC data for zone revisions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-500">
            <h4 className="text-lg font-bold text-white mb-3 text-center">
              📍 Why 1988–2024? Why Not Just Last 10 Years?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-red-300 font-semibold mb-2">If we used only 2014–2024:</p>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li>• We'd miss the IT boom inflection (1995–2003) which defined today's spatial pattern</li>
                  <li>• CA-Markov transition matrices would be computed on only 2 phases, not 5</li>
                  <li>• We'd have no baseline to compare vegetation loss magnitude (-82% over 36 years)</li>
                  <li>• Our anomaly detection (2013 flood, 1996/1999 cloud) would have no historical context</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-green-300 font-semibold mb-2">With 36 years of data:</p>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li>✓ CA-Markov learns from 5 distinct growth phases — more robust transition matrices</li>
                  <li>✓ We can prove the satellite-identified 2007–2014 acceleration matches the airport/metro timeline</li>
                  <li>✓ Environmental impact quantification goes back to the Garden City baseline</li>
                  <li>✓ Our 2025 validation is stronger because it's based on 35 years of prior data, not 9</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
