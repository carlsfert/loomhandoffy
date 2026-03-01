"use client";

import { useState, useRef, useEffect } from "react";

export default function LoomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    setProgress(pct * 100);
    if (video && video.duration) {
      video.currentTime = pct * video.duration;
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#fff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Top upgrade banner */}
      <div
        style={{
          background: "#f8f9fb",
          borderBottom: "1px solid #e8eaed",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <span style={{ color: "#1968e6", fontSize: 14, fontWeight: 500 }}>
          3/25 videos. Upgrade for unlimited video storage.
        </span>
        <button
          style={{
            background: "#1968e6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "7px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Upgrade
        </button>
      </div>

      {/* Header */}
      <div
        style={{
          padding: "12px 24px",
          borderBottom: "1px solid #e8eaed",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#625DF5" />
            <g transform="translate(16,16)">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={Math.cos((angle * Math.PI) / 180) * 8}
                  y2={Math.sin((angle * Math.PI) / 180) * 8}
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <circle
                  key={`d${i}`}
                  cx={Math.cos((angle * Math.PI) / 180) * 8}
                  cy={Math.sin((angle * Math.PI) / 180) * 8}
                  r="2.2"
                  fill="white"
                />
              ))}
            </g>
          </svg>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>Loom</span>
        </div>
      </div>

      {/* Title section */}
      <div
        style={{
          padding: "20px 40px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#111",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Optimierung des Slicer-Exports für Kampagnen
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>
            Zachary Coleman · 2 days ago
          </p>
        </div>
        <span style={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap", marginTop: 4 }}>
          2 views
        </span>
      </div>

      {/* Video player */}
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9.2",
            borderRadius: 12,
            overflow: "hidden",
            background: "#d4d8dd",
            cursor: "pointer",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          }}
          onClick={togglePlay}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src="https://storage.googleapis.com/videos-eu/p5QxDBXybOUa1u1wPtSCR.mp4"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Center play button */}
          {!isPlaying && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 15 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#333">
                  <polygon points="7,3 21,12 7,21" />
                </svg>
              </div>
            </div>
          )}

          {/* Loom badge */}
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, borderRadius: 8, background: "#625DF5", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <g transform="translate(16,16)">
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <line key={i} x1="0" y1="0" x2={Math.cos((angle * Math.PI) / 180) * 10} y2={Math.sin((angle * Math.PI) / 180) * 10} stroke="white" strokeWidth="3" strokeLinecap="round" />
                ))}
              </g>
            </svg>
          </div>

          {/* Progress bar */}
          {isPlaying && (
            <div
              ref={progressRef}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(0,0,0,0.2)", cursor: "pointer", zIndex: 25 }}
              onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}
            >
              <div style={{ width: `${progress}%`, height: "100%", background: "#625DF5" }} />
            </div>
          )}
        </div>
      </div>

      {/* Reactions bar */}
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "20px auto 40px",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 50,
            padding: "8px 12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {["❤️", "👍", "🔥", "👏", "🙌", "👀"].map((emoji, i) => (
            <button
              key={i}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.15s ease, background 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.2)"; e.currentTarget.style.background = "#f3f4f6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "transparent"; }}
            >
              {emoji}
            </button>
          ))}
          <button style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 50,
            padding: "10px 22px",
            fontSize: 14,
            fontWeight: 500,
            color: "#374151",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Comment
        </button>
      </div>

      {/* Help button */}
      <button style={{ position: "fixed", bottom: 16, right: 16, width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#6b7280", zIndex: 50 }}>
        ?
      </button>
    </div>
  );
}
