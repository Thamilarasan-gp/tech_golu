# Smart Golu — Interactive Digital Storytelling Experience

> **Tradition Meets Technology · Navaratri Exhibition**  
> An interactive, QR-enabled, hardware-connected Navaratri Golu storytelling platform built with Next.js App Router, Supabase Realtime, and NodeMCU ESP8266.

---

## 1. System Architecture

```
┌─────────────────────────────────┐
│     NodeMCU ESP8266             │
│  (Connected to Mobile Hotspot)  │
│  • Controls 8 Doll Relay Lights │
│  • Sends HTTPS POST /api/doll   │
│  • Authenticated via Header     │
└───────────────┬─────────────────┘
                │ HTTPS POST { "dollId": 1..8 }
                │ x-device-token: <DEVICE_TOKEN>
                ▼
┌─────────────────────────────────┐
│     Next.js API Route           │
│     POST /api/doll              │
│  • Validates dollId (1-8)       │
│  • Authenticates Device Token   │
│  • Updates Supabase Service-Role│
└───────────────┬─────────────────┘
                │ Upserts row (id = 1, doll_id, updated_at)
                ▼
┌─────────────────────────────────┐
│     Supabase PostgreSQL         │
│     Table: public.golu_state    │
│  • Single row representing state│
│  • Realtime Replication Enabled │
└───────────────┬─────────────────┘
                │ WebSocket Broadcast (supabase_realtime)
                ▼
┌─────────────────────────────────┐
│     Visitor Mobile Phones       │
│  (Scanned via QR Code)          │
│  • Next.js App Router Client    │
│  • Instant story & image switch │
│  • Text-to-speech Audio option  │
│  • No login or refresh needed   │
└─────────────────────────────────┘
```

---

## 2. Directory Structure

```text
smart-golu/
├── app/
│   ├── api/
│   │   └── doll/
│   │       └── route.ts         # Secure hardware ingestion API (POST & GET)
│   ├── globals.css              # Curated Indian festive styling & design tokens
│   ├── layout.tsx               # Root layout with SEO and viewport metadata
│   └── page.tsx                 # Main exhibition page with Supabase Realtime
├── components/
│   ├── AdminTester.tsx          # Testing console for developers to simulate hardware
│   ├── DollArt.tsx              # Vector SVG artwork for all 8 traditional dolls
│   ├── DollCard.tsx             # Individual step card with active light indicator
│   ├── DollGrid.tsx             # 8-doll traditional step (Padi) arrangement
│   ├── DollStory.tsx            # Deep story narrative, audio TTS, & cultural facts
│   ├── GoluHeader.tsx           # Festival branding, live status pill & navigation
│   ├── LiveStatus.tsx           # WebSocket live connection indicator & pulse dot
│   └── QRSection.tsx            # Dynamic mobile QR code & link sharing
├── hardware/
│   └── esp8266_smart_golu/
│       └── esp8266_smart_golu.ino # Complete Arduino sketch for NodeMCU ESP8266
├── lib/
│   ├── stories.ts               # Deeply researched cultural stories for 8 dolls
│   └── supabase.ts              # Browser & server Supabase client factories
├── supabase/
│   └── schema.sql               # Database migration & Realtime publication script
├── .env.example                 # Environment configuration template
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Database Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** from the left navigation panel.
3. Paste and run the following script (also available in `supabase/schema.sql`):

```sql
-- 1. Create table public.golu_state
create table if not exists public.golu_state (
  id integer primary key check (id = 1),
  doll_id integer not null check (doll_id between 1 and 8),
  updated_at timestamptz not null default now()
);

-- 2. Insert initial record (Doll 1 = Lord Ganesha)
insert into public.golu_state (id, doll_id, updated_at)
values (1, 1, now())
on conflict (id) do update set updated_at = now();

-- 3. Enable Row Level Security (RLS)
alter table public.golu_state enable row level security;

-- 4. Allow public anonymous and authenticated read access
create policy "Allow public reading"
on public.golu_state
for select
to anon, authenticated
using (true);

-- 5. Enable Supabase Realtime broadcast on this table
alter publication supabase_realtime add table public.golu_state;

-- 6. Set replica identity full to receive all columns on updates
alter table public.golu_state replica identity full;
```

---

## 4. Environment Variables Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your configuration values:

```env
# 1. Supabase Public Config (Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_public_key

# 2. Supabase Server Secret (Project Settings -> API -> service_role)
# NEVER share or prefix with NEXT_PUBLIC_
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key

# 3. Hardware Shared Secret
# Used by NodeMCU ESP8266 in the x-device-token header
DEVICE_TOKEN=golu_sec_device_token_9f8a3c42e1

# 4. Optional Production URL for QR Code
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 5. Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Testing & Hardware Simulation

### Option A: Using the Built-In Developer Console
On the bottom-right corner of the web page, click **"Developer / Hardware Tester"**:
- **Local Story Preview:** Click any doll `#1` to `#8` to preview how its story looks on screen without altering the live database.
- **Simulate NodeMCU Signal:** Enter your `DEVICE_TOKEN`, then click **"Lit #N"**. This sends an authenticated request to `POST /api/doll` and verifies that the Supabase Realtime broadcast triggers across all open browsers instantly!

### Option B: Using cURL or Postman
```bash
curl -X POST http://localhost:3000/api/doll \
  -H "Content-Type: application/json" \
  -H "x-device-token: golu_sec_device_token_9f8a3c42e1" \
  -d '{"dollId": 3}'
```

Expected Response:
```json
{
  "success": true,
  "message": "Active doll state updated to Doll #3",
  "dollId": 3,
  "updatedAt": "2026-10-12T13:00:00.000Z"
}
```

---

## 7. NodeMCU ESP8266 Hardware Guide

### Hardware Wiring
Connect the NodeMCU ESP8266 pins to an 8-channel 5V relay module or 8 LEDs:

| Doll # | Deity / Traditional Figure | NodeMCU Pin | GPIO | Function |
| :--- | :--- | :--- | :--- | :--- |
| **#1** | Lord Ganesha | `D0` | GPIO16 | Light / Relay Channel 1 |
| **#2** | Goddess Lakshmi | `D1` | GPIO5 | Light / Relay Channel 2 |
| **#3** | Goddess Saraswati | `D2` | GPIO4 | Light / Relay Channel 3 |
| **#4** | Goddess Durga | `D5` | GPIO14 | Light / Relay Channel 4 |
| **#5** | Lord Murugan | `D6` | GPIO12 | Light / Relay Channel 5 |
| **#6** | Marapachi Dolls | `D7` | GPIO13 | Light / Relay Channel 6 |
| **#7** | Dasavataram Set | `D8` | GPIO15 | Light / Relay Channel 7 |
| **#8** | Chettiar & Aachi | `D3` / `RX` | GPIO0 / 3 | Light / Relay Channel 8 |

### Arduino IDE Upload
1. Open `hardware/esp8266_smart_golu/esp8266_smart_golu.ino` in Arduino IDE.
2. Select **Tools -> Board -> ESP8266 Boards -> NodeMCU 1.0 (ESP-12E Module)**.
3. Update `WIFI_SSID`, `WIFI_PASSWORD`, `API_URL`, and `DEVICE_TOKEN`.
4. Click **Upload**.
5. Open **Serial Monitor** at **115200 baud**. Press keys `1` through `8` and press Enter to test light switching and API transmission!

---

## 8. Vercel Deployment

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add the following **Environment Variables** in the Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DEVICE_TOKEN`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://smart-golu.vercel.app`)
4. Click **Deploy**.
5. Copy your deployed production URL and update `API_URL` in the Arduino sketch.

---

## 9. Comprehensive Troubleshooting Guide

| Issue | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Realtime not updating on phones** | Table not added to publication | Run `alter publication supabase_realtime add table public.golu_state;` in Supabase SQL editor. |
| **401 Unauthorized from /api/doll** | Mismatched `x-device-token` | Ensure the `DEVICE_TOKEN` in `.env.local` matches the token in `esp8266_smart_golu.ino`. |
| **ESP8266 Wi-Fi connection fails** | Hotspot frequency issue | ESP8266 only supports **2.4 GHz Wi-Fi**. In phone hotspot settings, enable **"Maximize Compatibility"** (2.4 GHz mode). |
| **ESP8266 SSL / TLS connection error** | Incompatible cipher or certificate | The sketch uses `client.setInsecure()` for prototyping. Ensure the `API_URL` starts with `https://`. |
| **Card selection not changing hardware** | Normal behavior (by design) | By design, visitors browsing cards do **not** trigger hardware changes to prevent visitor collisions. Use the Developer Tester with `DEVICE_TOKEN` to simulate hardware signals. |
| **Audio narration silent** | Device permissions or mute | Ensure device media volume is up and browser has speech synthesis permission enabled. |
