"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Mail, MapPin } from "lucide-react";

interface FinalCtaSectionProps {
  onOpenTradeModal: () => void;
}

export function FinalCtaSection({ onOpenTradeModal }: FinalCtaSectionProps) {
  return (
    <section className="relative py-28 px-6 sm:px-12 bg-[#ebf5e7] text-[#1f3829] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#1f3829] text-white border border-[#cee9be]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Column: Visual of Settled Overflowing Jute Sack (Frame 300) */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-[580px] w-full">
            <Image
              src="/frames/ezgif-frame-300.jpg"
              alt="Overflowing burlap sack filled with freshly harvested Kerala green cardamom"
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-center"
            />
            {/* Gradient Feathering */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#1f3829]/30 to-[#1f3829]" />
            <div className="absolute top-6 left-6 p-3 rounded-xl bg-[#1f3829]/90 backdrop-blur-md border border-white/20">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white block font-bold">
                Harvest Lot #2026-MG
              </span>
              <span className="font-sans text-sm font-bold text-white uppercase">Alleppey Green Extra Bold</span>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Trade CTAs */}
          <div className="lg:col-span-7 p-8 sm:p-14 lg:p-16 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#cee9be]">
                DIRECT EXPORT PARTNERSHIP
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-[#cee9be] tracking-tighter uppercase leading-[0.94]">
                EXCEPTIONAL CARDAMOM <br />
                <span className="text-[#cee9be]">BEGINS WITH US</span>
              </h2>

              <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-xl">
                Connect with our commercial desk to discuss container allocations, grade specifications, and trade delivery terms.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenTradeModal}
                className="group px-8 py-4 rounded-full gold-pill-btn text-xs font-mono uppercase tracking-widest shadow-xl shadow-white/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenTradeModal}
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                <span>Contact Our Team</span>
              </button>
            </div>

            {/* Verification Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/15 text-xs font-mono text-white/80">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span>Cardamom Hills, Idukki &amp; Wayanad, Kerala</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#cee9be] shrink-0" />
                <span>trade@mattamundayilcardamom.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
