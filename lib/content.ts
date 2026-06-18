import fs from "fs";
import path from "path";

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  availableForWork: boolean;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
  accent: "violet" | "cyan" | "lime" | "orange";
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  current: boolean;
  type: "work";
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  type: "education";
}

export interface SkillGroup {
  label: string;
  color: "violet" | "cyan" | "lime" | "orange";
  skills: string[];
}

export interface PortfolioContent {
  profile: ProfileData;
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

export function getContent(): PortfolioContent {
  const raw = fs.readFileSync(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as PortfolioContent;
}

export function saveContent(data: PortfolioContent): void {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf8");
}
