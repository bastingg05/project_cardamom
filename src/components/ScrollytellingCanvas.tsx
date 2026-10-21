"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Compass, ShieldCheck, Leaf, Droplets, ArrowRight } from "lucide-react";
import { QualitySection } from "./QualitySection";

const TOTAL_FRAMES = 300;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames/ezgif-frame-${padded}.jpg`;
}

interface ScrollytellingCanvasProps {
  onOpenTradeModal: () => void;
}

export function ScrollytellingCanvas({ onOpenTradeModal }: ScrollytellingCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [activeStoryStage, setActiveStoryStage] = useState<number>(0);
  const [showHeroCardamom, setShowHeroCardamom] = useState<boolean>(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const isRenderingRef = useRef<boolean>(false);
  const targetFrameRef = useRef<number>(1);
  const renderedFrameRef = useRef<number>(-1);

  // Framer Motion scroll progress across container (0.0 to 1.0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Map progress 0.00 -> 0.70 to frame index 1..300
  const frameProgress = useTransform(scrollYProgress, [0, 0.70], [1, TOTAL_FRAMES], {
    clamp: true,
  });

  // 2. Horizontal Page Slide: The entire Quality Section slides in from the right side (100vw -> 0vw) between 0.72 and 0.88
  const qualityX = useTransform(scrollYProgress, [0.72, 0.88], ["100vw", "0vw"], {
    clamp: true,
  });
  const qualityOpacity = useTransform(scrollYProgress, [0.70, 0.73], [0, 1], {
    clamp: true,
  });

  // Parallax subtle push of canvas and hero to the left as quality slides in
  const canvasParallaxX = useTransform(scrollYProgress, [0.72, 0.88], ["0vw", "-18vw"], {
    clamp: true,
  });
  const canvasOpacity = useTransform(scrollYProgress, [0.72, 0.88], [1, 0.35], {
    clamp: true,
  });

  const getNearestLoadedFrame = useCallback((target: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[target]?.complete && images[target]?.naturalWidth) {
      return images[target];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const backward = target - offset;
      if (backward >= 1 && images[backward]?.complete && images[backward]?.naturalWidth) {
        return images[backward];
      }
      const forward = target + offset;
      if (forward <= TOTAL_FRAMES && images[forward]?.complete && images[forward]?.naturalWidth) {
        return images[forward];
      }
    }
    return null;
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const target = targetFrameRef.current;
    const img = getNearestLoadedFrame(target);
    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const pixelWidth = Math.round(displayWidth * dpr);
    const pixelHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Enable high-fidelity bicubic resampling for maximum sharpness
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clear base
    ctx.fillStyle = "#080B07";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const imgRatio = 1920 / 1080;
    const canvasRatio = displayWidth / displayHeight;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (canvasRatio > imgRatio) {
      drawW = displayWidth;
      drawH = displayWidth / imgRatio;
      drawX = 0;
      drawY = (displayHeight - drawH) / 2;
    } else {
      drawH = displayHeight;
      drawW = displayHeight * imgRatio;
      drawX = (displayWidth - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, Math.round(drawX), Math.round(drawY), Math.round(drawW), Math.round(drawH));
    ctx.restore();
    renderedFrameRef.current = target;
  }, [getNearestLoadedFrame]);

  const triggerRender = useCallback(() => {
    if (!isRenderingRef.current) {
      isRenderingRef.current = true;
      requestAnimationFrame(() => {
        renderCanvas();
        isRenderingRef.current = false;
      });
    }
  }, [renderCanvas]);

  // Update frame on scroll
  useMotionValueEvent(frameProgress, "change", (latest) => {
    const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(latest)));
    targetFrameRef.current = frameIndex;
    setCurrentFrameIndex(frameIndex);
    triggerRender();
  });

  // Update active story stage across the entire container
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Show "CARDAMOM" text from second scroll onwards (0.025 to 0.14)
    setShowHeroCardamom(progress >= 0.025 && progress < 0.14);

    if (progress >= 0.82) {
      setActiveStoryStage(6); // Quality Page (Horizontally arrived)
    } else if (progress >= 0.65) {
      setActiveStoryStage(5); // Reveal
    } else if (progress >= 0.52) {
      setActiveStoryStage(4); // Trade
    } else if (progress >= 0.38) {
      setActiveStoryStage(3); // Harvest
    } else if (progress >= 0.24) {
      setActiveStoryStage(2); // Anatomy
    } else if (progress >= 0.14) {
      setActiveStoryStage(1); // Origin
    } else {
      setActiveStoryStage(0); // Top Home View
    }
  });

  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    const img1 = new Image();
    img1.src = getFramePath(1);
    img1.onload = () => {
      if (isCancelled) return;
      imagesRef.current[1] = img1;
      setLoadedCount((prev) => prev + 1);
      triggerRender();
    };

    const keyIndices: number[] = [];
    for (let i = 5; i <= TOTAL_FRAMES; i += 5) {
      keyIndices.push(i);
    }

    const remainingIndices: number[] = [];
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      if (i % 5 !== 0) {
        remainingIndices.push(i);
      }
    }

    const loadQueue = [...keyIndices, ...remainingIndices];
    const CONCURRENCY = 6;
    let activeWorkers = 0;
    let queueIdx = 0;

    function launchNext() {
      if (isCancelled || queueIdx >= loadQueue.length) return;
      while (activeWorkers < CONCURRENCY && queueIdx < loadQueue.length) {
        const frameIdx = loadQueue[queueIdx++];
        activeWorkers++;

        const img = new Image();
        img.src = getFramePath(frameIdx);
        img.onload = () => {
          activeWorkers--;
          if (!isCancelled) {
            imagesRef.current[frameIdx] = img;
            setLoadedCount((prev) => prev + 1);
            if (Math.abs(targetFrameRef.current - frameIdx) <= 2) {
              triggerRender();
            }
            launchNext();
          }
        };
        img.onerror = () => {
          activeWorkers--;
          if (!isCancelled) launchNext();
        };
      }
    }

    launchNext();

    const handleResize = () => triggerRender();
    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [triggerRender]);

  const scrollToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    // Ratios for: 0 Home (Cardamom), 1 Origin, 2 Anatomy, 3 Harvest, 4 Trade, 5 Reveal, 6 Quality
    const stages = [0.06, 0.18, 0.30, 0.44, 0.58, 0.72, 0.90];
    const targetRatio = stages[stageIdx] ?? 0;
    const top = containerRef.current.offsetTop + targetRatio * (containerRef.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Listen for anchor hash navigation to jump directly to Quality or Specifications
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#quality-grading" || window.location.hash === "#specifications") {
        scrollToStage(6);
      }
    };
    window.addEventListener("hashchange", handleHash);
    if (window.location.hash === "#quality-grading" || window.location.hash === "#specifications") {
      setTimeout(handleHash, 250);
    }
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div
      ref={containerRef}
      id="scrollytelling-journey"
      className="relative w-full h-[750vh] bg-[#1b5244]"
    >
      {/* Sticky Fullscreen Canvas Viewport styled to match reference image */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center hero-plant-gradient">
        
        {/* PARALLAX HOME / CANVAS CONTENT WRAPPER */}
        <motion.div
          style={{ x: canvasParallaxX, opacity: canvasOpacity }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          {/* Architectural Arch Frame behind the subject (matching reference image) */}
          <div className="absolute right-6 sm:right-16 md:right-28 lg:right-36 top-24 bottom-24 w-[320px] sm:w-[440px] md:w-[540px] lg:w-[620px] arch-card-frame pointer-events-none shadow-2xl z-0" />

          {/* The Scrollytelling Canvas (masked within the arch area) */}
          <div className="relative w-full h-full z-0 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover block"
              style={{
                background: "transparent",
                imageRendering: "-webkit-optimize-contrast",
              }}
            />
          </div>
        </motion.div>





        {/* ============================================================== */}
        {/* CARDAMOM HERO OVERLAY (Shown from second scroll onwards)        */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 flex flex-col justify-between pt-28 pb-28 px-6 sm:px-12 pointer-events-none transition-all duration-700 z-20 ${
            showHeroCardamom
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="max-w-xl space-y-4 pointer-events-auto">
              
              {/* Category Subtitle tag */}
              <div className="inline-block">
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#cee9be] font-bold">
                  SPICES // KERALA ORIGIN
                </span>
              </div>

              {/* Massive Bold Headline matching reference */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-sans font-black tracking-[-0.04em] text-[#cee9be] uppercase leading-[0.88] select-none">
                CARDAMOM
              </h1>

              {/* Clean subtitle */}
              <p className="text-base sm:text-xl text-white/90 font-sans font-normal leading-relaxed max-w-lg">
                The fascinating and aromatic world of premium green cardamom, cultivated in the mist-clad Western Ghats.
              </p>

              {/* Action pill button */}
              <div className="pt-2">
                <button
                  onClick={() => scrollToStage(1)}
                  className="group inline-flex items-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full border border-white/40 hover:border-white bg-[#1f3829]/40 hover:bg-[#1f3829]/70 backdrop-blur-md text-white font-sans text-sm font-semibold transition-all duration-300 cursor-pointer shadow-lg"
                >
                  <span>Explore Harvest</span>
                  <span className="w-9 h-9 rounded-full bg-white text-[#1f3829] flex items-center justify-center font-bold text-base group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OVERLAY 1: THE ORIGIN (Frames 26-75)                           */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 flex items-center pt-20 pb-28 px-6 sm:px-12 pointer-events-none transition-all duration-700 z-20 ${
            activeStoryStage === 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5 pointer-events-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#cee9be]">
                01 // THE ORIGIN
              </div>
              <h2 className="text-5xl sm:text-7xl font-sans font-black text-[#cee9be] tracking-tighter uppercase leading-[0.92]">
                BORN IN THE <br />
                <span className="text-[#dfb347]">WESTERN GHATS</span>
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-md">
                Fertile volcanic mountain soils, monsoon-fed canopy mists, and century-old generational farming shape the world’s most prized green pods.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#cee9be] bg-[#1f3829]/70 border border-white/15">
                  1,100m – 1,400m Altitude
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-white bg-[#1f3829]/70 border border-white/15">
                  Elettaria cardamomum
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OVERLAY 2: THE DETAIL / ANATOMY (Frames 76-170)                */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 flex items-center pt-20 pb-28 px-6 sm:px-12 pointer-events-none transition-all duration-700 z-20 ${
            activeStoryStage === 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5 pointer-events-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#cee9be]">
                02 // BOTANICAL ANATOMY
              </div>
              <h2 className="text-5xl sm:text-7xl font-sans font-black text-[#cee9be] tracking-tighter uppercase leading-[0.92]">
                NATURE, <br />
                <span className="text-[#cee9be]">UNFOLDED</span>
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-md">
                Three natural chambers cradle aromatic black seeds rich in natural cineole and terpinyl acetate oils.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-xs text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#1f3829]/80 border border-white/15 text-white">
                  <span className="text-white/60 block text-[10px]">ESSENTIAL OILS</span>
                  <span className="text-white font-bold text-sm">7.5% – 8.8% v/w</span>
                </div>
                <div className="p-3 rounded-xl bg-[#1f3829]/80 border border-white/15 text-white">
                  <span className="text-white/60 block text-[10px]">MOISTURE MAX</span>
                  <span className="text-[#cee9be] font-bold text-sm">&lt; 10.0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OVERLAY 3: THE HARVEST (Frames 171-220)                        */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 flex items-center pt-20 pb-28 px-6 sm:px-12 pointer-events-none transition-all duration-700 z-20 ${
            activeStoryStage === 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5 pointer-events-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#cee9be]">
                03 // THE HARVEST
              </div>
              <h2 className="text-5xl sm:text-7xl font-sans font-black text-[#cee9be] tracking-tighter uppercase leading-[0.92]">
                FROM HARVEST <br />
                <span className="text-[#cee9be]">TO HAND</span>
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-md">
                Hand-picked at peak density and cured under controlled thermic humidity to seal in raw emerald chlorophyll.
              </p>
              <div className="p-3.5 rounded-xl bg-[#1f3829]/80 border border-white/15 max-w-md text-xs text-white/80 font-sans">
                Continuous 24-to-30-hour gentle curing at 45°C–50°C preserving aromatic oil integrity.
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OVERLAY 4: THE TRADE (Frames 221-265)                          */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 flex items-center pt-20 pb-28 px-6 sm:px-12 pointer-events-none transition-all duration-700 z-20 ${
            activeStoryStage === 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5 pointer-events-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#cee9be]">
                04 // GLOBAL TRADE
              </div>
              <h2 className="text-5xl sm:text-7xl font-sans font-black text-[#cee9be] tracking-tighter uppercase leading-[0.92]">
                KERALA TO <br />
                <span className="text-[#cee9be]">THE WORLD</span>
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-md">
                Calibrated sieve grading into AGEB 8mm+, sealed into food-grade barrier pouches and shipped via Cochin Port.
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-white/80">
                <span className="px-3 py-1 rounded-full bg-[#1f3829]/70 border border-white/15">
                  Cochin Port (INCOK)
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1f3829]/70 border border-white/15">
                  Spices Board Certified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OVERLAY 5: THE REVEAL (Frames 266-300)                         */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 flex items-center pt-20 pb-28 px-6 sm:px-12 pointer-events-none transition-all duration-700 z-20 ${
            activeStoryStage === 5
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6 pointer-events-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#cee9be]">
                05 // THE BENCHMARK
              </div>
              <h2 className="text-5xl sm:text-7xl font-sans font-black text-[#cee9be] tracking-tighter uppercase leading-[0.92]">
                PURE. DISTINCTIVE. <br />
                <span className="text-[#cee9be]">EXCEPTIONAL.</span>
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-md">
                The harvest settled in traditional jute sacks, ready for international shipment.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={onOpenTradeModal}
                  className="px-6 py-3 rounded-full gold-pill-btn text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg"
                >
                  Request Trade Quote
                </button>
                <button
                  onClick={() => scrollToStage(6)}
                  className="px-6 py-3 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Quality &amp; Sizing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM FLOATING BAR (Green Glassmorphism Theme - Compact)      */}
        {/* ============================================================== */}
        <div className="absolute bottom-3 left-3 right-3 sm:left-8 sm:right-8 z-30 pointer-events-auto flex justify-center">
          <div className="max-w-5xl w-full bottom-dark-bar rounded-xl p-1.5 sm:p-2 flex flex-col md:flex-row items-center justify-between gap-2.5 text-[#1f3829]">
            
            {/* Left Card with Thumbnail (Dark Green Container) */}
            <div className="w-full md:w-auto flex items-center gap-2 bg-[#1f3829] text-white px-2.5 py-1 rounded-lg font-sans font-bold text-xs shrink-0 border border-[#cee9be]/40 shadow-xs">
              <div className="relative w-5 h-5 rounded overflow-hidden border border-[#cee9be]/30 shrink-0">
                <NextImage
                  src="/frames/ezgif-frame-001.jpg"
                  alt="Cardamom Pod Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <span className="block text-[10px] font-sans font-black uppercase tracking-[0.12em] text-[#cee9be]">
                  AGEB 8MM+
                </span>
                <span className="block text-[8.5px] font-sans font-semibold tracking-wide text-white/90">
                  Alleppey Green Extra Bold
                </span>
              </div>
            </div>

            {/* Center Editorial Copy (Editorial Serif Accent) */}
            <p className="hidden lg:block font-serif italic text-[12px] sm:text-[12.5px] text-[#162e22] leading-tight max-w-md text-left font-medium">
              Harvested across Kerala&apos;s Cardamom Hills. Preserving unmatched aroma &amp; raw essential oils.
            </p>

            {/* Right Stage Selector & Frame Counter (Modern Brand Sans) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 bg-white/70 border border-[#cee9be] p-0.5 rounded-lg text-xs font-sans text-[#28574c]">
                {[
                  { name: "Home", idx: 0 },
                  { name: "Origin", idx: 1 },
                  { name: "Anatomy", idx: 2 },
                  { name: "Harvest", idx: 3 },
                  { name: "Trade", idx: 4 },
                  { name: "Reveal", idx: 5 },
                  { name: "Quality", idx: 6 },
                ].map((s) => (
                  <button
                    key={s.name}
                    onClick={() => scrollToStage(s.idx)}
                    className={`px-2 py-0.5 rounded-md text-[9.5px] font-sans font-extrabold uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer ${
                      activeStoryStage === s.idx
                        ? "bg-[#1f3829] text-[#cee9be] font-black shadow-xs"
                        : "text-[#28574c] hover:text-[#1f3829] hover:bg-white/90"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/70 border border-[#cee9be] text-[9.5px] font-sans font-extrabold uppercase tracking-[0.1em] text-[#1f3829]">
                <span className="text-[#48785e] font-bold">FR</span>
                <span className="text-[#1f3829] font-black">
                  {String(currentFrameIndex).padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* THE ENTIRE QUALITY PAGES SCREEN COMING FROM HORIZONTAL SIDE     */}
        {/* ============================================================== */}
        <motion.div
          id="quality-grading"
          style={{
            x: qualityX,
            opacity: qualityOpacity,
          }}
          className="absolute inset-0 w-full h-full z-40 bg-[#ebf5e7] text-[#1f3829] shadow-2xl pointer-events-auto overflow-y-auto"
        >
          <QualitySection onOpenTradeModal={onOpenTradeModal} />
        </motion.div>

      </div>
    </div>
  );
}
