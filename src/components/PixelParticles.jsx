import { motion } from "framer-motion";

export default function PixelParticles() {

  // jumlah pixel
  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {particles.map((_, i) => {

        // random value
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        return (
          <motion.div
            key={i}
            className="absolute bg-emerald-400/40"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-20px",
            }}
            animate={{
              y: [-20, -800],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
