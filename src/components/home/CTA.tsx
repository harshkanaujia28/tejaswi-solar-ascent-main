import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { site } from "@/config/site";

export function CTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-dark-gradient text-white px-8 py-16 md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[color:var(--gold)] opacity-30 blur-3xl" />
            <div className="relative max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[color:var(--gold)] border border-white/20">
                ☀ READY TO GO SOLAR?
              </span>
              <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
                Ready to switch to<br />
                <span className="text-gradient-gold">solar energy?</span>
              </h2>
              <p className="mt-5 text-lg text-white/80 max-w-xl">
                Get a free consultation from our senior engineers today. No obligations — just clarity, savings estimates and honest advice.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] text-[color:var(--forest)] font-semibold px-6 py-3.5 hover:brightness-110 transition">
                  Book Free Site Visit
                </Link>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur text-white px-6 py-3.5 hover:bg-white/20 transition">
                  <Phone className="h-4 w-4" /> Call {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
