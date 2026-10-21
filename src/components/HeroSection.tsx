"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Compass, Award, Shield, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onOpenTradeModal: () => void;
}

export function HeroSection({ onOpenTradeModal }: HeroSectionProps) {
  const scrollToCanvas = () => {
    const el = document.getElementById("scrollytelling-journey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 bg-[#080B07] overflow-hidden">
      {/* Background ambient lighting matching top-left sunbeam */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#c0956a]/15 via-[#526b32]/10 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#101a10] rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 py-8">
        
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Western Ghats Origin Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-[#d6ae68] bg-[#0d140c]/90 border border-[#d6ae68]/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#526b32] animate-pulse" />
            <span>Western Ghats • GI Certified Origin</span>
          </div>

          {/* Primary Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-serif text-white tracking-tight leading-[0.98]">
              Nature’s Finest. <br />
              <span className="italic font-light text-[#e7c27d]">
                Traded Worldwide.
              </span>
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-white/70 font-light leading-relaxed max-w-xl">
            Discover premium Kerala green cardamom, carefully sourced from the heart of the Western Ghats and connected to markets around the world.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToCanvas}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#526b32] to-[#3a4e23] hover:from-[#62823b] hover:to-[#526b32] text-white font-medium text-sm tracking-wide shadow-xl shadow-[#526b32]/25 border border-[#98ad5a]/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Our Cardamom</span>
              <ChevronRight className="w-4 h-4 text-[#d6ae68] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenTradeModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border border-white/15 hover:border-white/30 backdrop-blur-md font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer"
            >
              <span>Partner With Us</span>
            </button>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-light text-[#d6ae68]">
                8mm+
              </span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-white/50 mt-1">
                AGEB Extra Bold
              </span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-light text-white">
                1,200m
              </span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-white/50 mt-1">
                Altitude Mists
              </span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-light text-[#a4c478]">
                100%
              </span>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-white/50 mt-1">
                Direct Origin
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Pristine Cardamom Visual Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[460px] rounded-3xl overflow-hidden glass-panel border border-[#526b32]/30 shadow-2xl group">
            
            {/* Visual Frame 1 Preview */}
            <div className="absolute inset-0">
              <Image
                src="/frames/ezgif-frame-001.jpg"
                alt="Single premium Kerala green cardamom pod floating in forest atmosphere"
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b07] via-transparent to-transparent opacity-80" />
            </div>

            {/* Float Card Info */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#080b07]/80 backdrop-blur-xl border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#d6ae68]">
                  Elettaria Cardamomum
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#526b32]/40 text-[#a4c478] border border-[#526b32]/50">
                  Grade: AGEB
                </span>
              </div>
              <p className="text-xs text-white/70">
                Pristine single-origin green pod harvested in the Cardamom Hills, Idukki District.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex flex-col items-center justify-center pt-8 z-10">
        <button
          onClick={scrollToCanvas}
          className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
          aria-label="Scroll to discover"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-[#d6ae68] transition-colors">
            SCROLL TO DISCOVER
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 group-hover:border-[#d6ae68] flex items-start justify-center p-1 transition-colors">
            <span className="w-1 h-2 rounded-full bg-[#d6ae68] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
