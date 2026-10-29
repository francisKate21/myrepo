import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff8f0",
          color: "#1f1b2e",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 34, border: "1px solid #ff6b6b", borderRadius: 28 }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 36, letterSpacing: 12, color: "#ff6b6b" }}>L&amp;M PERFUMES</div>
          <div style={{ fontSize: 76, fontWeight: 700 }}>Little moments,</div>
          <div style={{ fontSize: 76, fontWeight: 700 }}>lovely scents.</div>
          <div style={{ fontSize: 25, letterSpacing: 3, marginTop: 16 }}>MADE LOCALLY · WORN EVERYWHERE</div>
        </div>
      </div>
    ),
    size,
  );
}
