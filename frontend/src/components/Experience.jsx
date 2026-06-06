import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { experience } from "../data/portfolio";

export default function Experience() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="experience" className="py-28 px-6">
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
            Experience
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Work history
          </motion.h2>

          <div className="mt-14 relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-2 bottom-0 w-px bg-white/[0.06] hidden sm:block" />

            <div className="flex flex-col gap-10">
              {experience.map((job, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="relative sm:pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[4.5px] top-2 w-[9px] h-[9px] rounded-full bg-[#c8ff00] hidden sm:block shadow-[0_0_12px_rgba(200,255,0,0.4)]" />

                  <div className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10] hover:bg-white/[0.03] transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c8ff00]/60 bg-[#c8ff00]/[0.06] border border-[#c8ff00]/10 rounded-full px-2.5 py-0.5">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mt-2">{job.role}</h3>
                        <p className="text-white/50 font-medium text-sm mt-0.5">{job.company}</p>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:items-end">
                        <div className="flex items-center gap-1.5 text-white/30 text-xs">
                          <Calendar size={11} />
                          {job.duration}
                        </div>
                        <div className="flex items-center gap-1.5 text-white/30 text-xs">
                          <MapPin size={11} />
                          {job.location}
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-2.5">
                      {job.responsibilities.map((r, j) => (
                        <li key={j} className="flex gap-3 text-[14px] text-white/40 leading-relaxed">
                          <span className="text-[#c8ff00]/40 mt-1 shrink-0">→</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
