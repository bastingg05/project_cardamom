"use client";

import React from "react";
import { Globe, Anchor, Plane, ShieldCheck, ArrowRight, Check } from "lucide-react";

interface GlobalTradeSectionProps {
  onOpenTradeModal: () => void;
}

export function GlobalTradeSection({ onOpenTradeModal }: GlobalTradeSectionProps) {
  return (
    <section id="global-trade" className="relative py-28 px-6 sm:px-12 bg-[#28574c] text-white overflow-hidden">
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-grain-lightgreen opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#cee9be]">
            A LOCAL TREASURE. A GLOBAL CONNECTION.
          </div>

          <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight uppercase leading-tight text-[#cee9be]">
            CONNECTING KERALA TO <span className="text-[#cee9be]">GLOBAL MARKETS</span>
          </h2>

          <p className="text-lg text-white/85 font-sans leading-relaxed">
            We work to connect premium cardamom sourcing with buyers seeking consistency, quality, and dependable trade relationships across international markets.
          </p>
        </div>

        {/* Global Logistics Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sourcing to Port Flow Timeline Card */}
          <div className="lg:col-span-7 bg-[#1f3829] p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                Export Supply Chain
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-black uppercase text-white">
                From Mountain Plantation to Port of Loading
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                A streamlined export corridor designed to preserve freshness, volatile essential oils, and shell vibrancy throughout transit.
              </p>
            </div>

            {/* Stages */}
            <div className="space-y-6 relative border-l-2 border-[#cee9be]/30 ml-3 pl-6 my-4">
              {[
                {
                  step: "01",
                  title: "High-Altitude Sourcing & Curing",
                  desc: "Harvested across the Cardamom Hills at peak density and cured under controlled humidity to prevent bleaching.",
                },
                {
                  step: "02",
                  title: "Precision Cleaning & Calibrated Grading",
                  desc: "Mechanical destoners, aspirators, and multi-deck sizing sieves produce uniform AGEB 8mm+, AGB, and AGS lots.",
                },
                {
                  step: "03",
                  title: "Barrier Packaging & Pre-Shipment Inspection",
                  desc: "Sealed in multi-layer moisture-barrier bags with optional nitrogen flushing, packed in clean traditional export jute sacks.",
                },
                {
                  step: "04",
                  title: "Direct Gateway Dispatch via Cochin Hub",
                  desc: "Consolidated at Cochin Seaport for FCL/LCL ocean freight or dispatched via Cochin International Airport Air Cargo.",
                },
              ].map((stage) => (
                <div key={stage.step} className="relative group">
                  <span className="absolute -left-[32px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#1f3829] shadow group-hover:scale-125 transition-transform" />
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white font-bold">STAGE {stage.step}</span>
                    <h4 className="font-sans text-base sm:text-lg text-white font-bold uppercase">
                      {stage.title}
                    </h4>
                  </div>
                  <p className="text-xs text-white/75 mt-1 leading-relaxed font-sans">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Ports Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/25 border border-white/10">
                <Anchor className="w-4 h-4 text-white" />
                <div>
                  <span className="text-white/50 block text-[10px] font-bold">SEA FREIGHT</span>
                  <span className="text-white font-bold">Cochin Port (INCOK)</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/25 border border-white/10">
                <Plane className="w-4 h-4 text-[#cee9be]" />
                <div>
                  <span className="text-white/50 block text-[10px] font-bold">AIR FREIGHT</span>
                  <span className="text-white font-bold">Cochin Air Cargo (COK)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Compliance & Trade Capabilities Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#1f3829] border border-white/15 shadow-2xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#cee9be] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#cee9be]" />
                <span>Trade Documentation</span>
              </div>

              <h3 className="font-sans text-2xl text-white font-black uppercase">
                Export Documentation
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-white/85">
                {[
                  "Spices Board of India Certificate of Origin",
                  "Phytosanitary Health & Safety Certificate",
                  "Certificate of Analysis (Moisture & Volatile Oil)",
                  "Customized Commercial Invoice & Packing List",
                  "Bill of Lading / Airway Bill Coordination",
                  "Fumigation & Pest-Free Certification",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discuss Requirements CTA Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1b5244] to-[#1f3829] text-white border border-[#cee9be]/30 space-y-4 shadow-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-white block font-bold">
                Trade Desk
              </span>
              <h4 className="font-sans text-2xl text-white font-black uppercase">
                Discuss Sourcing Requirements
              </h4>
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                Connect directly with our trade team to review current harvest lots, container allocations, and technical delivery terms.
              </p>
              <button
                onClick={onOpenTradeModal}
                className="w-full py-3.5 px-6 rounded-full gold-pill-btn text-[#1f3829] font-black text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Discuss Your Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
