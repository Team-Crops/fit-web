'use client';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { NestedList } from '#/components/organisms/Policy/NestedList';
import { policies } from '#/entities';
import { PolicyType } from '#/types';

const ContentBlock = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  text-align: left;
  white-space: pre-wrap;
`;
const ClauseBlock = styled.div`
  margin-bottom: 72px;
`;

interface PolicyContentProps {
  type: PolicyType;
}
export const PolicyContent = ({ type }: PolicyContentProps) => {
  return (
    <ContentBlock>
      <Txt size="typo1" weight="bold" color="#212121" marginBottom={132}>
        {policies[type].title}
      </Txt>
      {policies[type].contents.map((content) => (
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
