"use client";

import { useState } from "react";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fb",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          padding: 40,
          maxWidth: 440,
          width: "100%",
          margin: 16,
        }}
      >
        {/* Loom logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#625DF5" />
            <path
              d="M14 7.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 4.5a2 2 0 110 4 2 2 0 010-4z"
              fill="#fff"
            />
          </svg>
          <span
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "#111",
            }}
          >
            Loom
          </span>
        </div>

        {status === "success" ? (
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#111",
                margin: "0 0 12px",
              }}
            >
              You've been unsubscribed
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "#6b7280",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              You will no longer receive email notifications from us. If this
              was a mistake, you can re-subscribe from your account settings.
            </p>
          </div>
        ) : (
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#111",
                margin: "0 0 8px",
              }}
            >
              Unsubscribe from emails
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "#6b7280",
                lineHeight: 1.5,
                margin: "0 0 24px",
              }}
            >
              Enter your email address below to unsubscribe from all Loom email
              notifications.
            </p>

            <form onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#111",
                  marginBottom: 6,
                }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: 15,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#625DF5")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "#e5e7eb")
                }
              />

              {status === "error" && (
                <p
                  style={{
                    fontSize: 14,
                    color: "#dc2626",
                    margin: "8px 0 0",
                  }}
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  marginTop: 16,
                  padding: "10px 16px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  background:
                    status === "loading" ? "#8B87F8" : "#625DF5",
                  border: "none",
                  borderRadius: 8,
                  cursor:
                    status === "loading" ? "not-allowed" : "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading")
                    e.target.style.background = "#4F4BD4";
                }}
                onMouseLeave={(e) => {
                  if (status !== "loading")
                    e.target.style.background = "#625DF5";
                }}
              >
                {status === "loading"
                  ? "Unsubscribing..."
                  : "Unsubscribe"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
