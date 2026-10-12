"use client";

import React from "react";
import { GOLU_DOLLS, DollStory } from "@/lib/stories";
import { DollCard } from "./DollCard";
import { Flame, Sparkles } from "lucide-react";

interface DollGridProps {
  activeDollId: number;
  previewDollId: number;
  onSelectDoll: (doll: DollStory) => void;
}

export function DollGrid({ activeDollId, previewDollId, onSelectDoll }: DollGridProps) {
  const activeDoll = GOLU_DOLLS.find((d) => d.id === activeDollId) || GOLU_DOLLS[0];

  return (
    <section id="explore-golu" className="py-12 md:py-16 bg-[#F5EFE6]/60 border-y border-[rgba(107,29,47,0.08)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF9ED] border border-[rgba(197,155,39,0.3)] text-xs font-bold text-[#8C6A0A] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Sacred Steps Exhibition</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4A1220] font-serif mb-3">
            Explore the Golu
          </h2>

          <p className="text-xs sm:text-sm text-[#5E524D] leading-relaxed">
            Arranged across traditional tiers representing the ascent from earthly life to divine enlightenment. Tap any doll to explore its cultural heritage, or watch the screen automatically illuminate when the hardware activates a doll on the physical steps.
          </p>

          {/* Real-time Hardware Indicator Box */}
          <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-[rgba(197,155,39,0.4)] shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-[#8C6A0A] font-semibold">
              <Flame className="w-4 h-4 text-[#E26D39] diya-flame" />
              <span>Physical Hardware Focus:</span>
            </div>
            <span className="text-xs font-bold text-[#4A1220] px-2.5 py-0.5 rounded-md bg-[#FFF9ED] border border-[#D4AF37]/40">
              Doll #{activeDoll.id}: {activeDoll.name}
            </span>
          </div>
        </div>

        {/* 8-Doll Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GOLU_DOLLS.map((doll) => (
            <DollCard
              key={doll.id}
              doll={doll}
              isActive={doll.id === activeDollId}
              isPreviewing={doll.id === previewDollId}
              onSelect={onSelectDoll}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
