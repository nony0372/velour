'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Phone, Send, MessageCircle, MapPin } from 'lucide-react';
import { CONTACTS } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

type Status = 'idle' | 'loading' | 'done';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    phone: '',
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulated submit — swap for real endpoint later
    // eslint-disable-next-line no-console
    console.log('VELOUR — заявка:', form);
    setTimeout(() => setStatus('done'), 900);
  };

  const inputBase =
    'w-full rounded-xl border border-border bg-bg/60 px-4 py-3.5 text-sm text-text placeholder:text-muted/70 outline-none transition-colors duration-200 focus:border-gold/60';

  return (
    <section id="form" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        {/* Left: heading + contacts */}
        <div className="flex flex-col justify-between gap-10">
          <SectionHeading
            eyebrow="Заявка"
            title="Получите бесплатную смету"
            description="Оставьте контакты — перезвоним в течение 30 минут, согласуем бесплатный выезд замерщика."
          />

          <Reveal delay={0.1}>
            <ul className="space-y-5">
              <li>
                <a
                  href={CONTACTS.phoneHref}
                  className="group flex items-center gap-4 text-text/85 transition-colors hover:text-gold"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-gold transition-colors group-hover:border-gold/40">
                    <Phone className="h-5 w-5" />
                  </span>
                  {CONTACTS.phone}
                </a>
              </li>
              <li className="flex flex-wrap gap-3">
                <a
                  href={CONTACTS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text/85 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp
                </a>
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text/85 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Send className="h-4 w-4 text-gold" /> Telegram
                </a>
              </li>
              <li className="flex items-start gap-4 text-sm text-text/75">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-gold">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="pt-3">{CONTACTS.address}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.05}>
          <form
            onSubmit={onSubmit}
            className="relative flex flex-col gap-4 rounded-3xl border border-border bg-surface p-7 md:p-9"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-text/80">
                Имя
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={update('name')}
                placeholder="Как к вам обращаться"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm text-text/80">
                Телефон
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={update('phone')}
                placeholder="+7 (___) ___-__-__"
                className={inputBase}
              />
            </div>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="group relative mt-2 inline-flex h-[52px] items-center justify-center overflow-hidden rounded-full bg-gold text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.01] disabled:cursor-default disabled:hover:scale-100"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'done' ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-bg/20"
                    >
                      <Check className="h-4 w-4" />
                    </motion.span>
                    Заявка отправлена
                  </motion.span>
                ) : status === 'loading' ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Отправляем…
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Отправить заявку
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <p className="text-center text-xs text-muted">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
