import { Github, Linkedin, Mail } from "lucide-react";
import type { ProfileData } from "@/lib/content";

interface FooterProps {
  profile: ProfileData;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-white/8 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-white">
            <span className="gradient-text-violet">Jeth</span>
            <span className="text-zinc-400">.Dev</span>
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
