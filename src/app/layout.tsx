import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Footer } from '#/components/templates/Footer';
import { Header } from '#/components/templates/Header';
import { LoginPopup } from '#/components/templates/LoginPopup';
import './globals.css';
import { SignupGuard } from './signup-guard';

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'F-IT',
  description: '사이드 프로젝트를 위한 랜덤 팀 매칭/추천 서비스, F-IT',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
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
        <ToastContainer />
      </body>
    </html>
  );
}
