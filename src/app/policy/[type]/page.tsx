'use client';

import { notFound } from 'next/navigation';

import { PolicyContent } from '#/components/templates/Policy/PolicyContent';

interface PathParams {
  type: string;
}

export default function PolicyPage({ params }: { params: PathParams }) {
  const { type } = params;

  if (type !== 'privacy' && type !== 'terms') {
    return notFound();
  }

  return (
    <div>
      <PolicyContent type={type} />
    </div>
  );
}
