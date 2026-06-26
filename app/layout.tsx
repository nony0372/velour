import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import Loader from '@/components/ui/Loader';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VELOUR Renovation Studio — Премиальный ремонт под ключ',
  description:
    'Ремонт под ключ с фиксированной сметой, штрафом за просрочку и гарантией 5 лет. Интерьер, который говорит без слов. Алматы · Минск.',
  keywords: ['ремонт под ключ', 'премиум ремонт', 'дизайн интерьера', 'Алматы', 'Минск', 'VELOUR'],
  openGraph: {
    title: 'VELOUR Renovation Studio',
    description: 'Интерьер, который говорит без слов. Фиксированная смета · Гарантия 5 лет.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0c0a09',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Loader />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
