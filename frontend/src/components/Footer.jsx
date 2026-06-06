import { Github, Linkedin, Instagram } from "lucide-react";
import { personal } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white/20 text-sm">
          © {new Date().getFullYear()} {personal.name}
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: personal.github, label: "GitHub" },
            { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
            { icon: Instagram, href: personal.instagram, label: "Instagram" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/20 hover:text-white/50 transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
