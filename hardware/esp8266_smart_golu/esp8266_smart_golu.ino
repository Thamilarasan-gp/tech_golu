/**
 * ==============================================================================
 * SMART GOLU - NodeMCU ESP8266 HARDWARE CONTROLLER
 * ==============================================================================
 * Project: Smart Golu — Interactive Digital Storytelling Experience
 * Target Board: NodeMCU 1.0 (ESP-12E Module)
 * Architecture: ESP8266 Wi-Fi -> HTTPS POST -> Next.js /api/doll -> Supabase Realtime
 * 
 * Hardware Description:
 *   - Connects to Wi-Fi (e.g. mobile hotspot or home router).
 *   - Controls 8 indicator lights/relays corresponding to the 8 Golu dolls.
 *   - Accepts input to select an active doll (e.g. 8 tactile push buttons, rotary switch,
 *     or serial commands from an exhibition operator).
 *   - Whenever a doll is selected and its light turns on, sends an authenticated HTTPS
 *     POST request to https://your-domain.vercel.app/api/doll with the dollId and device token.
 * 
 * Required Arduino Libraries (Install via Arduino Library Manager):
 *   - ESP8266WiFi (built-in to ESP8266 Board Package)
 *   - ESP8266HTTPClient (built-in)
 *   - WiFiClientSecure (built-in)
 *   - ArduinoJson (v6 or v7 by Benoit Blanchon)
 * ==============================================================================
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

// ==============================================================================
// 1. NETWORK & API CONFIGURATION (Customize with your credentials)
// ==============================================================================

// Wi-Fi Credentials (supports 2.4 GHz mobile hotspot or home network)
const char* WIFI_SSID     = "YOUR_WIFI_HOTSPOT_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_HOTSPOT_PASSWORD";

// Server API Endpoint
// In production, use your deployed Vercel domain with HTTPS (e.g., https://smart-golu.vercel.app/api/doll)
const char* API_URL       = "https://smart-golu.vercel.app/api/doll";

// Shared Hardware Device Token (Must match DEVICE_TOKEN in your Next.js .env.local)
const char* DEVICE_TOKEN  = "golu_sec_device_token_9f8a3c42e1";

// ==============================================================================
// 2. PIN DEFINITIONS & HARDWARE MAPPING
// ==============================================================================
// NodeMCU ESP8266 GPIO mapping:
// Note: ESP8266 has limited GPIOs. For 8 individual lights, use GPIOs D0-D8,
// or an I2C relay board / 74HC595 shift register.
// Below is a standard 8-pin digital output setup for 8 relay channels or LEDs:
const int LIGHT_PINS[8] = {
  D0, // GPIO16 - Doll 1: Lord Ganesha
  D1, // GPIO5  - Doll 2: Goddess Lakshmi
  D2, // GPIO4  - Doll 3: Goddess Saraswati
  D5, // GPIO14 - Doll 4: Goddess Durga
  D6, // GPIO12 - Doll 5: Lord Murugan
  D7, // GPIO13 - Doll 6: Marapachi Dolls
  D8, // GPIO15 - Doll 7: Dasavataram Set
  3   // RX/GPIO3 or D3 (GPIO0) - Doll 8: Chettiar & Aachi
};

// State variables
int currentActiveDoll = 1;
unsigned long lastButtonCheckTime = 0;

// ==============================================================================
// 3. SECURITY & SSL CERTIFICATE CONFIGURATION
// ==============================================================================
/**
 * PRODUCTION NOTE:
 * For production deployment, you should supply the Root CA certificate
 * fingerprint or public certificate bundle for your hosting provider (e.g. Let's Encrypt / Vercel).
 * 
 * For development/prototyping with dynamic IP addresses, setInsecure() bypasses
 * certificate validation. 
 * WARNING: setInsecure() does NOT protect against Man-In-The-Middle attacks.
 * In a production exhibition, use client.setFingerprint() or BearSSL::CertStore.
 */
WiFiClientSecure client;

// ==============================================================================
// 4. API DISPATCH FUNCTION
// ==============================================================================
bool sendDollSelectionToServer(int dollId) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[ERROR] Cannot send doll update: Wi-Fi disconnected!");
    return false;
  }

  Serial.printf("[HTTP] Dispatching Doll #%d to API: %s\n", dollId, API_URL);

  HTTPClient http;

  // Configure SSL client
  // DEVELOPMENT PROTOTYPE ONLY: Insecure TLS mode
  client.setInsecure(); 
  client.setTimeout(8000); // 8 second timeout

  if (!http.begin(client, API_URL)) {
    Serial.println("[ERROR] Unable to connect to host endpoint");
    return false;
  }

  // Set HTTP headers
  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-device-token", DEVICE_TOKEN);
  http.addHeader("User-Agent", "SmartGolu-NodeMCU-ESP8266/1.0");

  // Create JSON payload
  StaticJsonDocument<128> doc;
  doc["dollId"] = dollId;

  String requestBody;
  serializeJson(doc, requestBody);

  Serial.printf("[HTTP] Payload: %s\n", requestBody.c_str());

  // Execute POST request
  int httpResponseCode = http.POST(requestBody);

  bool success = false;
  if (httpResponseCode > 0) {
    String responseString = http.getString();
    Serial.printf("[HTTP] Server responded with code: %d\n", httpResponseCode);
    Serial.printf("[HTTP] Server body: %s\n", responseString.c_str());

    if (httpResponseCode == 200 || httpResponseCode == 201) {
      Serial.printf("[SUCCESS] Doll #%d broadcast successfully to Supabase Realtime!\n", dollId);
      success = true;
    } else if (httpResponseCode == 401) {
      Serial.println("[SECURITY ERROR] 401 Unauthorized! Check DEVICE_TOKEN on server.");
    } else {
      Serial.printf("[WARNING] Server returned status %d\n", httpResponseCode);
    }
  } else {
    Serial.printf("[ERROR] HTTP POST failed, error: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  http.end();
  return success;
}

// ==============================================================================
// 5. LIGHT / RELAY SWITCHING
// ==============================================================================
void activateDollLight(int dollId) {
  if (dollId < 1 || dollId > 8) return;

  Serial.printf("[HARDWARE] Switching physical light focus to Doll #%d\n", dollId);

  // Turn on only the selected doll's light, turn others off
  // (Assuming active HIGH relays; invert if using active LOW relay modules)
  for (int i = 0; i < 8; i++) {
    int targetPin = LIGHT_PINS[i];
    if ((i + 1) == dollId) {
      digitalWrite(targetPin, HIGH); // Turn ON active doll lamp
    } else {
      digitalWrite(targetPin, LOW);  // Turn OFF other lamps
    }
  }

  currentActiveDoll = dollId;
}

// ==============================================================================
// 6. WI-FI INITIALIZATION
// ==============================================================================
void setupWiFi() {
  Serial.println();
  Serial.print("[WIFI] Connecting to SSID: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("[WIFI] Connected successfully!");
    Serial.print("[WIFI] IP Address assigned: ");
    Serial.println(WiFi.localIP());
    Serial.print("[WIFI] Signal Strength (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    Serial.println();
    Serial.println("[WIFI] Failed to connect to hotspot within 15 seconds.");
    Serial.println("[WIFI] Check SSID and password. The system will retry in loop().");
  }
}

// ==============================================================================
// 7. SETUP & MAIN LOOP
// ==============================================================================
void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.println("==================================================");
  Serial.println("    SMART GOLU — NodeMCU ESP8266 CONTROLLER       ");
  Serial.println("    Tradition Meets Technology · Navaratri 2026   ");
  Serial.println("==================================================");

  // Configure light output pins
  for (int i = 0; i < 8; i++) {
    pinMode(LIGHT_PINS[i], OUTPUT);
    digitalWrite(LIGHT_PINS[i], LOW);
  }

  // Connect to Wi-Fi
  setupWiFi();

  // Initialize with Doll 1 (Lord Ganesha)
  activateDollLight(1);
  if (WiFi.status() == WL_CONNECTED) {
    sendDollSelectionToServer(1);
  }

  Serial.println();
  Serial.println("Commands:");
  Serial.println("  Type a number '1' to '8' in the Serial Monitor and press Enter");
  Serial.println("  to illuminate that doll and trigger real-time storytelling!");
  Serial.println("==================================================");
}

void loop() {
  // Reconnect Wi-Fi automatically if connection dropped
  if (WiFi.status() != WL_CONNECTED) {
    static unsigned long lastReconnectAttempt = 0;
    if (millis() - lastReconnectAttempt > 10000) {
      Serial.println("[WIFI] Lost connection. Attempting auto-reconnect...");
      WiFi.reconnect();
      lastReconnectAttempt = millis();
    }
  }

  // Check for incoming commands over Serial Monitor (for testing or interactive exhibition)
  if (Serial.available() > 0) {
    char inputChar = Serial.read();
    if (inputChar >= '1' && inputChar <= '8') {
      int selectedDoll = inputChar - '0';
      Serial.printf("[INPUT] Selected Doll: #%d\n", selectedDoll);

      // 1. Physically switch on the doll's light
      activateDollLight(selectedDoll);

      // 2. Notify the Next.js API route to sync all connected visitor devices
      sendDollSelectionToServer(selectedDoll);
    }
  }

  delay(50);
}
