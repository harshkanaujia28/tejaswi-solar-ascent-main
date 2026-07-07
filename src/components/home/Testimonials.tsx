import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const testimonials = [
  {
    name: "Rakesh Deshmukh",
    role: "Homeowner · Pune",
    quote:
      "Our monthly bill dropped from ₹6,800 to ₹380. The team was punctual, the wiring is spotless and the app tracking works beautifully.",
    initials: "RD",
  },
  {
    name: "Meenakshi Patil",
    role: "Farmer · Nashik",
    quote:
      "The PM-KUSUM pump has changed our farm forever. No more diesel bills, more water when we need it. Tejaswi handled all paperwork.",
    initials: "MP",
  },
  {
    name: "Sanjay Textiles Pvt Ltd",
    role: "Chakan MIDC",
    quote:
      "A 1.2 MW plant commissioned in 65 days flat. Excellent engineering, real ROI in under 4 years. Highly recommended for industry.",
    initials: "ST",
  },
  {
    name: "Dr. Anita Rao",
    role: "Hospital Director · Satara",
    quote:
      "Our operating theatres now run on clean solar power. Zero downtime, zero complaints — the AMC team is a phone call away.",
    initials: "AR",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title={<>Loved by <span className="text-gradient-gold">30+ customers</span></>}
          subtitle="Real reviews from real homes, farms and businesses across India."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <article className="glass rounded-[1.75rem] p-6 h-full flex flex-col">
                <Quote className="h-8 w-8 text-[color:var(--gold)]" />
                <p className="mt-4 text-[color:var(--forest)] leading-relaxed flex-1">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-1 text-[color:var(--gold)]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white font-bold">
                    {t.initials}
                  </span>
                  <div>
                    <div className="font-semibold text-[color:var(--forest)]">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
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
