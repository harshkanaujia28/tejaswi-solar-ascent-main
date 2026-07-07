import { Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sun } from "lucide-react";
import engineerImg from "@/assets/engineer.jpg";
import panelImg from "@/assets/panel-closeup.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";

const stats = [
  { k: 30, s: "+", label: "Successful Installations" },
  { k: 150, s: "kW+", label: "Installed Capacity" },
  { k: 4, s: "+", label: "Months Experience" },
  { k: 24, s: "×7", label: "Customer Support" },
];

export function AboutPreview() {
  return (
    <section className="relative py-24 md:py-32 bg-section overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[color:var(--gold)] opacity-15 blur-3xl" />
      <div className="container-x grid gap-14 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(23,63,42,0.4)] border-4 border-white">
              <img src={engineerImg} alt="Certified solar engineer" width={1200} height={1400} loading="lazy" className="w-full h-[480px] lg:h-[560px] object-cover" />
            </div>
            <div className="hidden md:block absolute -bottom-8 -left-8 h-40 w-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img src={panelImg} alt="Solar panel detail" width={1000} height={1200} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 flex items-center gap-3 animate-float">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--gold)] text-[color:var(--forest)]">
                <Sun className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Clean Energy</div>
                <div className="font-bold text-[color:var(--forest)]">Delivered daily</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[color:var(--brand)] shadow-sm border border-[color:var(--leaf)]">
              <Leaf className="h-3.5 w-3.5" /> ABOUT TEJASWI
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[color:var(--forest)] leading-tight">
              Building a <span className="text-gradient-green">Greener Future</span>
              <br />
              With Clean Energy
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              For over a decade, Tejaswi Enterprises has been designing, engineering and installing
              solar systems that pay for themselves. Our mission is simple — make premium-grade
              solar accessible to every home, farm and business in India, backed by lifetime service.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.05}>
                <div className="rounded-2xl bg-white border border-[color:var(--leaf)] p-5 text-center shadow-sm">
                  <div className="text-3xl font-bold text-gradient-green">
                    <Counter to={s.k} suffix={s.s} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Link to="/about" className="btn-primary mt-10">
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
