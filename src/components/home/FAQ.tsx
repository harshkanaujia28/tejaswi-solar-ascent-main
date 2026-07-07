import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  { q: "How much government subsidy can I get on a home solar system?", a: "Under the PM Surya Ghar scheme, residential systems get up to 40% central financial assistance — approximately ₹78,000 for systems up to 3 kW. We handle the entire subsidy application for you." },
  { q: "How long does installation typically take?", a: "A standard residential system (up to 10 kW) is installed and commissioned in 3–7 working days after site survey. Commercial and industrial timelines vary based on capacity and net-metering approval." },
  { q: "What warranty do I get?", a: "Panels carry a 25-year performance warranty and 10–12 year product warranty. Inverters come with 5–10 years, extendable up to 25. Our workmanship warranty is 5 years." },
  { q: "Is maintenance really that low?", a: "Yes — solar panels have no moving parts. We recommend a wash every 45–60 days and an annual professional inspection under our AMC plan." },
  { q: "How much will I actually save?", a: "Homes save 70–90% of their monthly bill; agricultural pumps eliminate diesel expenses; commercial systems break even in 3–5 years and generate free power for the next 20." },
  { q: "Which solar panels do you install?", a: "We install only Tier-1 mono-PERC and TOPCon modules from BIS/MNRE-approved manufacturers such as Waaree, Adani, Vikram and Loom Solar." },
  { q: "What is net metering and do you help set it up?", a: "Net metering lets you sell surplus solar power back to the grid. We handle the entire DISCOM application, technical inspection and bidirectional meter installation." },
  { q: "Do you offer AMC after installation?", a: "Yes — our Annual Maintenance Contract covers panel cleaning, performance monitoring, breakdown response and yearly health check reports." },
];

export function FAQ() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions? <span className="text-gradient-green">We have answers</span></>}
          subtitle="Everything you need to know before going solar. Still curious? Talk to our advisors."
        />
        <Reveal>
          <div className="mt-12 rounded-[1.75rem] bg-section border border-[color:var(--leaf)] p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`i${i}`} className="border-b border-[color:var(--leaf)]/70 last:border-0">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-[color:var(--forest)] px-4 py-5 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4 pb-5 leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
