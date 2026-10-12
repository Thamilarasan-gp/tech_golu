"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Copy, Check, Smartphone, ExternalLink, Sparkles } from "lucide-react";

interface QRSectionProps {
  currentDollName?: string;
}

export function QRSection({ currentDollName }: QRSectionProps) {
  const [siteUrl, setSiteUrl] = useState<string>("https://smart-golu.vercel.app");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // If environment variable configured, prioritize it; otherwise use window.location.origin
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl && envUrl.startsWith("http")) {
      setSiteUrl(envUrl);
    } else if (typeof window !== "undefined") {
      setSiteUrl(window.location.origin);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="qr-section" className="py-12 md:py-16 bg-[#FAF7F2]">
      <div className="container max-w-4xl">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#D4AF37]/40 shadow-lg relative overflow-hidden">
          {/* Subtle Decorative Golden Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#FDF5DF] to-transparent pointer-events-none opacity-60" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* QR Code Graphic Box */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4AF37] shadow-md inline-block">
                <QRCodeSVG
                  value={siteUrl}
                  size={190}
                  level="M"
                  includeMargin={true}
                  bgColor="#FFFDF9"
                  fgColor="#4A1220"
                />
              </div>

              <span className="text-[11px] font-semibold text-[#8C6A0A] mt-3 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C59B27]" />
                Scan to Open on Mobile
              </span>
            </div>

            {/* Explanatory Content & Copy URL */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9ED] border border-[rgba(197,155,39,0.3)] text-xs font-bold text-[#8C6A0A] uppercase tracking-wider mb-2">
                <QrCode className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Visitor QR Experience</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A1220] font-serif mb-2">
                Scan & Listen on Your Phone
              </h2>

              <p className="text-xs sm:text-sm text-[#5E524D] leading-relaxed mb-4">
                Point your phone camera at this QR code to launch the live storytelling exhibition instantly. No account, sign-in, or app download required. As our physical Golu lights switch, your phone syncs automatically in real time!
              </p>

              {/* Instructions steps */}
              <div className="space-y-2 mb-6 text-xs text-[#241C1A]">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F5EFE6] text-[#6B1D2F] font-bold text-[11px]">
                    1
                  </span>
                  <span>Open your mobile camera or any QR scanner</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F5EFE6] text-[#6B1D2F] font-bold text-[11px]">
                    2
                  </span>
                  <span>Tap the link to open the live Smart Golu web app</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F5EFE6] text-[#6B1D2F] font-bold text-[11px]">
                    3
                  </span>
                  <span>Follow each doll story live as the hardware turns on</span>
                </div>
              </div>

              {/* URL Display and Action Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[rgba(107,29,47,0.12)] text-xs text-[#5E524D] font-mono truncate select-all">
                  {siteUrl}
                </div>

                <button
                  onClick={handleCopy}
                  className="btn-primary py-2 px-4 text-xs shrink-0 flex items-center justify-center gap-1.5"
                  aria-label="Copy website link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
