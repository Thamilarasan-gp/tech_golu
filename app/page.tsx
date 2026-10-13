"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getBrowserSupabase } from "@/lib/supabase";
import { ASHTA_LAKSHMI_STORIES, getLakshmiById, LakshmiStory } from "@/lib/ashtaLakshmi";
import { Radio, Volume2, VolumeX, Sparkles, BookOpen, ChevronLeft, ChevronRight, Menu } from "lucide-react";

export default function AshtaLakshmiExperience() {
  const [activeId, setActiveId] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("9:41");
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<OscillatorNode[]>([]);

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "")
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  // 1. Initial fetch from Supabase
  useEffect(() => {
    const supabase = getBrowserSupabase();

    async function fetchCurrentState() {
      try {
        const { data, error } = await supabase
          .from("golu_state")
          .select("doll_id")
          .eq("id", 1)
          .single();

        if (!error && data?.doll_id) {
          const id = Number(data.doll_id);
          if (id >= 1 && id <= 8) {
            setActiveId(id);
            setSelectedId(id);
          }
        }
      } catch (err) {
        console.warn("Could not fetch state:", err);
      }
    }

    fetchCurrentState();

    // 2. Realtime WebSocket subscription
    const channel = supabase
      .channel("golu-live-ashta-lakshmi")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "golu_state",
          filter: "id=eq.1"
        },
        (payload) => {
          if (payload.new && "doll_id" in payload.new) {
            const newDollId = Number(payload.new.doll_id);
            if (newDollId >= 1 && newDollId <= 8) {
              setActiveId(newDollId);
              // Automatically switch the story screen to the lit doll
              setSelectedId(newDollId);
            }
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const currentDoll: LakshmiStory = getLakshmiById(selectedId);

  // Synthesize soft ambient temple tanpura drone & bell harmonics
  const toggleBGM = () => {
    if (isPlayingAudio) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Sacred Tanpura chord frequencies (Sa - Pa - Sa root notes: C3 130.81Hz, G3 196Hz, C4 261.63Hz)
      const freqs = [130.81, 196.0, 261.63, 523.25];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle breathing pulsation
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        oscillatorNodesRef.current.push(osc);
      });

      setIsPlayingAudio(true);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handlePrev = () => {
    setSelectedId((prev) => (prev === 1 ? 8 : prev - 1));
  };

  const handleNext = () => {
    setSelectedId((prev) => (prev === 8 ? 1 : prev + 1));
  };

  return (
    <div className="phone-frame">
      {/* Top Status Bar */}
      <header className="status-bar">
        <div className="status-left flex items-center gap-2">
          <span>{currentTime}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="lotus-header-icon" title="Navarathri Divine Presence">🪷</span>
          <div className="live-pill" title={isConnected ? "Hardware Feed Connected" : "Connecting..."}>
            <span className={`live-dot ${!isConnected ? "opacity-50" : ""}`} />
            <span>{isConnected ? "Live IoT" : "Syncing"}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-[#D4AF37]">
            #{currentDoll.id}
          </span>
          <Menu className="w-3.5 h-3.5 opacity-80" />
        </div>
      </header>

      {/* Main Image Showcase */}
      <div className="image-container">
        <Image
          src={currentDoll.image}
          alt={currentDoll.name}
          width={400}
          height={520}
          className="lakshmi-image"
          priority
        />
        {/* Hardware Lit Badge */}
        {activeId === currentDoll.id && (
          <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#0A0F0D] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#0A0F0D]" />
            <span>Lit On Golu</span>
          </div>
        )}
      </div>

      {/* Title & Tamil Identity */}
      <section className="title-section">
        <h1 className="lakshmi-english-title">{currentDoll.name}</h1>
        <h2 className="lakshmi-tamil-title tamil-text">{currentDoll.tamilName}</h2>
        <div className="gold-divider">
          <span>🪷</span>
        </div>
      </section>

      {/* Dual Language Story Cards */}
      <section className="bilingual-grid">
        {/* English Story Card */}
        <article className="lang-card">
          <span className="lang-badge">English</span>
          <p className="lang-text">{currentDoll.englishSummary}</p>
        </article>

        {/* Tamil Story Card */}
        <article className="lang-card">
          <span className="lang-badge">தமிழ்</span>
          <p className="lang-text tamil-text">{currentDoll.tamilSummary}</p>
        </article>
      </section>

      {/* Actions: BGM & Audio */}
      <div className="actions-bar">
        <button
          onClick={handlePrev}
          className="p-1 text-[#D4AF37] hover:text-white transition-colors"
          title="Previous Lakshmi"
          aria-label="Previous Lakshmi"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={toggleBGM}
          className={`bgm-button ${isPlayingAudio ? "active" : ""}`}
          aria-label="Toggle Temple Ambient BGM"
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>BGM OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>🎵 BGM ON</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-1 text-[#D4AF37] hover:text-white transition-colors"
          title="Next Lakshmi"
          aria-label="Next Lakshmi"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Expandable Cultural Lore & Sloka */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="details-toggle"
      >
        {showDetails ? "▲ Hide Deep Story & Sloka" : "▼ Read Cultural Story & Sloka"}
      </button>

      {showDetails && (
        <div className="details-card">
          <p className="mb-2 leading-relaxed">{currentDoll.detailedStory}</p>
          <p className="tamil-text leading-relaxed text-[#E5E7EB] opacity-90">{currentDoll.tamilDetailed}</p>
          <div className="sloka-box">
            <p>"{currentDoll.sloka}"</p>
            <p className="text-[9.5px] text-[#D1D5DB] font-sans mt-0.5 opacity-80 font-normal">
              — {currentDoll.slokaMeaning}
            </p>
          </div>
        </div>
      )}

      {/* 8-Doll Rapid Selector Strip */}
      <div className="doll-strip" title="Select or preview any Lakshmi form">
        {ASHTA_LAKSHMI_STORIES.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`strip-item ${selectedId === item.id ? "active" : ""} ${
              activeId === item.id ? "ring-2 ring-emerald-400" : ""
            }`}
            title={`${item.id}: ${item.name} (${item.tamilName}) ${
              activeId === item.id ? "• Physically Lit Now" : ""
            }`}
          >
            {item.id}
          </button>
        ))}
      </div>

      {/* Footer Tag */}
      <footer className="footer-tag">
        <span className="footer-lotus">🪷</span>
        <span>Navarathri Tales</span>
      </footer>
    </div>
  );
}
