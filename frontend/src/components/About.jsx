import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code2 } from "lucide-react";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { personal } from "../data/portfolio";

const stats = [
  { label: "CGPA", value: "8.76", sub: "MIT Bengaluru" },
  { label: "DSA Problems", value: "200+", sub: "LeetCode" },
  { label: "UI Components Built", value: "15+", sub: "in production" },
  { label: "APIs Tested", value: "20+", sub: "with Postman" },
];

export default function About() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left */}
          <div>
            <motion.span
              variants={fadeUpVariants}
              className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold"
            >
              About
            </motion.span>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight"
            >
              Engineering experiences,
              <span className="text-white/30"> not just products.</span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mt-6 text-white/45 leading-relaxed text-[15px]"
            >
              {personal.summary}
            </motion.p>

            <motion.p
              variants={fadeUpVariants}
              className="mt-4 text-white/35 leading-relaxed text-[15px]"
            >
              I'm passionate about building systems that are not just functional, but thoughtfully
              engineered — with clean architecture, real-time capabilities, and seamless user
              experiences. Currently in my third year at MIT Bengaluru, constantly pushing the
              boundaries of what I can build.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col gap-3"
            >
              {[
                { icon: MapPin, text: personal.location },
                { icon: GraduationCap, text: "B.Tech CSE, Manipal Institute of Technology" },
                { icon: Code2, text: "200+ LeetCode problems solved" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/35 text-sm">
                  <Icon size={14} className="text-[#c8ff00]/60 shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Stats */}
          <motion.div variants={fadeUpVariants} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold text-[#c8ff00]/70 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs text-white/25">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
