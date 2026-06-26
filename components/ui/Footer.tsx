import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { CONTACTS, NAV_LINKS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src="/logo.png"
            alt="VELOUR Renovation Studio"
            width={56}
            height={56}
            className="logo-blend object-contain"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Интерьер, который говорит без слов. Премиальный ремонт под ключ с фиксированной сметой и
            гарантией 5 лет.
          </p>
        </div>

        <div>
          <h4 className="text-[13px] uppercase tracking-[0.25em] text-gold/90">Навигация</h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-text/75 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] uppercase tracking-[0.25em] text-gold/90">Контакты</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={CONTACTS.phoneHref}
                className="flex items-center gap-3 text-text/80 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" /> {CONTACTS.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-text/80 transition-colors hover:text-gold"
              >
                <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-text/80 transition-colors hover:text-gold"
              >
                <Send className="h-4 w-4 text-gold" /> Telegram
              </a>
            </li>
            <li className="flex items-start gap-3 text-text/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {CONTACTS.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted md:flex-row">
          <span>© {new Date().getFullYear()} VELOUR Renovation Studio. Все права защищены.</span>
          <span>Алматы · Минск</span>
        </div>
      </div>
    </footer>
  );
}
