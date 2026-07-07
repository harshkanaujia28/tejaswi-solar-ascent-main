import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { servicesList } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { CTA } from "@/components/home/CTA";
import { ContactForm } from "@/components/site/ContactForm";
import { Check } from "lucide-react";
import hero from "@/assets/hero-solar.jpg";
import agri from "@/assets/agri-solar.jpg";
import commercial from "@/assets/commercial-solar.jpg";
import industrial from "@/assets/industrial-solar.jpg";
import pump from "@/assets/solar-pump.jpg";
import team from "@/assets/team-install.jpg";

const imgs = [hero, agri, commercial, industrial, pump, team];

const benefits = [
  ["End-to-end design & installation", "Government subsidy assistance", "Net-metering support", "5-year workmanship warranty"],
  ["PM-KUSUM scheme paperwork", "AC & DC pump variants", "Zero diesel dependency", "Remote monitoring"],
  ["Fast ROI in 3–5 years", "Corporate tax benefits", "24×7 monitoring dashboard", "Priority AMC coverage"],
  ["MW-scale EPC capability", "IEC-certified components", "Optimised for CAPEX/OPEX", "Long-term PPA support"],
  ["1 HP to 15 HP capacities", "Suitable for bore & open wells", "Reduces irrigation cost 100%", "5-year subsidy warranty"],
  ["Panel wash & inspection", "Inverter health check", "Performance report", "Emergency response"],
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Solar Services — Home, Agriculture, Commercial & Industrial | Tejaswi" },
      { name: "description", content: "Full-service solar EPC — residential, agricultural, commercial, industrial systems, solar water pumps and AMC across India." },
      { property: "og:title", content: "Solar Services — Tejaswi Enterprises" },
      { property: "og:description", content: "Complete solar solutions under one roof for homes, farms, businesses and industries." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title={<>Complete solar solutions <span className="text-gradient-green">under one roof</span></>}
        subtitle="From residential rooftops to megawatt EPC — we engineer, install and service every kind of solar system."
        crumbs={[{ to: "/", label: "Home" }, { to: "/services", label: "Services" }]}
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="container-x flex flex-col gap-20">
          {servicesList.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.title}>
                <div className={`grid gap-10 lg:grid-cols-2 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-[0_30px_60px_-30px_rgba(23,63,42,0.4)]">
                    <img src={imgs[i]} alt={s.title} className="w-full h-[380px] object-cover" loading="lazy" />
                    <div className="absolute top-4 left-4 glass rounded-2xl px-3 py-2 flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white">
                        <s.Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="text-xs font-bold tracking-widest text-[color:var(--forest)] uppercase">Service {String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--forest)]">{s.title}</h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{s.desc}</p>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                      {benefits[i].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-[color:var(--brand)] mt-0.5" strokeWidth={3} />
                          <span className="text-[color:var(--forest)]">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="/contact" className="btn-primary mt-8">Enquire about {s.title.split(" ")[0]}</a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Process />
      <CTA />
      <ContactForm compact />
    </>
  );
}
