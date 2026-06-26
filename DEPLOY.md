# Деплой — VELOUR Renovation Studio

Сайт собран на **Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + GSAP**.
Все три страницы (`/`, `/portfolio`, `/reviews`) рендерятся как статические — деплой максимально простой.

---

## Предварительно

```bash
npm install      # установить зависимости
npm run dev      # локальный просмотр на http://localhost:3000
npm run build    # production-сборка (должна пройти без ошибок)
npm run start    # запустить production-сборку локально
```

---

## Вариант A — Vercel (рекомендуется, бесплатно)

Vercel — создатели Next.js, всё работает из коробки: `next/image`, оптимизация, edge-сеть.

### Способ 1 — через CLI

```bash
npm i -g vercel        # или npx vercel
vercel                 # превью-деплой (отвечаете на пару вопросов)
vercel --prod          # продакшн-деплой
```

### Способ 2 — через vercel.com (без терминала)

1. Залейте проект в репозиторий GitHub / GitLab / Bitbucket.
2. На [vercel.com/new](https://vercel.com/new) импортируйте репозиторий.
3. Framework Preset определится автоматически как **Next.js** — ничего менять не нужно.
4. Нажмите **Deploy**. Через ~1 минуту сайт онлайн.

### Переменные окружения

На текущем этапе **env-переменные не требуются** — форма заявки делает `console.log`
(заглушка). Когда подключите реальную отправку (Telegram-бот / CRM / email), добавьте,
например:

```
NEXT_PUBLIC_LEAD_WEBHOOK_URL=https://...
```

и считайте её в [components/reviews/ContactForm.tsx](components/reviews/ContactForm.tsx)
вместо `console.log`.

---

## Вариант B — Статический экспорт (чистый HTML)

Если нужен набор статических файлов без Node-сервера (любой хостинг / nginx / S3):

1. В [next.config.js](next.config.js) добавьте `output: 'export'` и отключите
   оптимизацию изображений (статический экспорт не умеет серверную оптимизацию
   удалённых картинок):

   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
       remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
     },
   };
   module.exports = nextConfig;
   ```

2. Соберите:

   ```bash
   npm run build
   ```

   Готовые файлы появятся в папке **`out/`** — её можно залить на любой статический хостинг
   (Netlify, GitHub Pages, Cloudflare Pages, обычный nginx).

> ⚠️ При статическом экспорте теряется автоматическая оптимизация `next/image`
> (WebP/resize). Для лучшего Lighthouse-результата рекомендуется **Вариант A (Vercel)**.

---

## Что подключить перед продакшном

- [ ] **Форма заявки** — заменить `console.log` на реальную отправку
      (Telegram Bot API, CRM, email-сервис). Файл: `components/reviews/ContactForm.tsx`.
- [ ] **Видео-кейс** — заменить YouTube-ID заглушки на реальный тур.
      Файл: `components/sections/VideoCase.tsx` (`youtube.com/embed/<ID>`).
- [ ] **Контакты** — проверить телефон, ссылки WhatsApp/Telegram, адрес.
      Файл: `lib/data.ts` → `CONTACTS`.
- [ ] **Кейсы и отзывы** — заменить демо-контент и Unsplash-фото на реальные.
      Файл: `lib/data.ts` → `PROJECTS`, `REVIEWS`.
- [ ] **Домен** — привязать в настройках Vercel (Settings → Domains).

---

## Структура проекта

```
app/                      # страницы (App Router)
  layout.tsx              # корневой layout: шрифты, навбар, футер, лоадер, курсор
  page.tsx                # главная
  portfolio/page.tsx      # портфолио
  reviews/page.tsx        # отзывы + контакты
  template.tsx            # анимация перехода между страницами
  globals.css             # дизайн-токены, шум, кастомный скролл
components/
  ui/                     # переиспользуемые элементы (Button, Navbar, Cursor, ...)
  sections/               # секции главной страницы
  portfolio/              # сетка портфолио + модалка кейса
  reviews/                # отзывы, FAQ, форма
lib/data.ts               # весь контент: услуги, кейсы, отзывы, FAQ, контакты
public/logo.png           # логотип
```
