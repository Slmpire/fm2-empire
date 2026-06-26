// ============================================================
// FM2 EMPIRE — DYNAMIC OG IMAGE
// Next.js auto-generates the social share preview image from
// this file — no static .jpg needed. This is what shows up
// when an FM2 link is shared on WhatsApp, Twitter/X, etc.
// ============================================================

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          position: "relative",
        }}
      >
        {/* Gold radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Gold line */}
        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: "#C9A84C",
            marginBottom: 28,
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            fontFamily: "serif",
            color: "#F5F5F0",
          }}
        >
          FM2
          <span style={{ color: "#C9A84C", marginLeft: 16 }}>Empire</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(245,245,240,0.7)",
            marginTop: 20,
            fontFamily: "sans-serif",
          }}
        >
          Media. Talent. Creative Ecosystem.
        </div>
      </div>
    ),
    { ...size }
  );
}