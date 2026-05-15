import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, Microscope, Columns2 } from 'lucide-react';
import { motion } from 'motion/react';
import rgbImage from 'figma:asset/838a40bed2a9cc2f875bef781ab6e33712a9a8c5.png';
import ndviImage from 'figma:asset/ef3a5138f9084e94701262e05d4cd3b2255e16f6.png';
import ndbiImage from 'figma:asset/86cbce98a1a74f28d120eb5da3118bc3a03d8b7a.png';
import ndwiImage from 'figma:asset/NDWI_timelapse.gif';
import { LULCSimulation } from './LULCSimulation';
import { ImageWithFallback } from './figma/ImageWithFallback';

// LULC Anchor Year Images (1990, 1995, 2003, 2007, 2014, 2016, 2018, 2020, 2022, 2024)
import lulc1990 from 'figma:asset/02cd2e1b59fe12a70e5c6cc1e09b38e6c71a67df.png';
import lulc1995 from 'figma:asset/e39afaf40d79ddb7fc42e65e19148e68dcf90c6a.png';
import lulc2003 from 'figma:asset/94b33bb19b837bd28fd25d4c6f20a23c97cf3e3e.png';
import lulc2007 from 'figma:asset/fde8868e28af3cb15a16a3c1a2d35d0308ad26df.png';
import lulc2014 from 'figma:asset/5a9e6b2063577da1fc4c7d16e879e91e24f5bcf0.png';
import lulc2016 from 'figma:asset/33facd9e5d1e1b05afc1b1a06fd65c6c2f70c67b.png';
import lulc2018 from 'figma:asset/d06ed48c26c3bcf9b7d7c0b0d5d46d9b69b60a10.png';
import lulc2020 from 'figma:asset/fc859ed65c8df76fbcb9cf0e67e1df6b4fc04b4c.png';
import lulc2022 from 'figma:asset/1da09adf0c2e1b47a4cb6e15f9db08e4ca4e4158.png';
import lulc2024 from 'figma:asset/e039332dc1c7fe83abd6e09c10c7e94d8d0ddb7c.png';

type IndexType = 'RGB' | 'NDVI' | 'NDBI' | 'NDWI' | 'LULC';

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

const indexData = {
  RGB: {
    name: 'True Color (RGB)',
    description: 'Natural color composite showing Earth as it appears to the human eye',
    interpretation: 'Green = Vegetation | Gray = Urban | Blue = Water',
    image: rgbImage,
    color: 'from-blue-600 to-green-600',
    borderColor: 'border-blue-500',
  },
  NDVI: {
    name: 'Normalized Difference Vegetation Index',
    description: 'Measures vegetation health and density using near-infrared reflectance',
    interpretation: 'Dark Green = Dense vegetation | Yellow = Sparse | Red = Urban/Barren',
    image: ndviImage,
    color: 'from-green-600 to-yellow-600',
    borderColor: 'border-green-500',
  },
  NDBI: {
    name: 'Normalized Difference Built-up Index',
    description: 'Highlights urban and built-up areas using shortwave infrared bands',
    interpretation: 'Red/Pink = High built-up | Yellow = Moderate | Green = Natural',
    image: ndbiImage,
    color: 'from-red-600 to-orange-600',
    borderColor: 'border-red-500',
  },
  NDWI: {
    name: 'Normalized Difference Water Index',
    description: 'Detects water bodies and moisture content in vegetation',
    interpretation: 'Blue = Water | Green = Moisture | Red = Dry/Urban',
    image: ndwiImage,
    color: 'from-cyan-600 to-blue-600',
    borderColor: 'border-cyan-500',
  },
  LULC: {
    name: 'Land Use Land Cover Temporal Simulation',
    description: 'Interactive visualization of Bengaluru\'s urban transformation through 10 anchor years',
    interpretation: 'Orange = Built-up | Green = Vegetation | Blue = Water | Brown = Barren',
    image: lulc2024,
    color: 'from-orange-600 to-green-600',
    borderColor: 'border-orange-500',
  },
};

export function SectionOnePointFive() {
  const [selectedIndex, setSelectedIndex] = useState<IndexType>('RGB');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentYear, setCurrentYear] = useState(1988);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [imageReloadKey, setImageReloadKey] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [mediaSpeed, setMediaSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);
  
  // LULC-specific state
  const [lulcCurrentIndex, setLulcCurrentIndex] = useState(0);
  const [lulcIsPlaying, setLulcIsPlaying] = useState(false);
  const [lulcSpeed, setLulcSpeed] = useState(1);
  const [lulcLooping, setLulcLooping] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareLeftIndex, setCompareLeftIndex] = useState(0);
  const [compareRightIndex, setCompareRightIndex] = useState(9);
  const lulcPlaybackRef = useRef<NodeJS.Timeout | null>(null);

  const years = [1990, 1995, 2000, 2003, 2007, 2010, 2014, 2018, 2021, 2024];
  const minYear = 1988;
  const maxYear = 2024;
  const currentData = indexData[selectedIndex];

  // Playback control
  useEffect(() => {
    if (isPlaying) {
      const interval = 1000 / playbackSpeed; // Base speed: 1 year per second
      playbackRef.current = setInterval(() => {
        setCurrentYear((prev) => {
          if (prev >= maxYear) {
            if (isLooping) {
              return minYear;
            } else {
              setIsPlaying(false);
              return maxYear;
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
  }, [isPlaying, playbackSpeed, isLooping]);

  // LULC Playback control
  useEffect(() => {
    if (lulcIsPlaying && selectedIndex === 'LULC') {
      const interval = 1500 / lulcSpeed; // Base speed: 1.5 seconds per year
      lulcPlaybackRef.current = setInterval(() => {
        setLulcCurrentIndex((prev) => {
          if (prev >= lulcYearData.length - 1) {
            if (lulcLooping) {
              return 0;
            } else {
              setLulcIsPlaying(false);
              return lulcYearData.length - 1;
            }
          }
          return prev + 1;
        });
      }, interval);
    } else {
      if (lulcPlaybackRef.current) {
        clearInterval(lulcPlaybackRef.current);
      }
    }

    return () => {
      if (lulcPlaybackRef.current) {
        clearInterval(lulcPlaybackRef.current);
      }
    };
  }, [lulcIsPlaying, lulcSpeed, lulcLooping, selectedIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentYear(minYear);
    setIsPlaying(false);
    // Force GIF/image reload by bumping a cache-busting key
    setImageReloadKey((k) => k + 1);
  };

  // Detect if a corresponding MP4 exists for the current image (e.g., NDWI_timelapse.mp4)
  useEffect(() => {
    let cancelled = false;

    // Only attempt video mode for NDWI GIF source.
    if (selectedIndex !== 'NDWI' || !/\.gif(\?.*)?$/i.test(currentData.image as string)) {
      setVideoSrc(null);
      return () => {
        cancelled = true;
      };
    }

    const tryVideo = async () => {
      try {
        const maybe = (currentData.image as string).replace(/\.gif(\?.*)?$/i, '.mp4');
        // Use video mode only when the response is actually a video resource.
        const url = `${maybe}`;
        const resp = await fetch(url, { method: 'HEAD' });
        const contentType = resp.headers.get('content-type') || '';
        if (!cancelled && resp.ok && contentType.includes('video')) {
          setVideoSrc(url);
        } else {
          setVideoSrc(null);
        }
      } catch (e) {
        setVideoSrc(null);
      }
    };

    tryVideo();
    return () => {
      cancelled = true;
    };
  }, [selectedIndex, currentData.image, imageReloadKey]);

  // Apply media speed to video element when changed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = mediaSpeed;
    }
  }, [mediaSpeed, videoSrc]);
  
  const handleLulcPlayPause = () => {
    setLulcIsPlaying(!lulcIsPlaying);
  };

  const handleLulcReset = () => {
    setLulcCurrentIndex(0);
    setLulcIsPlaying(false);
  };

  return (
    <section className="py-16 pb-8">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Microscope className="w-10 h-10 text-cyan-400" />
            <h2 className="text-4xl font-bold text-white">🔬 DATA VISUALIZATION LABORATORY</h2>
          </div>
          <p className="text-xl text-slate-300">
            Explore Bengaluru's transformation through satellite spectral indices
          </p>
        </motion.div>

        {/* Index Selector Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {(Object.keys(indexData) as IndexType[]).map((index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                selectedIndex === index
                  ? `bg-gradient-to-r ${indexData[index].color} text-white shadow-lg scale-105 border-2 ${indexData[index].borderColor}`
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border-2 border-slate-600'
              }`}
            >
              {index}
            </button>
          ))}
        </div>

        {/* Index Information Panel */}
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`bg-slate-900/50 rounded-xl p-6 mb-6 border-2 ${currentData.borderColor}`}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{currentData.name}</h3>
          <p className="text-slate-300 mb-3">{currentData.description}</p>
          <div className={`bg-gradient-to-r ${currentData.color} bg-opacity-10 rounded-lg p-4 border ${currentData.borderColor}`}>
            <p className="text-white font-semibold">
              📊 <span className="text-yellow-300">How to Read:</span> {currentData.interpretation}
            </p>
          </div>
        </motion.div>

        {/* Conditional Rendering: LULC Simulation vs Standard Indices */}
        {selectedIndex === 'LULC' ? (
          <LULCSimulation />
        ) : (
          <>
            {/* Large Display Area */}
            <div className="bg-black rounded-xl overflow-hidden border-4 border-slate-700 mb-6 shadow-2xl">
              <div className="relative" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                  key={`${selectedIndex}-${currentYear}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {videoSrc && selectedIndex === 'NDWI' ? (
                    <video
                      ref={videoRef}
                      src={`${videoSrc}?t=${imageReloadKey}`}
                      className="w-full h-auto object-contain"
                      style={{ minHeight: '500px', maxHeight: '600px' }}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={() => setVideoSrc(null)}
                    />
                  ) : (
                    <ImageWithFallback
                      src={`${currentData.image}?t=${imageReloadKey}`}
                      alt={`${selectedIndex} visualization for ${currentYear}`}
                      className="w-full h-auto object-contain"
                      style={{ minHeight: '500px', maxHeight: '600px' }}
                    />
                  )}
                </motion.div>
                
                {/* Year Overlay */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-cyan-500">
                  <p className="text-4xl font-bold text-cyan-400">{currentYear}</p>
                </div>

                {/* Current Index Badge */}
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${currentData.color} rounded-lg px-6 py-3 border-2 ${currentData.borderColor} shadow-xl`}>
                  <p className="text-2xl font-bold text-white">{selectedIndex}</p>
                </div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-600">
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
                      title="Reset to 1988"
                    >
                      <RotateCw className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Speed Selector */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-slate-400 mb-1">PLAYBACK SPEED</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[0.5, 1, 2, 4].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-3 py-3 rounded-lg font-bold transition-all ${
                          playbackSpeed === speed
                            ? 'bg-blue-600 text-white border-2 border-blue-400'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loop Toggle */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-slate-400 mb-1">OPTIONS</p>
                  <button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${
                      isLooping
                        ? 'bg-purple-600 text-white border-2 border-purple-400'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600'
                    }`}
                  >
                    🔄 Loop: {isLooping ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Media Speed (only when video available) */}
              {videoSrc && selectedIndex === 'NDWI' && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-400 mb-2">NDWI Playback Speed</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[0.25, 0.5, 1, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => setMediaSpeed(s)}
                        className={`px-3 py-3 rounded-lg font-bold transition-all ${
                          mediaSpeed === s
                            ? 'bg-indigo-600 text-white border-2 border-indigo-400'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Tip: lower values slow the animation.</p>
                </div>
              )}

              {/* Year Slider */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-400">TIMELINE</p>
                  <p className="text-sm text-slate-400">
                    Year: <span className="text-cyan-400 font-bold">{currentYear}</span>
                  </p>
                </div>
                <input
                  type="range"
                  min={minYear}
                  max={maxYear}
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
                      ((currentYear - minYear) / (maxYear - minYear)) * 100
                    }%, #475569 ${((currentYear - minYear) / (maxYear - minYear)) * 100}%, #475569 100%)`,
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-400">{minYear}</span>
                  <span className="text-xs text-slate-400">{maxYear}</span>
                </div>
              </div>

              {/* Anchor Years Markers */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <p className="text-xs font-semibold text-slate-400 w-full text-center mb-2">
                  ANCHOR YEARS
                </p>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setCurrentYear(year)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                      currentYear === year
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Technical Info Footer */}
        <div className="mt-6 bg-slate-900/30 rounded-lg p-4 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-slate-400">DATA SOURCE</p>
              <p className="text-sm font-semibold text-white">Landsat Satellite Imagery</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">TEMPORAL COVERAGE</p>
              <p className="text-sm font-semibold text-white">1988 - 2024 (36 years)</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">SPATIAL RESOLUTION</p>
              <p className="text-sm font-semibold text-white">30m x 30m pixels</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">STUDY AREA</p>
              <p className="text-sm font-semibold text-white">Bengaluru Urban District</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input[type='range'].slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #06b6d4;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        input[type='range'].slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #06b6d4;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </section>
  );
}