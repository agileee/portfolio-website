import { motion } from "framer-motion";
import { Brain, Server, Sparkles, Award } from "lucide-react";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { certifications } from "../data/portfolio";

const iconMap = {
  brain: Brain,
  server: Server,
  sparkles: Sparkles,
};

export default function Certifications() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="certifications" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.span
            variants={fadeUpVariants}
            className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold"
          >
            Certifications
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Credentials
          </motion.h2>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => {
              const Icon = iconMap[cert.icon] || Award;
              return (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#c8ff00]/[0.07] border border-[#c8ff00]/[0.12] flex items-center justify-center mb-5">
                    <Icon size={18} className="text-[#c8ff00]/60" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white">{cert.title}</h3>
                  <p className="text-white/35 text-sm mt-1">{cert.issuer}</p>
                  <p className="text-white/20 text-xs mt-3 font-medium uppercase tracking-wider">{cert.year}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
