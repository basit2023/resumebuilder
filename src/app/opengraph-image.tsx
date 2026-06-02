import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${SITE_NAME} AI resume builder`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #f8fbff 0%, #ffffff 54%, #eef4ff 100%)",
          color: "#08103a",
          display: "flex",
          fontFamily: "Inter, Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "70px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 660 }}>
          <div style={{ alignItems: "center", display: "flex", gap: 18 }}>
            <div
              style={{
                alignItems: "center",
                background: "#2854ef",
                borderRadius: 24,
                color: "white",
                display: "flex",
                fontSize: 42,
                fontWeight: 900,
                height: 82,
                justifyContent: "center",
                width: 82,
              }}
            >
              JD
            </div>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1 }}>{SITE_NAME}</div>
          </div>
          <div style={{ fontSize: 68, fontWeight: 900, letterSpacing: -2.4, lineHeight: 1.02 }}>
            Build resumes that are ready for real hiring systems.
          </div>
          <div style={{ color: "#44546a", fontSize: 27, lineHeight: 1.35 }}>{SITE_DESCRIPTION}</div>
        </div>
        <div
          style={{
            background: "white",
            border: "2px solid #dbe5ff",
            borderRadius: 36,
            boxShadow: "0 30px 80px rgba(8, 16, 58, 0.14)",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            padding: 34,
            width: 360,
          }}
        >
          <div style={{ color: "#2854ef", fontSize: 18, fontWeight: 800 }}>LIVE ATS SCORE</div>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: 30, fontWeight: 900 }}>Product Manager</div>
            <div
              style={{
                alignItems: "center",
                border: "10px solid #34d399",
                borderRadius: 999,
                color: "#047857",
                display: "flex",
                fontSize: 34,
                fontWeight: 900,
                height: 96,
                justifyContent: "center",
                width: 96,
              }}
            >
              91
            </div>
          </div>
          {["AI-polished summary", "Quantified bullets", "Keyword gaps found"].map((item) => (
            <div
              key={item}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                color: "#334155",
                fontSize: 22,
                fontWeight: 700,
                padding: "18px 20px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
