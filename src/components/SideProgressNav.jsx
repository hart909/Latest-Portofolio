import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function SideProgressNav() {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  const [active, setActive] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  const sections = [
    { id: "home", label: "Home", offset: 0 },
    { id: "about", label: "About", offset: -170 },
    { id: "experience", label: "Experience", offset: -80 },
    { id: "projects", label: "Projects", offset: -170 },
    { id: "contact", label: "Contact", offset: -120 },
  ];

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          current = sec.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const section = sections.find((s) => s.id === id);
    const OFFSET = section?.offset ?? 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Di mobile: tampilkan bottom nav dots horizontal
  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "10px 20px",
          borderRadius: "100px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
            }}
          >
            <div
              style={{
                width: active === sec.id ? 8 : 5,
                height: active === sec.id ? 8 : 5,
                borderRadius: "50%",
                background: active === sec.id ? "#fff" : "rgba(255,255,255,0.3)",
                boxShadow: active === sec.id ? "0 0 8px rgba(255,255,255,0.9)" : "none",
                transition: "all 0.25s ease",
              }}
            />
            {active === sec.id && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.8px",
                  color: "#fff",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {sec.label.toUpperCase()}
              </motion.span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Desktop: side nav vertikal seperti semula
  return (
    <div
      style={{
        position: "fixed",
        left: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        height: "60vh",
        width: "40px",
        zIndex: 60,
        pointerEvents: "auto",
      }}
    >
      {/* garis base */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "2px",
          height: "100%",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "2px",
        }}
      />

      {/* progress glow */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "2px",
          height: "100%",
          scaleY: progress,
          transformOrigin: "top",
          background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.2))",
          boxShadow: "0 0 12px rgba(255,255,255,0.9)",
          borderRadius: "2px",
        }}
      />

      {/* dots + label */}
      {sections.map((sec, i) => (
        <div
          key={sec.id}
          onClick={() => scrollToSection(sec.id)}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: `${(i / (sections.length - 1)) * 100}%`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: active === sec.id ? 10 : 6,
              height: active === sec.id ? 10 : 6,
              borderRadius: "50%",
              background: active === sec.id ? "#fff" : "rgba(255,255,255,0.35)",
              boxShadow: active === sec.id ? "0 0 10px rgba(255,255,255,0.9)" : "none",
              transition: "all 0.25s ease",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "18px",
              whiteSpace: "nowrap",
              fontSize: "12px",
              letterSpacing: "1px",
              color: active === sec.id ? "#ffffff" : "rgba(255,255,255,0.4)",
              transition: "color 0.3s",
              fontWeight: 500,
            }}
          >
            {sec.label.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}