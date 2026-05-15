import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, Columns2 } from 'lucide-react';
import { motion } from 'motion/react';

// LULC Anchor Year Images (1990, 1995, 2003, 2007, 2014, 2016, 2018, 2020, 2022, 2024)
import lulc1990 from 'figma:asset/8660a7030490517488f5b7dc21c696dcf067421d.png';
import lulc1995 from 'figma:asset/b71bf814b189d7c17fdea7f0d9ae153c1b63d975.png';
import lulc2003 from 'figma:asset/54ce16703d05e520369b19819a9b4a11a95a2315.png';
import lulc2007 from 'figma:asset/f6c8d985f5ade25e6199dc753961dc5661c9d43d.png';
import lulc2014 from 'figma:asset/fa3559a1113bb0f12ce106f72ddd9dd99b4ebd49.png';
import lulc2016 from 'figma:asset/019946d64027185d1f4d154d2b32566353d837d8.png';
import lulc2018 from 'figma:asset/53a00d867b2857b5ddf33f52f620ae56ae132bfc.png';
import lulc2020 from 'figma:asset/fb929a5a1fa4c24620c8bb2e0e0cddfd4cbc31b7.png';
import lulc2022 from 'figma:asset/9e018a352dfa008fcc6a674e7b05a73a3a0440bf.png';
import lulc2024 from 'figma:asset/644a05b2644413dbeb5ba5086ea262cd3292d9ed.png';

const lulcYearData = [
  { year: 1990, image: lulc1990 },
  { year: 1995, image: lulc1995 },
  { year: 2003, image: lulc2003 },
  { year: 2007, image: lulc2007 },
  { year: 2014, image: lulc2014 },
  { year: 2016, image: lulc2016 },
  { year: 2018, image: lulc2018 },
  { year: 2020, image: lulc2020 },
  { year: 2022, image: lulc2022 },
  { year: 2024, image: lulc2024 },
];

export function LULCSimulation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [looping, setLooping] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareLeftIndex, setCompareLeftIndex] = useState(0);
  const [compareRightIndex, setCompareRightIndex] = useState(9);
  const [reloadKey, setReloadKey] = useState(0);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);

  // LULC Playback control
  useEffect(() => {
    if (isPlaying && !comparisonMode) {
      const interval = 1500 / speed;
      playbackRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= lulcYearData.length - 1) {
            if (looping) {
              return 0;
            } else {
              setIsPlaying(false);
              return lulcYearData.length - 1;
            }
          }
          return prev + 1;
        });
      }, interval);
    } else {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
      }
    }

    return () => {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
      }
    };
  }, [isPlaying, speed, looping, comparisonMode]);

  const handlePlayPause = () => {
    if (comparisonMode) return;
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    // Force GIF reload for LULC images
    setReloadKey((k) => k + 1);
  };

  return (
    <div>
      {/* Comparison Mode Toggle */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => {
            setComparisonMode(!comparisonMode);
            setIsPlaying(false);
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
            comparisonMode
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105 border-2 border-purple-400'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border-2 border-slate-600'
          }`}
        >
          <Columns2 className="w-5 h-5" />
          {comparisonMode ? '🔀 Comparison Mode: ON' : 'Side-by-Side Comparison'}
        </button>
      </div>

      {/* Display Area */}
      <div className="bg-black rounded-xl overflow-hidden border-4 border-orange-500/50 mb-6 shadow-2xl">
        {!comparisonMode ? (
          /* Single View Mode */
          <div className="relative" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <img
              key={`lulc-${currentIndex}`}
              src={`${lulcYearData[currentIndex].image}?t=${reloadKey}`}
              alt={`Bengaluru LULC ${lulcYearData[currentIndex].year}`}
              className="w-full h-auto object-contain bg-slate-900"
              style={{ minHeight: '500px', maxHeight: '600px' }}
            />
            
            {/* Year Overlay */}
            <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-orange-500">
              <p className="text-4xl font-bold text-orange-400">{lulcYearData[currentIndex].year}</p>
            </div>

            {/* LULC Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-green-600 rounded-lg px-6 py-3 border-2 border-orange-500 shadow-xl">
              <p className="text-2xl font-bold text-white">LULC</p>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-500">
              <p className="text-sm text-orange-300 font-semibold">
                {currentIndex + 1} / {lulcYearData.length}
              </p>
            </div>
          </div>
        ) : (
          /* Comparison Mode - Side by Side */
          <div className="grid grid-cols-2 gap-0 relative" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Left Image */}
            <div className="relative border-r-2 border-slate-700">
              <img
                src={`${lulcYearData[compareLeftIndex].image}?t=${reloadKey}`}
                alt={`Bengaluru LULC ${lulcYearData[compareLeftIndex].year}`}
                className="w-full h-auto object-contain bg-slate-900"
                style={{ minHeight: '400px', maxHeight: '600px' }}
              />
              <div className="absolute top-4 left-4 bg-green-600/90 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-green-400">
                <p className="text-2xl font-bold text-white">{lulcYearData[compareLeftIndex].year}</p>
                <p className="text-xs text-green-100">BEFORE</p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src={`${lulcYearData[compareRightIndex].image}?t=${reloadKey}`}
                alt={`Bengaluru LULC ${lulcYearData[compareRightIndex].year}`}
                className="w-full h-auto object-contain bg-slate-900"
                style={{ minHeight: '400px', maxHeight: '600px' }}
              />
              <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-red-400">
                <p className="text-2xl font-bold text-white">{lulcYearData[compareRightIndex].year}</p>
                <p className="text-xs text-red-100">AFTER</p>
              </div>
            </div>

            {/* VS Badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center border-4 border-white shadow-2xl z-10">
              <p className="text-xl font-black text-slate-900">VS</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-slate-900/70 rounded-xl p-6 border border-orange-500/50">
        {!comparisonMode ? (
          /* Single View Controls */
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Play/Pause & Reset */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-slate-400 mb-1">PLAYBACK</p>
                <div className="flex gap-3">
                  <button
                    onClick={handlePlayPause}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all ${
                      isPlaying
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Play
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
                    title="Reset to 1990"
                  >
                    <RotateCw className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Speed Selector */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-slate-400 mb-1">PLAYBACK SPEED</p>
                <div className="grid grid-cols-4 gap-2">
                  {[0.5, 1, 2, 4].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setSpeed(spd)}
                      className={`px-3 py-3 rounded-lg font-bold transition-all ${
                        speed === spd
                          ? 'bg-blue-600 text-white border-2 border-blue-400'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Loop Toggle */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-slate-400 mb-1">OPTIONS</p>
                <button
                  onClick={() => setLooping(!looping)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    looping
                      ? 'bg-purple-600 text-white border-2 border-purple-400'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600'
                  }`}
                >
                  🔄 Loop: {looping ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Year Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-400">ANCHOR YEAR TIMELINE</p>
                <p className="text-sm text-slate-400">
                  Year: <span className="text-orange-400 font-bold">{lulcYearData[currentIndex].year}</span>
                </p>
              </div>
              <input
                type="range"
                min={0}
                max={lulcYearData.length - 1}
                value={currentIndex}
                onChange={(e) => setCurrentIndex(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-orange"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${
                    (currentIndex / (lulcYearData.length - 1)) * 100
                  }%, #475569 ${(currentIndex / (lulcYearData.length - 1)) * 100}%, #475569 100%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-400">{lulcYearData[0].year}</span>
                <span className="text-xs text-slate-400">{lulcYearData[lulcYearData.length - 1].year}</span>
              </div>
            </div>

            {/* Year Selection Buttons */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <p className="text-xs font-semibold text-slate-400 w-full text-center mb-2">
                QUICK JUMP TO ANCHOR YEARS
              </p>
              {lulcYearData.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    currentIndex === idx
                      ? 'bg-orange-500 text-white scale-110 shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Comparison Mode Controls */
          <div className="space-y-6">
            {/* Left Year Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-green-400">BEFORE (Left)</p>
                <p className="text-sm text-slate-400">
                  Year: <span className="text-green-400 font-bold">{lulcYearData[compareLeftIndex].year}</span>
                </p>
              </div>
              <input
                type="range"
                min={0}
                max={lulcYearData.length - 1}
                value={compareLeftIndex}
                onChange={(e) => setCompareLeftIndex(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-green"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                    (compareLeftIndex / (lulcYearData.length - 1)) * 100
                  }%, #475569 ${(compareLeftIndex / (lulcYearData.length - 1)) * 100}%, #475569 100%)`,
                }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {lulcYearData.map((item, idx) => (
                  <button
                    key={item.year}
                    onClick={() => setCompareLeftIndex(idx)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      compareLeftIndex === idx
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Year Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-red-400">AFTER (Right)</p>
                <p className="text-sm text-slate-400">
                  Year: <span className="text-red-400 font-bold">{lulcYearData[compareRightIndex].year}</span>
                </p>
              </div>
              <input
                type="range"
                min={0}
                max={lulcYearData.length - 1}
                value={compareRightIndex}
                onChange={(e) => setCompareRightIndex(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-red"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${
                    (compareRightIndex / (lulcYearData.length - 1)) * 100
                  }%, #475569 ${(compareRightIndex / (lulcYearData.length - 1)) * 100}%, #475569 100%)`,
                }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {lulcYearData.map((item, idx) => (
                  <button
                    key={item.year}
                    onClick={() => setCompareRightIndex(idx)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      compareRightIndex === idx
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Stats */}
            <div className="bg-gradient-to-r from-green-900/30 to-red-900/30 rounded-lg p-4 border border-yellow-500/50">
              <p className="text-center text-lg font-bold text-yellow-300">
                📊 Time Span: {lulcYearData[compareRightIndex].year - lulcYearData[compareLeftIndex].year} years
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        input[type='range'].slider-orange::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #f97316;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.6);
        }

        input[type='range'].slider-orange::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #f97316;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.6);
        }

        input[type='range'].slider-green::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: #10b981;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        input[type='range'].slider-green::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #10b981;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        input[type='range'].slider-red::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: #ef4444;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
        }

        input[type='range'].slider-red::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #ef4444;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
        }
      `}</style>
    </div>
  );
}