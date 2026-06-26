'use client';

import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export default function ReviewsGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          description="Реальные проекты, реальные сроки и реальные деньги. Без приукрашиваний."
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <RevealItem key={r.name}>
              <figure className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-surface p-7 transition-colors duration-300 hover:border-gold/30">
                <Quote className="h-7 w-7 text-gold/40" />
                <blockquote className="flex-1 text-sm leading-relaxed text-text/85">
                  {r.text}
                </blockquote>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < r.rating ? 'fill-gold text-gold' : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-text">{r.name}</p>
                    <p className="text-xs text-muted">{r.object}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
