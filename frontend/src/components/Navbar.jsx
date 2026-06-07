import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personal } from "../data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
            className="text-white font-semibold tracking-tight text-sm"
          >
            {personal.name.split(" ")[0]}
            <span className="text-[#c8ff00]">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 font-medium tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

            <a
              href="/resume.pdf"
              download="Akhil_Resume.pdf"
              className="hidden lg:flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              Resume
            </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.06] lg:hidden"
          >
            <nav className="flex flex-col py-4 px-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-3 text-white/60 hover:text-white text-sm font-medium transition-colors border-b border-white/[0.04] last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download="Akhil_Resume.pdf"
                onClick={() => setMenuOpen(false)}
                className="mt-4 py-3 text-center rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
