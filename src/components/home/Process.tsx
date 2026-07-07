import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import {
  ClipboardList,
  FileCheck,
  HeadphonesIcon,
  Map,
  PencilRuler,
  Plug,
  ScrollText,
  Wrench,
} from "lucide-react";

const steps = [
  { Icon: HeadphonesIcon, title: "Consultation", desc: "Free discussion to understand your energy needs and site." },
  { Icon: Map, title: "Site Survey", desc: "Engineer visit — shadow analysis, structure audit, orientation." },
  { Icon: PencilRuler, title: "Custom Design", desc: "Optimised system design with CAD layout and simulation." },
  { Icon: ScrollText, title: "Quotation", desc: "Transparent pricing, ROI, and subsidy breakdown." },
  { Icon: Wrench, title: "Installation", desc: "Certified team installs panels, inverter and wiring." },
  { Icon: ClipboardList, title: "Testing", desc: "Load testing, safety checks and inverter commissioning." },
  { Icon: Plug, title: "Net Metering", desc: "We handle DISCOM paperwork end-to-end." },
  { Icon: FileCheck, title: "After Sales", desc: "AMC, monitoring and lifetime support." },
];

export function Process() {
  return (
    <section className="py-24 md:py-32 bg-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title={<>Our proven <span className="text-gradient-green">8-step process</span></>}
          subtitle="Every project follows the same disciplined workflow — designed for zero surprises."
        />

        <div className="mt-16 relative">
          <div className="absolute left-1/2 top-0 bottom-0 hidden lg:block w-px bg-gradient-to-b from-transparent via-[color:var(--brand)] to-transparent" />
          <ol className="grid gap-6 lg:gap-14">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={s.title} delay={i * 0.05} as="li">
                  <div className={`grid lg:grid-cols-2 items-center gap-6 ${right ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className={`glass rounded-2xl p-6 ${right ? "lg:text-right" : ""}`}>
                      <span className="text-xs font-bold tracking-[0.3em] text-[color:var(--brand)]">STEP {String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 text-2xl font-bold text-[color:var(--forest)]">{s.title}</h3>
                      <p className="mt-2 text-muted-foreground">{s.desc}</p>
                    </div>
                    <div className={`flex ${right ? "lg:justify-start" : "lg:justify-end"} justify-center`}>
                      <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white shadow-[0_20px_40px_-15px_rgba(46,125,50,0.6)]">
                        <s.Icon className="h-9 w-9" />
                        <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[color:var(--gold)] text-[color:var(--forest)] text-xs font-bold flex items-center justify-center border-4 border-[color:var(--section)]">
                          {i + 1}
                        </span>
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
