'use client';

import { Reveal } from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { CONTACTS } from '@/lib/data';

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/40 via-surface to-bg" />
      <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_60%_at_50%_0%,rgba(196,168,130,0.18),transparent)]" />

      <div className="container-site text-center">
        <Reveal>
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold/60" />
            Бесплатно · Ни к чему не обязывает
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-h1 font-medium leading-[1.08] text-text">
            Рассчитаем смету за&nbsp;<span className="text-gold-gradient">1&nbsp;день</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text/80">
            Оставьте заявку — выезд замерщика и 3D-проект бесплатно. Без аванса до подписания
            договора.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/reviews#form" variant="gold" withArrow className="px-9 py-4 text-base">
              Получить бесплатную смету
            </Button>
            <Button href={CONTACTS.phoneHref} variant="outline" className="px-9 py-4 text-base">
              {CONTACTS.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
