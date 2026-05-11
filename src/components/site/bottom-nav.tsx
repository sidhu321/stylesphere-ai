import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Home, Search, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/store";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shop/women", label: "Shop", icon: Search },
  { to: "/try-on", label: "Try-On", icon: Sparkles },
  { to: "/wishlist", label: "Wish", icon: Heart },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const Active = path === it.to || path.startsWith(it.to + "/") || (it.to === "/shop/women" && path.startsWith("/shop"));
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] tracking-wider uppercase ${
                Active ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {it.label}
            </Link>
          );
        })}
        <button
          onClick={open}
          className="relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] tracking-wider uppercase text-muted-foreground"
        >
          <ShoppingBag className="h-5 w-5" />
          Bag
          {count > 0 && (
            <span className="absolute right-5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-gold px-1 text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
