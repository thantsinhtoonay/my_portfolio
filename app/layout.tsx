import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Thant Sin Htoo Nay — Full-Stack & AI Web Developer',
  description: 'Building scalable web apps with PHP, Laravel, TypeScript, and AI-accelerated workflows.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><SmoothScrollProvider>{children}</SmoothScrollProvider></body></html>;
}
