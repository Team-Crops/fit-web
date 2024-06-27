import { Suspense } from 'react';
import type React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
