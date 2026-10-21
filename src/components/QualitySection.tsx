"use client";

import React, { useState } from "react";
import { Sliders, Layers, Package, Globe, Leaf, ShieldCheck } from "lucide-react";

interface GradeSpec {
  grade: string;
  fullName: string;
  diameter: string;
  bulkDensity: string;
  moisture: string;
  oilContent: string;
  characteristics: string;
  recommendedUse: string;
}

const GRADES: GradeSpec[] = [
  {
    grade: "AGEB",
    fullName: "Alleppey Green Extra Bold",
    diameter: "8.0 mm & Above",
    bulkDensity: "435 g/L Min",
    moisture: "9.5% – 10.5% Max",
    oilContent: "8.0% – 8.8% v/w",
    characteristics: "Plump, uniformly mature capsules with deep emerald green skin and intact crown.",
    recommendedUse: "Luxury culinary packaging, Middle Eastern Gahwa coffee blends, high-end retail.",
  },
  {
    grade: "AGB",
    fullName: "Alleppey Green Bold",
    diameter: "7.5 mm to 7.9 mm",
    bulkDensity: "415 g/L Min",
    moisture: "10.0% – 11.0% Max",
    oilContent: "7.5% – 8.2% v/w",
    characteristics: "Consistent size distribution, vivid green color, firm capsule structure.",
    recommendedUse: "Commercial spice blending, European gourmet bakeries, confectionery.",
  },
  {
    grade: "AGS",
    fullName: "Alleppey Green Superior",
    diameter: "7.0 mm to 7.4 mm",
    bulkDensity: "385 g/L Min",
    moisture: "10.5% – 11.5% Max",
    oilContent: "7.0% – 7.8% v/w",
    characteristics: "Medium-sized whole capsules with vibrant natural aroma and dark mature seeds.",
    recommendedUse: "Bulk spice packaging, food processing, culinary extract manufacturing.",
  },
  {
    grade: "SEEDS",
    fullName: "Cardamom Seeds (Decorticated)",
    diameter: "Natural Seed Clusters",
    bulkDensity: "600 g/L Min",
    moisture: "9.0% – 10.0% Max",
    oilContent: "8.5% – 9.5% v/w",
    characteristics: "Pure black and dark brown aromatic seeds extracted from mechanically opened pods.",
    recommendedUse: "Distillation of essential oils, oleoresin extraction, pharmaceutical aroma.",
  },
];

interface QualitySectionProps {
  onOpenTradeModal?: () => void;
}

export function QualitySection({ onOpenTradeModal }: QualitySectionProps) {
  const [selectedGrade, setSelectedGrade] = useState<GradeSpec>(GRADES[0]);

  return (
    <div className="w-full min-h-screen bg-[#ebf5e7] text-[#1f3829] flex flex-col justify-between py-10 sm:py-16 px-6 sm:px-12 lg:px-16 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full space-y-10 my-auto">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#cee9be]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#28574c]">
              <span className="w-2 h-2 rounded-full bg-[#1f3829]" />
              <span>02 // QUALITY &amp; SIZING STANDARDS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-[#1f3829] uppercase leading-[0.95]">
              QUALITY YOU CAN <span className="text-[#48785e]">SEE &amp; VERIFY</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#28574c] font-sans leading-relaxed">
              Every shipment is grounded in systematic sorting, physical grading, and responsible post-harvest handling across Kerala’s premier high-altitude plantations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-white border border-[#cee9be] shadow-sm flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#1f3829]" />
              <div>
                <span className="font-mono text-[10px] text-[#48785e] uppercase tracking-wider block font-bold">
                  Compliance
                </span>
                <span className="font-sans text-xs sm:text-sm text-[#1f3829] font-black uppercase">
                  Spices Board Standards
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars in a streamlined responsive row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
          {[
            {
              icon: Leaf,
              title: "Carefully Sourced",
              desc: "High-altitude shade plantations in Idukki & Wayanad.",
            },
            {
              icon: Sliders,
              title: "Quality Selection",
              desc: "Rotary sieve grading into 7.0mm, 7.5mm, 8.0mm+.",
            },
            {
              icon: Package,
              title: "Barrier Packaging",
              desc: "Multi-layer foil barrier sacks protecting volatile oils.",
            },
            {
              icon: Globe,
              title: "Reliable Trade",
              desc: "Direct coordination from Cochin Port & Airport.",
            },
            {
              icon: Layers,
              title: "Buyer-Focused Supply",
              desc: "Certified batch lots and pre-shipment verification.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`p-4 rounded-2xl bg-white border border-[#cee9be] shadow-sm space-y-2 hover:shadow-md hover:border-[#9ec389] transition-all ${
                i === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#cee9be]/50 border border-[#cee9be] flex items-center justify-center text-[#1f3829]">
                <item.icon className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-sans font-bold text-[#1f3829] uppercase">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#28574c] leading-snug font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Grade Selector & Specifications Card */}
        <div id="specifications" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Grade Selector Tabs */}
          <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#48785e] block font-bold mb-1">
                Calibrated Sieve Classification
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-black uppercase text-[#1f3829]">
                Commercial Export Grades
              </h3>
            </div>

            <div className="space-y-2">
              {GRADES.map((g) => {
                const isSelected = selectedGrade.grade === g.grade;
                return (
                  <button
                    key={g.grade}
                    onClick={() => setSelectedGrade(g)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#1f3829] shadow-md ring-2 ring-[#1f3829]"
                        : "bg-white/70 border-[#cee9be] hover:border-[#9ec389] hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-base font-black text-[#1f3829]">
                          {g.grade}
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#cee9be] text-[#1f3829] font-bold">
                          {g.diameter}
                        </span>
                      </div>
                      <span className="text-xs text-[#48785e] block font-sans mt-0.5">
                        {g.fullName}
                      </span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? "border-[#1f3829] bg-[#1f3829]" : "border-[#cee9be]"
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#cee9be] flex items-center justify-between text-xs font-mono">
              <span className="text-[#48785e]">Selected:</span>
              <span className="font-bold text-[#1f3829]">{selectedGrade.fullName}</span>
            </div>
          </div>

          {/* Grade Detailed Technical Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#cee9be] shadow-xl flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#cee9be] pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#48785e] uppercase tracking-wider block font-bold">
                  Export Grade Profile
                </span>
                <h4 className="font-sans text-2xl sm:text-3xl text-[#1f3829] font-black uppercase mt-0.5">
                  {selectedGrade.fullName}
                </h4>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#ebf5e7] border border-[#cee9be] font-mono text-xs text-[#1f3829] font-black self-start sm:self-auto">
                {selectedGrade.diameter}
              </span>
            </div>

            {/* Spec Attributes Matrix */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#ebf5e7] border border-[#cee9be]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#48785e] block mb-1 font-bold">
                  Bulk Density
                </span>
                <span className="font-sans text-base sm:text-lg text-[#1f3829] font-black block">
                  {selectedGrade.bulkDensity}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#ebf5e7] border border-[#cee9be]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#48785e] block mb-1 font-bold">
                  Moisture Max
                </span>
                <span className="font-sans text-base sm:text-lg text-[#1f3829] font-black block">
                  {selectedGrade.moisture}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#ebf5e7] border border-[#cee9be]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#48785e] block mb-1 font-bold">
                  Essential Oil
                </span>
                <span className="font-sans text-base sm:text-lg text-[#1f3829] font-black block">
                  {selectedGrade.oilContent}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#48785e] font-bold block mb-0.5">
                  Visual &amp; Botanical Characteristics:
                </span>
                <p className="text-[#28574c] leading-relaxed">
                  {selectedGrade.characteristics}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#48785e] font-bold block mb-0.5">
                  Recommended Trade Application:
                </span>
                <p className="text-[#1f3829] font-bold leading-relaxed">
                  {selectedGrade.recommendedUse}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#cee9be] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-[#48785e]">Export Packaging: 5kg, 10kg &amp; 25kg foil sacks</span>
              {onOpenTradeModal && (
                <button
                  onClick={onOpenTradeModal}
                  className="px-4 py-2 rounded-full bg-[#1f3829] hover:bg-[#152e24] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Lot Spec
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
