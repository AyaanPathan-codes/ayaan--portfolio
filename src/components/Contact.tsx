import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContactFloaters } from "./FloatingElements";
import emailjs from "@emailjs/browser";
import { toast } from "@/hooks/use-toast";

const SERVICE_ID = "service_8lq8xim";
const CONTACT_TEMPLATE_ID = "template_01wmm28";
const AUTOREPLY_TEMPLATE_ID = "template_1hs3ftm";
const PUBLIC_KEY = "GLTH9vcOiQ6zW-JAL";

const Contact = React.memo(() => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      await emailjs.sendForm(SERVICE_ID, CONTACT_TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSent(true);
      formRef.current.reset();
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({ title: "Failed to send", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-40 px-5 sm:px-6 relative dot-grid overflow-hidden">
      <ContactFloaters />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-primary tracking-wider mb-6">
            Get in Touch
          </span>
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-display font-bold mb-4 sm:mb-6">
            Let's <span className="text-gradient-cyan">Connect</span>
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-8 sm:mb-10 max-w-md text-sm sm:text-base">
            Got a project idea or just wanna talk tech? Hit me up — I'm always down to chat.
          </p>

          <div className="space-y-4 sm:space-y-5">
            {[
              { Icon: Mail, label: "ayaanpathan1509@gmail.com", href: "mailto:ayaanpathan1509@gmail.com" },
              { Icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/ayaan-pathan-15940b2a9/" },
              { Icon: Github, label: "GitHub Profile", href: "https://github.com/AyaanPathan-codes" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center group-hover:glow-cyan transition-shadow duration-300 shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-body relative break-all sm:break-normal">
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 green-pulse" />
            <span className="text-xs font-body text-muted-foreground">Open to Opportunities</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-2">Name</label>
              <Input
                name="from_name"
                className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-lg"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-2">Email</label>
              <Input
                name="from_email"
                type="email"
                className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-lg"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                className="flex w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading || sent}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-body font-medium text-sm disabled:opacity-70 transition-opacity"
            >
              {sent ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Sent Successfully!
                </motion.span>
              ) : loading ? (
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";
export default Contact;
