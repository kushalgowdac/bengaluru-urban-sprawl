import React from 'react';
import { SectionZero } from './components/SectionZero';
import { SectionOne } from './components/SectionOne';
import { SectionOnePointFive } from './components/SectionOnePointFive';
import { SectionTwo } from './components/SectionTwo';
import { SectionThree } from './components/SectionThree';
import { SectionFour } from './components/SectionFour';
import { SectionFive } from './components/SectionFive';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Cover Page */}
      <SectionZero />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Bengaluru's Urban Transformation</h1>
          <p className="text-slate-300 mt-1">A Data-Driven Story: 1988–2035</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* Section 1: The Story — LULC data + interactive table */}
        <SectionOne />

        {/* Section 1.5: Satellite Index Visualizations */}
        <SectionOnePointFive />

        {/* Section 2: The Crisis — water/vegetation collapse + recovery story */}
        <SectionTwo />

        {/* Section 3: The Causes — infrastructure catalyst timeline */}
        <SectionThree />

        {/* Section 4: The Future — CA-Markov predictions + validation */}
        <SectionFour />

        {/* Section 5: Credibility & Impact — validation sources, novelty, end users, policy */}
        <SectionFive />
      </main>

      <footer className="bg-slate-900 border-t border-slate-700 mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-400">
            <div>
              <p className="text-white font-semibold mb-2">Data Sources</p>
              <ul className="space-y-1">
                <li>Landsat 5 / 7 / 9 (Google Earth Engine)</li>
                <li>OpenStreetMap (post-2014 labeling)</li>
                <li>NRSC / ISRO LULC Atlas (validation)</li>
                <li>BBMP / BDA Master Plans (validation)</li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Research Team</p>
              <ul className="space-y-1">
                <li>Kushal Gowda C · 1RV23CS117</li>
                <li>Kiran Kumar S · 1RV23CS112</li>
                <li>Harshith Kumar SB · 1RV23CS098</li>
                <li>Dharshan SN · 1RV23IS044</li>
                <li>Bharath Kumar MS · 1RV23IS034</li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Project</p>
              <p className="mb-1">VI Semester EL · SDG 9 · RVCE</p>
              <p className="mb-1">Mentor: Prof. Deepika Dash</p>
              <p className="text-slate-500 text-xs mt-3">Temporal analysis spans 1988–2024. Predictions 2025–2035 based on CA-Markov simulation validated against actual 2025 data.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
