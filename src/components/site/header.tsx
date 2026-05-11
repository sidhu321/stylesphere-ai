import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";
import { useCart, useWishlist } from "@/lib/store";

const nav = [
  { to: "/shop/women", label: "Women" },
  { to: "/shop/men", label: "Men" },
  { to: "/shop/sneakers", label: "Sneakers" },
  { to: "/shop/hoodies", label: "Hoodies" },
  { to: "/shop/watches", label: "Watches" },
  { to: "/shop/accessories", label: "Accessories" },
] as const;

export function Header() {
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="border-b border-border/60 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-3 px-4 py-2">
          <Sparkles className="h-3 w-3 text-gold" />
          <span>Free worldwide shipping over $250 · AI try-on now live</span>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">
            <span className="text-gradient-gold">LUMI</span>ÈRE
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((n) => {
            const active = path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative py-1 transition-colors hover:text-gold ${
                  active ? "text-gold" : "text-foreground/80"
                }`}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <button className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary">
            <Search className="h-4 w-4" />
          </button>
          <Link to="/try-on" className="hidden md:inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-xs uppercase tracking-wider hover:bg-secondary">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> AI Try-on
          </Link>
          <Link to="/account" className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary">
            <User className="h-4 w-4" />
          </Link>
          <Link to="/wishlist" className="relative h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-secondary">
            <Heart className="h-4 w-4" />
            {wishCount > 0 && <Badge>{wishCount}</Badge>}
          </Link>
          <button
            onClick={open}
            className="relative h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-secondary"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && <Badge>{count}</Badge>}
          </button>
        </div>
      </div>
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-gold px-1 text-[10px] font-semibold text-primary-foreground">
      {children}
    </span>
  );
}
