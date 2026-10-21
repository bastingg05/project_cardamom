"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollytellingCanvas } from "@/components/ScrollytellingCanvas";
import { GlobalTradeSection } from "@/components/GlobalTradeSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { Footer } from "@/components/Footer";
import { TradePartnershipModal } from "@/components/TradePartnershipModal";

export default function Home() {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#1b5244] text-white selection:bg-white selection:text-[#1f3829]">
      {/* 1. Header with reference theme */}
      <Navbar onOpenTradeModal={() => setIsTradeModalOpen(true)} />

      {/* 2. Scrollytelling Canvas Section with Horizontal Quality Screen transition */}
      <ScrollytellingCanvas onOpenTradeModal={() => setIsTradeModalOpen(true)} />

      {/* 3. Global Trade Section */}
      <GlobalTradeSection onOpenTradeModal={() => setIsTradeModalOpen(true)} />

      {/* 5. Final CTA Section */}
      <FinalCtaSection onOpenTradeModal={() => setIsTradeModalOpen(true)} />

      {/* 6. Footer */}
      <Footer />

      {/* Trade Quotation & Lot Spec Modal */}
      <TradePartnershipModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
      />
    </main>
  );
}
