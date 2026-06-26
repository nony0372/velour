import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      } ${className}`}
    >
      <Reveal>
        <span className="eyebrow">
          <span className="h-px w-8 bg-gold/60" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-2xl font-display text-h2 font-medium text-text">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`max-w-xl text-base leading-relaxed text-muted ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
