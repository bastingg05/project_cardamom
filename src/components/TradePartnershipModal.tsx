"use client";

import React, { useState } from "react";
import { X, CheckCircle, Send, ShieldCheck } from "lucide-react";

interface TradePartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TradePartnershipModal({ isOpen, onClose }: TradePartnershipModalProps) {
  const [grade, setGrade] = useState("AGEB (8mm+ Extra Bold)");
  const [quantity, setQuantity] = useState("2MT – 5MT (Consolidated Pallets)");
  const [packaging, setPackaging] = useState("Foil-Lined Moisture-Barrier Jute Sacks (25kg)");
  const [destination, setDestination] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "MCR-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl transition-all">
      <div className="relative w-full max-w-2xl bg-[#1f3829] border border-[#cee9be]/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/20 border border-white mx-auto flex items-center justify-center text-white">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white">
                Inquiry Logged Successfully
              </span>
              <h3 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase">
                Trade Request Received
              </h3>
              <p className="text-sm text-white/80 max-w-md mx-auto font-sans leading-relaxed">
                Thank you, {contactName || "partner"}. Your inquiry for {grade} has been registered with our export coordination desk.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/15 max-w-sm mx-auto font-mono text-xs text-white/80 space-y-1">
              <span className="text-white/40 block">REFERENCE IDENTIFIER</span>
              <span className="text-base text-white font-bold tracking-wider">{referenceId}</span>
              <p className="text-[10px] text-white/50 mt-1">
                A formal proforma specification and current market price quote will be dispatched within 12 business hours.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full gold-pill-btn text-xs font-mono uppercase tracking-widest cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#cee9be]">
                COMMERCIAL EXPORT DESK
              </div>
              <h3 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase">
                Request Trade Quotation
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-sans">
                Submit your destination requirements, desired grade, and quantity. We supply commercial buyers, extractors, and international spice distributors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  Cardamom Grade Required
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#162b1a] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
                >
                  <option value="AGEB (8mm+ Extra Bold)">AGEB (8mm+ Extra Bold)</option>
                  <option value="AGB (7.5mm – 7.9mm Bold)">AGB (7.5mm – 7.9mm Bold)</option>
                  <option value="AGS (7.0mm – 7.4mm Superior)">AGS (7.0mm – 7.4mm Superior)</option>
                  <option value="Decorticated Cardamom Seeds">Decorticated Cardamom Seeds</option>
                  <option value="Custom Plantation Blend">Custom Plantation Blend</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  Estimated Volume / Lot Size
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#162b1a] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
                >
                  <option value="Sample Pack (1kg - 5kg Verification)">Sample Pack (1kg – 5kg Verification)</option>
                  <option value="500kg – 1 Metric Ton (LCL Air/Sea)">500kg – 1 Metric Ton (LCL)</option>
                  <option value="2MT – 5MT (Consolidated Pallets)">2MT – 5MT (Consolidated Pallets)</option>
                  <option value="10MT – 20MT (Full 20ft Container)">10MT – 20MT (Full 20ft Container FCL)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Fayez Spice Trading Co."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#162b1a] border border-white/15 text-white text-sm placeholder:text-white/30 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#162b1a] border border-white/15 text-white text-sm placeholder:text-white/30 focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  Business Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="procurement@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#162b1a] border border-white/15 text-white text-sm placeholder:text-white/30 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  Destination Port / Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jebel Ali / Hamburg / New York"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#162b1a] border border-white/15 text-white text-sm placeholder:text-white/30 focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                Custom Specifications or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention specific moisture tolerances, private labeling preferences, or courier sample requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#162b1a] border border-white/15 text-white text-sm placeholder:text-white/30 focus:border-white focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#cee9be]">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                Direct Plantation Dispatch
              </span>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full gold-pill-btn text-[#1f3829] font-black text-xs font-mono uppercase tracking-widest shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>Submit Trade Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
