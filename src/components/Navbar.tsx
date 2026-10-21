"use client";

import React, { useState, useEffect } from "react";
import { AudioAtmosphere } from "./AudioAtmosphere";
import { Menu, X, ArrowRight, Leaf } from "lucide-react";

interface NavbarProps {
  onOpenTradeModal: () => void;
}

export function Navbar({ onOpenTradeModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-[#162E22] ${
        isScrolled
          ? "py-1.5 bg-[#F5F5F0]/95 backdrop-blur-xl border-b border-[#E2DFD6] shadow-sm"
          : "py-2 sm:py-2.5 bg-[#F5F5F0] border-b border-[#E2DFD6]/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo (Ultra-Compact) */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-[#162E22] text-[#F5F5F0] flex items-center justify-center shadow-sm transition-all group-hover:scale-105 shrink-0">
            <Leaf className="w-3 h-3 fill-current" />
          </div>
          <div>
            <span className="block font-sans font-black tracking-[0.14em] text-[#162E22] text-xs leading-none uppercase">
              MATTAMUNDAYIL
            </span>
            <span className="block font-sans text-[7.5px] uppercase tracking-[0.22em] text-[#3D5C4C] font-extrabold mt-0.5">
              Cardamom Reserve
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Compact & Streamlined) */}
        <nav className="hidden lg:flex items-center gap-4 text-[10.5px] font-sans font-extrabold uppercase tracking-[0.11em] text-[#2E4E3D]">
          <a
            href="#scrollytelling-journey"
            className="text-[#162E22] font-black hover:opacity-85 transition-opacity relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#162E22]"
          >
            Home
          </a>
          <span className="text-[#162E22]/20 text-[7px]">•</span>
          <a
            href="#scrollytelling-journey"
            className="hover:text-[#162E22] transition-colors"
          >
            Journey
          </a>
          <span className="text-[#162E22]/20 text-[7px]">•</span>
          <a
            href="#quality-grading"
            className="hover:text-[#162E22] transition-colors"
          >
            Quality &amp; Sizing
          </a>
          <span className="text-[#162E22]/20 text-[7px]">•</span>
          <a
            href="#global-trade"
            className="hover:text-[#162E22] transition-colors"
          >
            Global Trade
          </a>
          <span className="text-[#162E22]/20 text-[7px]">•</span>
          <a
            href="#specifications"
            className="hover:text-[#162E22] transition-colors"
          >
            Specifications
          </a>
        </nav>

        {/* Right Action Icons & Button (Slimmer) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <AudioAtmosphere variant="light" />

          <button
            onClick={onOpenTradeModal}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-black font-sans uppercase tracking-[0.11em] bg-[#162E22] hover:bg-[#0E1E16] text-[#F5F5F0] shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>Quote / Trade</span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#F5F5F0] text-[#162E22] flex items-center justify-center text-[8px] font-black">
              →
            </span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <AudioAtmosphere variant="light" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#162E22] hover:text-[#0E1E16] focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F5F5F0] border-b border-[#E2DFD6] px-6 py-6 transition-all shadow-xl">
          <nav className="flex flex-col gap-4 text-xs font-sans uppercase tracking-[0.16em] text-[#162E22] mb-6 font-extrabold">
            <a
              href="#scrollytelling-journey"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-[#162E22]/15 hover:opacity-75"
            >
              01 // HOME &amp; JOURNEY
            </a>
            <a
              href="#quality-grading"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-[#162E22]/15 hover:opacity-75"
            >
              02 // QUALITY &amp; SIZING
            </a>
            <a
              href="#global-trade"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-[#162E22]/15 hover:opacity-75"
            >
              03 // GLOBAL TRADE
            </a>
            <a
              href="#specifications"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-[#162E22]/15 hover:opacity-75"
            >
              04 // COMMERCIAL SPECS
            </a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTradeModal();
            }}
            className="w-full py-3.5 rounded-full text-center text-xs font-sans uppercase tracking-[0.16em] bg-[#162E22] text-[#F5F5F0] font-black shadow-md"
          >
            Request Export Quote
          </button>
        </div>
      )}
    </header>
  );
}
