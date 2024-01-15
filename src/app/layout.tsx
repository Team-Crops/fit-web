'use client';

import { ThemeProvider } from '@emotion/react';
import { Inter } from 'next/font/google';
import { lightTheme } from 'src/theme';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
