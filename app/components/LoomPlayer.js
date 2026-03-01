"use client";

import { useState, useRef, useEffect } from "react";

export default function LoomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.1));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setProgress((x / rect.width) * 100);
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
        <button
          style={{
            background: "none",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            padding: "5px 7px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>

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
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Screen recording background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #e8ecf1 0%, #dde1e7 50%, #d4d8dd 100%)",
            }}
          >
            {/* Browser window */}
            <div
              style={{
                position: "absolute",
                top: "4%",
                left: "6%",
                right: "6%",
                bottom: "4%",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Tab bar */}
              <div
                style={{
                  background: "#e9ecef",
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                </div>
                <div style={{ display: "flex", gap: 2, marginLeft: 8 }}>
                  <div style={{ background: "#fff", borderRadius: "6px 6px 0 0", padding: "4px 14px", fontSize: 9, color: "#333", whiteSpace: "nowrap" }}>
                    Campaigns | Pitchlane
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: "6px 6px 0 0", padding: "4px 14px", fontSize: 9, color: "#999", whiteSpace: "nowrap" }}>
                    Acquisit Zight: LP CWo...
                  </div>
                </div>
              </div>

              {/* URL bar */}
              <div style={{ background: "#f4f5f7", padding: "5px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
                <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 9, color: "#999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", border: "1px solid #e0e0e0" }}>
                  app.pitchlane.com/campaigns?...
                </div>
              </div>

              {/* Page content */}
              <div style={{ flex: 1, padding: "16px 24px", background: "#f8f9fb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: "#2563eb" }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#333" }}>Pitchlane</span>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontSize: 8, color: "#999" }}>Billing</span>
                  <span style={{ fontSize: 8, color: "#999", marginLeft: 8 }}>Help</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>Campaigns</span>
                  <div style={{ flex: 1 }} />
                  <div style={{ background: "#f0f4ff", border: "1px solid #c7d7fe", borderRadius: 6, padding: "4px 10px", fontSize: 8, color: "#2563eb", fontWeight: 600 }}>📂 New Folder</div>
                  <div style={{ background: "#2563eb", borderRadius: 6, padding: "4px 10px", fontSize: 8, color: "#fff", fontWeight: 600 }}>+ Create campaign</div>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 14, borderBottom: "1px solid #e5e7eb", paddingBottom: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#111", borderBottom: "2px solid #111", paddingBottom: 4 }}>Active</span>
                  <span style={{ fontSize: 10, color: "#999" }}>Archived</span>
                </div>
                <div style={{ background: "#fef9c3", borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 10, color: "#78350f" }}>🚀 Now is the time to scale and send even more videos!</span>
                  <button style={{ background: "#eab308", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 8, fontWeight: 600, cursor: "pointer" }}>See Plans</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    { title: "CNS", hasThumb: false, sub: "No campaigns" },
                    { title: "Growthhub: SaaS YC/VC backed", hasThumb: true, color: "#ef4444" },
                    { title: "Campaign", hasThumb: true, color: "#3b82f6" },
                    { title: "AMZ Ads: AI Audit 20.2.", hasThumb: true, color: "#8b5cf6" },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                      <div style={{ height: 48, background: item.hasThumb ? `linear-gradient(135deg, ${item.color}33, ${item.color}11)` : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {item.hasThumb ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={item.color} opacity="0.4"><polygon points="6,3 20,12 6,21" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                        )}
                      </div>
                      <div style={{ padding: "6px 8px" }}>
                        <div style={{ fontSize: 8, fontWeight: 600, color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                        {item.sub && <div style={{ fontSize: 7, color: "#999", marginTop: 2 }}>{item.sub}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recording controls — left side */}
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, zIndex: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: "#fff" }} />
            </div>
            <span style={{ fontSize: 10, color: "#333", fontWeight: 600, background: "rgba(255,255,255,0.85)", borderRadius: 4, padding: "2px 6px" }}>0:00</span>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                <rect x="5" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="3" width="5" height="18" rx="1" />
              </svg>
            </div>
          </div>

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

          {/* Overlay info */}
          <div
            style={{ position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ background: "rgba(0,0,0,0.75)", borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 13, fontWeight: 600, backdropFilter: "blur(8px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              0.8x
            </div>
            <div style={{ background: "rgba(0,0,0,0.75)", borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 12, backdropFilter: "blur(8px)" }}>
              <span>3 min</span>
              <span>🦎</span>
              <span>3 min 52 sec</span>
            </div>
            <button style={{ background: "rgba(0,0,0,0.75)", borderRadius: 8, padding: "8px 18px", display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", backdropFilter: "blur(8px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
              Watch Later
            </button>
          </div>

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

      {/* Bottom-left camera icon */}
      <button style={{ position: "fixed", bottom: 16, left: 16, width: 40, height: 40, borderRadius: 10, background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", zIndex: 50 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="13" height="12" rx="2" />
          <path d="M22 8l-7 4 7 4V8z" />
        </svg>
      </button>

      {/* Help button */}
      <button style={{ position: "fixed", bottom: 16, right: 16, width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#6b7280", zIndex: 50 }}>
        ?
      </button>
    </div>
  );
}
