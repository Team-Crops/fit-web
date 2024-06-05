import { Footer } from '#/components/templates/Footer';
import { Header } from '#/components/templates/Header';
import { LoginPopup } from '#/components/templates/LoginPopup';
import './globals.css';
import { SignupGuard } from './signup-guard';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'F-IT',
  description: '사이드 프로젝트를 위한 랜덤 팀 매칭/추천 서비스, F-IT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SignupGuard />
        <LoginPopup />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
