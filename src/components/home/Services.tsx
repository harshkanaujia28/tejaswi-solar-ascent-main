import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Droplets, Factory, Home, Tractor, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

export const servicesList = [
  {
    Icon: Home,
    title: "Residential Solar Systems",
    desc: "On-grid, off-grid and hybrid rooftop solar systems for homes with net-metering and subsidy assistance.",
  },
  {
    Icon: Tractor,
    title: "Agricultural Solar Solutions",
    desc: "Solar-powered irrigation, farm pumps and rural feeders that cut diesel costs and empower farmers.",
  },
  {
    Icon: Building2,
    title: "Commercial Solar Systems",
    desc: "Rooftop and ground-mount systems for offices, malls, schools and hospitals with quick ROI.",
  },
  {
    Icon: Factory,
    title: "Industrial Solar Solutions",
    desc: "Large-scale megawatt EPC installations engineered for manufacturing plants and warehouses.",
  },
  {
    Icon: Droplets,
    title: "Solar Water Pumps",
    desc: "1 HP to 15 HP AC/DC solar pumps under PM-KUSUM scheme for reliable, off-grid water supply.",
  },
  {
    Icon: Wrench,
    title: "Annual Maintenance Services",
    desc: "Preventive AMC, panel cleaning, performance monitoring and 24×7 breakdown support.",
  },
];

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="OUR SERVICES"
          title={<>Complete Solar Solutions <span className="text-gradient-gold">Under One Roof</span></>}
          subtitle="From consultation and design to installation, EPC and lifetime service — we handle it end-to-end."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <Link
                to="/services"
                className="card-elevated group relative flex h-full flex-col p-8 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[color:var(--gold)] opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500" />
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--section)] text-[color:var(--brand)] group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--forest)] transition-colors duration-500">
                  <s.Icon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-[color:var(--forest)]">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand)] group-hover:gap-3 transition-all">
                  Explore service <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
