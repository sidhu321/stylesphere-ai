import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { products } from "@/lib/products";
import { useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({ meta: [{ title: "Wishlist — Lumière" }] }),
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12">
      <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">Saved for later</p>
      <h1 className="font-display text-4xl md:text-5xl mb-10">Your wishlist</h1>
      {items.length === 0 ? (
        <div className="py-24 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="font-display text-2xl mt-4">Nothing saved yet</p>
          <p className="text-muted-foreground text-sm mt-2">Tap the heart on any piece you love.</p>
          <Link to="/shop/women" className="mt-6 inline-flex rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-medium text-primary-foreground">Start exploring</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
