'use client';

import { SERVICES } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export default function Services() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Услуги"
          title="Полный цикл — от идеи до ключей"
          description="Берём на себя всё: проект, материалы, бригады и контроль. Вы получаете результат без хлопот."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <RevealItem key={s.title}>
                <article
                  data-cursor="hover"
                  className="group relative flex h-full flex-col gap-5 bg-surface p-8 transition-colors duration-300 hover:bg-bg"
                >
                  {/* gold top border on hover */}
                  <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-muted transition-all duration-300 group-hover:scale-110 group-hover:border-gold/50 group-hover:text-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>

                  <h3 className="font-display text-2xl text-text">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{s.description}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
