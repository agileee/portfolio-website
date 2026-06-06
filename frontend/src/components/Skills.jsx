import { motion } from "framer-motion";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { skills } from "../data/portfolio";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="skills" className="py-28 px-6">
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
            Skills
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
          >
            Technical expertise
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-white/35 text-[15px] max-w-xl"
          >
            A curated set of technologies I've worked with across full-stack development, AI/ML, and systems design.
          </motion.p>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                variants={fadeUpVariants}
                custom={i}
                className="group p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10] hover:bg-white/[0.03] transition-all duration-300"
              >
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#c8ff00]/60 mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[12px] text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1 font-medium group-hover:text-white/65 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
