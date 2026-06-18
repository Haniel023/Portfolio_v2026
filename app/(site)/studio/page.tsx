"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Lock,
  User,
  FolderKanban,
  Briefcase,
  Wrench,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from "lucide-react";
import type { PortfolioContent, Project, ExperienceEntry, EducationEntry, SkillGroup } from "@/lib/content";
import { cn } from "@/lib/utils";

const ACCENT_OPTIONS = ["violet", "cyan", "lime", "orange"] as const;
const COLOR_OPTIONS = ["violet", "cyan", "lime", "orange"] as const;

type Tab = "profile" | "projects" | "experience" | "skills";

export default function StudioPage() {
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async (token: string) => {
    const res = await fetch("/api/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    setContent(data);
    return true;
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("studio_secret");
    if (saved) {
      load(saved).then((ok) => {
        if (ok) { setSecret(saved); setAuthed(true); }
      });
    }
  }, [load]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);
    const ok = await load(secret);
    if (ok) {
      sessionStorage.setItem("studio_secret", secret);
      setAuthed(true);
    } else {
      setAuthError(true);
    }
  }

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        showToast("ok", "Saved! Refresh the site to see changes.");
      } else {
        showToast("err", "Save failed — check your connection.");
      }
    } catch {
      showToast("err", "Save failed — are you running locally?");
    }
    setSaving(false);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900 p-8 space-y-4"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/25 mb-2 mx-auto">
            <Lock className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-center text-xs text-zinc-500 mb-6">Studio access</p>
          <div className="relative">
            <input
              type={showSecret ? "text" : "password"}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Password"
              className={cn(
                "w-full rounded-xl border bg-white/5 px-4 py-3 pr-10 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/60",
                authError ? "border-red-500/50" : "border-white/10"
              )}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {authError && <p className="text-xs text-red-400">Wrong password.</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-500 text-sm">
      Loading…
    </div>
  );

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-8 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg font-bold text-white">Studio</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Edit your portfolio content</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-60 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-4 py-3 mb-6 text-sm font-medium",
              toast.type === "ok"
                ? "border-lime-500/30 bg-lime-500/10 text-lime-300"
                : "border-red-500/30 bg-red-500/10 text-red-300"
            )}
          >
            {toast.type === "ok" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {toast.msg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 rounded-2xl border border-white/8 bg-zinc-900/60 p-1.5 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all",
                activeTab === id
                  ? "bg-violet-600 text-white shadow"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Profile ── */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            {(
              [
                ["name", "Name"],
                ["title", "Title / Role"],
                ["tagline", "Tagline (hero subtitle)"],
                ["location", "Location"],
                ["email", "Email"],
                ["github", "GitHub URL"],
                ["linkedin", "LinkedIn URL"],
                ["twitter", "Twitter / X URL"],
              ] as [keyof typeof content.profile, string][]
            ).map(([key, label]) => (
              <Field key={key} label={label}>
                {key === "tagline" || key === "bio" ? (
                  <Textarea
                    value={String(content.profile[key] ?? "")}
                    onChange={(v) =>
                      setContent({ ...content, profile: { ...content.profile, [key]: v } })
                    }
                  />
                ) : (
                  <Input
                    value={String(content.profile[key] ?? "")}
                    onChange={(v) =>
                      setContent({ ...content, profile: { ...content.profile, [key]: v } })
                    }
                  />
                )}
              </Field>
            ))}
            <Field label="Bio">
              <Textarea
                value={content.profile.bio}
                onChange={(v) => setContent({ ...content, profile: { ...content.profile, bio: v } })}
                rows={5}
              />
            </Field>
            <Field label="Available for work">
              <Toggle
                value={content.profile.availableForWork}
                onChange={(v) =>
                  setContent({ ...content, profile: { ...content.profile, availableForWork: v } })
                }
              />
            </Field>
          </div>
        )}

        {/* ── Projects ── */}
        {activeTab === "projects" && (
          <div className="space-y-3">
            {content.projects.map((proj, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-zinc-900/60 overflow-hidden">
                <button
                  onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", dotColor(proj.accent))} />
                    <span className="text-sm font-semibold text-white">{proj.title || "Untitled"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setContent({
                          ...content,
                          projects: content.projects.filter((_, j) => j !== i),
                        });
                      }}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expandedProject === i ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                </button>
                {expandedProject === i && (
                  <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
                    <ProjectEditor
                      proj={proj}
                      onChange={(p) =>
                        setContent({
                          ...content,
                          projects: content.projects.map((x, j) => (j === i ? p : x)),
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  projects: [
                    ...content.projects,
                    { title: "", description: "", tags: [], github: "", live: "", featured: false, accent: "violet" },
                  ],
                })
              }
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm text-zinc-400 hover:text-white hover:border-white/25 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add project
            </button>
          </div>
        )}

        {/* ── Experience ── */}
        {activeTab === "experience" && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Work</p>
            {content.experience.map((exp, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-zinc-900/60 overflow-hidden">
                <button
                  onClick={() => setExpandedExp(expandedExp === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{exp.role || "Untitled"}</p>
                    <p className="text-xs text-zinc-500">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setContent({ ...content, experience: content.experience.filter((_, j) => j !== i) });
                      }}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expandedExp === i ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                </button>
                {expandedExp === i && (
                  <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
                    <ExperienceEditor
                      exp={exp}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          experience: content.experience.map((x, j) => (j === i ? e : x)),
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  experience: [
                    ...content.experience,
                    { role: "", company: "", period: "", description: "", highlights: [], current: false, type: "work" },
                  ],
                })
              }
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm text-zinc-400 hover:text-white hover:border-white/25 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add work entry
            </button>

            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-6 mb-2 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Education
            </p>
            {content.education.map((edu, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-zinc-900/60 p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-zinc-400 font-medium">Entry {i + 1}</p>
                  <button
                    onClick={() =>
                      setContent({ ...content, education: content.education.filter((_, j) => j !== i) })
                    }
                    className="text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <EducationEditor
                  edu={edu}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      education: content.education.map((x, j) => (j === i ? e : x)),
                    })
                  }
                />
              </div>
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  education: [...content.education, { degree: "", school: "", period: "", type: "education" }],
                })
              }
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm text-zinc-400 hover:text-white hover:border-white/25 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add education
            </button>
          </div>
        )}

        {/* ── Skills ── */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            {content.skills.map((group, gi) => (
              <div key={gi} className="rounded-2xl border border-white/8 bg-zinc-900/60 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", dotColor(group.color))} />
                    <Input
                      value={group.label}
                      onChange={(v) =>
                        setContent({
                          ...content,
                          skills: content.skills.map((x, j) =>
                            j === gi ? { ...x, label: v } : x
                          ),
                        })
                      }
                      placeholder="Group name"
                      className="text-sm font-semibold"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={group.color}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          skills: content.skills.map((x, j) =>
                            j === gi ? { ...x, color: e.target.value as SkillGroup["color"] } : x
                          ),
                        })
                      }
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-zinc-300 outline-none"
                    >
                      {COLOR_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        setContent({ ...content, skills: content.skills.filter((_, j) => j !== gi) })
                      }
                      className="text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <SkillsEditor
                  skills={group.skills}
                  onChange={(skills) =>
                    setContent({
                      ...content,
                      skills: content.skills.map((x, j) => (j === gi ? { ...x, skills } : x)),
                    })
                  }
                />
              </div>
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  skills: [...content.skills, { label: "New Group", color: "violet", skills: [] }],
                })
              }
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm text-zinc-400 hover:text-white hover:border-white/25 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add skill group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sub-editors ── */

function ProjectEditor({ proj, onChange }: { proj: Project; onChange: (p: Project) => void }) {
  return (
    <>
      <Field label="Title">
        <Input value={proj.title} onChange={(v) => onChange({ ...proj, title: v })} />
      </Field>
      <Field label="Description">
        <Textarea value={proj.description} onChange={(v) => onChange({ ...proj, description: v })} />
      </Field>
      <Field label="GitHub URL">
        <Input value={proj.github} onChange={(v) => onChange({ ...proj, github: v })} />
      </Field>
      <Field label="Live URL">
        <Input value={proj.live} onChange={(v) => onChange({ ...proj, live: v })} />
      </Field>
      <Field label="Accent color">
        <div className="flex gap-2">
          {ACCENT_OPTIONS.map((a) => (
            <button
              key={a}
              onClick={() => onChange({ ...proj, accent: a })}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                proj.accent === a
                  ? "border-white/40 bg-white/15 text-white"
                  : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Tags (comma-separated)">
        <Input
          value={proj.tags.join(", ")}
          onChange={(v) =>
            onChange({ ...proj, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })
          }
          placeholder="React, Node.js, Supabase"
        />
      </Field>
      <Field label="Featured">
        <Toggle value={proj.featured} onChange={(v) => onChange({ ...proj, featured: v })} />
      </Field>
    </>
  );
}

function ExperienceEditor({ exp, onChange }: { exp: ExperienceEntry; onChange: (e: ExperienceEntry) => void }) {
  return (
    <>
      <Field label="Role / Title">
        <Input value={exp.role} onChange={(v) => onChange({ ...exp, role: v })} />
      </Field>
      <Field label="Company">
        <Input value={exp.company} onChange={(v) => onChange({ ...exp, company: v })} />
      </Field>
      <Field label="Period (e.g. May 2022 – Present)">
        <Input value={exp.period} onChange={(v) => onChange({ ...exp, period: v })} />
      </Field>
      <Field label="Description">
        <Textarea value={exp.description} onChange={(v) => onChange({ ...exp, description: v })} rows={4} />
      </Field>
      <Field label="Highlights (one per line)">
        <Textarea
          value={exp.highlights.join("\n")}
          onChange={(v) =>
            onChange({ ...exp, highlights: v.split("\n").map((h) => h.trim()).filter(Boolean) })
          }
          rows={4}
          placeholder="Built RESTful APIs&#10;Reduced load time 40%"
        />
      </Field>
      <Field label="Current job">
        <Toggle value={exp.current} onChange={(v) => onChange({ ...exp, current: v })} />
      </Field>
    </>
  );
}

function EducationEditor({ edu, onChange }: { edu: EducationEntry; onChange: (e: EducationEntry) => void }) {
  return (
    <>
      <Field label="Degree / Program">
        <Input value={edu.degree} onChange={(v) => onChange({ ...edu, degree: v })} />
      </Field>
      <Field label="School">
        <Input value={edu.school} onChange={(v) => onChange({ ...edu, school: v })} />
      </Field>
      <Field label="Period">
        <Input value={edu.period} onChange={(v) => onChange({ ...edu, period: v })} />
      </Field>
    </>
  );
}

function SkillsEditor({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 pl-3 pr-1.5 py-1">
            <span className="text-xs text-zinc-300">{skill}</span>
            <button
              onClick={() => onChange(skills.filter((_, j) => j !== i))}
              className="text-zinc-600 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <AddSkillInput onAdd={(s) => onChange([...skills, s])} />
    </div>
  );
}

function AddSkillInput({ onAdd }: { onAdd: (s: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && val.trim()) {
            onAdd(val.trim());
            setVal("");
          }
        }}
        placeholder="Add skill (press Enter)"
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-violet-500/60 transition-colors"
      />
      <button
        onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); } }}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-zinc-400 hover:text-white transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ── Primitive Components ── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-500">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/60 transition-colors",
        className
      )}
    />
  );
}

function Textarea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/60 transition-colors resize-none leading-relaxed"
    />
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
        value ? "bg-violet-600 border-violet-500" : "bg-zinc-800 border-zinc-700"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
          value ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

function dotColor(accent: string) {
  return {
    violet: "bg-violet-400",
    cyan: "bg-cyan-400",
    lime: "bg-lime-400",
    orange: "bg-orange-400",
  }[accent] ?? "bg-zinc-400";
}
