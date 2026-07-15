import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronRight, Phone, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Reveal } from "@/components/site/Reveal";
import { CTA } from "@/components/home/CTA";
import { productBySlug, products } from "@/data/products";
import { site } from "@/config/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Tejaswi" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} | Tejaswi Enterprises` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.tagline },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-bold text-[color:var(--forest)]">Product not found</h1>
      <p className="mt-3 text-muted-foreground">The product you're looking for is unavailable.</p>
      <Link to="/products" className="btn-primary mt-8 inline-flex">Back to products</Link>
    </div>
  );
}

function ProductDetail() {
  const { product: p } = Route.useLoaderData() as { product: import("@/data/products").Product };
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="relative bg-hero pt-12 pb-6">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-[color:var(--brand)]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/products" className="hover:text-[color:var(--brand)]">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[color:var(--forest)] truncate">{p.name}</span>
          </nav>
        </div>
      </section>

      <section className="pt-8 pb-20 bg-hero">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-start">
          <Reveal>
            <div className="rounded-[2rem] overflow-hidden border-4 border-white shadow-[0_40px_80px_-30px_rgba(23,63,42,0.35)] bg-white">
              <img src={p.image} alt={p.name} className="w-full h-[460px] object-cover" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[color:var(--brand)] border border-[color:var(--leaf)]">
                {p.category.toUpperCase()}
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold text-[color:var(--forest)] leading-tight">
                {p.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{p.tagline}</p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gradient-gold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/ starting price · incl. GST</span>
              </div>

              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {p.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-2 rounded-2xl bg-white/70 backdrop-blur border border-[color:var(--leaf)] px-3 py-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-[color:var(--forest)]">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  <Sparkles className="h-4 w-4" /> Request Quote
                </Link>
                <a href={site.whatsappHref} className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white font-semibold px-5 py-3 hover:brightness-110">
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href={site.phoneHref} className="btn-outline">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-[color:var(--brand)]" />
                {p.warranty}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--forest)]">
                Product <span className="text-gradient-green">overview</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.description}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every Tejaswi product is engineered for Indian conditions — extreme heat, humidity and dust —
                and backed by our end-to-end service network. Our senior engineers will help you size,
                install and monitor the system for its entire lifetime.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-elevated p-6">
              <h3 className="text-lg font-bold text-[color:var(--forest)]">Technical specifications</h3>
              <dl className="mt-4 divide-y divide-[color:var(--leaf)]">
                {Object.entries(p.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="text-sm font-semibold text-[color:var(--forest)] text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 bg-section">
          <div className="container-x">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[color:var(--forest)]">
                Related <span className="text-gradient-green">products</span>
              </h2>
              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand)]">
                <ArrowLeft className="h-4 w-4" /> All products
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/products/$slug"
                  params={{ slug: r.slug }}
                  className="card-elevated overflow-hidden group"
                >
                  <div className="h-44 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[color:var(--forest)]">{r.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{r.tagline}</p>
                    <div className="mt-3 text-lg font-bold text-gradient-gold">{r.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
