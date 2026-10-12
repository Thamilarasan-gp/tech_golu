import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/doll - Fetch current doll state from Supabase
export async function GET() {
  try {
    const supabase = getServerSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase server client not configured" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("golu_state")
      .select("id, doll_id")
      .eq("id", 1)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, dollId: data?.doll_id ?? null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/doll - Update current doll ID from NodeMCU ESP8266
export async function POST(req: NextRequest) {
  try {
    const configuredToken = process.env.DEVICE_TOKEN;
    const deviceTokenHeader = req.headers.get("x-device-token");

    if (configuredToken && deviceTokenHeader !== configuredToken) {
      return NextResponse.json({ error: "Unauthorized: Invalid x-device-token" }, { status: 401 });
    }

    const body = await req.json();
    const dollId = Number(body.dollId ?? body.doll_id);

    if (!dollId || isNaN(dollId) || dollId < 1 || dollId > 8) {
      return NextResponse.json(
        { error: "Invalid dollId: Must be an integer between 1 and 8" },
        { status: 400 }
      );
    }

    const supabase = getServerSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase server client not configured" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("golu_state")
      .upsert({ id: 1, doll_id: dollId }, { onConflict: "id" })
      .select("id, doll_id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Updated to Doll ID: ${data.doll_id}`,
      dollId: data.doll_id
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
