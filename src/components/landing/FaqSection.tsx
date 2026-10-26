import { useState } from "react";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { faqList } from "@/data/landing";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const items = all ? faqList : faqList.slice(0, 5);

  return (
    <section id="faq" className="bg-secondary py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center font-display text-3xl font-semibold">Pertanyaan yang Sering Ditanyakan</h2>
        <div className="mt-10 space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-lg border bg-card">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold"
                >
                  {f.q}
                  {isOpen ? <Minus className="h-5 w-5 shrink-0" /> : <Plus className="h-5 w-5 shrink-0" />}
                </button>
                {isOpen && <p className="px-6 pb-5 text-sm leading-6 text-muted-foreground">{f.a}</p>}
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setAll(!all)}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {all ? "Tampilkan Lebih Sedikit" : "Lihat Semua Pertanyaan"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
