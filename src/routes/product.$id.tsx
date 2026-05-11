import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Minus, Plus, Share2, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [
        { title: p ? `${p.name} — ${p.brand} | Lumière` : "Product — Lumière" },
        { name: "description", content: p?.description ?? "Luxury fashion at Lumière." },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-4xl">Product not found</p>
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

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState({ x: 0, y: 0, on: false });

  const add = useCart((s) => s.add);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:py-12">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop/$category" params={{ category: product.category }} className="hover:text-foreground capitalize">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_440px] gap-8 lg:gap-14">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="hidden md:flex flex-col gap-3">
            {product.gallery.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`aspect-[4/5] overflow-hidden rounded-lg border ${activeImg === i ? "border-gold" : "border-border"}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary cursor-zoom-in"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
            }}
            onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          >
            <motion.img
              key={activeImg}
              src={product.gallery[activeImg]}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="h-full w-full object-cover transition-transform duration-300"
              style={zoom.on ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: "scale(1.8)" } : undefined}
            />
            <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.gallery.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`h-1.5 rounded-full transition-all ${activeImg === i ? "w-6 bg-gold" : "w-1.5 bg-foreground/40"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 self-start">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{product.brand}</p>
          <h1 className="font-display text-3xl md:text-4xl mt-2">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-gold text-gold" />{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatPrice(product.price)}</span>
            <span className="text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
            {discount > 0 && <span className="text-gold text-sm font-semibold">{discount}% off</span>}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <div className="mt-7">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Color · {color}</p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)}
                  className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-background ${color === c.name ? "ring-2 ring-gold" : ""}`}
                  style={{ background: c.hex }} aria-label={c.name} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Size · {size}</p>
              <button className="text-xs text-gold underline-offset-4 hover:underline">Size guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`min-w-12 rounded-md border px-3 py-2.5 text-sm transition ${size === s ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <button onClick={() => toggleWish(product.id)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-gold">
              <Heart className={`h-4 w-4 ${wished ? "fill-gold text-gold" : ""}`} />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-gold">
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => add({ product, size, color, qty })}
              className="h-12 rounded-full border border-foreground text-sm font-medium uppercase tracking-wider hover:bg-foreground hover:text-background"
            >Add to bag</button>
            <button
              onClick={() => { add({ product, size, color, qty }); navigate({ to: "/cart" }); }}
              className="h-12 rounded-full bg-gradient-gold text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-glow"
            >Buy now</button>
          </div>

          <Link to="/try-on" className="mt-3 flex items-center justify-center gap-2 rounded-full glass py-3 text-xs uppercase tracking-wider hover:border-gold">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Try with AI
          </Link>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-xl border border-border p-3"><Truck className="h-4 w-4 text-gold" /> Free shipping over $250</div>
            <div className="flex items-center gap-2 rounded-xl border border-border p-3"><ShieldCheck className="h-4 w-4 text-gold" /> Authenticated</div>
          </div>

          <div className="mt-8 prose-invert">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Details</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      <Reviews rating={product.rating} count={product.reviews} />

      <section className="mt-20">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">You may also like</p>
        <h2 className="font-display text-3xl md:text-4xl mb-8">Similar pieces</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {similar.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}

function Reviews({ rating, count }: { rating: number; count: number }) {
  return (
    <section className="mt-20 border-t border-border pt-10">
      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">Reviews</p>
          <p className="font-display text-5xl">{rating}<span className="text-xl text-muted-foreground">/5</span></p>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? "fill-gold text-gold" : "text-muted-foreground"}`} />)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{count} verified reviews</p>
        </div>
        <div className="space-y-4">
          {[
            { n: "Olivia M.", t: "Exquisite craftsmanship", d: "The fit is impeccable and the fabric drapes beautifully. Worth every penny.", r: 5 },
            { n: "Daniel R.", t: "Looks even better in person", d: "Photos don't do justice. Shipping was fast and packaging premium.", r: 5 },
            { n: "Aiko T.", t: "Perfect everyday luxury", d: "Comfortable, elegant, easy to style. I get compliments every time.", r: 4 },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between">
                <p className="font-medium">{r.n}</p>
                <div className="flex gap-0.5">{Array.from({ length: r.r }).map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</div>
              </div>
              <p className="text-sm font-medium mt-2">{r.t}</p>
              <p className="text-sm text-muted-foreground mt-1">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
