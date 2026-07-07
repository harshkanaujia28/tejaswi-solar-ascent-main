import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-solar.jpg";
import { ArrowRight, BadgeCheck, IndianRupee, ShieldCheck, Zap } from "lucide-react";

const floaters = [
  { Icon: BadgeCheck, label: "Government Subsidy", tint: "bg-[color:var(--brand)]" },
  { Icon: ShieldCheck, label: "25+ Years Panel Life", tint: "bg-[color:var(--forest)]" },
  { Icon: IndianRupee, label: "Save up to 90% Bill", tint: "bg-[color:var(--gold)] text-[color:var(--forest)]" },
  { Icon: Zap, label: "Professional Install", tint: "bg-[color:var(--brand-2)]" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero pt-10 md:pt-16 pb-24">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[color:var(--gold)] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[color:var(--brand)] opacity-20 blur-3xl" />

      <div className="container-x relative grid gap-14 lg:grid-cols-[1.05fr_1fr] items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[color:var(--brand)] shadow-sm border border-[color:var(--leaf)]"
          >
            🌱 SUSTAINABLE ENERGY SOLUTIONS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-[color:var(--forest)]"
          >
            Powering <span className="text-gradient-green">Homes</span> &<br />
            Agriculture With
            <br />
            <span className="text-gradient-gold">Smart Solar Energy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-[color:var(--muted-foreground)] leading-relaxed"
          >
            Tejaswi Enterprises provides reliable and affordable solar energy solutions for homes,
            farms, commercial buildings and industries — with complete consultation, installation,
            EPC and after-sales support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link to="/contact" className="btn-primary">
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="btn-outline">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { k: "30+", v: "Projects" },
              { k: "4", v: "Months" },
              { k: "24×7", v: "Support" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl font-bold text-gradient-green">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-30px_rgba(23,63,42,0.5)] border-4 border-white">
            <img
              src={heroImg}
              alt="Solar panels on modern home with green farmland"
              width={1600}
              height={1200}
              className="w-full h-[520px] lg:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--forest)]/30 via-transparent to-[color:var(--gold)]/20" />
          </div>

          {/* Floating cards */}
          {floaters.map((f, i) => {
            const pos = [
              "top-6 -left-4 lg:-left-10",
              "top-1/3 -right-4 lg:-right-8",
              "bottom-24 -left-6 lg:-left-12",
              "bottom-6 right-6",
            ][i];
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.15 }}
                className={`absolute ${pos} glass rounded-2xl px-4 py-3 flex items-center gap-3 animate-float`}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-white ${f.tint}`}>
                  <f.Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-semibold text-[color:var(--forest)] whitespace-nowrap">{f.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
