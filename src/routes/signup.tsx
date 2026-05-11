import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({ meta: [{ title: "Create account — Lumière" }] }),
});

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.fullName.trim()) return setError("Please enter your full name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Please enter a valid email");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    if (form.password !== form.confirm) return setError("Passwords do not match");
    // mock submit
    console.log("signup", form);
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh]">
      <div className="flex items-center justify-center p-8 order-2 lg:order-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <h1 className="font-display text-3xl">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the Lumière members club</p>
          <button type="button" className="mt-6 w-full rounded-full border border-border py-3 text-sm hover:border-gold transition-colors">Continue with Google</button>
          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="Full Name">
              <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Doe" className="field-input" />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" className="field-input" />
            </Field>
            <Field label="Phone">
              <div className="flex gap-2">
                <span className="rounded-full bg-input px-4 py-3 text-sm text-muted-foreground">+91</span>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="98765 43210" className="field-input flex-1" />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Gender">
                <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className="field-input appearance-none">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field label="DOB">
                <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} className="field-input" />
              </Field>
            </div>
            <Field label="Password">
              <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" className="field-input" />
            </Field>
            <Field label="Confirm Password">
              <input type="password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} placeholder="••••••••" className="field-input" />
            </Field>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-gradient-gold py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity">Sign Up</button>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
