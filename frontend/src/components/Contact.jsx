import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MapPin } from "lucide-react";
import { useScrollAnimation, fadeUpVariants, staggerContainer } from "../hooks/useScrollAnimation";
import { personal } from "../data/portfolio";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { ref, controls } = useScrollAnimation();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("loading");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full bg-white/[0.03] border ${
      errors[field] ? "border-red-500/50" : "border-white/[0.08]"
    } rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-200`;

  return (
    <section id="contact" className="py-28 px-6">
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
              Contact
            </motion.span>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Let's build something together.
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mt-5 text-white/38 text-[15px] leading-relaxed"
            >
              Whether you have an opportunity, a project idea, or just want to say hello — my inbox
              is always open. I'll get back to you as soon as possible.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="mt-8 space-y-4">
              {[
                { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { icon: MapPin, label: "Location", value: personal.location, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                    <Icon size={14} className="text-white/30" />
                  </div>
                  <div>
                    <p className="text-[11px] text-white/20 uppercase tracking-wider font-medium">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-white/50 hover:text-white transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-white/50">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div variants={fadeUpVariants}>
            {status === "success" ? (
              <div className="p-8 rounded-2xl border border-[#c8ff00]/20 bg-[#c8ff00]/[0.04] text-center">
                <CheckCircle size={36} className="text-[#c8ff00]/70 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Message sent!</h3>
                <p className="text-white/40 text-sm">
                  Thanks for reaching out. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass("name")}
                      aria-label="Name"
                    />
                    {errors.name && <p className="text-red-400/70 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className={inputClass("email")}
                      aria-label="Email"
                    />
                    {errors.email && <p className="text-red-400/70 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={inputClass("subject")}
                    aria-label="Subject"
                  />
                  {errors.subject && <p className="text-red-400/70 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    className={`${inputClass("message")} resize-none`}
                    aria-label="Message"
                  />
                  {errors.message && <p className="text-red-400/70 text-xs mt-1">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400/70 text-sm">
                    <AlertCircle size={14} />
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold py-3 rounded-xl hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
