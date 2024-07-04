import Image from 'next/image';

import styled from '@emotion/styled';

import {
  mainSection3Project1,
  mainSection3Project2,
  mainSection3ProjectBackground,
} from '#/assets/images';
import { MainDescriptionBlock } from '#molecules/MainDescriptionBlock';
import { MainDescriptionCard } from '#molecules/MainDescriptionCard';

const Block = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 80px;
  align-items: center;

  width: 100vw;
  padding: 20px;
`;
const CardWrapper = styled.div`
  position: relative;

  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;

  width: 100%;
  max-width: 1200px;
`;
const BackgroundImage = styled(Image)`
  pointer-events: none;
  position: absolute;
  bottom: -140px;
  left: -240px;
`;

const CardInfo = [
  {
    width: 780,
    height: 616,
    title: '내 프로젝트 확인',
    description: `내 프로젝트들이 모여있는 공간이에요!\n이 곳에서 채팅을 통해 팀원들과 소통을 해봐요.`,
    image: mainSection3Project1,
  },
  {
    width: 380,
    height: 769,
    title: '신고 제도',
    description: `프로젝트 도중, 팀원이 이탈할 경우\n신고할 수 있는 제도에요.`,
    image: mainSection3Project2,
  },
];

export const IntroProjectBlock = () => {
  return (
    <Block>
      <MainDescriptionBlock
        title={'프로젝트 모음'}
        bigDescription={`원활한 진행,\n한 눈에 볼 수 있는 성과`}
        smallDescription={
          '팀원들과 소통하여 진행상황을 공유하고 관리할 수 있어요.\n또한, 피해를 주는 팀원에게 패널티를 부여할 수 있어요.'
        }
        buttonText={'내 프로젝트로 이동'}
        buttonLink={'/projects'}
      />
      <CardWrapper>
        {CardInfo.map((card, index) => (
          <MainDescriptionCard
            key={index}
            width={card.width}
            height={card.height}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
        <BackgroundImage src={mainSection3ProjectBackground} alt={'background'} width={400} />
      </CardWrapper>
    </Block>
  );
};
