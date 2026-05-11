import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { products } from "@/lib/products";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/stylist")({
  component: Stylist,
  head: () => ({ meta: [{ title: "AI Stylist — Lumière" }] }),
});

type Msg = { role: "ai" | "me"; text: string; picks?: typeof products };

const starters = [
  "Style me for a Milan dinner",
  "Build a minimal capsule",
  "Sneakers under $200 only",
  "What's trending this week?",
];

function Stylist() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi, I'm Lumière. Describe the occasion, vibe, or piece you're looking for and I'll style you." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const picks = [...products].sort(() => Math.random() - 0.5).slice(0, 3);
    setMsgs((m) => [
      ...m,
      { role: "me", text },
      { role: "ai", text: "Here's a curated edit based on your vibe — three pieces that layer beautifully together.", picks },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-6">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Lumière AI</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2">Personal stylist</h1>
      </div>

      <div className="rounded-3xl border border-border bg-card overflow-hidden flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence initial={false}>
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "me" ? "bg-gradient-gold text-primary-foreground" : "bg-secondary"}`}>
                  {m.role === "ai" && <Sparkles className="inline h-3 w-3 text-gold mr-1.5" />}
                  {m.text}
                  {m.picks && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {m.picks.map((p) => (
                        <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="block">
                          <div className="aspect-[3/4] overflow-hidden rounded-lg">
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                          <p className="mt-1 text-[10px] truncate">{p.brand}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="border-t border-border p-3">
          {msgs.length === 1 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {starters.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-gold">{s}</button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Style me for…"
              className="flex-1 rounded-full bg-input px-5 py-3 text-sm outline-none" />
            <button className="grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-primary-foreground"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
