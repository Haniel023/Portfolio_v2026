import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = getContent();
  return (
    <>
      <Navbar profile={profile} />
      <main>{children}</main>
      <Footer profile={profile} />
    </>
  );
}
