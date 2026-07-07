import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/config/site";
import { Reveal } from "@/components/site/Reveal";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nEmail: ${fd.get("email")}\nCity: ${fd.get("city")}\nMonthly Bill: ${fd.get("bill")}\nRequirement: ${fd.get("req")}\n\nMessage:\n${fd.get("message")}`,
    );
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New Solar Enquiry — Tejaswi Enterprises")}&body=${body}`;
    setSent(true);
  }

  return (
    <section className={`${compact ? "py-16" : "py-24 md:py-32"} bg-white`}>
      <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="rounded-[2rem] bg-section border border-[color:var(--leaf)] p-6 md:p-10 shadow-[0_30px_80px_-40px_rgba(23,63,42,0.4)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[color:var(--brand)] border border-[color:var(--leaf)]">
              GET A FREE QUOTE
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[color:var(--forest)]">
              Tell us about your <span className="text-gradient-green">energy needs</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fill this quick form and our senior engineer will call you back within 2 business hours.
            </p>

            <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" required />
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Email Address" name="email" type="email" />
              <Field label="City / Location" name="city" required />
              <Field label="Monthly Electricity Bill (₹)" name="bill" type="number" placeholder="e.g. 5000" />
              <SelectField
                label="Requirement"
                name="req"
                options={[
                  "Residential Solar",
                  "Agricultural Solar",
                  "Commercial Solar",
                  "Industrial Solar",
                  "Solar Water Pump",
                  "Consultation / EPC",
                  "AMC Service",
                ]}
              />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Any details about your site, roof, or requirement…"
                  className="mt-2 w-full rounded-2xl border border-[color:var(--leaf)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to be contacted by Tejaswi Enterprises.
                </p>
                <button type="submit" className="btn-primary">
                  {sent ? "Thanks — opening email…" : (<>Send Enquiry <Send className="h-4 w-4" /></>)}
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.05}>
            <div className="rounded-[1.75rem] bg-dark-gradient text-white p-8 relative overflow-hidden">
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[color:var(--gold)] opacity-30 blur-3xl" />
              <h3 className="text-2xl font-bold">Reach us directly</h3>
              <ul className="mt-6 space-y-4 text-white/85">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-[color:var(--gold)] shrink-0" /> {site.address}</li>
                <li className="flex gap-3"><Phone className="h-5 w-5 text-[color:var(--gold)] shrink-0" /> <a href={site.phoneHref}>{site.phone}</a></li>
                <li className="flex gap-3"><Mail className="h-5 w-5 text-[color:var(--gold)] shrink-0" /> <a href={site.emailHref}>{site.email}</a></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/15">
                <p className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Business hours</p>
                <p className="mt-1 font-semibold">{site.hours}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={site.whatsappHref} className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold hover:brightness-110">
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--forest)] px-4 py-2 text-sm font-semibold hover:brightness-110">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[1.75rem] overflow-hidden border border-[color:var(--leaf)] shadow-sm h-64">
              <iframe
                title="Location map"
                src={site.mapEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">{label}{required && <span className="text-[color:var(--gold)]">*</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[color:var(--leaf)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">{label}</label>
      <select
        name={name}
        className="mt-2 w-full rounded-2xl border border-[color:var(--leaf)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
