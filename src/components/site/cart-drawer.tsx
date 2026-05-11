import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background border-l border-border"
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-display text-xl">Your Bag</h2>
                <p className="text-xs text-muted-foreground">{items.length} item{items.length !== 1 && "s"}</p>
              </div>
              <button onClick={close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 && (
                <div className="grid h-full place-items-center text-center text-muted-foreground">
                  <div>
                    <p className="font-display text-2xl text-foreground mb-2">Your bag is empty</p>
                    <p className="text-sm mb-6">Discover the new collection.</p>
                    <Link to="/shop/women" onClick={close} className="inline-flex rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-medium text-primary-foreground">
                      Shop the edit
                    </Link>
                  </div>
                </div>
              )}
              <AnimatePresence>
                {items.map((i) => (
                  <motion.div
                    key={i.product.id + i.size}
                    layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 30 }}
                    className="flex gap-4 rounded-xl border border-border bg-card p-3"
                  >
                    <img src={i.product.image} alt={i.product.name} className="h-24 w-20 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{i.product.brand}</p>
                      <p className="text-sm font-medium line-clamp-1">{i.product.name}</p>
                      <p className="text-xs text-muted-foreground">{i.color} · {i.size}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button onClick={() => setQty(i.product.id, i.size, i.qty - 1)} className="grid h-7 w-7 place-items-center"><Minus className="h-3 w-3" /></button>
                          <span className="w-6 text-center text-xs">{i.qty}</span>
                          <button onClick={() => setQty(i.product.id, i.size, i.qty + 1)} className="grid h-7 w-7 place-items-center"><Plus className="h-3 w-3" /></button>
                        </div>
                        <span className="text-sm font-semibold">{formatPrice(i.product.price * i.qty)}</span>
                      </div>
                    </div>
                    <button onClick={() => remove(i.product.id, i.size)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display text-xl">{formatPrice(subtotal())}</span>
                </div>
                <Link to="/cart" onClick={close} className="block w-full rounded-full bg-gradient-gold py-3 text-center text-sm font-medium uppercase tracking-wider text-primary-foreground">
                  Checkout
                </Link>
                <p className="text-center text-[11px] text-muted-foreground">Shipping & taxes calculated at checkout</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
