import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, MapPin, Sparkles } from 'lucide-react';
import img1988 from 'figma:asset/7d9cde822ee58cd0c69a1405da6c3c7325aa32c0.png';
import img2024 from 'figma:asset/06ce31c2502c734fc7814ce4f942ed9509cb2148.png';
import thenImage from 'figma:asset/538a2230d763e54842448cc18f1b7f9f8cd88c05.png';
import nowImage from 'figma:asset/c74d951b7781b42d346330ef52e1e04edb8edeba.png';

export function SectionZero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Bengaluru City Outline as Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <svg width="900" height="900" viewBox="0 0 500 500" className="text-white">
          {/* Bengaluru city boundary outline - simplified organic shape */}
          <path
            d="M250,80 C280,75 310,85 330,100 C350,115 365,135 375,160 C385,185 390,215 385,245 C380,275 370,300 355,320 C340,340 320,355 295,365 C270,375 240,380 210,375 C180,370 155,355 135,335 C115,315 100,290 92,260 C84,230 85,200 95,175 C105,150 120,130 140,115 C160,100 185,85 215,82 C230,80 240,80 250,80 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
            BENGALURU URBAN
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              TRANSFORMATION
            </span>
          </h1>
          <p className="text-3xl italic text-gray-300 mb-6">
            From Garden City to Silicon Valley
          </p>
          <div className="flex items-center justify-center gap-4 text-2xl text-yellow-500 font-semibold">
            <span>36 Years</span>
            <span className="text-slate-500">•</span>
            <span>720 km²</span>
            <span className="text-slate-500">•</span>
            <span>3 Inflections</span>
          </div>
        </motion.div>

        {/* Split Screen: 1988 vs 2024 */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Primary: Satellite LULC Data */}
          <div>
            <h3 className="text-xl font-semibold text-slate-300 mb-4 text-center">Satellite Land Use Land Cover Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1988 LULC Image */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-green-500/50 shadow-2xl group">
                <img
                  src={img1988}
                  alt="Bengaluru 1988 Land Cover Mask - Garden City"
                  className="w-full h-96 object-contain bg-slate-900 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-5xl font-bold text-green-400 mb-2">1988</p>
                  <p className="text-xl text-white font-semibold">The Garden City</p>
                  <p className="text-sm text-gray-300">Green vegetation, abundant water bodies</p>
                </div>
              </div>

              {/* 2024 LULC Image */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-red-500/50 shadow-2xl group">
                <img
                  src={img2024}
                  alt="Bengaluru 2024 Land Cover - Urban Sprawl"
                  className="w-full h-96 object-contain bg-slate-900 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-5xl font-bold text-red-400 mb-2">2024</p>
                  <p className="text-xl text-white font-semibold">Silicon Valley of India</p>
                  <p className="text-sm text-gray-300">Massive built-up expansion, vegetation loss</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary: Contextual Photos */}
          <div>
            <h3 className="text-xl font-semibold text-slate-300 mb-4 text-center">Visual Context: Then & Now</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1988 Style Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-green-400/30 shadow-xl group">
                <img
                  src={thenImage}
                  alt="Bengaluru Past - Green City"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-2xl font-bold text-green-300">Then</p>
                  <p className="text-sm text-gray-200">Spacious, green, sustainable</p>
                </div>
              </div>

              {/* 2024 Style Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-blue-400/30 shadow-xl group">
                <img
                  src={nowImage}
                  alt="Bengaluru Now - Modern Metropolis"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-2xl font-bold text-blue-300">Now</p>
                  <p className="text-sm text-gray-200">Dense, digital, dynamic</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Big Questions */}
        <motion.div
          className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-purple-900/40 rounded-2xl p-8 mb-8 border border-purple-500/30 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">The Critical Questions</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <motion.div
              className="bg-slate-800/50 rounded-xl p-5 border-l-4 border-orange-500"
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-2xl font-semibold text-orange-300 flex items-center gap-3">
                <span className="text-4xl">❓</span>
                Can we predict where the city will expand next?
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-800/50 rounded-xl p-5 border-l-4 border-red-500"
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-2xl font-semibold text-red-300 flex items-center gap-3">
                <span className="text-4xl">⏰</span>
                Can we plan BEFORE it's too late?
              </p>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-6 border border-green-500/50">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-7 h-7 text-green-400" />
              <p className="text-3xl font-bold text-green-300">That's exactly what our project does.</p>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              Using <span className="font-bold text-blue-400">Machine Learning</span> and{' '}
              <span className="font-bold text-purple-400">CA-Markov Models</span>, we've analyzed 36 years of 
              satellite data to predict urban expansion patterns and help policymakers make{' '}
              <span className="font-bold text-yellow-400">data-driven decisions</span> for sustainable growth.
            </p>
          </div>
        </motion.div>

        {/* Key Stats Box */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-5 border border-blue-500/30 text-center">
            <p className="text-4xl mb-2">📈</p>
            <p className="text-3xl font-bold text-blue-400">+71%</p>
            <p className="text-sm text-slate-300">Built-up Growth</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-xl p-5 border border-orange-500/30 text-center">
            <p className="text-4xl mb-2">🌳</p>
            <p className="text-3xl font-bold text-orange-400">-78%</p>
            <p className="text-sm text-slate-300">Vegetation Loss</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 rounded-xl p-5 border border-cyan-500/30 text-center">
            <p className="text-4xl mb-2">💧</p>
            <p className="text-3xl font-bold text-cyan-400">-59%</p>
            <p className="text-sm text-slate-300">Water Body Decline</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-5 border border-purple-500/30 text-center">
            <p className="text-4xl mb-2">🔬</p>
            <p className="text-3xl font-bold text-purple-400">ML</p>
            <p className="text-sm text-slate-300">1988-2024 Analysis</p>
          </div>
        </motion.div>

        {/* Institution Credit */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <div className="inline-flex items-center gap-3 bg-slate-800/70 px-8 py-4 rounded-full border border-slate-600 shadow-xl">
            <MapPin className="w-6 h-6 text-green-400" />
            <div className="text-left">
              <p className="text-sm text-slate-400">Research Project by</p>
              <p className="text-xl font-bold text-white">RV College of Engineering, Bengaluru</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-slate-400">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-slate-400 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}