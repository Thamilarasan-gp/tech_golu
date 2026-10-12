"use client";

import React from "react";
import { Sparkles, QrCode, BookOpen, Flame } from "lucide-react";
import { LiveStatus, ConnectionStatus } from "./LiveStatus";

interface GoluHeaderProps {
  status: ConnectionStatus;
  lastUpdated?: Date | null;
  onRefresh?: () => void;
  activeDollName?: string;
}

export function GoluHeader({ status, lastUpdated, onRefresh, activeDollName }: GoluHeaderProps) {
  return (
    <header className="relative pt-6 pb-4 border-b border-[rgba(107,29,47,0.12)] bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="container">
        {/* Top bar with Festival Tag and Live Connection indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9EBEF] text-[#6B1D2F] border border-[rgba(107,29,47,0.2)]">
              <Flame className="w-3.5 h-3.5 text-[#E26D39] diya-flame" />
              <span>Navaratri Mahotsavam</span>
            </span>

            {activeDollName && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFF9ED] text-[#8C6A0A] border border-[rgba(197,155,39,0.3)]">
                <Sparkles className="w-3 h-3 text-[#C59B27]" />
                <span>Currently Lit: <strong>{activeDollName}</strong></span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <LiveStatus status={status} lastUpdated={lastUpdated} onRefresh={onRefresh} />
          </div>
        </div>

        {/* Hero Branding */}
        <div className="text-center py-2 md:py-4">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-6 md:w-12 h-px bg-gradient-to-r from-transparent to-[#C59B27]" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4A1220] font-serif uppercase">
              Smart Golu
            </h1>
            <span className="w-6 md:w-12 h-px bg-gradient-to-l from-transparent to-[#C59B27]" />
          </div>

          <p className="text-sm sm:text-base md:text-lg font-medium text-[#C59B27] tracking-wider uppercase font-serif mb-2">
            Tradition meets technology
          </p>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#5E524D] leading-relaxed">
            Welcome to the interactive digital Navaratri Golu. As our hardware lights illuminate each traditional doll on the sacred steps, the story, symbolism, and spiritual lore unfold live on your screen.
          </p>

          {/* Quick Anchor Navigation */}
          <nav className="flex items-center justify-center gap-3 sm:gap-6 mt-4 pt-3 border-t border-[rgba(197,155,39,0.2)] text-xs sm:text-sm font-semibold">
            <a
              href="#live-story"
              className="inline-flex items-center gap-1.5 text-[#6B1D2F] hover:text-[#4A1220] hover:underline transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#C59B27]" />
              <span>Live Story</span>
            </a>

            <a
              href="#explore-golu"
              className="inline-flex items-center gap-1.5 text-[#6B1D2F] hover:text-[#4A1220] hover:underline transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span>All 8 Dolls</span>
            </a>

            <a
              href="#qr-section"
              className="inline-flex items-center gap-1.5 text-[#6B1D2F] hover:text-[#4A1220] hover:underline transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#C59B27]" />
              <span>Scan QR Code</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
