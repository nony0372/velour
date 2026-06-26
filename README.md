# VELOUR Renovation Studio

Премиальный сайт студии ремонта под ключ. Тёмная редакционная эстетика, тёплое золото,
Playfair Display + Inter.

**Стек:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lucide.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

## Страницы

- `/` — главная: hero с параллаксом, счётчики, калькулятор сметы, услуги,
  таймлайн процесса, блок гарантий, видео-кейс с «до/после», CTA.
- `/portfolio` — фильтруемая masonry-сетка кейсов, модалка с «до/после» и галереей.
- `/reviews` — отзывы, FAQ-аккордеон, форма заявки, контакты.

## Фишки

- Кастомный курсор (desktop, с уважением к `prefers-reduced-motion`).
- Лоадер с побуквенной анимацией логотипа (один раз за сессию).
- Scroll-reveal (Framer Motion) + draw-on линия таймлайна и параллакс (GSAP ScrollTrigger).
- Интерактивный «до/после» слайдер (drag, touch + mouse).
- Реактивный калькулятор стоимости.

Весь контент централизован в [`lib/data.ts`](lib/data.ts).
Инструкции по деплою — в [`DEPLOY.md`](DEPLOY.md).
