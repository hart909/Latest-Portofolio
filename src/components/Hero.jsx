import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import cvFile from "../assets/cv.pdf";
export default function Hero() {

  /* ================= ROLES ================= */
  const roles = [
    "Software Engineer",
    "Backend Developer",
    "QA Engineer"
  ];

  const displayRoles = [...roles, roles[0]];

  const controls = useAnimation();
  const ITEM_HEIGHT = 56;

  useEffect(() => {
    let mounted = true;

    async function startLoop() {
      while (mounted) {
        await controls.start({ y: -ITEM_HEIGHT, transition: { duration: 0.8, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 2000));
        await controls.start({ y: -ITEM_HEIGHT * 2, transition: { duration: 0.8, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 2000));
        await controls.start({ y: -ITEM_HEIGHT * 3, transition: { duration: 0.8, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 2000));
        controls.set({ y: 0 });
      }
    }

    startLoop();
    return () => { mounted = false };
  }, [controls]);

  /* ================= SKILLS ================= */
  const skills = [
    { name: "Django", logo: "/src/assets/Django-Logo.png" },
    { name: "Javascript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  ];

  const loopSkills = [...skills, ...skills];

  /* ================= GMAIL ================= */
  const handleContactGmail = () => {
    const to = "aldohartanto06@gmail.com";
    const subject = encodeURIComponent("Halo Aldo, ada yang ingin saya diskusikan");
    const body = encodeURIComponent("Halo Aldo,\n\n[Tulis pesanmu di sini]\n\nSalam,\n");
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">

      {/* ================= TITLE ================= */}
      <h1 className="font-bricolage text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
        Hi I'm
        <span className="block text-emerald-400">
          Aldo Hartanto Dewantoro
        </span>
      </h1>

      {/* ================= ROLE SCROLL ================= */}
      <div className="font-bricolage relative h-14 overflow-hidden mt-6 sm:mt-8 w-full max-w-xs sm:max-w-sm">
        <motion.div animate={controls}>
          {displayRoles.map((role, i) => (
            <div
              key={i}
              className="h-14 flex items-center justify-center text-lg sm:text-xl md:text-2xl text-emerald-300 font-semibold"
            >
              {role}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= CTA BUTTON ================= */}
      <div className="flex gap-3 sm:gap-5 mt-8 sm:mt-10 flex-wrap justify-center">

        {/* Download CV */}
        <a
          href={cvFile}
          download
          className="
            px-6 sm:px-8 py-2.5 sm:py-3
            rounded-full
            bg-emerald-500
            text-black text-sm sm:text-base font-semibold
            transition-all duration-300
            hover:bg-emerald-400
            hover:scale-105
            shadow-lg shadow-emerald-900/40
            flex items-center gap-2
          "
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download CV
        </a>

        {/* Contact Me — buka Gmail langsung */}
        <button
          onClick={handleContactGmail}
          className="
            px-6 sm:px-8 py-2.5 sm:py-3
            rounded-full
            border border-emerald-500
            text-emerald-300 text-sm sm:text-base font-semibold
            transition-all duration-300
            hover:bg-emerald-500/10
            hover:scale-105
            flex items-center gap-2
            cursor-pointer
            bg-transparent
          "
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Contact Me
        </button>

      </div>

      {/* ================= SKILL LOGO LOOP ================= */}
      <div className="relative w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mt-14 sm:mt-20 overflow-hidden">

        {/* fade kiri */}
        <div className="absolute left-0 top-0 h-full w-16 sm:w-36 z-10 bg-gradient-to-r from-[#020a06] to-transparent"/>

        {/* fade kanan */}
        <div className="absolute right-0 top-0 h-full w-16 sm:w-36 z-10 bg-gradient-to-l from-[#020a06] to-transparent"/>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex gap-8 sm:gap-14 w-max"
        >
          {loopSkills.map((skill, i) => (
            <div
              key={i}
              className="
                bg-[#02150e]
                border border-emerald-900/60
                rounded-xl
                px-4 sm:px-6 py-3 sm:py-4
                flex items-center justify-center
                min-w-[70px] sm:min-w-[90px]
                transition
                hover:scale-110
                hover:border-emerald-400
              "
            >
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain opacity-80"
              />
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}