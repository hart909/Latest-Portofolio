import { useEffect, useRef, useState, useMemo } from "react";

import untarLogo   from "../assets/untar.png";
import penaburLogo from "../assets/penabur.png";
import huaweiLogo  from "../assets/huawei.png";
import ksnLogo     from "../assets/ksn.png";

/* ──────────────────────────────────────────────
   SCROLL RE-TRIGGER HOOK
─────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────
   3D TILT HOOK
─────────────────────────────────────────────── */
function useTilt(strength = 8) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r  = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        setTilt({ rx: -dy * strength, ry: dx * strength, gx: 50 + dx * 28, gy: 50 + dy * 28 });
      });
    };
    const onLeave = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }));
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return [ref, tilt];
}

/* ──────────────────────────────────────────────
   DATA
─────────────────────────────────────────────── */
const education = [
  {
    period: "2022 – 2026",
    degree: "Bachelor of Computer Science (S1)",
    institution: "Universitas Tarumanagara",
    status: "Fresh Graduate",
    statusActive: true,
    instLogo: untarLogo,
    awards: [
      {
        icon: huaweiLogo,
        iconType: "img",
        title: "HCIA – Artificial Intelligence",
        body: "Certified Huawei ICT Academy, specializing in Artificial Intelligence",
      },
    ],
  },
  {
    period: "2019 – 2022",
    degree: "Senior High School",
    institution: "SMAK 2 Penabur Jakarta",
    status: "Graduated",
    statusActive: false,
    instLogo: penaburLogo,
    awards: [
      {
        icon: "#3",
        iconType: "emoji",
        title: "Top 3 Best Graduate",
        body: "Ranked among the top 3 graduates of the graduating class",
      },
      {
        icon: ksnLogo,
        iconType: "img",
        title: "Top 10 KSN Informatika 2019",
        body: "Jakarta Regional — National Science Olympiad in Informatics",
      },
    ],
  },
];

/* ──────────────────────────────────────────────
   TWINKLING STARS
─────────────────────────────────────────────── */
function Stars() {
  const stars = useMemo(() => {
    const rng = (s) => { let x = Math.sin(s + 1) * 10000; return x - Math.floor(x); };
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      top:      `${rng(i * 3)     * 100}%`,
      left:     `${rng(i * 3 + 1) * 100}%`,
      size:     rng(i * 3 + 2) < 0.55 ? 1.5 : rng(i * 3 + 2) < 0.88 ? 2 : 2.8,
      delay:    `${(rng(i * 7)  * 7).toFixed(2)}s`,
      duration: `${(2.2 + rng(i * 11) * 4.5).toFixed(2)}s`,
    }));
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          top: s.top, left: s.left,
          width: s.size, height: s.size,
          borderRadius: "50%",
          background: "white",
          boxShadow: `0 0 ${s.size * 3}px rgba(255,255,255,0.9), 0 0 ${s.size}px rgba(110,231,183,0.6)`,
          animation: `starTwinkle ${s.duration} ${s.delay} ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   LOGO PEDESTAL
─────────────────────────────────────────────── */
function LogoPedestal({ src, alt, size = 40 }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: size + 18, height: size + 18,
        borderRadius: "0.8rem",
        background: "rgba(255,255,255,0.97)",
        border: `1.5px solid ${hov ? "rgba(52,211,153,0.5)" : "rgba(200,200,200,0.35)"}`,
        boxShadow: hov
          ? "0 10px 32px rgba(0,0,0,0.45), 0 0 0 2px rgba(52,211,153,0.22)"
          : "0 4px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        transition: "transform 0.32s cubic-bezier(0.23,1,0.32,1), box-shadow 0.32s, border-color 0.3s",
        transform: hov ? "scale(1.12) rotate(-4deg)" : "scale(1)",
        cursor: "default",
      }}
    >
      <img src={src} alt={alt}
        style={{ width: size, height: size, objectFit: "contain", display: "block" }}
        onError={e => { e.target.style.display = "none"; }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   GLOBAL STYLES
─────────────────────────────────────────────── */
const STYLES = `
  @keyframes starTwinkle {
    0%,100% { opacity: 0.06; transform: scale(0.7); }
    50%      { opacity: 1;   transform: scale(1.5); }
  }
  @keyframes orbDrift {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(16px,-22px) scale(1.04); }
    66%  { transform: translate(-14px,-8px) scale(0.97); }
    100% { transform: translate(0,0) scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes dotPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.6); }
    50%     { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(26px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes lineGrow {
    from { transform: scaleY(0); transform-origin: top; }
    to   { transform: scaleY(1); }
  }
  @keyframes cardBreath {
    0%,100% { box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(52,211,153,0.1); }
    50%     { box-shadow: 0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(52,211,153,0.22), 0 0 40px rgba(52,211,153,0.06); }
  }

  .award-row {
    transition: background 0.25s, transform 0.25s;
    cursor: default;
  }
  .award-row:hover {
    background: rgba(52,211,153,0.1) !important;
    transform: translateX(6px);
  }
  .award-row:hover .award-title { color: #a7f3d0 !important; }

  /* ── RESPONSIVE ── */

  /* tablet & mobile: stack jadi 1 kolom */
  @media (max-width: 768px) {
    .timeline-grid {
      grid-template-columns: 1fr !important;
      gap: 0 !important;
    }
    .timeline-spine {
      display: none !important;
    }
    .card-offset {
      padding-top: 0 !important;
    }
  }

  /* mobile: kurangi padding section */
  @media (max-width: 480px) {
    .about-section {
      padding: 4rem 1rem !important;
    }
    .about-inner {
      max-width: 100% !important;
    }
    .edu-card-inner {
      padding: 1.2rem !important;
      border-radius: 1.1rem !important;
    }
    .award-row {
      padding: 0.5rem 0.6rem !important;
      border-radius: 0.7rem !important;
    }
    /* tilt dinonaktifkan di touch: transform dikunci ke 0 */
    .edu-card-wrap {
      perspective: none !important;
    }
  }

  /* medium: sedikit kurangi padding */
  @media (min-width: 481px) and (max-width: 768px) {
    .about-section {
      padding: 5rem 1.5rem !important;
    }
    .edu-card-inner {
      padding: 1.5rem !important;
    }
  }
`;

/* ──────────────────────────────────────────────
   TIMELINE SPINE
─────────────────────────────────────────────── */
function TimelineSpine() {
  const [ref, inView] = useScrollInView(0.1);
  return (
    <div ref={ref} className="timeline-spine" style={{
      display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "3rem",
    }}>
      <div style={{
        width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
        background: "#34d399", boxShadow: "0 0 14px #34d399",
        opacity: inView ? 1 : 0,
        animation: inView ? "dotPulse 2.6s ease-in-out infinite, fadeUp 0.4s both" : "none",
      }} />
      <div style={{
        width: 1, flexGrow: 1, minHeight: 60,
        background: "linear-gradient(180deg, rgba(52,211,153,0.6), rgba(52,211,153,0.06))",
        opacity: inView ? 1 : 0,
        animation: inView ? "lineGrow 0.9s 0.2s ease-out both" : "none",
      }} />
      <div style={{
        width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
        background: "rgba(52,211,153,0.3)",
        opacity: inView ? 1 : 0,
        animation: inView ? "fadeUp 0.4s 0.9s both" : "none",
      }} />
    </div>
  );
}

/* ──────────────────────────────────────────────
   EDU CARD
─────────────────────────────────────────────── */
function EduCard({ edu, slideDir, animDelay = 0 }) {
  const [scrollRef, inView] = useScrollInView(0.1);
  const [tiltRef, tilt]     = useTilt(8);
  const enterKf = slideDir === "left" ? "fadeLeft" : "fadeRight";

  // on mobile, fadeUp instead of left/right
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mergeRef = (el) => {
    scrollRef.current = el;
    tiltRef.current   = el;
  };

  return (
    <div
      ref={mergeRef}
      className="edu-card-wrap"
      style={{
        opacity:   inView ? undefined : 0,
        animation: inView
          ? `${isMobile ? "fadeUp" : enterKf} 0.75s ${animDelay}s cubic-bezier(0.23,1,0.32,1) both`
          : "none",
        perspective: "900px",
        willChange: "transform",
      }}
    >
      <div
        className="edu-card-inner"
        style={{
          borderRadius: "1.6rem",
          padding: "1.8rem",
          backdropFilter: "blur(24px)",
          position: "relative",
          overflow: "hidden",
          animation: "cardBreath 5s ease-in-out infinite",
          transform: isMobile ? "none" : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.1s ease-out",
          background: `radial-gradient(ellipse at ${tilt.gx}% ${tilt.gy}%, rgba(52,211,153,0.09) 0%, rgba(4,20,11,0) 55%), rgba(4,20,11,0.96)`,
          border: "1px solid rgba(52,211,153,0.13)",
        }}
      >
        {/* corner glow */}
        <div style={{
          position: "absolute",
          top: -50, [slideDir === "left" ? "right" : "left"]: -50,
          width: 160, height: 160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* header */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.85rem",
          marginBottom: "1.2rem",
          flexWrap: "wrap",
        }}>
          <LogoPedestal src={edu.instLogo} alt={edu.institution} size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.55rem",
              marginBottom: "0.32rem", flexWrap: "wrap",
            }}>
              <span style={{
                fontSize: "0.55rem", letterSpacing: "0.16em", fontWeight: 700,
                color: "rgba(110,231,183,0.8)",
              }}>{edu.period}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: edu.statusActive ? "#34d399" : "rgba(110,231,183,0.4)",
                  boxShadow: edu.statusActive ? "0 0 8px #34d399" : "none",
                  animation: edu.statusActive ? "dotPulse 2.4s ease-in-out infinite" : "none",
                }} />
                <span style={{
                  fontSize: "0.46rem", letterSpacing: "0.14em", fontWeight: 700,
                  color: edu.statusActive ? "rgba(52,211,153,0.9)" : "rgba(110,231,183,0.55)",
                }}>{edu.status.toUpperCase()}</span>
              </div>
            </div>
            <p style={{
              fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.04em",
              color: "rgba(110,231,183,0.6)", margin: "0 0 0.22rem",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{edu.institution}</p>
            <h3 style={{
              fontSize: "clamp(0.88rem, 2.5vw, 1.18rem)",
              fontWeight: 700, color: "rgba(255,255,255,0.96)",
              margin: 0, lineHeight: 1.28,
            }}>{edu.degree}</h3>
          </div>
        </div>

        {/* divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, rgba(52,211,153,0.3), transparent)",
          marginBottom: "1rem",
        }} />

        {/* awards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {edu.awards.map((a, i) => (
            <div key={i} className="award-row" style={{
              display: "flex", alignItems: "flex-start", gap: "0.65rem",
              padding: "0.65rem 0.8rem",
              background: "rgba(52,211,153,0.05)",
              border: "1px solid rgba(52,211,153,0.1)",
              borderRadius: "0.9rem",
              opacity: inView ? 1 : 0,
              animation: inView
                ? `fadeUp 0.5s ${animDelay + 0.22 + i * 0.1}s cubic-bezier(0.23,1,0.32,1) both`
                : "none",
            }}>
              {a.iconType === "img" ? (
                <LogoPedestal src={a.icon} alt={a.title} size={22} />
              ) : (
                <div style={{
                  width: 38, height: 38, borderRadius: "0.7rem", flexShrink: 0,
                  background: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem",
                }}>{a.icon}</div>
              )}
              <div style={{ minWidth: 0 }}>
                <p className="award-title" style={{
                  fontSize: "clamp(0.72rem, 2vw, 0.78rem)", fontWeight: 700,
                  color: "rgba(255,255,255,0.94)",
                  margin: "0 0 0.14rem", lineHeight: 1.3,
                  transition: "color 0.25s",
                }}>{a.title}</p>
                <p style={{
                  fontSize: "clamp(0.6rem, 1.8vw, 0.65rem)",
                  color: "rgba(200,210,205,0.82)",
                  margin: 0, lineHeight: 1.55,
                }}>{a.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* watermark */}
        <div style={{
          position: "absolute", bottom: "0.6rem", right: "1.1rem",
          fontSize: "3.5rem", fontWeight: 800,
          color: "rgba(52,211,153,0.04)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>{edu.statusActive ? "01" : "02"}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN EXPORT
─────────────────────────────────────────────── */
export default function About() {
  const [titleRef, titleInView] = useScrollInView(0.3);

  return (
    <section
      id="about"
      className="about-section"
      style={{
        backgroundColor: "#020a06",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        padding: "6rem clamp(1rem, 5vw, 4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{STYLES}</style>

      <Stars />

      {[
        { top: "6%",    left: "3%",  w: 460, delay: "0s",  dur: "14s" },
        { top: "55%",   left: "56%", w: 340, delay: "5s",  dur: "11s" },
        { bottom: "8%", right: "4%", w: 520, delay: "3s",  dur: "16s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          top: o.top, left: o.left, bottom: o.bottom, right: o.right,
          width: o.w, height: o.w,
          background: "radial-gradient(circle, rgba(52,211,153,0.055), transparent 70%)",
          animation: `orbDrift ${o.dur} ${o.delay} ease-in-out infinite`,
        }} />
      ))}

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(52,211,153,0.022) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(52,211,153,0.022) 1px, transparent 1px)`,
        backgroundSize: "58px 58px",
        maskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, black 30%, transparent 100%)",
      }} />

      <div className="about-inner" style={{ maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            fontWeight: 800, margin: "0 0 0.7rem", letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #34d399 0%, #6ee7b7 55%, #a7f3d0 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            opacity: titleInView ? 1 : 0,
            animation: titleInView
              ? "fadeUp 0.8s cubic-bezier(0.23,1,0.32,1) both, shimmer 5s linear 1s infinite"
              : "none",
          }}>About Me</h2>

          <p style={{
            fontSize: "clamp(0.8rem, 2vw, 0.96rem)",
            color: "rgba(200,215,208,0.78)",
            maxWidth: 440, margin: "0 auto",
            lineHeight: 1.78, fontWeight: 400,
            padding: "0 1rem",
            opacity: titleInView ? 1 : 0,
            animation: titleInView ? "fadeUp 0.7s 0.14s cubic-bezier(0.23,1,0.32,1) both" : "none",
          }}>
            Computer Science graduate with a strong focus on Software Engineering and the full SDLC, dedicated to planning, building, and refining high-quality digital solutions.
          </p>
        </div>

        {/* timeline — 3 col desktop, 1 col mobile */}
        <div className="timeline-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 36px 1fr",
          gap: "0 1.2rem",
          alignItems: "start",
        }}>
          <EduCard edu={education[0]} slideDir="left"  animDelay={0} />
          <TimelineSpine />
          <div className="card-offset" style={{ paddingTop: "2.5rem" }}>
            <EduCard edu={education[1]} slideDir="right" animDelay={0.08} />
          </div>
        </div>

      </div>
    </section>
  );
}