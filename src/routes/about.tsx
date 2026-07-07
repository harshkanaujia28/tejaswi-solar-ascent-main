import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { Reveal } from "@/components/site/Reveal";
import { Award, HeartHandshake, Leaf, Sparkles } from "lucide-react";

const values = [
  { Icon: Leaf, title: "Sustainability First", desc: "Every design decision considers lifecycle impact and long-term efficiency." },
  { Icon: Award, title: "Engineering Excellence", desc: "MNRE-certified team, Tier-1 components, and rigorous QA at every stage." },
  { Icon: HeartHandshake, title: "Customer for Life", desc: "A solar plant is a 25-year relationship. Our AMC keeps it running like day one." },
  { Icon: Sparkles, title: "Honest Pricing", desc: "Transparent quotes, subsidy included, zero hidden charges." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tejaswi Enterprises — Clean Energy for India" },
      { name: "description", content: "Learn about Tejaswi Enterprises — a decade of designing, engineering and installing premium solar systems across India." },
      { property: "og:title", content: "About Tejaswi Enterprises" },
      { property: "og:description", content: "A decade of clean-energy engineering for homes, farms and industries." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title={<>Powering India's tomorrow, <span className="text-gradient-green">one rooftop at a time</span></>}
        subtitle="We're a team of engineers and clean-energy enthusiasts building the solar backbone of Bharat."
        crumbs={[{ to: "/", label: "Home" }, { to: "/about", label: "About" }]}
      />
      <AboutPreview />
      <section className="py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center text-3xl md:text-5xl font-bold text-[color:var(--forest)]">
              Our <span className="text-gradient-gold">values</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="card-elevated h-full p-8 text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-section text-[color:var(--brand)]">
                    <v.Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[color:var(--forest)]">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
