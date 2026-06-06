import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { projects } from "../data/portfolio";

export default function Projects() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="projects" className="py-28 px-6">
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
            Projects
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Selected work
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-white/35 text-[15px] max-w-xl"
          >
            A collection of projects I've built — from AI-powered tools to real-time collaborative platforms.
          </motion.p>

          <div className="mt-14 grid lg:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                className="group relative p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
              >
                {/* Hover accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8ff00]/[0.02] blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[11px] text-white/25 font-medium mb-1">{project.subtitle}</p>
                    <h3 className="text-lg font-semibold text-white leading-tight">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
                    >
                      <Github size={14} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo"
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13.5px] text-white/38 leading-relaxed mb-5">{project.description}</p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-6">
                  {project.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2 text-[12px] text-white/30">
                      <span className="w-1 h-1 rounded-full bg-[#c8ff00]/50 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] text-white/35 bg-white/[0.04] border border-white/[0.06] rounded-md px-2 py-0.5 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpVariants} className="mt-8 text-center">
            <a
              href="https://github.com/agileee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors duration-200"
            >
              View all repositories on GitHub
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
