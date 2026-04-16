import { useState, useRef, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const cards = [
  {
    id: 1,
    title: "Namura Web Based Application",
    tech: ["Laravel", "PostgreSQL", "Fullstack"],
    github: "https://github.com/hart909/Laravel-Foodstore-Namura.git",
    desc: "Food ordering platform with seamless authentication, dynamic cart system, and comprehensive admin dashboard for real-time order management.",
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #0e7490 100%)",
    accentColor: "#34d399",
    accentBorder: "rgba(52,211,153,0.45)",
    accentBg: "rgba(52,211,153,0.12)",
    detail: {
      overview: "A full-stack food ordering platform built for Namura Restaurant, supporting multi-role auth, real-time order tracking, and admin analytics.",
      highlights: [
        "Multi-role authentication (Admin, Customer)",
        "Real-time cart & order management system",
        "Admin dashboard with sales analytics",
        "PostgreSQL relational schema with migrations",
        "Responsive UI with Laravel Blade + Tailwind",
      ],
      stack: ["Laravel", "PostgreSQL", "Jetstream Authentication", "REST API"],
      status: "Completed",
      year: "2024",
    },
  },
  {
    id: 2,
    title: "Europe Football Prediction Application",
    tech: ["React", "Django", "Machine Learning"],
    github: "https://github.com/hart909/Skripsi_Web.git",
    desc: "Advanced prediction system leveraging statistical modeling, historical data analysis, and REST API pipeline for accurate match forecasting for English Premier League dan Laliga.",
    gradient: "linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #7e22ce 100%)",
    accentColor: "#a78bfa",
    accentBorder: "rgba(167,139,250,0.45)",
    accentBg: "rgba(167,139,250,0.12)",
    detail: {
      overview: "ML-powered match outcome predictor for European football leagues using historical stats, ELO ratings, and ensemble modeling.",
      highlights: [
        "Negative Binomial Regression and Bayesian Hierarchical model",
        "Historical data pipeline for 6 years",
        "React frontend with live prediction dashboard",
        "Django REST API serving model inference and team data",
      ],
      stack: ["React", "Django", "Machine Learning", "PostgreSQL"],
      status: "Completed",
      year: "2025",
    },
  },
  {
    id: 3,
    title: "Mobile Social Media App",
    tech: ["Flutter", "Firebase", "Figma", "Software Engineering"],
    github: "https://github.com/hart909/FriendZone_App.git",
    desc: "FriendZone is a high-performance mobile application built with Flutter and Firebase, designed to bridge the gap between digital interaction and meaningful real-world connections.",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 40%, #3730a3 100%)",
    accentColor: "#60a5fa",
    accentBorder: "rgba(96,165,250,0.45)",
    accentBg: "rgba(96,165,250,0.12)",
    detail: {
      overview: "Flutter is used to build the application's interface and functionality based on Figma designs, while integrating with Firebase to manage real-time user data and media storage.",
      highlights: [
        "Figma for high-fidelity UI/UX design and architectural planning",
        "Flutter for developing the application's interface and core functionalities",
        "Firebase for real-time data storage, authentication, and media management",
      ],
      stack: ["Flutter", "Firebase", "Figma", "Software Engineering"],
      status: "Completed",
      year: "2024",
    },
  },
];

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

/* ─────────────────────────────────────────────
   CARD TRANSFORM (pure, no React state)
───────────────────────────────────────────── */
function calcCardTransform(index, progress, numCards) {
  const cardStart = index / numCards;
  const cardEnd   = (index + 1) / numCards;

  if (progress < cardStart) {
    const offset        = (index - progress * numCards) * 18;
    const scale         = 1 - (index - progress * numCards) * 0.05;
    const currentActive = Math.floor(progress * numCards);
    const dist          = index - currentActive;
    let opacity = 1;
    if (dist === 1) {
      const p = (progress - currentActive / numCards) / (1 / numCards);
      opacity = 0.5 + p * 0.5;
    } else if (dist >= 2) {
      opacity = 0;
    }
    return {
      transform: `translateY(${Math.max(offset, 0)}px) scale(${Math.max(scale, 0.85)})`,
      opacity,
      zIndex: numCards - index,
      pointerEvents: 'auto',
    };
  }

  if (progress >= cardEnd) {
    return {
      transform: 'translateY(-120%) scale(0.8)',
      opacity: 0,
      zIndex: numCards - index,
      pointerEvents: 'none',
    };
  }

  const cardProgress = (progress - cardStart) / (cardEnd - cardStart);
  const yMove        = cardProgress * -120;
  const scale        = 1 - cardProgress * 0.2;
  const opacity      = yMove < -30 ? Math.max(0, 1 - (yMove + 30) / -90) : 1;

  return {
    transform: `translateY(${yMove}%) scale(${scale})`,
    opacity,
    zIndex: 100 + index,
    pointerEvents: 'auto',
  };
}

/* ─────────────────────────────────────────────
   DETAIL MODAL
───────────────────────────────────────────── */
function DetailModal({ card, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => { setMounted(false); setTimeout(onClose, 400); };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 580, margin: 'auto',
          transform: mounted
            ? 'perspective(1000px) rotateY(0deg) scale(1)'
            : 'perspective(1000px) rotateY(-90deg) scale(0.85)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.35s ease',
        }}
      >
        <div style={{
          background: card.gradient, borderRadius: '1.5rem',
          border: `1px solid ${card.accentBorder}`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${card.accentBorder}`,
          overflow: 'hidden', position: 'relative',
          fontFamily: 'Bricolage Grotesque, sans-serif',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.07,
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '28px 28px', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 240, height: 240, borderRadius: '50%',
            background: `radial-gradient(circle, ${card.accentColor}30, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', padding: 'clamp(1.25rem, 5vw, 2rem)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.7rem' }}>
                  {card.tech.map((t, i) => (
                    <span key={i} style={{
                      fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: card.accentColor,
                      background: card.accentBg, border: `1px solid ${card.accentBorder}`,
                      borderRadius: '99px', padding: '0.18rem 0.55rem',
                    }}>{t}</span>
                  ))}
                </div>
                <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 800, color: 'white', margin: 0, lineHeight: 1.2 }}>
                  {card.title}
                </h2>
              </div>
              <button
                onClick={handleClose}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0, marginLeft: '1rem',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >✕</button>
            </div>
            <div style={{ height: 1, background: `linear-gradient(90deg, ${card.accentColor}50, transparent)`, marginBottom: '1.25rem' }} />
            <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.82rem)', color: 'rgba(220,230,225,0.88)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
              {card.detail.overview}
            </p>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.5rem', letterSpacing: '0.18em', fontWeight: 700, color: `${card.accentColor}99`, textTransform: 'uppercase', margin: '0 0 0.6rem' }}>
                Key Highlights
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {card.detail.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ color: card.accentColor, fontSize: '0.7rem', marginTop: '0.12rem', flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: 'clamp(0.68rem, 2vw, 0.75rem)', color: 'rgba(210,225,218,0.85)', lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.5rem', letterSpacing: '0.18em', fontWeight: 700, color: `${card.accentColor}99`, textTransform: 'uppercase', margin: '0 0 0.55rem' }}>
                Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {card.detail.stack.map((s, i) => (
                  <span key={i} style={{
                    fontSize: '0.65rem', fontWeight: 600, color: 'rgba(240,248,244,0.9)',
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '0.5rem', padding: '0.2rem 0.55rem',
                  }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: card.accentColor, boxShadow: `0 0 8px ${card.accentColor}` }} />
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: card.accentColor, letterSpacing: '0.1em' }}>{card.detail.status.toUpperCase()}</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{card.detail.year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function StackingCards() {
  // React state hanya untuk layout switches (low-freq)
  const [isFixed, setIsFixed]             = useState(false);
  const [isPast, setIsPast]               = useState(false);
  const [activeDetail, setActiveDetail]   = useState(null);
  const [currentCard, setCurrentCard]     = useState(0);
  const [sectionActive, setSectionActive] = useState(false);
  const [atEnd, setAtEnd]                 = useState(false);

  // Refs untuk RAF — zero re-render saat scroll
  const containerRef = useRef(null);
  const cardRefs     = useRef([]);
  const dotRefs      = useRef([]);
  const rafRef       = useRef(null);

  const isMobile = useIsMobile(640);
  const numCards = cards.length;

  /* mutasi DOM langsung, tanpa setState */
  const applyTransforms = useCallback((progress) => {
    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const { transform, opacity, zIndex, pointerEvents } = calcCardTransform(index, progress, numCards);
      el.style.transform     = transform;
      el.style.opacity       = opacity;
      el.style.zIndex        = zIndex;
      el.style.pointerEvents = pointerEvents;
    });

    const active = Math.min(Math.floor(progress * numCards), numCards - 1);
    dotRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.width      = i === active ? '28px' : '6px';
      el.style.background = i === active ? '#34d399' : 'rgba(255,255,255,0.2)';
    });
  }, [numCards]);

  useEffect(() => {
    const tick = () => {
      rafRef.current = null;
      if (!containerRef.current) return;

      const rect            = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight    = window.innerHeight;

      const shouldBeFixed = rect.top <= 0 && rect.bottom > windowHeight;
      const shouldBePast  = rect.bottom <= 0;

      let progress = 0;
      if (shouldBePast) {
        progress = 1;
      } else if (rect.top < windowHeight) {
        const scrollStart = Math.max(0, -rect.top);
        const scrollEnd   = Math.max(1, containerHeight - windowHeight);
        progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
      }

      // Mutasi DOM langsung — smooth tanpa jitter React
      applyTransforms(progress);

      // setState hanya untuk perubahan layout (jarang terjadi)
      const newCard   = Math.min(Math.floor(progress * numCards), numCards - 1);
      const newAtEnd  = progress >= 0.95;
      const newActive = shouldBeFixed || (progress > 0 && progress < 1);

      setIsFixed(v      => v === shouldBeFixed ? v : shouldBeFixed);
      setIsPast(v       => v === shouldBePast  ? v : shouldBePast);
      setCurrentCard(v  => v === newCard       ? v : newCard);
      setAtEnd(v        => v === newAtEnd      ? v : newAtEnd);
      setSectionActive(v => v === newActive    ? v : newActive);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    tick(); // init
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyTransforms, numCards]);

  const cardHeight    = isMobile ? 'auto' : 400;
  const cardMinHeight = isMobile ? 360 : undefined;
  const cardPadTop    = isMobile ? '11rem' : '14rem';
  const sectionPadTop = isMobile ? '3rem' : '5rem';

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: '#09090b',
        height: `${numCards * 100}vh`,
        minHeight: '300vh',
        fontFamily: 'Bricolage Grotesque, sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap');
        .sc-card-wrap {
          position: absolute; inset: 0;
          transform-origin: top center;
          will-change: transform, opacity;
        }
        .sc-dot {
          height: 6px; border-radius: 99px;
          transition: width 0.25s ease, background 0.25s ease;
          will-change: width, background;
        }
        .view-btn { transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.18s; }
        .view-btn:hover { transform: translateY(-1px); }
        .demo-btn { transition: filter 0.22s, transform 0.18s; }
        .demo-btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
      `}</style>

      {/* ── SECTION TITLE ── */}
      <div style={{ paddingTop: sectionPadTop, paddingBottom: isMobile ? '2rem' : '3rem', textAlign: 'center' }}>
        <p style={{ color: 'transparent', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
          Portfolio
        </p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 7vw, 3.8rem)', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.03em' }}>
          My Projects
        </h2>
      </div>

      {/* ── PROJECT COUNTER ── */}
      {sectionActive && !atEnd && (
        <div style={{
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '2.5rem' : isMobile ? '8.5rem' : '11rem',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 55, textAlign: 'center', pointerEvents: 'none',
          transition: 'top 0.3s ease',
        }}>
          <p style={{ color: 'transparent', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 0.18rem' }}>
            Featured Work
          </p>
          <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
            Project <span style={{ color: '#34d399' }}>{currentCard + 1}</span> / {numCards}
          </h3>
        </div>
      )}

      {/* ── CARDS CONTAINER ── */}
      <div style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: isFixed ? 0 : isPast ? 'auto' : 0,
        bottom: !isFixed && isPast ? 0 : 'auto',
        left: 0,
        width: '100%', height: '100vh',
        display: isPast && !isFixed ? 'none' : 'flex',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 40,
        paddingTop: cardPadTop,
        paddingBottom: isMobile ? '4rem' : 0,
        boxSizing: 'border-box',
      }}>
        <div style={{
          position: 'relative',
          width: '100%', maxWidth: 720,
          height: cardHeight, minHeight: cardMinHeight,
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 1.5rem',
          boxSizing: 'border-box',
        }}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              className="sc-card-wrap"
              style={{ opacity: 0 }} // init hidden; RAF sets on first tick
            >
              <div style={{
                width: '100%', height: '100%', minHeight: cardMinHeight,
                borderRadius: isMobile ? '1.1rem' : '1.5rem',
                background: card.gradient,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                overflow: 'hidden', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.09,
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '30px 30px', pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 220, height: 220,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  position: 'relative', height: '100%',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  padding: isMobile ? '1.4rem 1.3rem' : '2rem 2.2rem',
                }}>
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: isMobile ? '0.6rem' : '0.9rem' }}>
                      {card.tech.map((t, i) => (
                        <span key={i} style={{
                          fontSize: isMobile ? '0.52rem' : '0.58rem',
                          fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: card.accentColor, background: card.accentBg,
                          border: `1px solid ${card.accentBorder}`,
                          borderRadius: '99px', padding: '0.18rem 0.55rem',
                        }}>{t}</span>
                      ))}
                    </div>
                    <h3 style={{
                      fontSize: isMobile ? 'clamp(1.1rem, 5vw, 1.5rem)' : 'clamp(1.4rem, 3.5vw, 2.2rem)',
                      fontWeight: 800, color: 'white',
                      margin: isMobile ? '0 0 0.5rem' : '0 0 0.75rem',
                      lineHeight: 1.15, paddingRight: isMobile ? '2.5rem' : '3.5rem',
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '0.72rem' : '0.78rem',
                      color: 'rgba(212,220,218,0.85)', lineHeight: 1.65, margin: 0,
                      display: '-webkit-box', WebkitLineClamp: isMobile ? 4 : 3,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {card.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: isMobile ? '1rem' : '1.2rem' }}>
                    <button
                      className="view-btn"
                      onClick={() => setActiveDetail(card)}
                      style={{
                        padding: isMobile ? '0.45rem 1rem' : '0.5rem 1.25rem',
                        borderRadius: '99px', border: `1px solid ${card.accentBorder}`,
                        background: card.accentBg, color: card.accentColor,
                        fontWeight: 700, fontSize: isMobile ? '0.65rem' : '0.7rem',
                        letterSpacing: '0.05em', cursor: 'pointer',
                        fontFamily: 'Bricolage Grotesque, sans-serif',
                      }}
                    >
                      View Details
                    </button>
                    <a
                      href={card.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-btn"
                      style={{
                        padding: isMobile ? '0.45rem 1rem' : '0.5rem 1.25rem',
                        borderRadius: '99px', background: card.accentColor,
                        border: 'none', color: '#020a06', fontWeight: 800,
                        fontSize: isMobile ? '0.65rem' : '0.7rem',
                        letterSpacing: '0.05em', cursor: 'pointer',
                        fontFamily: 'Bricolage Grotesque, sans-serif',
                        boxShadow: `0 4px 20px ${card.accentColor}40`,
                        textDecoration: 'none', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      Source
                    </a>
                  </div>
                </div>

                <div style={{
                  position: 'absolute',
                  top: isMobile ? '0.9rem' : '1.2rem',
                  right: isMobile ? '0.9rem' : '1.2rem',
                  width: isMobile ? 38 : 48, height: isMobile ? 38 : 48,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: isMobile ? '0.85rem' : '1.1rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)' }}>
                    0{card.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROGRESS DOTS ── */}
      {sectionActive && !atEnd && (
        <div style={{
          position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 50, display: 'flex', gap: '0.45rem', pointerEvents: 'none',
        }}>
          {cards.map((_, i) => (
            <div
              key={i}
              ref={el => dotRefs.current[i] = el}
              className="sc-dot"
              style={{
                width: i === 0 ? '28px' : '6px',
                background: i === 0 ? '#34d399' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {activeDetail && (
        <DetailModal card={activeDetail} onClose={() => setActiveDetail(null)} />
      )}
    </section>
  );
}