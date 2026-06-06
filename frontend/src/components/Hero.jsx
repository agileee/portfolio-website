import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { personal } from "../data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8ff00]/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-[80px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/40 tracking-widest uppercase border border-white/[0.08] rounded-full px-4 py-1.5 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff00] animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-[0.95] mb-6"
        >
          {personal.name.split(" ")[0]}
          <span className="block text-white/20">{personal.name.split(" ")[1]}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-white/40 font-medium mb-4 tracking-wide"
        >
          {personal.title}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-white/25 max-w-xl mx-auto leading-relaxed mb-12"
        >
          {personal.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-[#c8ff00] text-black text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#d4ff33] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail size={15} />
            Get in touch
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all duration-200"
          >
            View work
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: personal.github, label: "GitHub" },
            { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 hover:text-white/40 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
