import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CTA } from "@/components/home/CTA";
import { products } from "@/data/products";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Solar Products — Panels, Inverters, Batteries & Pumps | Tejaswi" },
      { name: "description", content: "Explore Tejaswi Enterprises' complete range of tier-1 solar panels, inverters, lithium batteries, pumps and balance-of-system components." },
      { property: "og:title", content: "Solar Products — Tejaswi Enterprises" },
      { property: "og:description", content: "Premium solar panels, inverters, batteries, pumps and lighting — engineered for Indian conditions." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return (
    <>
      <PageHero
        eyebrow="OUR PRODUCTS"
        title={<>Premium solar <span className="text-gradient-green">products</span> for every need</>}
        subtitle="Tier-1 panels, smart inverters, lithium storage and complete BoS — everything you need under one Tejaswi warranty."
        crumbs={[{ to: "/", label: "Home" }, { to: "/products", label: "Products" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <span key={c} className="inline-flex items-center gap-2 rounded-full bg-[color:var(--section)] border border-[color:var(--leaf)] px-4 py-1.5 text-xs font-semibold tracking-widest text-[color:var(--brand)]">
                {c}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="card-elevated block h-full overflow-hidden group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold tracking-widest text-[color:var(--brand)]">
                      {p.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[color:var(--forest)] leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {p.tagline}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Starting at</span>
                        <div className="text-xl font-bold text-gradient-green">{p.price}</div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--brand)] group-hover:gap-2 transition-all">
                        View <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground border-t border-[color:var(--leaf)] pt-3">
                      <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" />
                      {p.warranty}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
