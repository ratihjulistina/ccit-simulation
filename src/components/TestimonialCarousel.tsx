import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site-content";

const AUTOPLAY_MS = 12000;

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi, paused]);

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t) => (
            <div key={t.name + t.company} className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <span className="text-4xl leading-none text-primary/30" aria-hidden="true">“</span>
                <blockquote className="flex-1 text-sm leading-relaxed text-ink">{t.quote}</blockquote>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role}, {t.company}
                  </p>
                </footer>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => emblaApi?.scrollPrev()}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-ink transition-colors hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.company + i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === selected}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => emblaApi?.scrollNext()}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-ink transition-colors hover:bg-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Slides advance every 12 seconds · hover to pause
      </p>
    </div>
  );
}
