import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { FAQ } from "@/components/home/FAQ";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tejaswi Enterprises — Get a Free Solar Quote" },
      { name: "description", content: "Talk to Tejaswi's senior engineers for a free consultation, site survey and solar system quotation." },
      { property: "og:title", content: "Contact Tejaswi Enterprises" },
      { property: "og:description", content: "Free consultation, site survey and solar quotation." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title={<>Let's power your <span className="text-gradient-green">next project</span></>}
        subtitle="Fill the form or call us directly — we respond within 2 business hours."
        crumbs={[{ to: "/", label: "Home" }, { to: "/contact", label: "Contact" }]}
      />
      <ContactForm />
      <FAQ />
    </>
  );
}
