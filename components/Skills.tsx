"use client";

import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/lib/content";

const colorMap = {
  violet: {
    label: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-600/10",
    tag: "bg-violet-600/10 border-violet-500/20 text-violet-200 hover:bg-violet-600/20",
  },
  cyan: {
    label: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-600/10",
    tag: "bg-cyan-600/10 border-cyan-500/20 text-cyan-200 hover:bg-cyan-600/20",
  },
  lime: {
    label: "text-lime-400",
    border: "border-lime-500/20",
    bg: "bg-lime-600/10",
    tag: "bg-lime-600/10 border-lime-500/20 text-lime-200 hover:bg-lime-600/20",
  },
  orange: {
    label: "text-orange-400",
    border: "border-orange-500/20",
    bg: "bg-orange-600/10",
    tag: "bg-orange-600/10 border-orange-500/20 text-orange-200 hover:bg-orange-600/20",
  },
};

interface SkillsProps {
  skillGroups: SkillGroup[];
}

export default function Skills({ skillGroups }: SkillsProps) {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">My toolkit</h2>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, gi) => {
            const colors = colorMap[group.color] ?? colorMap.violet;
            return (
              <AnimateIn key={group.label} delay={gi * 0.1}>
                <div
                  className={cn(
                    "rounded-2xl border p-5 h-full backdrop-blur-sm",
                    colors.border,
                    colors.bg
                  )}
                >
                  <p className={cn("text-xs font-bold tracking-widest uppercase mb-4", colors.label)}>
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.1 + si * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                          "text-xs px-3 py-1.5 rounded-xl border font-medium cursor-default transition-colors",
                          colors.tag
                        )}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
