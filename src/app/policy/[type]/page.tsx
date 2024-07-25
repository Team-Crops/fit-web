'use client';

import { notFound } from 'next/navigation';

import styled from '@emotion/styled';

import { PolicyContent } from '#/components/templates/Policy/PolicyContent';
import { PolicyType } from '#/types';

const policyMap: Record<string, PolicyType> = {
  terms: 'SERVICE_POLICY',
  privacy: 'PRIVACY_POLICY',
};

interface PathParams {
  type: string;
}

export default function PolicyPage({ params }: { params: PathParams }) {
  const { type } = params;

  if (!Object.hasOwn(policyMap, type)) {
    return notFound();
  }

  return (
    <Container>
      <PolicyContent type={policyMap[type]} />
    </Container>
  );
}

const Container = styled.div`
  padding: 120px 0;
`;
