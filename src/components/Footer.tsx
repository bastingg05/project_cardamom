"use client";

import React from "react";
import { ArrowUp, Compass, Leaf } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#1f3829] text-white border-t border-white/10 pt-20 pb-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#cee9be]/30 border border-[#cee9be]/50 flex items-center justify-center text-[#cee9be]">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-sans font-black text-xl tracking-wider text-white uppercase">
                MATTAMUNDAYIL CARDAMOM
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed max-w-sm">
              Cultivating, selecting, and trading single-origin green cardamom from the misty high-ranges of Kerala&apos;s Western Ghats. Grounded in agricultural integrity and transparent international commerce.
            </p>

            <div className="font-mono text-xs text-[#cee9be] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-white" />
              <span>9.8500° N, 77.1667° E • Western Ghats, Kerala</span>
            </div>
          </div>

          {/* Links: Products */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-white block font-bold">
              Products
            </span>
            <ul className="space-y-2.5 text-xs font-mono text-white/70">
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  AGEB Extra Bold (8mm+)
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  AGB Bold (7.5mm+)
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  AGS Superior (7.0mm)
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  Decorticated Seeds
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  Plantation Grade Blends
                </a>
              </li>
            </ul>
          </div>

          {/* Links: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-white block font-bold">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs font-mono text-white/70">
              <li>
                <a href="#scrollytelling-journey" className="hover:text-white transition-colors">
                  The Story &amp; Journey
                </a>
              </li>
              <li>
                <a href="#quality-grading" className="hover:text-white transition-colors">
                  Quality &amp; Sourcing
                </a>
              </li>
              <li>
                <a href="#global-trade" className="hover:text-white transition-colors">
                  Global Trade &amp; Freight
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  Commercial Specs
                </a>
              </li>
            </ul>
          </div>

          {/* Links: Compliance & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-white block font-bold">
              Trade Desk
            </span>
            <div className="space-y-2 text-xs font-mono text-white/70">
              <p>Cardamom Hills Division, Idukki District, Kerala, India</p>
              <p className="text-white">trade@mattamundayilcardamom.com</p>
              <p className="text-[#cee9be]">Direct Port Dispatch: Cochin (INCOK)</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            © 2026 Mattamundayil Cardamom Reserve. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Export
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
