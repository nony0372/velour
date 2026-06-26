import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ReviewsGrid from '@/components/reviews/ReviewsGrid';
import FAQ from '@/components/reviews/FAQ';
import ContactForm from '@/components/reviews/ContactForm';

export const metadata: Metadata = {
  title: 'Отзывы и контакты — VELOUR Renovation Studio',
  description:
    'Отзывы клиентов, ответы на частые вопросы и форма заявки. Бесплатная смета и выезд замерщика. Алматы · Минск.',
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Доверие"
        title="Отзывы, ответы и контакты"
        description="Истории клиентов, закрытые возражения и быстрый способ связаться с нами."
      />
      <ReviewsGrid />
      <FAQ />
      <ContactForm />
    </>
  );
}
