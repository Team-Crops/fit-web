'use client';

import { notFound } from 'next/navigation';

import { PolicyContent } from '#/components/templates/Policy/PolicyContent';
import { PolicyType } from '#/types';

interface PathParams {
  type: string;
}

export default function PolicyPage({ params }: { params: PathParams }) {
  const { type } = params;

  if (!Object.hasOwn(policyMap, type)) {
    return notFound();
  }

  return (
    <div>
      <PolicyContent type={policyMap[type]} />
    </div>
  );
}

const policyMap: Record<string, PolicyType> = {
  terms: 'SERVICE_POLICY',
  privacy: 'PRIVACY_POLICY',
};
