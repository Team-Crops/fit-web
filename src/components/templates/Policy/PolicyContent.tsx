'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { NestedList } from '#/components/organisms/Policy/NestedList';
import { policyData } from '#/entities/policy';

const ContentBlock = styled.div<{ isScrolled?: boolean }>`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 130px 0;

  white-space: pre-wrap;
  text-align: left;
  ${({ isScrolled }) =>
    isScrolled &&
    css`
      overflow-y: auto;
      height: 500px;
    `}
`;
const ClauseBlock = styled.div`
  margin-bottom: 72px;
`;

interface PolicyContentProps {
  type: 'privacy' | 'terms';
  isScrolled?: boolean;
}
export const PolicyContent = ({ type, isScrolled }: PolicyContentProps) => {
  return (
    <ContentBlock isScrolled={isScrolled}>
      <Txt size="typo1" weight="bold" color="#212121" marginBottom={132}>
        {policyData[type].title}
      </Txt>
      {policyData[type].content.map((content) => (
        <div key={content.article}>
          <Txt size="typo4" weight="bold" color="#616161" marginBottom={15}>
            {content.article}
          </Txt>
          <ClauseBlock>
            <NestedList data={content.clause} />
          </ClauseBlock>
        </div>
      ))}
    </ContentBlock>
  );
};
