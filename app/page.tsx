"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getBrowserSupabase } from "@/lib/supabase";
import { ASHTA_LAKSHMI_DATA, getLakshmiDataById, LakshmiStory } from "@/lib/ashtaLakshmi";
import { Play, Pause, Sparkles } from "lucide-react";

export default function SmartGoluHeritageApp() {
  const [activeDollId, setActiveDollId] = useState<number>(2); // Default to Dhana Lakshmi / Maha Lakshmi
  const [selectedDollId, setSelectedDollId] = useState<number>(2);
  const [currentLang, setCurrentLang] = useState<"ta" | "en">("ta");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasAutoplayedRef = useRef<boolean>(false);
  const prevDollIdRef = useRef<number | null>(null);

  const currentLakshmi: LakshmiStory = getLakshmiDataById(selectedDollId);
  const totalDuration = currentLakshmi.durationSeconds || 138;

  // 1. Supabase Realtime synchronization
  useEffect(() => {
    const supabase = getBrowserSupabase();

    async function fetchLiveState() {
      try {
        const { data, error } = await supabase
          .from("golu_state")
          .select("doll_id")
          .eq("id", 1)
          .single();

        if (!error && data?.doll_id) {
          const id = Number(data.doll_id);
          if (id >= 1 && id <= 8) {
            setActiveDollId(id);
            setSelectedDollId(id);
          }
        }
      } catch (err) {
        console.warn("Error fetching Supabase state:", err);
      }
    }

    fetchLiveState();

    const channel = supabase
      .channel("smart-golu-heritage-stream")
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
            const newId = Number(payload.new.doll_id);
            if (newId >= 1 && newId <= 8) {
              setActiveDollId(newId);
              setSelectedDollId(newId);
              // Stop previous speech if switching dolls
              stopAudio();
            }
          }
        }
      )
      .subscribe((status) => {
        setIsLiveConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
      stopAudio();
    };
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Sound generator for pleasant temple bell & tanpura ambient chime
  const playSacredChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Temple bell harmonic frequencies (G4, D5, G5)
      [392.0, 587.33, 783.99].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const startTime = ctx.currentTime + index * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 2.6);
      });
    } catch (e) {
      console.warn("Audio Context chime:", e);
    }
  };

  // Stop audio and speech synthesis
  const stopAudio = () => {
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current.currentTime = 0;
      htmlAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => { });
      audioContextRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsPlaying(false);
    setPlaybackTime(0);
  };

  // Fallback speech narration via Web Speech API
  const speakLakshmiStory = (targetLang: "ta" | "en", lakshmi: LakshmiStory = currentLakshmi) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const textToSpeak =
      targetLang === "ta"
        ? `${lakshmi.tamilName}. ${lakshmi.tamilStory}`
        : `${lakshmi.name}. ${lakshmi.englishStory}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const voices = window.speechSynthesis.getVoices();
    if (targetLang === "ta") {
      const tamilVoice = voices.find((v) => v.lang.toLowerCase().includes("ta"));
      if (tamilVoice) {
        utterance.voice = tamilVoice;
      }
      utterance.lang = "ta-IN";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
    } else {
      const englishVoice = voices.find(
        (v) => v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("en")
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
    }

    utterance.onend = () => {
      stopAudio();
    };

    utterance.onerror = () => {
      stopAudio();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start audio narration & timer using high quality audio streaming
  const startAudioNarration = (
    targetLang: "ta" | "en" = currentLang,
    lakshmi: LakshmiStory = currentLakshmi
  ) => {
    playSacredChime();

    // Clear any previous audio instance
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const textToSpeak =
      targetLang === "ta"
        ? `${lakshmi.tamilName}. ${lakshmi.tamilStory}`
        : `${lakshmi.name}. ${lakshmi.englishStory}`;

    // Play native high-fidelity audio stream from server
    const audioUrl = `/api/tts?lang=${targetLang}&text=${encodeURIComponent(textToSpeak)}`;
    const audio = new Audio(audioUrl);
    htmlAudioRef.current = audio;

    setIsPlaying(true);
    setPlaybackTime(0);

    audio.ontimeupdate = () => {
      setPlaybackTime(Math.floor(audio.currentTime));
    };

    audio.onended = () => {
      stopAudio();
    };

    audio.onerror = () => {
      console.warn("Server TTS audio error, attempting Web Speech fallback...");
      speakLakshmiStory(targetLang, lakshmi);
    };

    audio.play().catch((err) => {
      console.warn("Audio autoplay policy restricted, using speech synthesis fallback:", err);
      speakLakshmiStory(targetLang, lakshmi);
    });
  };

  // 1. Autoplay narration once on initial page load / first visitor gesture
  useEffect(() => {
    let triggered = false;

    const playOnce = () => {
      if (triggered || hasAutoplayedRef.current) return;
      triggered = true;
      hasAutoplayedRef.current = true;
      startAudioNarration(currentLang, currentLakshmi);
    };

    // Direct autoplay attempt after 700ms
    const timer = setTimeout(() => {
      playOnce();
    }, 700);

    // Gesture fallback for browsers enforcing strict user interaction policies
    const handleFirstTouch = () => {
      playOnce();
      window.removeEventListener("click", handleFirstTouch);
      window.removeEventListener("touchstart", handleFirstTouch);
    };

    window.addEventListener("click", handleFirstTouch, { once: true });
    window.addEventListener("touchstart", handleFirstTouch, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleFirstTouch);
      window.removeEventListener("touchstart", handleFirstTouch);
    };
  }, []);

  // 2. Automatically play audio narration whenever deity changes from one to another
  useEffect(() => {
    if (prevDollIdRef.current === null) {
      prevDollIdRef.current = selectedDollId;
      return;
    }

    if (prevDollIdRef.current !== selectedDollId) {
      prevDollIdRef.current = selectedDollId;
      const nextLakshmi = getLakshmiDataById(selectedDollId);
      stopAudio();
      const changeTimer = setTimeout(() => {
        startAudioNarration(currentLang, nextLakshmi);
      }, 400);
      return () => clearTimeout(changeTimer);
    }
  }, [selectedDollId, currentLang]);

  // Main Speaker Play/Pause Handler
  const togglePlayAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudioNarration(currentLang, currentLakshmi);
    }
  };

  // Language toggle handler: immediately updates story text & voice
  const handleLangToggle = (newLang: "ta" | "en") => {
    if (currentLang === newLang) return;
    setCurrentLang(newLang);
    if (isPlaying) {
      startAudioNarration(newLang, currentLakshmi);
    }
  };

  // Progress bar click to seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    const newSecs = Math.round(newProgress * totalDuration);
    setPlaybackTime(newSecs);
    if (htmlAudioRef.current && !isNaN(htmlAudioRef.current.duration)) {
      htmlAudioRef.current.currentTime = Math.min(newSecs, htmlAudioRef.current.duration);
    }
  };

  return (
    <div className="temple-container">
      {/* Decorative Hanging Brass Lamps on borders */}
      <svg className="lamp-border-left" viewBox="0 0 32 160" fill="none">
        <line x1="16" y1="0" x2="16" y2="90" stroke="#C99738" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="16" cy="95" r="7" fill="#C99738" />
        <path d="M8 102 C8 120 24 120 24 102 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="1" />
        <circle cx="16" cy="115" r="4.5" fill="#E26D39" />
        <line x1="16" y1="120" x2="16" y2="155" stroke="#C99738" strokeWidth="1.5" />
      </svg>
      <svg className="lamp-border-right" viewBox="0 0 32 160" fill="none">
        <line x1="16" y1="0" x2="16" y2="90" stroke="#C99738" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="16" cy="95" r="7" fill="#C99738" />
        <path d="M8 102 C8 120 24 120 24 102 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="1" />
        <circle cx="16" cy="115" r="4.5" fill="#E26D39" />
        <line x1="16" y1="120" x2="16" y2="155" stroke="#C99738" strokeWidth="1.5" />
      </svg>

      {/* Top Header Bar */}
      <header className="header-bar">
        <div className="header-left">
          <div className="header-logo-wrapper">
            <Image
              src="/images/smart-golu-tales.png"
              alt="Smart Golu Tales"
              width={150}
              height={74}
              priority
              className="header-brand-logo"
            />
          </div>
        </div>

        {/* Language Switcher */}
        <div className="lang-switcher">
          <button
            onClick={() => handleLangToggle("ta")}
            className={`lang-btn ${currentLang === "ta" ? "active" : "inactive"} tamil-font`}
            aria-label="Switch to Tamil"
          >
            தமிழ்
          </button>
          <button
            onClick={() => handleLangToggle("en")}
            className={`lang-btn ${currentLang === "en" ? "active" : "inactive"}`}
            aria-label="Switch to English"
          >
            English
          </button>
        </div>
      </header>

      {/* Responsive Main Layout Split */}
      <div className="main-layout-split">
        {/* Left Column: Mandapam Arch Deity Image */}
        <div className="layout-col-visual">
          <div className="arch-frame-container">
            <div className="mandapam-arch">
              <Image
                src={currentLakshmi.image}
                alt={currentLakshmi.name}
                width={400}
                height={420}
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Column: Deity Details, Story & Audio Player */}
        <div className="layout-col-content">
          {/* Deity Name Section with Traditional Filigree */}
          <div className="deity-name-section">
            <div className="filigree-row">
              <span className="filigree-flourish">꧁</span>
              <h2 className="deity-tamil-title">
                {currentLang === "ta" ? currentLakshmi.tamilName : currentLakshmi.name}
              </h2>
              <span className="filigree-flourish">꧂</span>
            </div>
            <p className="deity-english-subtitle">
              {currentLang === "ta" ? currentLakshmi.name : currentLakshmi.subtitle}
            </p>
          </div>

          {/* Three Golden Attribute Badges */}
          <div className="badges-row">
            {currentLakshmi.badges.map((badge, idx) => (
              <div key={idx} className="attr-badge">
                <span className="icon">{badge.icon}</span>
                <span className={`text ${currentLang === "ta" ? "tamil-font" : ""}`}>
                  {currentLang === "ta" ? badge.tamil : badge.english}
                </span>
              </div>
            ))}
          </div>

          {/* Traditional Story Scroll Box - Single Language Display */}
          <div className="story-scroll-box">
            {currentLang === "ta" ? (
              <p className="story-tamil-text" key="story-tamil">
                {currentLakshmi.tamilStory}
              </p>
            ) : (
              <p className="story-english-text" key="story-english">
                {currentLakshmi.englishStory}
              </p>
            )}
          </div>

          {/* Audio Player Card with Working Speaker */}
          <div className="audio-player-card">
            <div className="player-main-row">
              {/* Circular Maroon Play/Pause Button */}
              <button
                onClick={togglePlayAudio}
                className={`play-btn ${isPlaying ? "playing" : ""}`}
                title={isPlaying ? "Pause story narration" : "Listen to story narration"}
                aria-label="Play or pause story narration"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white text-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                )}
              </button>

              {/* Player Labels */}
              <div className="player-labels">
                <span className="listen-tamil-title">
                  {currentLang === "ta" ? "கதையைக் கேளுங்கள்" : "Listen to the Story"}
                </span>
                <span className="listen-english-sub">
                  {currentLang === "ta" ? "தமிழ் குரல் ஒலிபரப்பு" : "Voice Narration"}
                </span>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className={`waveform-container ${isPlaying ? "active" : ""}`}>
                {[8, 14, 22, 16, 26, 18, 14, 24, 16, 10].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="wave-bar"
                      style={{
                        height: isPlaying ? undefined : `${h * 0.4}px`
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Interactive Progress Bar & Timestamps */}
            <div className="progress-row">
              <span>{formatTime(playbackTime)}</span>
              <div className="progress-track" onClick={handleSeek}>
                <div
                  className="progress-fill"
                  style={{ width: `${(playbackTime / totalDuration) * 100}%` }}
                />
              </div>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Heritage Footer with Gopuram Temple Towers */}
      <footer className="footer-heritage">
        {/* Left Temple Gopuram SVG */}
        <svg className="gopuram-icon" viewBox="0 0 40 50" fill="none">
          <path d="M20 2 L23 8 L17 8 Z" fill="#C99738" />
          <path d="M14 8 H26 L28 16 H12 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="0.8" />
          <path d="M10 16 H30 L32 26 H8 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="0.8" />
          <path d="M6 26 H34 L36 38 H4 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="0.8" />
          <rect x="2" y="38" width="36" height="10" fill="#C99738" />
          <circle cx="20" cy="43" r="3" fill="#6B1426" />
        </svg>

        <div className="footer-center-text">
          {currentLang === "ta" ? (
            <span className="footer-tamil-banner">
              நவராத்திரி கொலு • தமிழர் பண்பாட்டின் பெருமை
            </span>
          ) : (
            <span className="footer-english-banner">
              NAVARATRI GOLU • PRIDE OF TAMIL HERITAGE
            </span>
          )}
          <span className="footer-team-banner">
            With Love ❤️ IT
          </span>
          <span className="footer-names-banner">
            Thamilarasan, Kishore, Jagadeesh
          </span>
        </div>

        {/* Right Temple Gopuram SVG */}
        <svg className="gopuram-icon" viewBox="0 0 40 50" fill="none">
          <path d="M20 2 L23 8 L17 8 Z" fill="#C99738" />
          <path d="M14 8 H26 L28 16 H12 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="0.8" />
          <path d="M10 16 H30 L32 26 H8 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="0.8" />
          <path d="M6 26 H34 L36 38 H4 Z" fill="#DDB058" stroke="#8C6A0A" strokeWidth="0.8" />
          <rect x="2" y="38" width="36" height="10" fill="#C99738" />
          <circle cx="20" cy="43" r="3" fill="#6B1426" />
        </svg>
      </footer>
    </div>
  );
}
