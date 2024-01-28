'use client';

import Image from 'next/image';

import { Txt } from '#atoms/Text';
import styled from '@emotion/styled';

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding-bottom: 100px;
`;
const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin-top: 200px;
`;
const Title = styled(Txt)`
  margin: 12px 0 40px;
`;

export const SecondSection = () => {
  return (
    <StyledSection>
      <ContentBlock>
        <Txt size={'typo3'} weight={'medium'} color="#616161">
          팀 프로젝트를 시작하고 싶은 나,
        </Txt>
        <Title size={'display1'} weight={'bold'} color="#000">
          어떻게 팀원을 구하지?
        </Title>
        <Image src={'/img/main_section2_img.svg'} alt={'image'} width={1332} height={756} />
      </ContentBlock>
    </StyledSection>
  );
};
