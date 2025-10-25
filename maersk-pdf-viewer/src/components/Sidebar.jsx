

import React from "react";

export default function Sidebar({ onClickHighlight }) {
  const handleHighlight = () => {
    onClickHighlight("Gain on sale of non-current assets, etc");
  };

  const handleClear = () => {
    onClickHighlight("");
  };

  return (
    <aside
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        minHeight: "100vh",
        padding: "2rem 1.5rem",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "2rem",
            letterSpacing: "0.5px",
          }}
        >
          📊 Analysis Panel
        </h2>

        <ol style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "0.6rem",
              background: "rgba(255, 255, 255, 0.05)",
            }}
          >
            [1] Some other note
          </li>

          <li
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "0.6rem",
              background: "rgba(255, 255, 255, 0.05)",
            }}
          >
            [2] Another note
          </li>

          <li
            style={{
              marginTop: "1rem",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={handleHighlight}
              style={{
                width: "100%",
                padding: "0.9rem 1rem",
                fontSize: "1rem",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                background:
                  "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "500",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)")
              }
            >
              [3] Highlight “Gain on sale of non-current assets, etc”
            </button>
          </li>
        </ol>
      </div>

     
      <div >
        <button
          onClick={handleClear}
          style={{
            width: "100%",
            padding: "0.9rem 1rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            background:
              "linear-gradient(90deg, #2e1b1bff 0%, #5a4646ff 100%)", // red gradient
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontWeight: "500",
            boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #2e1b1bff 0%, #5a4646ff 100%)")
          }
        >
          ❌ Clear Highlight
        </button>
      </div>

      <p
        style={{
          marginTop: "2rem",
          fontSize: "0.95rem",
          lineHeight: "1.5",
          color: "rgba(255,255,255,0.8)",
          background: "rgba(255,255,255,0.05)",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        💡 The text references the Maersk financial line{" "}
        <strong>“Gain on sale of non-current assets, etc”</strong> (Q2 2025
        reported as <b>USD 25m</b>).
      </p>
    </aside>
  );
}
