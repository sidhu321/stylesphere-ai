import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { byCategory, categories, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/shop/$category")({
  component: ShopCategory,
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ params }) => {
    const cat = categories.find((c) => c.slug === (params.category as CategorySlug));
    const label = cat?.label ?? "Shop";
    return {
      meta: [
        { title: `${label} — Lumière` },
        { name: "description", content: `Shop ${label.toLowerCase()} at Lumière. AI-curated luxury fashion.` },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-4xl">Category not found</p>
      <Link to="/" className="mt-4 inline-block text-gold">Return home</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-2xl">Something went wrong</p>
      <p className="text-muted-foreground text-sm mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-full bg-gradient-gold px-5 py-2 text-sm text-primary-foreground">Retry</button>
    </div>
  ),
});

const sortOptions = [
  { v: "featured", l: "Featured" },
  { v: "low", l: "Price: Low to high" },
  { v: "high", l: "Price: High to low" },
  { v: "rating", l: "Top rated" },
];

function ShopCategory() {
  const { cat } = Route.useLoaderData();
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(50000);

  const items = useMemo(() => {
    let list = byCategory(cat.slug).filter((p) => p.price <= maxPrice);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, sort, maxPrice]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img src={cat.image} alt={cat.label} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-20 md:py-28">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] uppercase tracking-[0.35em] text-gold">{cat.tagline}</motion.p>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="font-display text-5xl md:text-7xl mt-3">
            {cat.label}
          </motion.h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{items.length} pieces · curated by Lumière AI</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block sticky top-28 self-start space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3 flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" /> Filters
            </p>
            <div className="space-y-2">
              {categories.map((c) => (
                <Link key={c.slug} to="/shop/$category" params={{ category: c.slug }}
                  className={`block text-sm py-1.5 ${c.slug === cat.slug ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Price</p>
            <input type="range" min={1000} max={50000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[var(--gold)]" />
            <p className="text-xs text-muted-foreground mt-2">Up to ${maxPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {["XS","S","M","L","XL"].map(s => (
                <button key={s} className="h-8 w-10 rounded-md border border-border text-xs hover:border-gold">{s}</button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <button className="lg:hidden inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </button>
            <p className="hidden lg:block text-sm text-muted-foreground">Showing {items.length} results</p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-wider">
              {sortOptions.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
          {items.length === 0 ? (
            <div className="py-32 text-center text-muted-foreground">No pieces match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
