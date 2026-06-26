'use client';

import { STATS } from '@/lib/data';
import CountUp from '@/components/ui/CountUp';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export default function Stats() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-site py-16 md:py-20">
        <RevealGroup className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {STATS.map((s, i) => (
            <RevealItem
              key={s.label}
              className={`relative px-4 text-center md:px-8 ${
                i !== 0 ? 'md:border-l md:border-border' : ''
              } ${i % 2 !== 0 ? 'border-l border-border md:border-l' : ''}`}
            >
              <div className="font-display text-5xl font-medium text-gold-gradient md:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
