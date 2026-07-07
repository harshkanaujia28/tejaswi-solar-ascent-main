import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { to: string; label: string };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, subtitle, crumbs }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-hero pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
      <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-[color:var(--gold)] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-80 w-80 rounded-full bg-[color:var(--brand)] opacity-20 blur-3xl" />
      <div className="container-x relative text-center max-w-4xl">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[color:var(--brand)] border border-[color:var(--leaf)]">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 text-4xl md:text-6xl font-bold text-[color:var(--forest)] leading-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-5 text-lg text-muted-foreground">{subtitle}</p>}
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground bg-white/80 backdrop-blur rounded-full px-4 py-2 border border-[color:var(--leaf)]">
            {crumbs.map((c, i) => (
              <span key={c.to} className="inline-flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                {i === crumbs.length - 1 ? (
                  <span className="font-semibold text-[color:var(--forest)]">{c.label}</span>
                ) : (
                  <Link to={c.to} className="hover:text-[color:var(--brand)]">{c.label}</Link>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
