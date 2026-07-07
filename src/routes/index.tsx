import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { SolarBenefits } from "@/components/home/SolarBenefits";
import { Process } from "@/components/home/Process";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — ${site.tagline}` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — ${site.tagline}` },
      { property: "og:description", content: site.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          description: site.description,
          telephone: site.phone,
          email: site.email,
          priceRange: "₹₹",
          address: { "@type": "PostalAddress", streetAddress: site.address },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <SolarBenefits />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <FAQ />
      <CTA />
      <ContactForm compact />
    </>
  );
}
