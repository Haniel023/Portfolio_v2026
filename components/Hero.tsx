"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import type { ProfileData } from "@/lib/content";
import { useSingleTypewriter, useCyclingTypewriter } from "@/hooks/useTypewriter";

interface HeroProps {
  profile: ProfileData;
}

const CYCLING_ROLES = [
  "Full Stack Developer",
  "System Engineer",
  "Problem Solver",
  "Web Developer",
];

export default function Hero({ profile }: HeroProps) {
  const firstName = profile.name.split(" ")[0]; // "Jether"

  // Types first name once after a short delay
  const { displayed: typedName, showCursor: nameCursor } = useSingleTypewriter(
    firstName,
    90,
    700
  );

  // Cycles through roles in the badge, starts after the name is done typing (~2s)
  const { displayed: typedRole, showCursor: roleCursor } = useCyclingTypewriter(
    CYCLING_ROLES,
    { typingSpeed: 70, deletingSpeed: 40, pauseAfterType: 2400, startDelay: 1800 }
  );

  const socialLinks = [
    { icon: Github, href: profile.github, label: "GitHub", show: !!profile.github },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn", show: !!profile.linkedin },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email", show: !!profile.email },
  ].filter((l) => l.show);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Availability badge */}
        {profile.availableForWork && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-xs font-medium text-lime-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            Available for work
          </motion.div>
        )}

        {/* Name with typewriter on first name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Hey, I&apos;m{" "}
          <span className="gradient-text-violet inline-block min-w-[2ch]">
            {typedName}
            <span
              className="inline-block w-0.75 h-[0.85em] ml-0.5 align-middle rounded-sm bg-violet-400 transition-opacity"
              style={{ opacity: nameCursor ? 1 : 0 }}
            />
          </span>
        </motion.h1>

        {/* Cycling role badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="inline-flex items-center gap-2 mb-6 rounded-xl border border-white/10 bg-white/5 px-5 py-2 min-w-64 justify-center"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
          <span className="text-sm font-medium text-zinc-300 min-h-5">
            {typedRole}
            <span
              className="inline-block w-0.5 h-[0.8em] ml-0.5 align-middle rounded-sm bg-zinc-400 transition-opacity"
              style={{ opacity: roleCursor ? 1 : 0 }}
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            View my work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
