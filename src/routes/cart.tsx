import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShieldCheck, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Bag — Lumière" }] }),
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(0);
  const ship = subtotal() > 250 || subtotal() === 0 ? 0 : 25;
  const total = subtotal() + ship - applied;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <p className="font-display text-5xl">Your bag is empty</p>
        <p className="mt-3 text-muted-foreground">Discover the new season.</p>
        <Link to="/shop/women" className="mt-8 inline-flex rounded-full bg-gradient-gold px-7 py-3 text-sm font-medium text-primary-foreground">Shop the edit</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="font-display text-4xl md:text-5xl mb-2">Checkout</h1>
      <p className="text-sm text-muted-foreground mb-10">{items.length} item{items.length !== 1 && "s"} in your bag</p>
      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((i) => (
              <motion.div key={i.product.id + i.size} layout exit={{ opacity: 0, x: 30 }}
                className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <img src={i.product.image} className="h-32 w-24 rounded-lg object-cover" alt={i.product.name} />
                <div className="flex flex-1 flex-col">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{i.product.brand}</p>
                  <Link to="/product/$id" params={{ id: i.product.id }} className="text-sm font-medium hover:text-gold">{i.product.name}</Link>
                  <p className="text-xs text-muted-foreground">{i.color} · Size {i.size}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(i.product.id, i.size, i.qty - 1)} className="grid h-8 w-8 place-items-center"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-xs">{i.qty}</span>
                      <button onClick={() => setQty(i.product.id, i.size, i.qty + 1)} className="grid h-8 w-8 place-items-center"><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="font-semibold">{formatPrice(i.product.price * i.qty)}</p>
                  </div>
                </div>
                <button onClick={() => remove(i.product.id, i.size)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="lg:sticky lg:top-28 self-start space-y-5 rounded-2xl border border-border p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="flex gap-2">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Promo code" className="flex-1 rounded-full bg-input px-4 py-2.5 text-sm outline-none" />
            <button onClick={() => setApplied(coupon.toUpperCase() === "LUMI10" ? Math.round(subtotal() * 0.1) : 0)}
              className="rounded-full border border-border px-4 text-xs uppercase tracking-wider hover:border-gold">Apply</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Try code <span className="text-gold">LUMI10</span> for 10% off</p>
          <div className="space-y-2 text-sm pt-3 border-t border-border">
            <Row l="Subtotal" v={formatPrice(subtotal())} />
            <Row l="Shipping" v={ship === 0 ? "Free" : formatPrice(ship)} />
            {applied > 0 && <Row l="Discount" v={`-${formatPrice(applied)}`} />}
            <div className="flex justify-between pt-3 border-t border-border font-display text-xl">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
          <button className="w-full rounded-full bg-gradient-gold py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-glow">
            Pay securely
          </button>
          <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-gold" /> Encrypted</span>
            <span className="inline-flex items-center gap-1"><Truck className="h-3 w-3 text-gold" /> 48h delivery</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}
