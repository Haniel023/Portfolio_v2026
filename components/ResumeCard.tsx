"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Printer, Github, Linkedin, Mail, MapPin,
  Briefcase, GraduationCap, Code2, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import type { PortfolioContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const colorMap = {
  violet: "text-violet-400 bg-violet-500/15 border-violet-500/25",
  cyan:   "text-cyan-400   bg-cyan-500/15   border-cyan-500/25",
  lime:   "text-lime-400   bg-lime-500/15   border-lime-500/25",
  orange: "text-orange-400 bg-orange-500/15 border-orange-500/25",
};

export default function ResumeCard({ content }: { content: PortfolioContent }) {
  const [isNight, setIsNight] = useState(false);
  const { profile, skills, experience, education } = content;

  const dayPhoto  = "/photo-day.jpg";
  const nightPhoto = "/photo-night.jpg";

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .resume-shell { box-shadow: none !important; min-height: unset !important; }
        }
      `}</style>

      {/* Page wrapper */}
      <div
        className={cn(
          "min-h-screen py-10 px-4 transition-colors duration-500 no-print-bg",
          isNight ? "bg-zinc-950" : "bg-slate-200"
        )}
      >
        {/* Floating controls */}
        <div className="no-print fixed top-6 right-6 z-50 flex items-center gap-2">
          {/* Back to portfolio */}
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all",
              isNight
                ? "border-white/10 bg-zinc-900 text-zinc-400 hover:text-white"
                : "border-zinc-300 bg-white text-zinc-500 hover:text-zinc-900"
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Portfolio
          </Link>

          {/* Day / Night toggle */}
          <button
            onClick={() => setIsNight(!isNight)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-300",
              isNight
                ? "border-violet-500/40 bg-violet-600/20 text-violet-300 hover:bg-violet-600/30"
                : "border-amber-400/40 bg-amber-50 text-amber-700 hover:bg-amber-100"
            )}
          >
            <AnimatePresence mode="wait">
              {isNight ? (
                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-3.5 h-3.5" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-3.5 h-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
            {isNight ? "Day mode" : "Night mode"}
          </button>

          {/* Print */}
          <button
            onClick={() => window.print()}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all",
              isNight
                ? "border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50"
            )}
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>
        </div>

        {/* Resume card */}
        <motion.div
          layout
          className={cn(
            "resume-shell max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl flex transition-colors duration-500",
            isNight ? "shadow-violet-900/30" : "shadow-zinc-400/40"
          )}
        >

          {/* ── LEFT SIDEBAR ── */}
          <div
            className={cn(
              "w-72 shrink-0 flex flex-col transition-colors duration-500",
              isNight ? "bg-zinc-900" : "bg-zinc-900"
            )}
          >
            {/* Photo */}
            <div className="relative overflow-hidden aspect-square w-full">
              <AnimatePresence mode="wait">
                {isNight ? (
                  <motion.img
                    key="night"
                    src={nightPhoto}
                    alt="Sleeping"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback: show day photo with night filter
                      (e.target as HTMLImageElement).src = dayPhoto;
                      (e.target as HTMLImageElement).style.filter =
                        "brightness(0.5) saturate(0.6) hue-rotate(200deg)";
                    }}
                  />
                ) : (
                  <motion.img
                    key="day"
                    src={dayPhoto}
                    alt={profile.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-zinc-900 to-transparent" />

              {/* Night mode overlay badge */}
              <AnimatePresence>
                {isNight && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 left-0 right-0 flex justify-center"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-900/60 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur-sm">
                      <Moon className="w-3 h-3" />
                      Currently resting…
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 p-6 space-y-6">

              {/* Contact */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Contact</p>
                <ul className="space-y-2.5">
                  {profile.email && (
                    <li className="flex items-start gap-2.5">
                      <Mail className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-zinc-300 break-all">{profile.email}</span>
                    </li>
                  )}
                  {profile.location && (
                    <li className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-zinc-300">{profile.location}</span>
                    </li>
                  )}
                  {profile.github && (
                    <li className="flex items-start gap-2.5">
                      <Github className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                      <a href={profile.github} className="text-xs text-zinc-300 hover:text-violet-300 transition-colors break-all">
                        {profile.github.replace("https://", "")}
                      </a>
                    </li>
                  )}
                  {profile.linkedin && (
                    <li className="flex items-start gap-2.5">
                      <Linkedin className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                      <a href={profile.linkedin} className="text-xs text-zinc-300 hover:text-violet-300 transition-colors break-all">
                        {profile.linkedin.replace("https://www.", "").replace("/", "").split("/")[0]}/{profile.linkedin.split("/in/")[1]?.replace("/", "")}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/8" />

              {/* Skills */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-1.5">
                  <Code2 className="w-3 h-3" />
                  Skills
                </p>
                <div className="space-y-4">
                  {skills.map((group) => (
                    <div key={group.label}>
                      <p className={cn(
                        "text-[10px] font-semibold uppercase tracking-widest mb-2",
                        colorMap[group.color]?.split(" ")[0] ?? "text-zinc-400"
                      )}>
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-md border font-medium",
                              colorMap[group.color] ?? colorMap.violet
                            )}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Languages</p>
                <div className="flex flex-wrap gap-1.5">
                  {["English", "Filipino"].map((lang) => (
                    <span key={lang} className="text-[10px] px-2 py-0.5 rounded-md border border-zinc-700 text-zinc-400 font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div
            className={cn(
              "flex-1 p-10 flex flex-col gap-8 transition-colors duration-500",
              isNight ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"
            )}
          >

            {/* Header */}
            <div className="border-b pb-8 transition-colors duration-500"
              style={{ borderColor: isNight ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
            >
              <h1 className="text-4xl font-bold tracking-tight mb-1">
                {profile.name}
              </h1>
              <AnimatePresence mode="wait">
                <motion.p
                  key={isNight ? "night-title" : "day-title"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "text-lg font-semibold mb-4",
                    isNight ? "text-violet-400" : "text-violet-600"
                  )}
                >
                  {isNight ? "Off-duty — recharging for tomorrow" : profile.title}
                </motion.p>
              </AnimatePresence>

              {profile.availableForWork && (
                <span className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                  isNight
                    ? "border-lime-500/30 bg-lime-500/10 text-lime-400"
                    : "border-lime-600/30 bg-lime-50 text-lime-700"
                )}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime-500" />
                  </span>
                  Open to opportunities
                </span>
              )}
            </div>

            {/* Summary */}
            <Section title="Summary" icon={<Briefcase className="w-4 h-4" />} isNight={isNight}>
              <p className={cn(
                "text-sm leading-relaxed",
                isNight ? "text-zinc-400" : "text-zinc-600"
              )}>
                {profile.bio}
              </p>
            </Section>

            {/* Experience */}
            <Section title="Experience" icon={<Briefcase className="w-4 h-4" />} isNight={isNight}>
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h4 className="text-sm font-bold">{job.role}</h4>
                        <p className={cn(
                          "text-xs font-semibold",
                          isNight ? "text-violet-400" : "text-violet-600"
                        )}>
                          {job.company}
                        </p>
                      </div>
                      <span className={cn(
                        "text-xs shrink-0 font-medium px-2.5 py-1 rounded-lg border",
                        isNight
                          ? "border-white/10 bg-white/5 text-zinc-400"
                          : "border-zinc-200 bg-zinc-50 text-zinc-500"
                      )}>
                        {job.period}
                      </span>
                    </div>
                    <p className={cn(
                      "text-xs leading-relaxed mb-3",
                      isNight ? "text-zinc-400" : "text-zinc-500"
                    )}>
                      {job.description}
                    </p>
                    <ul className="space-y-1">
                      {job.highlights.map((h) => (
                        <li
                          key={h}
                          className={cn(
                            "text-xs flex items-start gap-2",
                            isNight ? "text-zinc-300" : "text-zinc-600"
                          )}
                        >
                          <span className={cn(
                            "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                            isNight ? "bg-violet-400" : "bg-violet-500"
                          )} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* Education */}
            <Section title="Education" icon={<GraduationCap className="w-4 h-4" />} isNight={isNight}>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold">{edu.degree}</h4>
                      <p className={cn(
                        "text-xs font-medium",
                        isNight ? "text-cyan-400" : "text-cyan-700"
                      )}>
                        {edu.school}
                      </p>
                    </div>
                    <span className={cn(
                      "text-xs shrink-0 font-medium px-2.5 py-1 rounded-lg border",
                      isNight
                        ? "border-white/10 bg-white/5 text-zinc-400"
                        : "border-zinc-200 bg-zinc-50 text-zinc-500"
                    )}>
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

          </div>
        </motion.div>

        {/* Night mode footer note */}
        <AnimatePresence>
          {isNight && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-center text-xs text-zinc-600 mt-4 no-print"
            >
              🌙 Shh… I&apos;m off the clock right now.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function Section({
  title,
  icon,
  children,
  isNight,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isNight: boolean;
}) {
  return (
    <div>
      <div className={cn(
        "flex items-center gap-2 mb-4 pb-2 border-b",
        isNight ? "border-white/8" : "border-zinc-100"
      )}>
        <span className={isNight ? "text-violet-400" : "text-violet-500"}>{icon}</span>
        <h3 className="text-xs font-bold uppercase tracking-widest">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
