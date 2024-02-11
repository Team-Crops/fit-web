'use client';

import { redirect, useSearchParams } from 'next/navigation';

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  redirect(`/login/kakao/callback?code=${code}`);
}
