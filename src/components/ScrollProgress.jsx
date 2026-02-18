import {  motion,useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {

  const { scrollYProgress } = useScroll();

  // bikin gerakan halus (bukan kaku)
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-10 top-0 h-screen flex items-center z-50">

      {/* garis background */}
      <div className="relative h-[80%] w-[2px] bg-green-900/40">

        {/* progress fill */}
        <motion.div
          style={{ scaleY }}
          className="origin-top absolute top-0 left-0 w-[2px]
                     bg-gradient-to-b
                     from-emerald-400
                     via-green-500
                     to-emerald-700"
        />

      </div>
    </div>
  );
}
