import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Gem } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lumière — AI Luxury Fashion" },
      { name: "description", content: "Discover the new season of AI-curated luxury fashion. Free worldwide shipping over $250." },
    ],
  }),
});

function Index() {
  const trending = products.slice(0, 8);
  const newArrivals = [...products].reverse().slice(0, 4);
  return (
    <div>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <PromoBanner />
      <Section
        eyebrow="Edit Nº 04"
        title="Trending now"
        sub="Hand-picked by our AI stylist this week."
        cta={{ label: "View all", to: "/shop/women" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>
      <Reels />
      <Section
        eyebrow="Just landed"
        title="New arrivals"
        sub="Fresh in from the atelier."
        cta={{ label: "Discover", to: "/shop/men" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>
      <AIStrip />
      <Promises />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[88vh]">
        <div className="relative flex flex-col justify-center px-6 md:px-16 py-16 bg-gradient-luxe">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold"
          >
            <Sparkles className="h-3 w-3" /> Atelier · Spring drop 26
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-5 text-5xl md:text-7xl lg:text-8xl leading-[0.95]"
          >
            Wear the<br />
            <span className="italic text-gradient-gold">future</span> of<br />
            fashion.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-md text-base text-muted-foreground"
          >
            AI-curated luxury, hand-finished by master ateliers. Try anything on virtually before it ships.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/shop/women" className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-glow">
              Shop the edit
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/try-on" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm uppercase tracking-wider hover:border-gold">
              <Sparkles className="h-4 w-4 text-gold" /> Try-on with AI
            </Link>
          </motion.div>
          <div className="mt-12 flex items-center gap-8 text-xs text-muted-foreground">
            <Stat n="240k+" l="Members" />
            <Stat n="4.9★" l="Avg rating" />
            <Stat n="48h" l="Express ship" />
          </div>
        </div>
        <div className="relative">
          <motion.img
            src={hero1} alt="Luxury fashion editorial"
            initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent md:from-background/40" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 right-8 hidden md:block glass rounded-2xl p-4 max-w-xs"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">Featured</p>
            <p className="font-display text-lg leading-tight">Atelier Couture · Look 03</p>
            <p className="mt-1 text-xs text-muted-foreground">Maison Eclipse · From $1,899</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-2xl text-foreground">{n}</p>
      <p className="text-[10px] uppercase tracking-wider">{l}</p>
    </div>
  );
}

function Marquee() {
  const items = ["Free shipping over $250", "AI Try-On · live", "30-day returns", "Carbon-neutral delivery", "Authenticated by Lumière"];
  return (
    <div className="border-y border-border bg-background py-4 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-gold" /> {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:py-24">
      <Eyebrow>Universes</Eyebrow>
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-4xl md:text-5xl">Shop by category</h2>
        <Link to="/shop/women" className="hidden md:inline-flex text-sm text-muted-foreground hover:text-gold">View all →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {categories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Link to="/shop/$category" params={{ category: c.slug }} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
              <motion.img src={c.image} alt={c.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.7 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{c.tagline}</p>
                <p className="font-display text-2xl md:text-3xl">{c.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-4">
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-luxe"
        >
          <img src={hero2} alt="Mens collection" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
          <div className="relative h-full flex flex-col justify-center p-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Mens · FW Edit</p>
            <h3 className="font-display text-4xl md:text-5xl mt-2 max-w-sm">Tailored in shadow.</h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">Italian wools, hand-cut silhouettes.</p>
            <Link to="/shop/men" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/30 px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-foreground hover:text-background">
              Shop men <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-gold"
        >
          <div className="relative h-full flex flex-col justify-center p-10 text-primary-foreground">
            <p className="text-[11px] uppercase tracking-[0.3em]">Limited drop</p>
            <h3 className="font-display text-4xl md:text-5xl mt-2 max-w-sm">Up to 40% off the icons.</h3>
            <p className="mt-3 max-w-sm text-sm opacity-80">Bestsellers in their final season.</p>
            <Link to="/shop/sneakers" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-background px-5 py-2.5 text-xs uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background">
              Shop sale <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ eyebrow, title, sub, cta, children }: { eyebrow: string; title: string; sub?: string; cta?: { label: string; to: string }; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:py-24">
      <div className="flex items-end justify-between mb-10 gap-4">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
          {sub && <p className="mt-2 text-sm text-muted-foreground max-w-md">{sub}</p>}
        </div>
        {cta && <Link to={cta.to} className="text-sm text-muted-foreground hover:text-gold whitespace-nowrap">{cta.label} →</Link>}
      </div>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">{children}</p>;
}

function Reels() {
  const reels = products.slice(2, 8);
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <Eyebrow>Fashion reels</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl">Style in motion</h2>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 snap-x snap-mandatory">
        {reels.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative flex-shrink-0 snap-start aspect-[9/16] w-[220px] md:w-[280px] overflow-hidden rounded-3xl"
          >
            <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] uppercase tracking-wider text-gold">@stylist · {1.2 + i * 0.3}M views</p>
              <p className="text-sm font-medium mt-1">{p.brand}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{p.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AIStrip() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-luxe p-10 md:p-16">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>AI-Native shopping</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Your <span className="italic text-gradient-gold">personal stylist</span>, on demand.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Upload a photo, describe a vibe, or ask for a complete look — Lumière AI builds it for you in seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/try-on" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-primary-foreground">
                <Sparkles className="h-4 w-4" /> Open AI Try-On
              </Link>
              <Link to="/stylist" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-gold">
                Talk to Stylist
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[products[4], products[3], products[8], products[10]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square overflow-hidden rounded-2xl border border-border"
              >
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  const items = [
    { i: Truck, t: "Express worldwide", d: "Free over $250" },
    { i: ShieldCheck, t: "Authenticated", d: "100% genuine" },
    { i: Gem, t: "Atelier-finished", d: "Hand-checked" },
    { i: Sparkles, t: "AI-curated", d: "Tailored to you" },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ i: I, t, d }) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border border-border p-5">
            <I className="h-6 w-6 text-gold" />
            <div>
              <p className="text-sm font-medium">{t}</p>
              <p className="text-xs text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
