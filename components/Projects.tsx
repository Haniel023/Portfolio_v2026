"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import AnimateIn from "./AnimateIn";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

const accentMap = {
  violet: {
    border: "border-violet-500/20",
    tag: "bg-violet-600/15 text-violet-300 border-violet-500/20",
    dot: "bg-violet-400",
    glow: "hover:shadow-[0_0_40px_-10px_#8b5cf640] hover:border-violet-500/40",
  },
  cyan: {
    border: "border-cyan-500/20",
    tag: "bg-cyan-600/15 text-cyan-300 border-cyan-500/20",
    dot: "bg-cyan-400",
    glow: "hover:shadow-[0_0_40px_-10px_#06b6d440] hover:border-cyan-500/40",
  },
  lime: {
    border: "border-lime-500/20",
    tag: "bg-lime-600/15 text-lime-300 border-lime-500/20",
    dot: "bg-lime-400",
    glow: "hover:shadow-[0_0_40px_-10px_#a3e63540] hover:border-lime-500/40",
  },
  orange: {
    border: "border-orange-500/20",
    tag: "bg-orange-600/15 text-orange-300 border-orange-500/20",
    dot: "bg-orange-400",
    glow: "hover:shadow-[0_0_40px_-10px_#fb923c40] hover:border-orange-500/40",
  },
};

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Things I&apos;ve built
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const accent = accentMap[project.accent] ?? accentMap.violet;
            return (
              <AnimateIn key={project.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "group relative flex flex-col h-full rounded-2xl border p-6 transition-all duration-300 cursor-default",
                    "bg-zinc-900/60 backdrop-blur-sm",
                    accent.border,
                    accent.glow
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full mb-5", accent.dot)} />
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn("text-xs px-2.5 py-1 rounded-lg border font-medium", accent.tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
