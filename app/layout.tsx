import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

const siteUrl = new URL('https://agenciamarketinginteligente.github.io/porto2life/');
const shareImageUrl = new URL('og-porto2life.jpg', siteUrl).href;
const title = 'Porto 2 Life | Guia de experiência';
const description = 'Bem-vindo ao apto 134, bloco 2. Chegada, gastronomia, lazer, serviços e contatos: tudo para aproveitar sua estadia.';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: {
    canonical: siteUrl.href,
  },
  openGraph: {
    title,
    description,
    url: siteUrl.href,
    siteName: 'Porto 2 Life',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: shareImageUrl,
        secureUrl: shareImageUrl,
        width: 1206,
        height: 875,
        type: 'image/jpeg',
        alt: 'Porto 2 Life — Guia de experiência do apartamento 134, bloco 2, com vista aérea do resort.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: shareImageUrl,
        alt: 'Porto 2 Life — Guia de experiência do apartamento 134, bloco 2.',
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
