/**
 * ==============================================================================
 * SMART GOLU — NodeMCU ESP8266 DIRECT TO SUPABASE (METHOD 3)
 * ==============================================================================
 * This sketch sends updates DIRECTLY from ESP8266 to your Supabase Database.
 * No intermediate server or Next.js API needed!
 * 
 * Flow:
 *   ESP8266 (Wi-Fi) -> HTTPS PATCH -> Supabase PostgreSQL (golu_state)
 *                                            │
 *                                            ▼ (WebSocket broadcast)
 *                                      Browser (http://localhost:3001)
 * 
 * Required Board: NodeMCU 1.0 (ESP-12E Module)
 * Required Libraries: Built-in ESP8266WiFi, ESP8266HTTPClient, WiFiClientSecure
 * ==============================================================================
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

// ==============================================================================
// 1. WI-FI & SUPABASE CONFIGURATION
// ==============================================================================
const char* WIFI_SSID     = "YOUR_WIFI_HOTSPOT_NAME";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Supabase REST endpoint targeting the single row (id = 1)
const char* SUPABASE_REST_URL = "https://wxrpszwyuchadnnaiels.supabase.co/rest/v1/golu_state?id=eq.1";

// Supabase API Key (Paste your SUPABASE_KEY here)
const char* SUPABASE_KEY = "YOUR_SUPABASE_SECRET_OR_ANON_KEY";

// 8 Output pins for the doll lights/relays
const int LIGHT_PINS[8] = { D0, D1, D2, D5, D6, D7, D8, 3 };

// ==============================================================================
// 2. DIRECT SUPABASE UPDATE FUNCTION
// ==============================================================================
bool updateDollInSupabase(int dollId) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[ERROR] Wi-Fi not connected!");
    return false;
  }

  Serial.printf("\n[SUPABASE] Sending Doll ID #%d directly to database...\n", dollId);

  WiFiClientSecure client;
  client.setInsecure(); // Bypass CA certificate check on ESP8266
  client.setTimeout(6000);

  HTTPClient http;
  if (!http.begin(client, SUPABASE_REST_URL)) {
    Serial.println("[ERROR] Failed to initialize HTTPS connection");
    return false;
  }

  // Supabase PostgREST requires these headers:
  http.addHeader("apikey", SUPABASE_KEY);
  http.addHeader("Authorization", String("Bearer ") + SUPABASE_KEY);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("User-Agent", "ESP8266-SmartGolu");
  http.addHeader("Prefer", "return=minimal");

  // JSON payload: {"doll_id": 3}
  String payload = "{\"doll_id\":" + String(dollId) + "}";

  // Send HTTP PATCH request
  int httpResponseCode = http.sendRequest("PATCH", payload);

  bool success = false;
  if (httpResponseCode == 200 || httpResponseCode == 204) {
    Serial.printf("[SUCCESS] Supabase updated to Doll #%d! Realtime WebSocket triggered.\n", dollId);
    success = true;
  } else {
    Serial.printf("[ERROR] HTTP PATCH failed, code: %d\n", httpResponseCode);
    if (httpResponseCode > 0) {
      Serial.println(http.getString());
    }
  }

  http.end();
  return success;
}

// ==============================================================================
// 3. PHYSICAL LIGHT CONTROL
// ==============================================================================
void switchDollLight(int dollId) {
  for (int i = 0; i < 8; i++) {
    if ((i + 1) == dollId) {
      digitalWrite(LIGHT_PINS[i], HIGH); // Light ON for active doll
    } else {
      digitalWrite(LIGHT_PINS[i], LOW);  // Light OFF for other dolls
    }
  }
}

// ==============================================================================
// 4. SETUP & LOOP
// ==============================================================================
void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("\n==============================================");
  Serial.println("  SMART GOLU — DIRECT SUPABASE CONTROLLER    ");
  Serial.println("==============================================");

  // Configure output pins for lights
  for (int i = 0; i < 8; i++) {
    pinMode(LIGHT_PINS[i], OUTPUT);
    digitalWrite(LIGHT_PINS[i], LOW);
  }

  // Connect to Wi-Fi
  Serial.printf("Connecting to %s ...", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[WIFI] Connected! IP: " + WiFi.localIP().toString());

  Serial.println("\nReady!");
  Serial.println("Type '1' through '8' in this Serial Monitor and press Enter");
  Serial.println("to switch the physical light AND update the web screen in real time.");
  Serial.println("==============================================\n");
}

void loop() {
  // Read Serial Monitor input (e.g. from user or from Arduino Uno via TX/RX)
  if (Serial.available() > 0) {
    char ch = Serial.read();
    if (ch >= '1' && ch <= '8') {
      int selectedDoll = ch - '0';
      Serial.printf("[ACTION] Switching to Doll #%d\n", selectedDoll);

      // 1. Turn on physical light
      switchDollLight(selectedDoll);

      // 2. Directly update Supabase (which triggers the browser WebSocket instantly)
      updateDollInSupabase(selectedDoll);
    }
  }

  delay(20);
}
