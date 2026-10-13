import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Split text into safe chunks under 180 chars for Google TTS
function splitTextIntoChunks(text: string, maxLength = 180): string[] {
  const sentences = text.split(/(?<=[.?!|\n])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).trim().length <= maxLength) {
      current = (current + " " + sentence).trim();
    } else {
      if (current) chunks.push(current);
      if (sentence.length <= maxLength) {
        current = sentence;
      } else {
        // Break long sentence by comma or space
        const words = sentence.split(" ");
        current = "";
        for (const word of words) {
          if ((current + " " + word).trim().length <= maxLength) {
            current = (current + " " + word).trim();
          } else {
            if (current) chunks.push(current);
            current = word;
          }
        }
      }
    }
  }
  if (current) chunks.push(current);
  return chunks.filter((c) => c.trim().length > 0);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const lang = searchParams.get("lang") === "en" ? "en" : "ta";

    if (!text.trim()) {
      return new NextResponse("Text parameter required", { status: 400 });
    }

    const chunks = splitTextIntoChunks(text, 160);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(
        chunk
      )}`;

      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      if (!res.ok) {
        throw new Error(`TTS fetch error: ${res.status}`);
      }

      const arrayBuf = await res.arrayBuffer();
      audioBuffers.push(Buffer.from(arrayBuf));
    }

    const combinedBuffer = Buffer.concat(audioBuffers);

    return new NextResponse(combinedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "Content-Length": combinedBuffer.length.toString()
      }
    });
  } catch (error) {
    console.error("TTS Route Error:", error);
    return new NextResponse("Failed to generate speech", { status: 500 });
  }
}
