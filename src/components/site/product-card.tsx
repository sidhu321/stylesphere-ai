import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const add = useCart((s) => s.add);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary sheen">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {product.badges?.length ? (
            <div className="absolute left-3 top-3 flex gap-1.5">
              {product.badges.map((b) => (
                <span key={b} className="rounded-full bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur">
                  {b}
                </span>
              ))}
            </div>
          ) : null}
          {discount > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
              -{discount}%
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label="Wishlist"
            className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur transition hover:bg-background"
          >
            <motion.span
              key={String(wished)}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-gold text-gold" : ""}`} />
            </motion.span>
          </button>
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                add({ product, size: product.sizes[0], color: product.colors[0].name, qty: 1 });
              }}
              className="hidden md:flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-2.5 text-xs font-medium uppercase tracking-wider text-background hover:bg-gold hover:text-primary-foreground"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Quick add
            </button>
          </div>
        </div>
        <div className="mt-3 space-y-1 px-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
          <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
            <span className="ml-auto inline-flex items-center gap-0.5 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-gold text-gold" />
              {product.rating}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
