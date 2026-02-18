import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
    </svg>
  );
}

// ── Responsive Hook ───────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ── Leaflet Interactive Map ───────────────────────────────────────────────────
function InteractiveMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = window.L;
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-6.1601, 106.8269],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 36px; height: 36px;
            background: rgba(52,211,153,0.2);
            border: 2px solid #34d399;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 20px rgba(52,211,153,0.5);
          ">
            <div style="
              width: 10px; height: 10px;
              background: #34d399;
              border-radius: 50%;
              box-shadow: 0 0 8px #34d399;
            "></div>
          </div>
        `,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      const marker = L.marker([-6.1601, 106.8269], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 13px;
          color: #fff;
          background: #1a1a2e;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          min-width: 140px;
        ">
          <div style="font-weight: 700; margin-bottom: 2px;">📍 Jakarta Pusat</div>
          <div style="color: rgba(255,255,255,0.5); font-size: 11px;">Indonesia</div>
        </div>
      `, { className: "dark-popup" }).openPopup();

      mapInstanceRef.current = map;
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", height: "160px" }}>
      <style>{`
        .leaflet-container { background: #0d0d1a !important; }
        .leaflet-popup-content-wrapper { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip { display: none !important; }
        .dark-popup .leaflet-popup-content-wrapper { background: transparent !important; }
        .leaflet-control-zoom a { background: rgba(20,20,30,0.9) !important; color: #fff !important; border-color: rgba(255,255,255,0.1) !important; }
        .leaflet-control-zoom a:hover { background: rgba(52,211,153,0.2) !important; }
        .leaflet-control-attribution { background: rgba(10,10,15,0.7) !important; color: rgba(255,255,255,0.3) !important; font-size: 9px !important; }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.4) !important; }
      `}</style>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        boxShadow: "inset 0 0 30px rgba(10,10,15,0.5)",
        borderRadius: "12px",
      }} />
    </div>
  );
}

// ── FloatingCard — disabled on mobile for perf ────────────────────────────────
function FloatingCard({ children, style, disabled }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);

  const onMove = useCallback((e) => {
    if (disabled) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }, [disabled]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
    >
      {!disabled && (
        <motion.div style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          background: `radial-gradient(ellipse at ${glareX} ${glareY}, rgba(255,255,255,0.09) 0%, transparent 65%)`,
          pointerEvents: "none", zIndex: 10,
        }} />
      )}
      {children}
    </motion.div>
  );
}

// ── AppleInput ────────────────────────────────────────────────────────────────
function AppleInput({ label, value, onChange, type = "text", multiline, placeholder }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%",
    background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.09)"}`,
    borderRadius: "10px",
    padding: multiline ? "10px 14px" : "11px 14px",
    color: "#fff",
    fontSize: "13px",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 400,
    outline: "none",
    resize: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    caretColor: "#fff",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{
        fontSize: "11px", fontWeight: 500,
        fontFamily: "'Bricolage Grotesque', sans-serif",
        color: focused ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
        transition: "color 0.2s", paddingLeft: "2px",
      }}>{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={onChange} placeholder={placeholder}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={base} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={base} />
      }
    </div>
  );
}

// ── ContactRow ────────────────────────────────────────────────────────────────
function ContactRow({ icon, label, value, href, delay, iconBg }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "10px 14px", borderRadius: "12px",
        background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        textDecoration: "none", transition: "all 0.2s ease", cursor: "pointer",
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: "9px",
        background: iconBg || "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.09)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, color: "#fff",
      }}>{icon}</div>
      <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
        <div style={{
          color: "rgba(255,255,255,0.3)", fontSize: "10px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 500, letterSpacing: "0.5px",
          textTransform: "uppercase", marginBottom: "1px",
        }}>{label}</div>
        <div style={{
          color: hov ? "#fff" : "rgba(255,255,255,0.75)",
          fontSize: "11px", fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 500, transition: "color 0.2s",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{value}</div>
      </div>
      <motion.span
        animate={{ x: hov ? 2 : 0, opacity: hov ? 1 : 0 }}
        style={{ marginLeft: "auto", color: "rgba(255,255,255,0.4)", fontSize: "13px", flexShrink: 0 }}
      >→</motion.span>
    </motion.a>
  );
}

// ── Ambient Orbs ──────────────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-20%", left: "15%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,100,255,0.1) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute", bottom: "-20%", right: "-5%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(60,180,255,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const isMobile = useIsMobile(768);

  const handleOpenGmail = () => {
    if (!form.name || !form.email || !form.message) return;
    const to = "aldohartanto06@gmail.com";
    const subject = encodeURIComponent(`Pesan dari ${form.name}`);
    const body = encodeURIComponent(
      `Halo Aldo,\n\n${form.message}\n\n---\nNama: ${form.name}\nEmail balasan: ${form.email}`
    );
    window.open(`https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`, "_blank");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        ::placeholder { color: rgba(255,255,255,0.18); font-family: 'Bricolage Grotesque', sans-serif; font-size: 13px; }
      `}</style>

      <section
        id="contact"
        style={{
          minHeight: "100vh",
          background: "#0a0a0f",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "60px 16px" : "80px 24px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        <AmbientOrbs />

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div style={{ maxWidth: "900px", width: "100%", position: "relative", zIndex: 2 }}>

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "6px 14px", borderRadius: "100px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                fontSize: "12px", fontWeight: 500,
                color: "rgba(255,255,255,0.75)", marginBottom: "20px",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }}
              />
              Available for new jobs
            </motion.div>

            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(36px, 8vw, 68px)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-2.5px", margin: "0 0 14px 0",
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Let's Connect
            </h1>

            <p style={{
              fontSize: isMobile ? "13px" : "14px", fontWeight: 400,
              color: "rgba(255,255,255,0.38)",
              maxWidth: "360px", margin: "0 auto", lineHeight: 1.65,
            }}>
              Feel free to reach out via direct message or email if you'd like to discuss my work further or explore potential collaborations.
            </p>
          </motion.div>

          {/* BODY — single column on mobile, 2-col on desktop */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: isMobile ? "12px" : "16px",
            alignItems: "start",
          }}>

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Map card */}
              <FloatingCard disabled={isMobile} style={{ borderRadius: "18px", marginBottom: "4px" }}>
                <div style={{
                  padding: isMobile ? "14px" : "18px", borderRadius: "18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(30px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }} />
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{
                      fontSize: "10px", fontWeight: 600,
                      color: "rgba(255,255,255,0.28)",
                      letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "3px",
                    }}>Based in</div>
                    <div style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.3px" }}>
                      Jakarta, Indonesia 🇮🇩
                    </div>
                  </div>
                  <InteractiveMap />
                </div>
              </FloatingCard>

              {/* Social rows */}
              <ContactRow
                icon={<LinkedInIcon />}
                label="LinkedIn"
                value="aldo-hartanto-dewantoro"
                href="https://www.linkedin.com/in/aldo-hartanto-dewantoro-8a2146256"
                delay={0.3}
                iconBg="rgba(10,102,194,0.45)"
              />
              <ContactRow
                icon={<GitHubIcon />}
                label="GitHub"
                value="github.com/hart909"
                href="https://github.com/hart909"
                delay={0.38}
                iconBg="rgba(36,41,47,0.85)"
              />
              <ContactRow
                icon={<GmailIcon />}
                label="Gmail"
                value="aldohartanto06@gmail.com"
                href="mailto:aldohartanto06@gmail.com"
                delay={0.46}
                iconBg="rgba(234,67,53,0.3)"
              />
            </motion.div>

            {/* RIGHT — Form */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <FloatingCard disabled={isMobile} style={{ borderRadius: "20px" }}>
                <div style={{
                  padding: isMobile ? "20px 16px" : "32px", borderRadius: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(40px)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }} />

                  <div style={{ marginBottom: isMobile ? "18px" : "24px" }}>
                    <h2 style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: isMobile ? "17px" : "20px", fontWeight: 700,
                      letterSpacing: "-0.6px", margin: "0 0 5px 0",
                    }}>Send a message</h2>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>
                      Fill this form and it will be directed to Gmail
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
                    <AppleInput label="Nama Kamu" value={form.name} placeholder="example: Aldo Hartanto"
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <AppleInput label="Email Kamu" type="email" value={form.email} placeholder="example: aldo@gmail.com"
                      onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <AppleInput label="Pesan" multiline value={form.message} placeholder="Write Down Your Message..."
                      onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={handleOpenGmail}
                    style={{
                      width: "100%", padding: "13px", borderRadius: "10px",
                      background: "#ffffff",
                      border: "none",
                      color: "#0a0a0f",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: "13px", fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 2px 16px rgba(255,255,255,0.12)",
                      transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    }}
                  >
                    <GmailIcon />
                    Buka di Gmail
                  </motion.button>

                  <p style={{
                    textAlign: "center", color: "rgba(255,255,255,0.18)",
                    fontSize: "11px", margin: "12px 0 0 0", lineHeight: 1.5,
                  }}>
                    Akan membuka tab Gmail baru dengan pesan yang sudah terisi otomatis.
                  </p>
                </div>
              </FloatingCard>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              textAlign: "center", marginTop: isMobile ? "28px" : "40px",
              color: "rgba(255,255,255,0.15)",
              fontSize: "11px", letterSpacing: "0.2px",
            }}
          >
            Designed & built with care — {new Date().getFullYear()}
          </motion.p>
        </div>
      </section>
    </>
  );
}