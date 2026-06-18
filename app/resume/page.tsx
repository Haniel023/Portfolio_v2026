import { getContent } from "@/lib/content";
import ResumeCard from "@/components/ResumeCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  const content = getContent();
  return <ResumeCard content={content} />;
}
