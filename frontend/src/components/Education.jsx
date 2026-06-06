import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { education } from "../data/portfolio";

export default function Education() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="education" className="py-28 px-6">
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
            Education
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Academic background
          </motion.h2>

          <div className="mt-14 relative">
            <div className="absolute left-0 top-2 bottom-0 w-px bg-white/[0.06] hidden sm:block" />

            <div className="flex flex-col gap-6">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="relative sm:pl-10"
                >
                  <div className={`absolute -left-[4.5px] top-2 w-[9px] h-[9px] rounded-full hidden sm:block ${edu.current ? "bg-[#c8ff00] shadow-[0_0_12px_rgba(200,255,0,0.4)]" : "bg-white/20"}`} />

                  <div className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10] hover:bg-white/[0.03] transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {edu.current && (
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c8ff00]/60 bg-[#c8ff00]/[0.06] border border-[#c8ff00]/10 rounded-full px-2.5 py-0.5">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                        {edu.field && (
                          <p className="text-white/40 text-sm mt-0.5">{edu.field}</p>
                        )}
                        <div className="flex items-center gap-1.5 text-white/30 text-xs mt-2">
                          <GraduationCap size={11} />
                          {edu.institution}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:items-end shrink-0">
                        <div className="flex items-center gap-1.5 text-white/30 text-xs">
                          <MapPin size={11} />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-white/30 text-xs">
                          <Calendar size={11} />
                          {edu.duration}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#c8ff00]/50 text-xs font-semibold mt-1">
                          <Award size={11} />
                          {edu.grade}
                        </div>
                      </div>
                    </div>
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
