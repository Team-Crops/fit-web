'use client';

import styled from '@emotion/styled';

import { InfoMatchingBlock } from '#organisms/main/InfoMatchingBlock';
import { MyProjectBlock } from '#organisms/main/MyProjectBlock';
import { RecommendBlock } from '#organisms/main/RecommendBlock';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  white-space: pre-wrap;
  text-align: center;
  background: linear-gradient(90deg, #f0f3ff 0%, rgba(240, 243, 255, 0) 100%);
`;

export const FourthSection = () => {
  return (
    <StyledSection>
      <InfoMatchingBlock />
      <RecommendBlock />
      <MyProjectBlock />
    </StyledSection>
  );
};
