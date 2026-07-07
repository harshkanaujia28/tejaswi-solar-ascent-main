import { Calculator, IndianRupee, Landmark, Leaf, ShieldCheck, Sun, TrendingUp, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const benefits = [
  { Icon: IndianRupee, title: "Reduce Electricity Bills", desc: "Save up to 90% on monthly power bills from day one." },
  { Icon: Leaf, title: "Eco Friendly", desc: "Offset tons of CO₂ every year and go carbon-neutral." },
  { Icon: Landmark, title: "Government Subsidy", desc: "Up to 40% central subsidy on residential systems." },
  { Icon: TrendingUp, title: "Increase Property Value", desc: "Solar-equipped properties sell for 4–6% more." },
  { Icon: Wrench, title: "Low Maintenance", desc: "Only periodic cleaning — no moving parts, no noise." },
  { Icon: ShieldCheck, title: "25-Year Panel Life", desc: "Manufacturer performance warranty on all panels." },
  { Icon: Sun, title: "Clean, Free Energy", desc: "Harness sunlight — India's most abundant resource." },
];

export function SolarBenefits() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="WHY SOLAR"
          title={<>Real, measurable <span className="text-gradient-gold">solar benefits</span></>}
          subtitle="Solar isn't just green — it's the smartest financial and environmental investment you'll make this decade."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <div className="card-elevated h-full p-6 group">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white shadow-lg group-hover:scale-110 transition-transform">
                  <b.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-[color:var(--forest)]">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="h-full rounded-[1.75rem] bg-dark-gradient p-6 text-white relative overflow-hidden flex flex-col justify-between">
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[color:var(--gold)] opacity-40 blur-3xl" />
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--gold)] text-[color:var(--forest)]">
                  <Calculator className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">Estimate Your Savings</h3>
                <p className="mt-2 text-sm text-white/70">Get a personalised ROI calculation based on your bill.</p>
              </div>
              <Link to="/contact" className="relative mt-6 inline-flex items-center justify-center rounded-full bg-white text-[color:var(--forest)] font-semibold px-4 py-2.5 text-sm hover:bg-[color:var(--gold)] transition">
                Try ROI Calculator →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
