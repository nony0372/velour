'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

const LINE_1 = 'Создаём пространства';
const LINE_2 = 'которые говорят сами';

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedLine({
  text,
  delayBase,
  wordClassName = '',
}: {
  text: string;
  delayBase: number;
  wordClassName?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <span className="flex flex-wrap">
        {text.split(' ').map((word, wi) => (
          <span key={wi} className="mr-[0.25em] overflow-hidden pb-[0.08em]">
            <motion.span
              className={`inline-block ${wordClassName}`}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease, delay: delayBase + wi * 0.08 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 22,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="noise-overlay relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 -z-10 scale-110 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Тёмный минималистичный интерьер премиум-класса"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/80 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/40 to-transparent" />
      </div>

      <div className="container-site relative z-10 pt-28">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="h-px w-8 bg-gold/60" />
          VELOUR Renovation Studio
        </motion.span>

        <h1 className="mt-6 max-w-4xl font-display text-h1 font-medium leading-[1.05] text-text">
          <AnimatedLine text={LINE_1} delayBase={0.35} />
          <AnimatedLine text={LINE_2} delayBase={0.6} wordClassName="text-gold-gradient" />
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-lg text-text/80"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease }}
        >
          Ремонт под ключ&nbsp;· Фиксированная смета&nbsp;· Гарантия 5 лет.
          Единственная студия региона с финансовой ответственностью за сроки.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease }}
        >
          <Button href="/reviews#form" variant="outline" withArrow>
            Получить бесплатную смету
          </Button>
          <Button href="/portfolio" variant="ghost">
            Смотреть работы
          </Button>
        </motion.div>

        <motion.ul
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {['Без аванса до договора', '3D-проект бесплатно', 'Смета за 1 день'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
