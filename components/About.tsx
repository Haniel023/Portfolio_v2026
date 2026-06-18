"use client";

import AnimateIn from "./AnimateIn";
import { MapPin, Coffee, Code2 } from "lucide-react";
import type { ProfileData } from "@/lib/content";

interface AboutProps {
  profile: ProfileData;
}

export default function About({ profile }: AboutProps) {
  const facts = [
    { icon: MapPin, label: "Based in", value: profile.location },
    { icon: Code2, label: "Craft", value: profile.title },
    { icon: Coffee, label: "Fuel", value: "Lots of coffee" },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimateIn direction="right">
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              I build things that live on the internet.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">{profile.bio}</p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors group"
            >
              Let&apos;s talk
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.15}>
            <div className="grid grid-cols-1 gap-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-zinc-900/60 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600/15 border border-violet-500/20">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
