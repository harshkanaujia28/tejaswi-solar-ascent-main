import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import residential from "@/assets/residential-solar.jpg";
import agri from "@/assets/agri-solar.jpg";
import commercial from "@/assets/commercial-solar.jpg";
import industrial from "@/assets/industrial-solar.jpg";
import pump from "@/assets/solar-pump.jpg";
import school from "@/assets/school-solar.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

export const projectsData = [
  { img: residential, tag: "Residential", title: "10 kW Villa Rooftop", location: "Pune, MH", capacity: "10 kW" },
  { img: agri, tag: "Agriculture", title: "500 kW Ground Mount Solar Farm", location: "Nashik, MH", capacity: "500 kW" },
  { img: commercial, tag: "Commercial", title: "Office Rooftop System", location: "Mumbai, MH", capacity: "80 kW" },
  { img: industrial, tag: "Industrial", title: "Warehouse Megawatt Plant", location: "Chakan MIDC", capacity: "1.2 MW" },
  { img: pump, tag: "Agriculture", title: "PM-KUSUM Solar Pump Cluster", location: "Ahmednagar", capacity: "5 HP × 40" },
  { img: school, tag: "Commercial", title: "Solar-powered School", location: "Satara", capacity: "25 kW" },
];

export function ProjectsPreview() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="RECENT PROJECTS"
            title={<>Portfolio that <span className="text-gradient-green">powers lives</span></>}
            subtitle="A glimpse into installations delivering clean energy across homes, farms, factories and institutions."
          />
          <Link to="/projects" className="btn-outline shrink-0">
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-[1.75rem] border border-[color:var(--leaf)] shadow-sm bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--forest)]/85 via-[color:var(--forest)]/10 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[color:var(--gold)] text-[color:var(--forest)] px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    {p.tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="text-sm text-white/80">{p.location} · {p.capacity}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
