'use client';

import styled from '@emotion/styled';

import { IntroMatchingBlock } from '#/components/organisms/main/IntroMatchingBlock';
import { IntroProjectBlock } from '#/components/organisms/main/IntroProjectBlock';
import { IntroRecommendBlock } from '#/components/organisms/main/IntroRecommendBlock';

const StyledSection = styled.section`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 380px;
  align-items: center;

  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 260px 0;

  text-align: center;
  white-space: pre-wrap;

  background: linear-gradient(90deg, #f0f3ff 0%, rgb(240 243 255 / 0%) 100%);
`;

export const FourthSection = () => {
  return (
    <StyledSection>
      <IntroMatchingBlock />
      <IntroRecommendBlock />
      <IntroProjectBlock />
    </StyledSection>
  );
};
