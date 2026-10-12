"use client";

import React, { useState, useEffect } from "react";
import {
  Flame,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Info,
  Heart,
  Scroll,
  HelpCircle
} from "lucide-react";
import { DollStory as DollStoryType, GOLU_DOLLS } from "@/lib/stories";
import { DollArt } from "./DollArt";

interface DollStoryProps {
  doll: DollStoryType;
  isActiveOnHardware: boolean;
  onNavigate: (newId: number) => void;
}

export function DollStory({ doll, isActiveOnHardware, onNavigate }: DollStoryProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Stop speech synthesis when changing dolls
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [doll.id]);

  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = `${doll.name}. ${doll.tamilName}. ${doll.title}. ${doll.summary}. ${doll.fullStory.join(" ")}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handlePrev = () => {
    const prevId = doll.id === 1 ? 8 : doll.id - 1;
    onNavigate(prevId);
  };

  const handleNext = () => {
    const nextId = doll.id === 8 ? 1 : doll.id + 1;
    onNavigate(nextId);
  };

  return (
    <article
      id="live-story"
      className="py-10 md:py-14 bg-white/70"
      aria-label={`Story of ${doll.name}`}
    >
      <div className="container max-w-5xl">
        {/* Navigation & Active Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[rgba(107,29,47,0.1)]">
          <div className="flex items-center gap-2">
            {isActiveOnHardware ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFF9ED] text-[#8C6A0A] border border-[#D4AF37] shadow-xs">
                <Flame className="w-4 h-4 text-[#E26D39] diya-flame" />
                <span>Physical Golu Light Lit Now</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5EFE6] text-[#5E524D] border border-gray-200">
                <Info className="w-3.5 h-3.5 text-[#85766F]" />
                <span>Browsing Exhibition Record</span>
              </span>
            )}

            <span className="text-xs text-[#85766F] font-serif font-bold">
              {doll.padiTier}
            </span>
          </div>

          {/* Previous / Next doll buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[rgba(107,29,47,0.15)] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#4A1220] transition-colors"
              aria-label="Previous Doll"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous Doll</span>
            </button>

            <span className="text-xs font-bold text-[#8C6A0A] px-2">
              {doll.id} / 8
            </span>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[rgba(107,29,47,0.15)] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#4A1220] transition-colors"
              aria-label="Next Doll"
            >
              <span className="hidden sm:inline">Next Doll</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Section: Artwork & Titles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-10">
          {/* Large Doll Artwork */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FDF5DF]/60 border-2 border-[#D4AF37]/50 shadow-md">
              <DollArt dollId={doll.id} size="lg" className="mx-auto" />

              {/* Decorative Corner Kolam accents */}
              <div className="absolute top-3 left-3 text-xs text-[#C59B27]/40 font-serif">✦</div>
              <div className="absolute top-3 right-3 text-xs text-[#C59B27]/40 font-serif">✦</div>
              <div className="absolute bottom-3 left-3 text-xs text-[#C59B27]/40 font-serif">✦</div>
              <div className="absolute bottom-3 right-3 text-xs text-[#C59B27]/40 font-serif">✦</div>
            </div>

            {/* Audio Story button */}
            {speechSupported && (
              <button
                onClick={toggleSpeech}
                className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all shadow-xs ${
                  isPlayingAudio
                    ? "bg-[#6B1D2F] text-white"
                    : "bg-[#FFF9ED] text-[#8C6A0A] border border-[#D4AF37] hover:bg-[#FDF5DF]"
                }`}
                aria-label={isPlayingAudio ? "Stop reading story aloud" : "Listen to story narration"}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white animate-pulse" />
                    <span>Stop Story Narration</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#C59B27]" />
                    <span>Listen to Story (Audio)</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Titles & Significance */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6A0A] bg-[#FFF9ED] px-2.5 py-0.5 rounded-md border border-[#D4AF37]/30">
                Doll #{doll.id}
              </span>
              <span className="text-xs font-medium text-[#85766F]">
                {doll.category}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4A1220] font-serif leading-tight mb-1">
              {doll.name}
            </h2>

            <p className="text-lg sm:text-xl font-medium text-[#C59B27] mb-3 font-serif">
              {doll.tamilName}
            </p>

            <p className="text-sm font-semibold text-[#8E2323] italic mb-4">
              {doll.title}
            </p>

            {/* Child-Friendly Quick Summary Callout */}
            <div className="p-4 rounded-xl bg-[#F9EBEF] border-l-4 border-[#6B1D2F] mb-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B1D2F] mb-1">
                <Heart className="w-3.5 h-3.5 text-[#E26D39]" />
                <span>Story for Children & Visitors</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A1220] leading-relaxed">
                {doll.summary}
              </p>
            </div>

            {/* Cultural & Spiritual Significance */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E524D] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Spiritual & Cultural Significance</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5E524D] leading-relaxed">
                {doll.significance}
              </p>
            </div>
          </div>
        </div>

        {/* Full Story Narrative Card */}
        <section className="mb-10 p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(107,29,47,0.12)] shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[rgba(107,29,47,0.08)]">
            <BookOpen className="w-5 h-5 text-[#6B1D2F]" />
            <h3 className="text-xl font-bold text-[#4A1220] font-serif">
              The Legend & Cultural Narrative
            </h3>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#241C1A] leading-relaxed">
            {doll.fullStory.map((paragraph, index) => (
              <p key={index} className="text-justify sm:text-left">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Sacred Sloka / Verse */}
          {doll.sloka && (
            <div className="mt-6 pt-5 border-t border-[rgba(197,155,39,0.25)] bg-[#FFFDF9] p-4 rounded-xl border">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6A0A] mb-1">
                <Scroll className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Sacred Navaratri Sloka</span>
              </div>
              <p className="font-serif text-sm sm:text-base text-[#4A1220] font-semibold tracking-wide italic mb-1.5">
                {doll.sloka.verse}
              </p>
              <p className="text-xs text-[#5E524D]">
                <strong>Meaning:</strong> {doll.sloka.meaning}
              </p>
            </div>
          )}
        </section>

        {/* Interesting Facts & Symbolism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interesting Facts */}
          <section className="p-6 rounded-2xl bg-[#FFFDF9] border border-[rgba(197,155,39,0.3)] shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-[#8C6A0A]">
              <HelpCircle className="w-5 h-5 text-[#C59B27]" />
              <h3 className="text-lg font-bold font-serif text-[#4A1220]">
                Did You Know?
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5E524D]">
              {doll.interestingFacts.map((fact, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="text-[#C59B27] font-bold text-sm leading-none shrink-0 mt-0.5">
                    ✦
                  </span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Symbolism Breakdown */}
          <section className="p-6 rounded-2xl bg-[#FFFDF9] border border-[rgba(107,29,47,0.15)] shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-[#6B1D2F]">
              <Sparkles className="w-5 h-5 text-[#E26D39]" />
              <h3 className="text-lg font-bold font-serif text-[#4A1220]">
                Sacred Symbolism
              </h3>
            </div>

            <div className="space-y-3">
              {doll.symbolism.map((item, index) => (
                <div key={index} className="text-xs sm:text-sm">
                  <strong className="text-[#4A1220] block font-semibold mb-0.5">
                    {item.item}
                  </strong>
                  <span className="text-[#5E524D] leading-relaxed block">
                    {item.meaning}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
