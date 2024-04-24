'use client';

import Image from 'next/image';
import Link from 'next/link';

import styled from '@emotion/styled';

import { notFound } from '#/assets/images';
import { Txt } from '#/components/atoms/Text';
import { Button } from '../atoms';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: calc(100vh - 100px - 393px);
`;

const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const NotFound: React.FC = () => {
  return (
    <Container>
      <ContentsContainer>
        <Image src={notFound} alt="not found" width={400} />
        <TextContainer>
          <Txt size="typo2" weight="bold">
            Page Not Found
          </Txt>
          <Txt size="typo4" weight="regular">
            요청하신 페이지를 찾을 수 없어요!
          </Txt>
          <Txt size="typo4" weight="regular">
            뒤로 가기를 누르시거나 버튼을 통해 홈으로 이동해주세요!
          </Txt>
        </TextContainer>
      </ContentsContainer>
      <Link href="/">
        <Button variant="angular" color="primary" height="60">
          홈으로 이동하기
        </Button>
      </Link>
    </Container>
  );
};
