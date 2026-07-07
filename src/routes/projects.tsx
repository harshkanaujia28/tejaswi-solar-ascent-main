import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { projectsData } from "@/components/home/ProjectsPreview";
import { Reveal } from "@/components/site/Reveal";
import { CTA } from "@/components/home/CTA";
import { X } from "lucide-react";

const tags = ["All", "Residential", "Agriculture", "Commercial", "Industrial"] as const;

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Solar Projects Portfolio | Tejaswi Enterprises" },
      { name: "description", content: "Explore our portfolio of residential, agricultural, commercial and industrial solar installations across India." },
      { property: "og:title", content: "Solar Projects Portfolio — Tejaswi" },
      { property: "og:description", content: "Real solar installations powering homes, farms, factories and institutions." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  const [filter, setFilter] = useState<(typeof tags)[number]>("All");
  const [open, setOpen] = useState<null | typeof projectsData[number]>(null);
  const list = filter === "All" ? projectsData : projectsData.filter((p) => p.tag === filter);

  return (
    <>
      <PageHero
        eyebrow="PORTFOLIO"
        title={<>Projects that <span className="text-gradient-green">power lives</span></>}
        subtitle="From 3 kW villa rooftops to 1.2 MW industrial plants — every installation engineered for decades of clean energy."
        crumbs={[{ to: "/", label: "Home" }, { to: "/projects", label: "Projects" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition ${
                  filter === t
                    ? "bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-2)] text-white border-transparent shadow-[0_10px_30px_-10px_rgba(46,125,50,0.6)]"
                    : "bg-white text-[color:var(--forest)] border-[color:var(--leaf)] hover:border-[color:var(--brand)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <button
                  onClick={() => setOpen(p)}
                  className="group text-left w-full relative overflow-hidden rounded-[1.75rem] border border-[color:var(--leaf)] bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--forest)]/85 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-[color:var(--gold)] text-[color:var(--forest)] px-3 py-1 text-xs font-bold uppercase tracking-widest">{p.tag}</span>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h3 className="text-lg font-bold">{p.title}</h3>
                      <p className="text-sm text-white/80">{p.location} · {p.capacity}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="relative max-w-3xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 text-[color:var(--forest)] flex items-center justify-center">
              <X className="h-5 w-5" />
            </button>
            <img src={open.img} alt={open.title} className="w-full h-80 object-cover" />
            <div className="p-8">
              <span className="rounded-full bg-[color:var(--gold)] text-[color:var(--forest)] px-3 py-1 text-xs font-bold uppercase tracking-widest">{open.tag}</span>
              <h3 className="mt-3 text-2xl font-bold text-[color:var(--forest)]">{open.title}</h3>
              <p className="mt-2 text-muted-foreground">{open.location} · Installed capacity {open.capacity}</p>
              <p className="mt-4 text-[color:var(--forest)] leading-relaxed">
                Engineered and commissioned by Tejaswi Enterprises with Tier-1 modules, string inverters and grid-tied
                net-metering. Delivering clean, predictable energy for years to come.
              </p>
            </div>
          </div>
        </div>
      )}

      <CTA />
    </>
  );
}
