import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({ meta: [{ title: "Create account — Lumière" }] }),
});

function Signup() {
  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh]">
      <div className="flex items-center justify-center p-8 order-2 lg:order-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h1 className="font-display text-3xl">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the Lumière members club</p>
          <button className="mt-6 w-full rounded-full border border-border py-3 text-sm hover:border-gold">Continue with Google</button>
          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <form className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="First name" className="rounded-full bg-input px-5 py-3 text-sm outline-none" />
              <input placeholder="Last name" className="rounded-full bg-input px-5 py-3 text-sm outline-none" />
            </div>
            <input type="email" placeholder="Email" className="w-full rounded-full bg-input px-5 py-3 text-sm outline-none" />
            <input type="password" placeholder="Password" className="w-full rounded-full bg-input px-5 py-3 text-sm outline-none" />
            <button className="w-full rounded-full bg-gradient-gold py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground">Join Lumière</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a member? <Link to="/login" className="text-gold">Sign in</Link>
          </p>
        </motion.div>
      </div>
      <div className="relative hidden lg:block order-1 lg:order-2">
        <img src={hero2} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-background/40" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Members get</p>
          <p className="font-display text-4xl mt-2">Early drops, AI styling, free shipping.</p>
        </div>
      </div>
    </div>
  );
}
