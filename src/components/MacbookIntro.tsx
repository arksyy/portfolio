"use client";

interface MacbookIntroProps {
  children: React.ReactNode;
}

export function MacbookIntro({ children }: MacbookIntroProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full" style={{ maxWidth: "960px", perspective: "1200px" }}>
        {/* Lid / Screen */}
        <div
          style={{
            width: "100%",
            background: "#0a0a0a",
            borderRadius: "14px 14px 0 0",
            padding: "6px 6px 0 6px",
            transformOrigin: "bottom center",
            transform: "rotateX(3deg)",
          }}
        >
          {/* Screen */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 10",
              background: "#0e0e0e",
              borderRadius: "10px 10px 0 0",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "150px",
                height: "22px",
                background: "#0a0a0a",
                borderRadius: "0 0 12px 12px",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                }}
              />
            </div>

            {/* Editor content */}
            <div className="h-full" style={{ paddingTop: "22px" }}>
              {children}
            </div>
          </div>
        </div>

        {/* Hinge */}
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "linear-gradient(to bottom, #3a3a3a, #252525)",
          }}
        />

        {/* Base */}
        <div
          style={{
            width: "100%",
            height: "clamp(40px, 5vw, 65px)",
            background: "linear-gradient(170deg, #333 0%, #2a2a2a 40%, #252525 100%)",
            borderRadius: "0 0 14px 14px",
            position: "relative",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Keyboard hint */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "5%",
              right: "5%",
              height: "45%",
              display: "grid",
              gridTemplateColumns: "repeat(28, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "1px",
              opacity: 0.5,
            }}
          >
            {Array.from({ length: 56 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#2e2e2e",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>

          {/* Trackpad */}
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "30%",
              height: "30%",
              background: "#2a2a2a",
              borderRadius: "4px",
              border: "1px solid #222",
            }}
          />
        </div>

        {/* Shadow under laptop */}
        <div
          style={{
            width: "90%",
            height: "20px",
            margin: "0 auto",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)",
            marginTop: "-4px",
          }}
        />
      </div>
    </div>
  );
}
