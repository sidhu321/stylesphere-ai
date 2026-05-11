import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import hero1 from "@/assets/hero-1.jpg";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Sign in — Lumière" }] }),
});

function Login() {
  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh]">
      <div className="relative hidden lg:block">
        <img src={hero1} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Lumière members</p>
          <p className="font-display text-4xl mt-2">Welcome back to the atelier.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h1 className="font-display text-3xl">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-1">Access your wardrobe & wishlist</p>
          <button className="mt-6 w-full rounded-full border border-border py-3 text-sm hover:border-gold">Continue with Google</button>
          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <form className="space-y-3">
            <input type="email" placeholder="Email" className="w-full rounded-full bg-input px-5 py-3 text-sm outline-none" />
            <input type="password" placeholder="Password" className="w-full rounded-full bg-input px-5 py-3 text-sm outline-none" />
            <Link to="/" className="block text-right text-xs text-muted-foreground hover:text-gold">Forgot password?</Link>
            <button className="w-full rounded-full bg-gradient-gold py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground">Sign in</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Lumière? <Link to="/signup" className="text-gold">Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
