import { Link } from "@tanstack/react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/config/site";

const services = [
  "Residential Solar",
  "Agricultural Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Solar Water Pumps",
  "Solar EPC & Consultancy",
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-dark-gradient text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-30" />
      <div className="container-x relative z-10 pt-20 pb-10 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-5 text-white/70 leading-relaxed max-w-sm">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: FaFacebookF, href: site.social.facebook, label: "Facebook" },
              { Icon: FaInstagram, href: site.social.instagram, label: "Instagram" },
              { Icon: FaLinkedinIn, href: site.social.linkedin, label: "LinkedIn" },
              { Icon: FaYoutube, href: site.social.youtube, label: "YouTube" },
              { Icon: FaWhatsapp, href: site.whatsappHref, label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-[color:var(--forest)] transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-widest text-[color:var(--gold)]">QUICK LINKS</h4>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/80 hover:text-[color:var(--gold)] transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-widest text-[color:var(--gold)]">SERVICES</h4>
          <ul className="mt-5 space-y-2.5">
            {services.map((s) => (
              <li key={s}>
                <Link to="/services" className="text-white/80 hover:text-[color:var(--gold)] transition-colors">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-widest text-[color:var(--gold)]">CONTACT</h4>
          <ul className="mt-5 space-y-3 text-white/80 text-sm">
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-[color:var(--gold)]" /> {site.address}</li>
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-[color:var(--gold)]" /> <a href={site.phoneHref}>{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-[color:var(--gold)]" /> <a href={site.emailHref}>{site.email}</a></li>
          </ul>

          <form
            className="mt-6 flex items-center gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none"
            />
            <button className="inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-[color:var(--forest)] hover:brightness-110">
              <Send className="h-4 w-4" /> Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row justify-between gap-3 text-sm text-white/60">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Powering a greener tomorrow, one rooftop at a time.</p>
        </div>
      </div>
    </footer>
  );
}
