"use client";

import React from "react";
import { Radio, Wifi, WifiOff, RefreshCw } from "lucide-react";

export type ConnectionStatus = "connected" | "connecting" | "reconnecting" | "fallback";

interface LiveStatusProps {
  status: ConnectionStatus;
  lastUpdated?: Date | null;
  onRefresh?: () => void;
}

export function LiveStatus({ status, lastUpdated, onRefresh }: LiveStatusProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "connected":
        return {
          label: "Live Hardware Feed Connected",
          sub: "Real-time Supabase WebSocket active",
          colorClass: "bg-emerald-500",
          borderClass: "border-emerald-200 bg-emerald-50 text-emerald-800",
          icon: <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        };
      case "connecting":
      case "reconnecting":
        return {
          label: status === "connecting" ? "Connecting to Live Golu..." : "Reconnecting...",
          sub: "Establishing secure WebSocket channel",
          colorClass: "bg-amber-500",
          borderClass: "border-amber-200 bg-amber-50 text-amber-800",
          icon: <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
        };
      case "fallback":
      default:
        return {
          label: "Interactive Exhibition Mode",
          sub: "Add Supabase keys in .env.local for live IoT sync",
          colorClass: "bg-amber-400",
          borderClass: "border-amber-200 bg-amber-50/70 text-amber-800",
          icon: <Wifi className="w-3.5 h-3.5 text-amber-600" />
        };
    }
  };

  const current = getStatusDetails();

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-medium shadow-xs transition-all"
      style={{
        backgroundColor: status === "connected" ? "#F0FDF4" : "#FFFBEB",
        borderColor: status === "connected" ? "rgba(34, 197, 94, 0.3)" : "rgba(245, 158, 11, 0.3)",
        color: status === "connected" ? "#166534" : "#92400E"
      }}
    >
      <span className="relative flex h-2 w-2">
        {status === "connected" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status === "connected"
              ? "bg-emerald-500"
              : status === "reconnecting"
              ? "bg-amber-500"
              : "bg-amber-400"
          }`}
        />
      </span>

      <span className="font-semibold tracking-wide">{current.label}</span>

      {lastUpdated && (
        <span className="hidden sm:inline-block opacity-70 border-l border-amber-300/40 pl-2 text-[11px]">
          Sync: {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </span>
      )}

      {onRefresh && (
        <button
          onClick={onRefresh}
          title="Manual refresh"
          aria-label="Refresh live doll state"
          className="p-0.5 hover:opacity-80 transition-opacity ml-0.5"
        >
          <RefreshCw className="w-3 h-3 opacity-60 hover:opacity-100" />
        </button>
      )}
    </div>
  );
}
