import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import './globals.css';

const themeBootstrap = `(() => {
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.documentElement.dataset.theme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : prefersLight ? 'light' : 'dark';
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
})();`;

export const metadata: Metadata = {
  title: 'Thant Sin Htoo Nay — Full-Stack & AI Web Developer',
  description: 'Building scalable web apps with PHP, Laravel, TypeScript, and AI-accelerated workflows.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head>
    <body><SmoothScrollProvider>{children}</SmoothScrollProvider></body>
  </html>;
}
