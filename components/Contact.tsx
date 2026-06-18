"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import AnimateIn from "./AnimateIn";
import type { ProfileData } from "@/lib/content";

interface ContactProps {
  profile: ProfileData;
}

export default function Contact({ profile }: ContactProps) {
  const links = [
    { icon: Github, label: "GitHub", href: profile.github, show: !!profile.github },
    { icon: Linkedin, label: "LinkedIn", href: profile.linkedin, show: !!profile.linkedin },
  ].filter((l) => l.show);

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 p-10 md:p-16 text-center">

            {/* Background glows */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-600/10 blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

            <div className="relative z-10">
              {/* Availability pill */}
              {profile.availableForWork && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 mb-8 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-xs font-medium text-lime-400"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
                  </span>
                  Open to new opportunities
                </motion.div>
              )}

              {/* Heading */}
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                Let&apos;s build something
                <br />
                <span className="gradient-text-violet">together.</span>
              </h2>

              <p className="text-zinc-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                Whether it&apos;s a job opportunity, a project, or just a hello —
                my inbox is always open.
              </p>

              {/* Primary CTA */}
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center gap-3 rounded-2xl bg-violet-600 px-8 py-4 text-base font-semibold text-white hover:bg-violet-500 transition-colors mb-10 shadow-lg shadow-violet-600/25"
              >
                <Mail className="w-5 h-5" />
                {profile.email}
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </motion.a>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 bg-white/10" />
                <span className="text-xs text-zinc-600">or find me on</span>
                <div className="h-px w-16 bg-white/10" />
              </div>

              {/* Social + location row */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {links.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </motion.a>
                ))}

                {profile.location && (
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-4 py-2.5 text-sm text-zinc-500">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
