'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'gold' | 'outline' | 'ghost';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  type?: 'button' | 'submit';
};

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ease-smooth cursor-pointer select-none';

const variants: Record<Variant, string> = {
  // Gold outline that fills with gold on hover
  outline:
    'border border-gold/70 text-gold hover:text-bg [&_.fill]:bg-gold hover:scale-[1.02]',
  // Solid gold
  gold: 'bg-gold text-bg hover:scale-[1.02] [&_.fill]:bg-text',
  // Quiet link-ish
  ghost: 'text-text hover:text-gold [&_.fill]:bg-transparent',
};

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span
        className="fill absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-300 ease-smooth group-hover:scale-y-100"
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'outline',
  className = '',
  withArrow = false,
  type = 'button',
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith('http') || href.startsWith('tel');
    if (external) {
      return (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cls}>
          <Inner withArrow={withArrow}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}
