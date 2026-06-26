import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Портфолио — VELOUR Renovation Studio',
  description:
    'Реализованные проекты: квартиры, студии, пентхаусы и офисы в Алматы и Минске. Интерактивное «до/после» на каждом кейсе.',
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Портфолио"
        title="Проекты, которые говорят за нас"
        description="Каждый кейс — это задача, решение и результат. Перетащите ползунок «до/после» и откройте детали."
      />
      <PortfolioGrid />
    </>
  );
}
