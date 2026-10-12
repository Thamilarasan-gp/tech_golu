"use client";

import React from "react";
import { Flame, Sparkles, ChevronRight } from "lucide-react";
import { DollStory } from "@/lib/stories";
import { DollArt } from "./DollArt";

interface DollCardProps {
  doll: DollStory;
  isActive: boolean;
  isPreviewing?: boolean;
  onSelect: (doll: DollStory) => void;
}

export function DollCard({ doll, isActive, isPreviewing, onSelect }: DollCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(doll)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(doll);
        }
      }}
      className={`group relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
        isActive
          ? "bg-[#FFF9ED] border-2 border-[#D4AF37] shadow-lg ring-2 ring-[#C59B27]/30 scale-[1.02]"
          : isPreviewing
          ? "bg-white border-2 border-[#6B1D2F]/40 shadow-md"
          : "bg-white border border-[rgba(107,29,47,0.12)] hover:border-[rgba(197,155,39,0.5)] shadow-xs hover:shadow-md hover:-translate-y-1"
      }`}
      aria-label={`Doll ${doll.id}: ${doll.name}. ${isActive ? "Currently lit on Golu." : ""}`}
    >
      {/* Top Banner for Active state */}
      {isActive && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-[#C59B27] to-[#E26D39] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-bl-xl shadow-xs flex items-center gap-1">
          <Flame className="w-3 h-3 text-yellow-200 diya-flame" />
          <span>Lit on Golu</span>
        </div>
      )}

      {isPreviewing && !isActive && (
        <div className="absolute top-0 right-0 bg-[#6B1D2F] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-bl-xl">
          <span>Reading</span>
        </div>
      )}

      {/* Card Header with Step Number & Padi Tier */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className="text-xs font-bold font-serif px-2.5 py-0.5 rounded-md"
          style={{
            backgroundColor: isActive ? "#FDF5DF" : "#F5EFE6",
            color: isActive ? "#8C6A0A" : "#6B1D2F"
          }}
        >
          STEP #{doll.id.toString().padStart(2, "0")}
        </span>

        <span className="text-[11px] font-medium text-[#85766F] truncate max-w-[130px]">
          {doll.category}
        </span>
      </div>

      {/* Artwork and Identity */}
      <div className="flex items-center gap-3.5 mb-3">
        <div className="relative shrink-0">
          <DollArt dollId={doll.id} size="sm" className="w-14 h-14" />
          {isActive && (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C59B27] items-center justify-center text-[9px] text-white font-bold">
                ★
              </span>
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-[#4A1220] font-serif leading-snug group-hover:text-[#6B1D2F] transition-colors truncate">
            {doll.name}
          </h3>
          <p className="text-xs text-[#C59B27] font-medium truncate">
            {doll.tamilName}
          </p>
          <p className="text-[11px] text-[#85766F] mt-0.5 truncate">
            {doll.padiTier}
          </p>
        </div>
      </div>

      {/* Brief Summary */}
      <p className="text-xs text-[#5E524D] line-clamp-2 leading-relaxed mb-3">
        {doll.summary}
      </p>

      {/* Card Footer action */}
      <div className="pt-2 border-t border-[rgba(107,29,47,0.06)] flex items-center justify-between text-xs">
        <span className="text-[11px] font-semibold text-[#8C6A0A] inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#C59B27]" />
          {doll.themeTag}
        </span>

        <span
          className={`font-semibold inline-flex items-center gap-0.5 transition-colors ${
            isActive ? "text-[#C59B27]" : "text-[#6B1D2F] group-hover:text-[#4A1220]"
          }`}
        >
          <span>{isActive ? "Viewing Live" : "Read Story"}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
}
