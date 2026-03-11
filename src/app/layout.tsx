import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Painel Admin',
  description: 'Descrição do projeto',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className='bg-neutral dark:bg-neutral'>{children}</body>
    </html>
  );
}
