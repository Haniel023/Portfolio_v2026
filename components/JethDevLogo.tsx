import { cn } from "@/lib/utils";

interface JethDevLogoProps {
  className?: string;
  /** Controls the base font size. Defaults to "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizes = {
  xs: "text-base",
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

export default function JethDevLogo({ className, size = "md" }: JethDevLogoProps) {
  return (
    <span
      aria-label="Jeth.Dev"
      className={cn(
        "inline-flex items-baseline gap-0 font-extrabold tracking-tight select-none",
        sizes[size],
        className
      )}
    >
      {/* "Jeth" — indigo → cyan horizontal gradient */}
      <span className="bg-linear-to-r from-indigo-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Jeth
      </span>

      {/* "." — solid cyan dot, sits in the middle */}
      <span className="text-cyan-400 leading-none" style={{ marginBottom: "0.06em" }}>
        .
      </span>

      {/* "Dev" — white → slate silver gradient top-to-bottom */}
      <span className="bg-linear-to-b from-slate-100 to-slate-400 bg-clip-text text-transparent">
        Dev
      </span>
    </span>
  );
}
