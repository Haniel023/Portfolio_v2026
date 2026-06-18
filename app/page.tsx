import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export const dynamic = "force-dynamic";

export default function Home() {
  const { profile, projects, experience, education, skills } = getContent();

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Experience experience={experience} education={education} />
      <Skills skillGroups={skills} />
      <Contact profile={profile} />
    </>
  );
}
