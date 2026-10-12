"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";

export default function HomePage() {
  const [dollId, setDollId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabase();

    // 1. Initial fetch of current doll ID from public.golu_state where id = 1
    async function fetchInitialDoll() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("golu_state")
          .select("doll_id")
          .eq("id", 1)
          .single();

        if (fetchError) {
          setError(fetchError.message);
        } else if (data) {
          setDollId(data.doll_id);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to connect to database";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialDoll();

    // 2. Realtime subscription to golu_state changes
    const channel = supabase
      .channel("realtime-golu-state")
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
            setDollId(payload.new.doll_id as number);
            setError(null);
          }
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          setError("Realtime connection error");
        }
      });

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="doll-container">
      {/* Real-time Connection Status */}
      <div
        className={`status-badge ${
          loading ? "connecting" : error ? "error" : "connected"
        }`}
      >
        <span
          className={`dot ${
            loading ? "connecting" : error ? "error" : "connected"
          }`}
        />
        <span>
          {loading
            ? "Connecting..."
            : error
            ? "Connection Issue"
            : "Live Connection Active"}
        </span>
      </div>

      <div className="doll-title">Smart Golu</div>

      {/* Main Display: Current Doll ID */}
      {loading ? (
        <div className="loading-text">Loading current doll...</div>
      ) : error ? (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <div className="doll-display">
          Current Doll ID: <span className="doll-id-highlight">{dollId ?? "—"}</span>
        </div>
      )}

      <div className="sub-note">Updates automatically via Supabase Realtime</div>
    </main>
  );
}
