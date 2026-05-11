import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, LogOut, Package, Settings, Sparkles, User } from "lucide-react";
import { useWishlist, useCart } from "@/lib/store";

export const Route = createFileRoute("/account")({
  component: Account,
  head: () => ({ meta: [{ title: "Account — Lumière" }] }),
});

function Account() {
  const wish = useWishlist((s) => s.ids.length);
  const bag = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12">
      <div className="flex items-center gap-5 mb-10">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-gold text-primary-foreground font-display text-3xl">A</div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Lumière member</p>
          <h1 className="font-display text-3xl">Welcome, Alex</h1>
          <p className="text-sm text-muted-foreground">alex@studio.com</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { i: Package, t: "Orders", v: "3 active", to: "/" as const },
          { i: Heart, t: "Wishlist", v: `${wish} items`, to: "/wishlist" as const },
          { i: User, t: "Bag", v: `${bag} items`, to: "/cart" as const },
          { i: Sparkles, t: "AI Stylist", v: "Open chat", to: "/stylist" as const },
        ].map(({ i: I, t, v, to }) => (
          <Link key={t} to={to} className="rounded-2xl border border-border p-5 hover:border-gold transition">
            <I className="h-5 w-5 text-gold" />
            <p className="mt-3 text-sm font-medium">{t}</p>
            <p className="text-xs text-muted-foreground">{v}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <button className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm hover:border-gold">
          <Settings className="h-4 w-4 text-gold" /> Account settings
        </button>
        <button className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm hover:border-destructive">
          <LogOut className="h-4 w-4 text-destructive" /> Sign out
        </button>
      </div>
    </div>
  );
}
