'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STEPS } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)';
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
      gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: node, start: 'top 85%' },
          }
        );
      });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="border-y border-border bg-surface/40 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Процесс"
          title="Пять шагов до готового дома"
          description="Прозрачный путь без сюрпризов. Каждый этап фиксируется и принимается вами."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* base line */}
          <div className="absolute left-0 top-7 hidden h-px w-full bg-border md:block" />
          {/* animated gold line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-7 hidden h-px w-full origin-left bg-gold md:block"
            style={{ transform: 'scaleX(0)' }}
          />

          <div className="grid gap-12 md:grid-cols-5 md:gap-6">
            {STEPS.map((step) => (
              <div key={step.n} className="timeline-node relative flex flex-col md:items-start">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-bg font-display text-lg text-gold">
                  {step.n}
                </div>
                <h3 className="mt-5 font-display text-xl text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
