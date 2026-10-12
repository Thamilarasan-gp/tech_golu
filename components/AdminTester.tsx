"use client";

import React, { useState } from "react";
import { GOLU_DOLLS } from "@/lib/stories";
import {
  Wrench,
  Radio,
  Eye,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Lock,
  Cpu
} from "lucide-react";

interface AdminTesterProps {
  activeDollId: number;
  onPreviewLocally: (dollId: number) => void;
  onHardwareUpdated?: (dollId: number) => void;
}

export function AdminTester({
  activeDollId,
  onPreviewLocally,
  onHardwareUpdated
}: AdminTesterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Send simulated hardware POST /api/doll
  const handleSimulateHardware = async (targetId: number) => {
    setIsSubmitting(true);
    setResultMessage(null);

    try {
      const response = await fetch("/api/doll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-device-token": deviceToken.trim()
        },
        body: JSON.stringify({ dollId: targetId })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResultMessage({
          type: "success",
          text: `Hardware event simulated successfully: Doll #${targetId} is now live in Supabase!`
        });
        if (onHardwareUpdated) {
          onHardwareUpdated(targetId);
        }
      } else {
        setResultMessage({
          type: "error",
          text: `API rejected request: ${data.error || "Check DEVICE_TOKEN"}`
        });
      }
    } catch (err: unknown) {
      const errStr = err instanceof Error ? err.message : "Network error";
      setResultMessage({
        type: "error",
        text: `Hardware simulation failed: ${errStr}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside
      className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
      aria-label="Developer testing and admin console"
    >
      <div className="bg-white border-2 border-[#D4AF37] rounded-2xl shadow-xl overflow-hidden transition-all">
        {/* Toggle Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-[#4A1220] text-white flex items-center justify-between text-xs font-bold uppercase tracking-wider hover:bg-[#6B1D2F] transition-colors"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#C59B27]" />
            <span>Developer / Hardware Tester</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6B1D2F] text-[#FDF5DF] border border-[#C59B27]/40">
              Doll #{activeDollId} Live
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {/* Collapsible Panel */}
        {isOpen && (
          <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto text-xs bg-[#FFFDF9]">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Testing & Diagnostics Tool:</strong> Public visitors cannot alter the live hardware state. Use these controls to simulate hardware signals or preview stories.
              </span>
            </div>

            {/* Mode A: Local UI Story Preview */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#4A1220] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#6B1D2F]" />
                  1. Local Story Preview (Client-only)
                </span>
                <span className="text-[10px] text-[#85766F]">Safe for testing</span>
              </div>
              <p className="text-[11px] text-[#5E524D] mb-2">
                Preview how any doll story renders without affecting physical lights or other visitors.
              </p>

              <div className="grid grid-cols-4 gap-1.5">
                {GOLU_DOLLS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onPreviewLocally(d.id)}
                    className="p-1.5 rounded-md border border-[rgba(107,29,47,0.15)] bg-white hover:bg-[#F9EBEF] text-[#4A1220] font-bold text-center transition-colors truncate text-[11px]"
                    title={d.name}
                  >
                    #{d.id} {d.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode B: Simulate Physical Hardware Signal */}
            <div className="pt-3 border-t border-[rgba(107,29,47,0.1)]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#4A1220] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#E26D39]" />
                  2. Simulate NodeMCU Hardware Signal
                </span>
                <span className="text-[10px] text-[#8C6A0A] font-semibold">Broadcasting</span>
              </div>

              <p className="text-[11px] text-[#5E524D] mb-2 leading-relaxed">
                Sends an authenticated <code>POST /api/doll</code> request to update the Supabase database. This triggers a real-time WebSocket broadcast to all connected phones.
              </p>

              {/* Device Token Input */}
              <div className="space-y-1 mb-2.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#85766F] flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Device Token (from .env.local):</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter DEVICE_TOKEN to test API"
                  value={deviceToken}
                  onChange={(e) => setDeviceToken(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[rgba(107,29,47,0.2)] bg-white text-xs font-mono focus:border-[#C59B27] focus:outline-none"
                />
              </div>

              {/* Hardware Selection Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                {GOLU_DOLLS.map((d) => (
                  <button
                    key={d.id}
                    disabled={isSubmitting}
                    onClick={() => handleSimulateHardware(d.id)}
                    className={`p-1.5 rounded-md border font-bold text-center transition-all truncate text-[11px] ${
                      activeDollId === d.id
                        ? "bg-[#D4AF37] text-white border-[#B38615] shadow-xs"
                        : "bg-[#FFF9ED] text-[#8C6A0A] border-[#D4AF37]/50 hover:bg-[#FDF5DF]"
                    }`}
                    title={`Trigger Doll #${d.id} on Hardware`}
                  >
                    Lit #{d.id}
                  </button>
                ))}
              </div>

              {/* Status Message */}
              {resultMessage && (
                <div
                  className={`mt-2.5 p-2 rounded-lg text-[11px] leading-tight ${
                    resultMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {resultMessage.text}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
