import { Check } from "lucide-react";
import teamImg from "@/assets/team-install.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const points = [
  "Certified & Experienced Engineers",
  "Tier-1 Premium Solar Panels",
  "Customized System Design",
  "Transparent, Affordable Pricing",
  "Quick & Safe Installation",
  "End-to-end Subsidy Assistance",
  "Net-Metering Application Support",
  "Dedicated After-Sales Service",
  "Annual Maintenance Plans",
  "German-Grade Components & BoS",
];

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-section relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[color:var(--brand)] opacity-15 blur-3xl" />
      <div className="container-x grid gap-16 lg:grid-cols-2 items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="WHY CHOOSE US"
            title={<>Ten reasons India trusts <span className="text-gradient-green">Tejaswi</span></>}
            subtitle="We combine engineering excellence with genuine care — because a solar plant is a 25-year relationship, not a one-day sale."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal key={p} delay={i * 0.03} as="li">
                <div className="flex items-start gap-3 rounded-2xl bg-white/70 backdrop-blur border border-[color:var(--leaf)] px-4 py-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-[color:var(--forest)]">{p}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(23,63,42,0.4)] border-4 border-white">
              <img src={teamImg} alt="Solar installation team at work" width={1200} height={900} loading="lazy" className="w-full h-[440px] object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 md:-right-10 w-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img src={commercialImg} alt="Commercial rooftop solar" width={1200} height={900} loading="lazy" className="w-full h-40 object-cover" />
            </div>
            <div className="absolute -top-6 -left-6 glass rounded-2xl px-5 py-4">
              <div className="text-3xl font-bold text-gradient-green">99%</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Client satisfaction</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
