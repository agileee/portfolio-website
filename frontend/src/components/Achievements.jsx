import { motion } from "framer-motion";
import { Code2, GraduationCap, Briefcase, Star } from "lucide-react";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { achievements } from "../data/portfolio";

const iconMap = {
  code: Code2,
  graduation: GraduationCap,
  briefcase: Briefcase,
  star: Star,
};

export default function Achievements() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="achievements" className="py-28 px-6">
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
            Achievements
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Milestones
          </motion.h2>

          <div className="mt-14 grid sm:grid-cols-2 gap-5">
            {achievements.map((item, i) => {
              const Icon = iconMap[item.icon] || Star;
              return (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="group p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-[#c8ff00]/20 group-hover:bg-[#c8ff00]/[0.05] transition-all duration-300">
                      <Icon size={18} className="text-white/30 group-hover:text-[#c8ff00]/60 transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/20">
                        {item.category}
                      </span>
                      <h3 className="text-[15px] font-semibold text-white mt-1 leading-snug">{item.title}</h3>
                      <p className="text-white/35 text-sm mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
