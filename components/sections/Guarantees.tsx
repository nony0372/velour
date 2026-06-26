'use client';

import { GUARANTEES } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export default function Guarantees() {
  return (
    <section className="relative border-t-2 border-gold/60 bg-surface py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Гарантии"
          title="Ответственность, закреплённая в договоре"
          description="Конкуренты пишут «соблюдаем сроки». Мы пишем конкретику — и подписываемся под ней."
          align="center"
          className="mx-auto"
        />

        <RevealGroup className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {GUARANTEES.map((g) => {
            const Icon = g.icon;
            return (
              <RevealItem key={g.title}>
                <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-bg/50 p-8 text-center transition-all duration-300 hover:border-gold/40">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-2xl text-gold-gradient">{g.accent}</span>
                  <h3 className="font-display text-xl text-text">{g.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{g.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
