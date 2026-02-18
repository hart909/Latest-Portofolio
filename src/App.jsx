import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ArrowRight
} from "lucide-react";


import Experience from "./components/Experience";
import Reveal from "./components/Reveal";
import Hero from "./components/Hero";
import PixelParticles from "./components/PixelParticles";
import Projects from "./components/Projects";
import About from "./components/About";
import SideProgressNav from "./components/SideProgressNav";
import Contact from "./components/Contact";

export default function Portfolio() {

  const projects = [
    {
      title: "Namura E-Commerce Platform",
      tech: "Laravel • PostgreSQL • Fullstack",
      desc: "Built a scalable food ordering platform featuring authentication, product categorization, shopping cart, and admin dashboard with optimized database queries.",
    },
    {
      title: "Europe Football Prediction",
      tech: "React • Django • Machine Learning",
      desc: "Prediction system using statistical modeling and real-time visualization powered by a REST API and structured data pipeline.",
    },
  ];

  return (
    
    
    <div className="bg-[#020a06] text-zinc-100 min-h-screen overflow-x-hidden">
<SideProgressNav />


{/* ===== GLOW ATAS ===== */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        pointerEvents: "none",
        zIndex: 50,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
      }}
    />

    {/* ===== GLOW BAWAH ===== */}
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100px",
        pointerEvents: "none",
        zIndex: 50,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
      }}
    />
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px]
          w-[700px] h-[700px]
          bg-emerald-900/30 blur-[220px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-200px]
          w-[700px] h-[700px]
          bg-green-700/20 blur-[220px] rounded-full" />
      </div>

      {/* ================= HERO ================= */}
      <section id="home">
        <PixelParticles/>
        <Hero/>
      </section>


      {/* ================= ABOUT ================= */}
      <section id="about" className="max-w-6xl mx-auto px-20 py-32">
        <About/>
      </section>


      {/* ================= EXPERIENCE ================= */}
      {/* HAPUS section wrapper, Reveal, langsung Experience aja */}
      <Reveal>
      <Experience />
      </Reveal>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="max-w-6xl mx-auto px-20 py-32">
        
        <Reveal>
          <Projects />
        </Reveal>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-32 px-6 text-center bg-[#010805]">
        <Reveal>
          <Contact/>
        </Reveal>
      </section>

      <footer className="text-center text-zinc-600 py-10 border-t border-emerald-950">
        © {new Date().getFullYear()} Aldo Hartanto Dewantoro
      </footer>

    </div>
  );
}