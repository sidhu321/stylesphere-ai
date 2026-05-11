import { Link } from "@tanstack/react-router";
import { Instagram, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-luxe">
      <div className="mx-auto max-w-[1400px] px-4 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl"><span className="text-gradient-gold">LUMI</span>ÈRE</p>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            AI-native luxury fashion, curated for the modern wardrobe. Worldwide shipping.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Powered by Lumière AI Stylist
          </div>
        </div>
        <FCol title="Shop" links={[["Women","/shop/women"],["Men","/shop/men"],["Sneakers","/shop/sneakers"],["Watches","/shop/watches"]]} />
        <FCol title="Experience" links={[["AI Try-On","/try-on"],["AI Stylist","/stylist"],["Wishlist","/wishlist"],["Account","/account"]]} />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Newsletter</p>
          <form className="flex gap-2">
            <input className="flex-1 rounded-full bg-input px-4 py-2.5 text-sm outline-none" placeholder="you@studio.com" />
            <button className="rounded-full bg-gradient-gold px-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground">Join</button>
          </form>
          <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Instagram className="h-4 w-4" /> @lumiere
          </a>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Lumière Maison · All rights reserved
      </div>
    </footer>
  );
}

function FCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">{title}</p>
      <ul className="space-y-2.5 text-sm">
        {links.map(([l, t]) => (
          <li key={t}>
            <Link to={t} className="text-foreground/80 hover:text-gold">{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
