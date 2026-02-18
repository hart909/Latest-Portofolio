import { useEffect, useRef, useState } from "react";
import experienceLogo from "../assets/work-experience.jpg";
import experience2 from "../assets/work-experience2.jpg";
import experience3 from "../assets/work-experience3.jpg";
import organizationalImage from "../assets/organizational.jpg";
import organizationalImage2 from "../assets/organizational2.jpg";
import organizationalImage3 from "../assets/organizational3.jpg";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const experiences = [
  {
    index: "01",
    role: "Software Test Engineer Intern",
    company: "PT Pharos Indonesia",
    period: "Feb 2025 – Feb 2026",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Logo_Pharos.png/1280px-Logo_Pharos.png",
    photos: [experienceLogo, experience2, experience3],
    tag: "WORK EXPERIENCE",
    photoLabel: "PHAROS INDONESIA",
    points: [
      "Collaborated with developers and product managers to deliver new features.",
      "Performed functional and API testing on internal web applications.",
      "Created structured test cases based on business workflows.",
      "Validated database consistency using SQL queries.",
      "Verified bug fixes across development and staging environments.",
    ],
    detail: {
      project: "Canvasser Team",
      appName: "Canvasser App",
      description:
        "This field force monitoring application streamlines canvasser operations by managing clinic partnerships, tracking real-time worker activity, and overseeing field transactions. It ensures seamless operational consistency through a centralized system that integrates data across all branches in real-time.",
      tools: [
        { name: "Django", color: "#092E20" },
        { name: "PostgreSQL", color: "#336791" },
        { name: "OpenProject", color: "#1A67A3" },
      ],
      features: ["Clinic Partnership", "Transaction Mgmt", "Field Tracking", "Real-time Sync"],
    },
  },
  {
    index: "02",
    role: "Public Relations Member",
    organization: "Dewan Perwakilan Mahasiswa Fakultas Teknologi Universitas Tarumanagara",
    photos: [organizationalImage, organizationalImage2, organizationalImage3],
    tag: "ORGANIZATIONAL EXPERIENCE",
    photoLabel: "DPM FTI UNTAR",
    points: [
      "Communicated with faculty leadership and academic stakeholders.",
      "Participated in supervising organizational work programs.",
      "Developed leadership and professional communication skills.",
    ],
    detail: {
      project: "Rapat Kerja Mahasiswa 2024/2025",
      appName: "Leader of Documentation and Publication",
      description:
        "The lead oversees the event's grand design and team workload distribution while managing the final video post-production. This ensures a balanced workflow and high-quality deliverables for the student organization's initiatives.",
      tools: [
        { name: "Adobe Premiere", color: "#9999FF" },
        { name: "Canva", color: "#00C4CC" },
        { name: "Social Media", color: "#E1306C" },
      ],
      features: ["Communication", "Leadership", "Collaborative", "Problem Solving"],
    },
  },
];

/* ─────────────────────────────────────────────
   HOOK
───────────────────────────────────────────── */
function useScrollInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return mobile;
}

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @keyframes orbFloat {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-28px) scale(1.04); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes dotPulse {
    0%,100% { box-shadow: 0 0 4px #34d399; }
    50%     { box-shadow: 0 0 14px #34d399, 0 0 28px rgba(52,211,153,0.35); }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); }
  }
  @keyframes backFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .flip-scene { perspective: 1400px; }
  .flip-inner {
    position: relative; width: 100%; height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.75s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .flip-inner.flipped { transform: rotateY(180deg); }
  .flip-face {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 1.4rem;
    overflow: hidden;
  }
  .flip-face-back { transform: rotateY(180deg); }

  .exp-wrap:not(.is-flipped) {
    transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s;
  }
  .exp-wrap:not(.is-flipped):hover {
    transform: translateY(-4px) scale(1.003);
    box-shadow: 0 24px 60px rgba(16,185,129,0.12);
  }

  .bullet-item { transition: transform 0.25s ease; }
  .bullet-item:hover { transform: translateX(4px); }
  .bullet-item:hover p { color: #d1fae5 !important; }

  .tool-pill { transition: transform 0.22s ease, box-shadow 0.22s ease; }
  .tool-pill:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.35); }
  .feat-chip:hover { background: rgba(52,211,153,0.18) !important; color: #a7f3d0 !important; }

  .cta-btn {
    cursor: pointer; outline: none;
    transition: background 0.25s, border-color 0.25s, transform 0.2s, box-shadow 0.25s;
  }
  .cta-btn:hover {
    background: rgba(52,211,153,0.18) !important;
    border-color: rgba(52,211,153,0.6) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(52,211,153,0.18);
  }

  .tag-badge { transition: background 0.2s; }
  .car-dot { transition: background 0.3s, transform 0.3s; cursor: pointer; }
  .car-dot:hover { transform: scale(1.4); }

  .no-scroll::-webkit-scrollbar { display: none; }
  .no-scroll { scrollbar-width: none; -ms-overflow-style: none; }

  /* ── RESPONSIVE ── */

  /* Tablet: kurangi height card sedikit */
  @media (max-width: 900px) {
    .work-card-height { height: auto !important; min-height: 300px !important; }
    .org-card-height  { height: auto !important; min-height: 280px !important; }
  }

  /* Mobile: stack layout, flip diganti expand */
  @media (max-width: 640px) {
    .exp-section { padding: 4rem 1rem !important; }
    .card-front-grid {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
      padding: 1.2rem !important;
    }
    .photo-col-work { order: -1; min-height: 160px !important; margin-top: 1.8rem !important; }
    .photo-col-org  { order: -1; min-height: 160px !important; margin-top: 1.8rem !important; }
    .work-card-height { height: auto !important; min-height: unset !important; }
    .org-card-height  { height: auto !important; min-height: unset !important; }
    .flip-scene { perspective: none !important; }
    .flip-inner { transform-style: flat !important; }
  }

  @media (min-width: 641px) and (max-width: 900px) {
    .exp-section { padding: 5rem 2rem !important; }
    .card-front-grid { gap: 1.2rem !important; padding: 1.5rem !important; }
  }
`;

/* ─────────────────────────────────────────────
   ORB
───────────────────────────────────────────── */
function Orb({ style }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%", pointerEvents: "none",
      animation: "orbFloat 8s ease-in-out infinite", ...style,
    }} />
  );
}

/* ─────────────────────────────────────────────
   PHOTO CAROUSEL
───────────────────────────────────────────── */
function PhotoCarousel({ photos, label }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % photos.length), 3200);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1rem", overflow: "hidden", minHeight: 140 }}>
      {photos.map((src, i) => (
        <img key={i} src={src} alt={`photo ${i + 1}`}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1)" : "scale(1.04)",
            transition: "opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)",
          }}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(2,21,14,0.85) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: "0.7rem", left: "0.7rem", right: "0.7rem", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", animation: "dotPulse 2.5s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em" }}>{label}</span>
        </div>
        <div style={{ display: "flex", gap: "0.28rem" }}>
          {photos.map((_, i) => (
            <div key={i} className="car-dot" onClick={() => setActive(i)}
              style={{ width: i === active ? 14 : 5, height: 5, borderRadius: "99px", background: i === active ? "#34d399" : "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DETAIL BACK PANEL
───────────────────────────────────────────── */
function DetailBack({ exp, onClose, visible }) {
  const d = exp.detail;
  const anim = (delay) => visible
    ? { animation: `backFadeUp 0.5s ${delay}s cubic-bezier(0.23,1,0.32,1) both` }
    : { opacity: 0 };

  return (
    <div className="no-scroll" style={{
      width: "100%", height: "100%",
      background: "rgba(2,13,8,0.98)",
      padding: "1.2rem 1.5rem",
      boxSizing: "border-box",
      display: "flex", flexDirection: "column", gap: "0.55rem",
      position: "relative", overflow: "auto",
    }}>
      <div style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.13), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ height: "0.8rem", flexShrink: 0 }} />

      <div style={anim(0.08)}>
        <div style={{ fontSize: "0.44rem", letterSpacing: "0.22em", color: "rgba(52,211,153,0.4)", fontWeight: 700, marginBottom: "0.15rem" }}>PROJECT DETAIL</div>
        <h3 style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)", fontWeight: 800, color: "white", margin: 0, lineHeight: 1.2 }}>{d.appName}</h3>
        <p style={{ color: "#6ee7b7", fontSize: "0.66rem", margin: "0.1rem 0 0", fontWeight: 600 }}>{d.project}</p>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, rgba(52,211,153,0.22), transparent)", flexShrink: 0, ...anim(0.16) }} />

      <p style={{ color: "#a1a1aa", fontSize: "clamp(0.65rem, 1.8vw, 0.71rem)", lineHeight: 1.62, margin: 0, ...anim(0.24) }}>
        {d.description}
      </p>

      <div style={anim(0.33)}>
        <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.35rem", textTransform: "uppercase" }}>Stack & Tools</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {d.tools.map((t, i) => (
            <div key={i} className="tool-pill" style={{
              display: "flex", alignItems: "center", gap: "0.3rem",
              background: `${t.color}1e`, border: `1px solid ${t.color}50`,
              borderRadius: "0.6rem", padding: "0.18rem 0.5rem",
            }}>
              <span style={{ fontSize: "0.63rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={anim(0.42)}>
        <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.35rem", textTransform: "uppercase" }}>Key Features</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
          {d.features.map((f, i) => (
            <span key={i} className="feat-chip" style={{
              fontSize: "0.58rem", fontWeight: 600, padding: "0.14rem 0.42rem",
              background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)",
              borderRadius: "2rem", color: "rgba(52,211,153,0.72)",
              transition: "background 0.2s, color 0.2s",
            }}>{f}</span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto", paddingTop: "0.3rem", ...anim(0.5) }}>
        <button className="cta-btn" onClick={onClose} style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          padding: "0.4rem 0.9rem",
          background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.28)",
          borderRadius: "2rem", color: "#6ee7b7",
          fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em",
        }}>
          <span>↩</span> Back to Overview
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DETAILS BTN
───────────────────────────────────────────── */
function DetailsBtn({ onClick, inView, delay = "0.7s" }) {
  return (
    <div style={{
      marginTop: "auto", paddingTop: "0.5rem",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(10px)",
      transition: `opacity 0.6s ${delay} ease, transform 0.6s ${delay} ease`,
    }}>
      <button className="cta-btn" onClick={onClick} style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        padding: "0.4rem 0.9rem",
        background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.28)",
        borderRadius: "2rem", color: "#6ee7b7",
        fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em",
      }}>
        <span>⬡</span> Click for In-Depth Details
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAG BADGE
───────────────────────────────────────────── */
function TagBadge({ label }) {
  return (
    <div className="tag-badge" style={{
      position: "absolute", top: "1rem", left: "1rem", zIndex: 5,
      padding: "0.18rem 0.6rem", border: "1px solid rgba(52,211,153,0.22)", borderRadius: "2rem",
      fontSize: "0.48rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.6)", fontWeight: 700,
      background: "rgba(52,211,153,0.04)",
    }}>{label}</div>
  );
}

/* ─────────────────────────────────────────────
   WORK CARD
───────────────────────────────────────────── */
function WorkCard({ exp }) {
  const [wrapRef, inView] = useScrollInView(0.1);
  const [flipped, setFlipped] = useState(false);
  const isMobile = useIsMobile(640);

  // Mobile: toggle expand instead of flip
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={wrapRef}
      className={`exp-wrap flip-scene work-card-height${flipped ? " is-flipped" : ""}`}
      style={{
        height: isMobile ? "auto" : 340,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.85s cubic-bezier(0.23,1,0.32,1), transform 0.85s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {isMobile ? (
        /* ── MOBILE: flat layout, no flip ── */
        <div style={{
          borderRadius: "1.4rem", overflow: "hidden",
          background: "rgba(2,21,14,0.92)", border: "1px solid rgba(52,211,153,0.12)",
          backdropFilter: "blur(20px)",
        }}>
          <TagBadge label={exp.tag} />

          {/* Photo */}
          <div style={{ height: 180, position: "relative", marginBottom: 0 }}>
            <PhotoCarousel photos={exp.photos} label={exp.photoLabel} />
          </div>

          {/* Info */}
          <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ background: "white", padding: "0.4rem", borderRadius: "0.6rem", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                <img src={exp.logo} alt="logo" style={{ height: 22, objectFit: "contain", display: "block" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>{exp.role}</h3>
                <p style={{ color: "#6ee7b7", fontSize: "0.68rem", margin: "0.05rem 0 0", fontWeight: 500 }}>{exp.company}</p>
                <p style={{ color: "#52525b", fontSize: "0.6rem", margin: "0.03rem 0 0" }}>{exp.period}</p>
              </div>
            </div>

            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(52,211,153,0.3), transparent)" }} />

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.22rem" }}>
              {exp.points.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
                  <span style={{ marginTop: 6, width: 4, height: 4, background: "rgba(52,211,153,0.5)", borderRadius: "50%", flexShrink: 0 }} />
                  <p style={{ color: "#a1a1aa", fontSize: "0.7rem", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </li>
              ))}
            </ul>

            {/* toggle detail */}
            <button className="cta-btn" onClick={() => setExpanded(e => !e)} style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.4rem 0.9rem", width: "fit-content",
              background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.28)",
              borderRadius: "2rem", color: "#6ee7b7",
              fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em",
            }}>
              {expanded ? "↑ Hide Details" : "⬡ In-Depth Details"}
            </button>

            {/* expanded detail */}
            {expanded && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", paddingTop: "0.3rem", borderTop: "1px solid rgba(52,211,153,0.1)" }}>
                <div>
                  <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.3rem", textTransform: "uppercase" }}>Project</p>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", margin: 0 }}>{exp.detail.appName}</p>
                  <p style={{ color: "#6ee7b7", fontSize: "0.64rem", margin: "0.1rem 0 0" }}>{exp.detail.project}</p>
                </div>
                <p style={{ color: "#a1a1aa", fontSize: "0.68rem", lineHeight: 1.6, margin: 0 }}>{exp.detail.description}</p>
                <div>
                  <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.3rem", textTransform: "uppercase" }}>Stack & Tools</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
                    {exp.detail.tools.map((t, i) => (
                      <span key={i} style={{
                        fontSize: "0.62rem", fontWeight: 600, padding: "0.14rem 0.45rem",
                        background: `${t.color}1e`, border: `1px solid ${t.color}50`,
                        borderRadius: "0.6rem", color: "rgba(255,255,255,0.85)",
                      }}>{t.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.3rem", textTransform: "uppercase" }}>Key Features</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
                    {exp.detail.features.map((f, i) => (
                      <span key={i} style={{
                        fontSize: "0.58rem", fontWeight: 600, padding: "0.14rem 0.42rem",
                        background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)",
                        borderRadius: "2rem", color: "rgba(52,211,153,0.72)",
                      }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── DESKTOP: flip card ── */
        <div className={`flip-inner${flipped ? " flipped" : ""}`}>
          {/* FRONT */}
          <div className="flip-face card-front-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem",
            alignItems: "stretch",
            background: "rgba(2,21,14,0.92)", border: "1px solid rgba(52,211,153,0.12)",
            padding: "2rem", backdropFilter: "blur(20px)", boxSizing: "border-box",
          }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.09), transparent 70%)", pointerEvents: "none" }} />
            <TagBadge label={exp.tag} />

            {/* LEFT info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.88rem", paddingTop: "1.8rem" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.9rem",
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)",
                transition: "opacity 0.8s 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.8s 0.18s cubic-bezier(0.23,1,0.32,1)",
              }}>
                <div style={{ background: "white", padding: "0.48rem", borderRadius: "0.7rem", flexShrink: 0, boxShadow: "0 4px 16px rgba(0,0,0,0.2)", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "rotate(-4deg) scale(1.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
                  <img src={exp.logo} alt="logo" style={{ height: 28, objectFit: "contain", display: "block" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.48rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 600 }}>{exp.index}</div>
                  <h3 style={{ fontSize: "0.93rem", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>{exp.role}</h3>
                  <p style={{ color: "#6ee7b7", fontSize: "0.7rem", margin: "0.08rem 0 0", fontWeight: 500 }}>{exp.company}</p>
                  <p style={{ color: "#52525b", fontSize: "0.63rem", margin: "0.05rem 0 0" }}>{exp.period}</p>
                </div>
              </div>

              <div style={{ height: 1, background: "linear-gradient(90deg, rgba(52,211,153,0.3), transparent)", animation: inView ? "lineGrow 0.8s 0.38s both" : "none" }} />

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.26rem" }}>
                {exp.points.map((item, i) => (
                  <li key={i} className="bullet-item" style={{
                    display: "flex", gap: "0.6rem", alignItems: "flex-start",
                    opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.55s ${0.32 + i * 0.065}s cubic-bezier(0.23,1,0.32,1), transform 0.55s ${0.32 + i * 0.065}s cubic-bezier(0.23,1,0.32,1)`,
                  }}>
                    <span style={{ marginTop: 7, width: 4, height: 4, background: "rgba(52,211,153,0.5)", borderRadius: "50%", flexShrink: 0 }} />
                    <p style={{ color: "#a1a1aa", fontSize: "0.73rem", margin: 0, lineHeight: 1.52 }}>{item}</p>
                  </li>
                ))}
              </ul>
              <DetailsBtn onClick={() => setFlipped(true)} inView={inView} delay="0.72s" />
            </div>

            {/* RIGHT photo */}
            <div style={{
              position: "relative", minHeight: 220, marginTop: "1.8rem",
              opacity: inView ? 1 : 0, transform: inView ? "translateX(0) scale(1)" : "translateX(36px) scale(0.96)",
              transition: "opacity 0.9s 0.22s cubic-bezier(0.23,1,0.32,1), transform 0.9s 0.22s cubic-bezier(0.23,1,0.32,1)",
            }}>
              <PhotoCarousel photos={exp.photos} label={exp.photoLabel} />
            </div>
          </div>

          {/* BACK */}
          <div className="flip-face flip-face-back" style={{ border: "1px solid rgba(52,211,153,0.18)" }}>
            <TagBadge label={exp.tag} />
            <DetailBack exp={exp} onClose={() => setFlipped(false)} visible={flipped} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ORG CARD
───────────────────────────────────────────── */
function OrgCard({ exp }) {
  const [wrapRef, inView] = useScrollInView(0.1);
  const [flipped, setFlipped] = useState(false);
  const isMobile = useIsMobile(640);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={wrapRef}
      className={`exp-wrap flip-scene org-card-height${flipped ? " is-flipped" : ""}`}
      style={{
        height: isMobile ? "auto" : 320,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.85s 0.08s cubic-bezier(0.23,1,0.32,1), transform 0.85s 0.08s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {isMobile ? (
        /* ── MOBILE ── */
        <div style={{
          borderRadius: "1.4rem", overflow: "hidden",
          background: "rgba(2,21,14,0.92)", border: "1px solid rgba(52,211,153,0.12)",
          backdropFilter: "blur(20px)",
        }}>
          <TagBadge label={exp.tag} />
          <div style={{ height: 180, position: "relative" }}>
            <PhotoCarousel photos={exp.photos} label={exp.photoLabel} />
          </div>
          <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div>
              <div style={{ fontSize: "0.48rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 600 }}>{exp.index}</div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>{exp.role}</h3>
              <p style={{ color: "#6ee7b7", fontSize: "0.65rem", margin: "0.1rem 0 0", fontWeight: 500, lineHeight: 1.4 }}>{exp.organization}</p>
            </div>

            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(52,211,153,0.3), transparent)" }} />

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.22rem" }}>
              {exp.points.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
                  <span style={{ marginTop: 6, width: 4, height: 4, background: "rgba(52,211,153,0.5)", borderRadius: "50%", flexShrink: 0 }} />
                  <p style={{ color: "#a1a1aa", fontSize: "0.7rem", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </li>
              ))}
            </ul>

            <button className="cta-btn" onClick={() => setExpanded(e => !e)} style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.4rem 0.9rem", width: "fit-content",
              background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.28)",
              borderRadius: "2rem", color: "#6ee7b7",
              fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em",
            }}>
              {expanded ? "↑ Hide Details" : "⬡ In-Depth Details"}
            </button>

            {expanded && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", paddingTop: "0.3rem", borderTop: "1px solid rgba(52,211,153,0.1)" }}>
                <div>
                  <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.3rem", textTransform: "uppercase" }}>Project</p>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", margin: 0 }}>{exp.detail.appName}</p>
                  <p style={{ color: "#6ee7b7", fontSize: "0.64rem", margin: "0.1rem 0 0" }}>{exp.detail.project}</p>
                </div>
                <p style={{ color: "#a1a1aa", fontSize: "0.68rem", lineHeight: 1.6, margin: 0 }}>{exp.detail.description}</p>
                <div>
                  <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.3rem", textTransform: "uppercase" }}>Stack & Tools</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
                    {exp.detail.tools.map((t, i) => (
                      <span key={i} style={{
                        fontSize: "0.62rem", fontWeight: 600, padding: "0.14rem 0.45rem",
                        background: `${t.color}1e`, border: `1px solid ${t.color}50`,
                        borderRadius: "0.6rem", color: "rgba(255,255,255,0.85)",
                      }}>{t.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: "0.44rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 700, margin: "0 0 0.3rem", textTransform: "uppercase" }}>Key Features</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
                    {exp.detail.features.map((f, i) => (
                      <span key={i} style={{
                        fontSize: "0.58rem", fontWeight: 600, padding: "0.14rem 0.42rem",
                        background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)",
                        borderRadius: "2rem", color: "rgba(52,211,153,0.72)",
                      }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── DESKTOP: flip ── */
        <div className={`flip-inner${flipped ? " flipped" : ""}`}>
          {/* FRONT */}
          <div className="flip-face card-front-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem",
            alignItems: "stretch",
            background: "rgba(2,21,14,0.92)", border: "1px solid rgba(52,211,153,0.12)",
            padding: "2rem", backdropFilter: "blur(20px)", boxSizing: "border-box",
          }}>
            <div style={{ position: "absolute", top: -80, left: -80, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.09), transparent 70%)", pointerEvents: "none" }} />
            <TagBadge label={exp.tag} />

            {/* LEFT photo */}
            <div style={{
              position: "relative", minHeight: 200, marginTop: "1.8rem",
              opacity: inView ? 1 : 0, transform: inView ? "translateX(0) scale(1)" : "translateX(-36px) scale(0.96)",
              transition: "opacity 0.9s 0.22s cubic-bezier(0.23,1,0.32,1), transform 0.9s 0.22s cubic-bezier(0.23,1,0.32,1)",
            }}>
              <PhotoCarousel photos={exp.photos} label={exp.photoLabel} />
            </div>

            {/* RIGHT info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.88rem", paddingTop: "1.8rem" }}>
              <div style={{
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(28px)",
                transition: "opacity 0.8s 0.28s cubic-bezier(0.23,1,0.32,1), transform 0.8s 0.28s cubic-bezier(0.23,1,0.32,1)",
              }}>
                <div style={{ fontSize: "0.48rem", letterSpacing: "0.15em", color: "rgba(52,211,153,0.38)", fontWeight: 600 }}>{exp.index}</div>
                <h3 style={{ fontSize: "0.96rem", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>{exp.role}</h3>
                <p style={{ color: "#6ee7b7", fontSize: "0.7rem", margin: "0.18rem 0 0", fontWeight: 500 }}>{exp.organization}</p>
              </div>

              <div style={{ height: 1, background: "linear-gradient(90deg, rgba(52,211,153,0.3), transparent)", animation: inView ? "lineGrow 0.8s 0.44s both" : "none" }} />

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.26rem" }}>
                {exp.points.map((item, i) => (
                  <li key={i} className="bullet-item" style={{
                    display: "flex", gap: "0.6rem", alignItems: "flex-start",
                    opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(16px)",
                    transition: `opacity 0.55s ${0.38 + i * 0.07}s cubic-bezier(0.23,1,0.32,1), transform 0.55s ${0.38 + i * 0.07}s cubic-bezier(0.23,1,0.32,1)`,
                  }}>
                    <span style={{ marginTop: 7, width: 4, height: 4, background: "rgba(52,211,153,0.5)", borderRadius: "50%", flexShrink: 0 }} />
                    <p style={{ color: "#a1a1aa", fontSize: "0.73rem", margin: 0, lineHeight: 1.52 }}>{item}</p>
                  </li>
                ))}
              </ul>
              <DetailsBtn onClick={() => setFlipped(true)} inView={inView} delay="0.78s" />
            </div>
          </div>

          {/* BACK */}
          <div className="flip-face flip-face-back" style={{ border: "1px solid rgba(52,211,153,0.18)" }}>
            <TagBadge label={exp.tag} />
            <DetailBack exp={exp} onClose={() => setFlipped(false)} visible={flipped} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Experience() {
  const [titleRef, titleInView] = useScrollInView(0.3);

  return (
    <section
      id="experience"
      className="exp-section"
      style={{
        backgroundColor: "#020a06",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        padding: "6rem clamp(1rem, 5vw, 4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{GLOBAL_STYLES}</style>

      <Orb style={{ top: "10%", left: "5%", width: 420, height: 420, background: "radial-gradient(circle, rgba(52,211,153,0.06), transparent 70%)", animationDelay: "0s" }} />
      <Orb style={{ bottom: "15%", right: "8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(16,185,129,0.05), transparent 70%)", animationDelay: "3s" }} />
      <Orb style={{ top: "55%", left: "48%", width: 300, height: 300, background: "radial-gradient(circle, rgba(52,211,153,0.03), transparent 70%)", animationDelay: "5.5s" }} />

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(52,211,153,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.025) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
      }} />

      {/* title */}
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{
          margin: "0 0 0.7rem",
          fontSize: "clamp(2rem, 6vw, 4.5rem)", fontWeight: 800,
          background: "linear-gradient(135deg, #34d399 0%, #6ee7b7 50%, #a7f3d0 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          letterSpacing: "-0.03em",
          opacity: titleInView ? 1 : 0, transform: titleInView ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          animation: titleInView ? "shimmer 5s linear infinite" : "none",
        }}>Experience</h2>

        <p style={{
          color: "#6ee7b7", fontSize: "clamp(0.58rem, 1.5vw, 0.68rem)",
          letterSpacing: "0.28em", textTransform: "uppercase", margin: "0 0 0.5rem",
          opacity: titleInView ? 1 : 0, transform: titleInView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s 0.14s cubic-bezier(0.23,1,0.32,1), transform 0.8s 0.14s cubic-bezier(0.23,1,0.32,1)",
        }}>Work · Organizational</p>

        <p style={{
          color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.7rem, 1.8vw, 0.82rem)",
          margin: "0 0 3rem", padding: "0 1rem",
          opacity: titleInView ? 1 : 0, transform: titleInView ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.8s 0.24s cubic-bezier(0.23,1,0.32,1), transform 0.8s 0.24s cubic-bezier(0.23,1,0.32,1)",
        }}>
          Click "In-Depth Details" to explore each experience
        </p>
      </div>

      {/* cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <WorkCard exp={experiences[0]} />
        <OrgCard  exp={experiences[1]} />
      </div>
    </section>
  );
}