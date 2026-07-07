import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { X } from "lucide-react";
import hero from "@/assets/hero-solar.jpg";
import agri from "@/assets/agri-solar.jpg";
import commercial from "@/assets/commercial-solar.jpg";
import industrial from "@/assets/industrial-solar.jpg";
import pump from "@/assets/solar-pump.jpg";
import residential from "@/assets/residential-solar.jpg";
import team from "@/assets/team-install.jpg";
import panel from "@/assets/panel-closeup.jpg";
import school from "@/assets/school-solar.jpg";
import { CTA } from "@/components/home/CTA";

const gallery = [
  { src: hero, alt: "Residential rooftop with solar array", tall: true },
  { src: agri, alt: "Aerial view of agricultural solar farm" },
  { src: team, alt: "Team installing solar panels" },
  { src: panel, alt: "Close-up of solar panel", tall: true },
  { src: commercial, alt: "Commercial rooftop system" },
  { src: pump, alt: "Solar water pump on farm", tall: true },
  { src: industrial, alt: "Industrial solar plant" },
  { src: residential, alt: "Modern home solar installation" },
  { src: school, alt: "Rural school with solar" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — Solar Installations | Tejaswi Enterprises" },
      { name: "description", content: "A visual journey through Tejaswi's solar installations, teams, projects and job sites." },
      { property: "og:title", content: "Photo Gallery — Tejaswi Enterprises" },
      { property: "og:description", content: "Solar installations, teams and finished projects." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const [open, setOpen] = useState<null | (typeof gallery)[number]>(null);
  return (
    <>
      <PageHero
        eyebrow="GALLERY"
        title={<>A glimpse of our <span className="text-gradient-gold">work in action</span></>}
        subtitle="Installations, teams and projects captured across India."
        crumbs={[{ to: "/", label: "Home" }, { to: "/gallery", label: "Gallery" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container-x">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:break-inside-avoid [&>*]:mb-5">
            {gallery.map((g, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <button
                  onClick={() => setOpen(g)}
                  className="group block w-full overflow-hidden rounded-[1.5rem] border border-[color:var(--leaf)] bg-white shadow-sm"
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-[900ms] group-hover:scale-105 ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button onClick={() => setOpen(null)} className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 text-[color:var(--forest)] flex items-center justify-center">
            <X className="h-5 w-5" />
          </button>
          <img src={open.src} alt={open.alt} className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <CTA />
    </>
  );
}
