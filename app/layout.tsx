import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Porto 2 Life | Guia de experiência',
  description: 'Guia mobile do apartamento 134, bloco 2, no Porto 2 Life: chegada, serviços, gastronomia, lazer e contatos.',
  openGraph: {
    title: 'Porto 2 Life | Guia de experiência',
    description: 'Tudo o que você precisa para aproveitar sua estadia no apartamento 134.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Porto 2 Life | Guia de experiência',
    description: 'Tudo o que você precisa para aproveitar sua estadia no apartamento 134.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
