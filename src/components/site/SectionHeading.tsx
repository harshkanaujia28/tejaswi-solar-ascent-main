import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${a}`}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[color:var(--brand)] shadow-sm border border-[color:var(--leaf)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-3xl md:text-5xl font-bold text-[color:var(--forest)]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base md:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
