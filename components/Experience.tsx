"use client";

import AnimateIn from "./AnimateIn";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import type { ExperienceEntry, EducationEntry } from "@/lib/content";

interface ExperienceProps {
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

export default function Experience({ experience, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Where I&apos;ve worked
          </h2>
        </AnimateIn>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-violet-500/50 via-zinc-700/50 to-transparent md:left-8" />

          <div className="space-y-6">
            {experience.map((job, i) => (
              <AnimateIn key={`${job.company}-${i}`} delay={i * 0.15}>
                <div className="relative flex gap-6 md:gap-10">
                  <div className="relative shrink-0 flex items-start pt-1">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 relative z-10",
                        job.current
                          ? "bg-violet-500 border-violet-400 shadow-[0_0_12px_2px_#8b5cf640]"
                          : "bg-zinc-800 border-zinc-600"
                      )}
                    >
                      {job.current && (
                        <span className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-40" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-6 backdrop-blur-sm hover:border-white/15 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{job.role}</h3>
                        <span className="text-xs text-zinc-500 font-medium border border-white/10 bg-white/5 px-2.5 py-1 rounded-lg">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-violet-400 mb-4">{job.company}</p>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{job.description}</p>
                      <ul className="flex flex-wrap gap-2">
                        {job.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-xs text-zinc-300 bg-white/5 border border-white/8 px-3 py-1 rounded-lg"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}

            {/* Education */}
            {education.map((edu, i) => (
              <AnimateIn key={`${edu.school}-${i}`} delay={(experience.length + i) * 0.15}>
                <div className="relative flex gap-6 md:gap-10">
                  <div className="relative shrink-0 flex items-start pt-1">
                    <div className="w-4 h-4 rounded-full border-2 bg-zinc-800 border-zinc-600 relative z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    </div>
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="rounded-2xl border border-white/8 bg-zinc-900/40 p-5 backdrop-blur-sm">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-cyan-400" />
                          <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                        </div>
                        <span className="text-xs text-zinc-500 font-medium border border-white/10 bg-white/5 px-2.5 py-1 rounded-lg">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm text-cyan-400 mt-1">{edu.school}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
