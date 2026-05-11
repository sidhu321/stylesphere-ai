import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Download, Sparkles, Upload, Wand2 } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/try-on")({
  component: TryOn,
  head: () => ({ meta: [{ title: "AI Try-On — Lumière" }] }),
});

function TryOn() {
  const [me, setMe] = useState<string | null>(null);
  const [outfit, setOutfit] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(50);

  const handleFile = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => set(r.result as string); r.readAsDataURL(f);
  };

  const generate = () => {
    setLoading(true);
    setTimeout(() => { setGenerated(outfit ?? hero1); setLoading(false); }, 1800);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Lumière AI</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Try it on, virtually.</h1>
        <p className="mt-3 max-w-xl mx-auto text-muted-foreground">Upload your photo and an outfit. Our AI renders a photorealistic preview in seconds.</p>
      </div>

      <div className="grid lg:grid-cols-[360px_1fr] gap-8">
        <div className="space-y-4">
          <UploadCard title="Your photo" img={me} onChange={handleFile(setMe)} />
          <UploadCard title="Outfit" img={outfit} onChange={handleFile(setOutfit)} />
          <button
            onClick={generate} disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-glow disabled:opacity-60"
          >
            <Wand2 className="h-4 w-4" /> {loading ? "Generating…" : "Generate try-on"}
          </button>
          <p className="text-center text-[11px] text-muted-foreground">Demo preview · Cloud AI not connected</p>
        </div>

        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-secondary">
          {generated ? (
            <BeforeAfter before={me ?? hero2} after={generated} value={slider} setValue={setSlider} />
          ) : (
            <motion.div className="grid h-full place-items-center text-center px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div>
                <Sparkles className="mx-auto h-10 w-10 text-gold" />
                <p className="font-display text-2xl mt-4">Awaiting your inputs</p>
                <p className="text-sm text-muted-foreground mt-2">Upload your photo and an outfit, then hit generate.</p>
              </div>
            </motion.div>
          )}
          {generated && (
            <button className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs">
              <Download className="h-3.5 w-3.5 text-gold" /> Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function UploadCard({ title, img, onChange }: { title: string; img: string | null; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button onClick={() => ref.current?.click()} className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-border hover:border-gold transition group">
      {img ? <img src={img} className="absolute inset-0 h-full w-full object-cover" alt="" /> : (
        <div className="grid h-full place-items-center text-muted-foreground">
          <div className="text-center">
            <Upload className="mx-auto h-6 w-6 text-gold" />
            <p className="mt-2 text-sm">{title}</p>
            <p className="text-[11px]">Click to upload</p>
          </div>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" onChange={onChange} className="hidden" />
    </button>
  );
}

function BeforeAfter({ before, after, value, setValue }: { before: string; after: string; value: number; setValue: (n: number) => void }) {
  return (
    <div className="relative h-full w-full select-none">
      <img src={after} className="absolute inset-0 h-full w-full object-cover" alt="" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
        <img src={before} className="absolute inset-0 h-full w-full object-cover" style={{ width: `${100 / (value / 100)}%` }} alt="" />
      </div>
      <div className="absolute top-0 bottom-0" style={{ left: `${value}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-gold" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-primary-foreground text-xs">↔</div>
      </div>
      <input type="range" min={0} max={100} value={value} onChange={(e) => setValue(+e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
      <div className="absolute top-3 left-3 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-wider">Before</div>
      <div className="absolute top-3 right-3 rounded-full bg-gradient-gold px-3 py-1 text-[10px] uppercase tracking-wider text-primary-foreground">After · AI</div>
    </div>
  );
}
