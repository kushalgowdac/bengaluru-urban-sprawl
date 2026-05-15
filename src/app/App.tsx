import React from 'react';
import { SectionZero } from './components/SectionZero';
import { SectionOne } from './components/SectionOne';
import { SectionOnePointFive } from './components/SectionOnePointFive';
import { SectionTwo } from './components/SectionTwo';
import { SectionThree } from './components/SectionThree';
import { SectionFour } from './components/SectionFour';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Cover Page - Full Screen */}
      <SectionZero />

      {/* Header - Appears after cover page */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Bengaluru's Urban Transformation</h1>
          <p className="text-slate-300 mt-1">A Data-Driven Story: 1988-2035</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        <SectionOne />
        <SectionOnePointFive />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>Data Source: Temporal Analysis of Urban Growth (1988-2024)</p>
        </div>
      </footer>
    </div>
  );
}