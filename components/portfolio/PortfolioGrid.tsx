'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Maximize2, Clock, Ruler, Wallet } from 'lucide-react';
import { PROJECTS, PORTFOLIO_FILTERS, type Project } from '@/lib/data';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Button from '@/components/ui/Button';

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<(typeof PORTFOLIO_FILTERS)[number]>('Все');
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === 'Все' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2.5">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-all duration-200 ${
                filter === f
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-border text-text/70 hover:border-gold/40 hover:text-text'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <motion.div layout className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`break-inside-avoid ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}
              >
                <button
                  onClick={() => setActive(p)}
                  data-cursor="hover"
                  className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border"
                >
                  <Image
                    src={p.after}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                  <span className="absolute left-4 top-4 rounded-full border border-gold/30 bg-bg/50 px-3 py-1 text-xs text-gold backdrop-blur">
                    {p.category}
                  </span>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-bg/50 text-gold opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                    <h3 className="font-display text-2xl text-text">{p.title}</h3>
                    <div className="mt-2 flex translate-y-1 flex-wrap gap-x-4 gap-y-1 text-sm text-muted opacity-90 transition-all duration-300 group-hover:translate-y-0">
                      <span>{p.area} м²</span>
                      <span>·</span>
                      <span>{p.duration}</span>
                      <span>·</span>
                      <span>{p.city}</span>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface p-12 text-center">
          <h2 className="font-display text-h2 font-medium text-text">Хотите такой же результат?</h2>
          <p className="max-w-md text-muted">
            Обсудим ваш проект, снимем замеры и подготовим 3D-визуализацию — бесплатно.
          </p>
          <Button href="/reviews#form" variant="gold" withArrow>
            Обсудить проект
          </Button>
        </div>
      </div>

      {/* Case modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative my-auto w-full max-w-4xl rounded-3xl border border-border bg-surface p-6 md:p-10"
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/60 text-muted transition-colors hover:border-gold/40 hover:text-gold"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="eyebrow">
                <span className="h-px w-8 bg-gold/60" />
                {active.category} · {active.city}
              </span>
              <h2 className="mt-4 font-display text-h2 font-medium text-text">{active.title}</h2>

              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-2 text-text/80">
                  <Ruler className="h-4 w-4 text-gold" /> {active.area} м²
                </span>
                <span className="flex items-center gap-2 text-text/80">
                  <Clock className="h-4 w-4 text-gold" /> {active.duration}
                </span>
                <span className="flex items-center gap-2 text-text/80">
                  <Wallet className="h-4 w-4 text-gold" /> {active.budget}
                </span>
              </div>

              <div className="mt-8">
                <BeforeAfterSlider before={active.before} after={active.after} alt={active.title} />
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {[
                  { label: 'Задача', value: active.task },
                  { label: 'Решение', value: active.solution },
                  { label: 'Результат', value: active.result },
                ].map((b) => (
                  <div key={b.label}>
                    <h4 className="text-[13px] uppercase tracking-[0.2em] text-gold/90">{b.label}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{b.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {active.gallery.map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                    <Image
                      src={src}
                      alt={`${active.title} — фрагмент ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button href="/reviews#form" variant="gold" withArrow>
                  Хочу так же
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
