"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioAtmosphereProps {
  variant?: "gold" | "dark" | "light";
}

export function AudioAtmosphere({ variant = "gold" }: AudioAtmosphereProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  const toggleAudio = async () => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Generate a soothing, organic mountain wind ambient
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = lastOut * 0.95 + white * 0.05;
        data[i] = lastOut;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(110, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.08, ctx.currentTime);

      noise.connect(filter);
      filter.connect(masterGain);
      osc.connect(oscGain);
      oscGain.connect(masterGain);

      noise.start();
      osc.start();
      noiseSourceRef.current = noise;
    }

    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 1.2
        );
      }
      setIsPlaying(false);
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.18,
          audioCtxRef.current.currentTime + 1.5
        );
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const isLight = variant === "light";
  const isGold = variant === "gold";

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute Western Ghats atmosphere" : "Listen to Western Ghats atmosphere"}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
        isLight
          ? "border border-[#1B3B2B]/20 bg-[#1B3B2B]/5 hover:bg-[#1B3B2B]/10 text-[#1B3B2B]"
          : isGold
          ? "border border-[#1a2315]/25 bg-[#1a2315]/10 hover:bg-[#1a2315]/20 text-[#1a2315]"
          : "border border-white/20 bg-white/10 hover:bg-white/20 text-white"
      }`}
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLight ? "bg-[#1B3B2B]" : isGold ? "bg-[#1a2315]" : "bg-white"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isLight ? "bg-[#1B3B2B]" : isGold ? "bg-[#1a2315]" : "bg-white"
              }`}
            ></span>
          </span>
          <Volume2 className={`w-3.5 h-3.5 ${isLight ? "text-[#1B3B2B]" : isGold ? "text-[#1a2315]" : "text-white"}`} />
          <span className={`text-[10px] tracking-wider font-black ${isLight ? "text-[#1B3B2B]" : isGold ? "text-[#1a2315]" : "text-white"}`}>
            AUDIO ON
          </span>
        </>
      ) : (
        <>
          <VolumeX
            className={`w-3.5 h-3.5 transition-colors ${
              isLight ? "text-[#1B3B2B]/60 group-hover:text-[#1B3B2B]" : isGold ? "text-[#1a2315]/70 group-hover:text-[#1a2315]" : "text-white/70 group-hover:text-white"
            }`}
          />
          <span
            className={`text-[10px] tracking-wider transition-colors ${
              isLight ? "text-[#1B3B2B]/80 group-hover:text-[#1B3B2B]" : isGold ? "text-[#1a2315]/85 group-hover:text-[#1a2315]" : "text-white/80 group-hover:text-white"
            }`}
          >
            AMBIENT SOUND
          </span>
        </>
      )}
    </button>
  );
}
