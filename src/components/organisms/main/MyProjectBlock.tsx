import Image from 'next/image';

import styled from '@emotion/styled';

import { MainDescriptionBlock } from '#molecules/MainDescriptionBlock';
import { MainDescriptionCard } from '#molecules/MainDescriptionCard';

const Block = styled.div`
  position: relative;
  width: 1194px;
  margin-bottom: 221px;
`;
const CardWrapper = styled.div`
  display: flex;
  gap: 19px;
`;
const BackgroundImage = styled(Image)`
  position: absolute;
  top: 870px;
  left: -300px;
  pointer-events: none;
`;

const CardInfo = [
  {
    width: 780,
    height: 616,
    title: '내 프로젝트 확인',
    description: `내 프로젝트들이 모여있는 공간이에요!\n이 곳에서 채팅을 통해 팀원들과 소통을 해봐요.`,
    imgUrl: '/images/main_project_img1.svg',
    imgWidth: 671,
    imgHeight: 325,
  },
  {
    width: 380,
    height: 769,
    title: '신고 제도',
    description: `프로젝트 도중, 팀원이 이탈할 경우\n신고할 수 있는 제도에요.`,
    imgUrl: '/images/main_project_img2.svg',
    imgWidth: 345,
    imgHeight: 489,
    imgIsCenter: true,
  },
];

export const MyProjectBlock = () => {
  return (
    <Block>
      <MainDescriptionBlock
        title={'내 프로젝트'}
        bigDescription={`원활한 진행,\n한 눈에 볼 수 있는 성과`}
        smallDescription={
          '팀원들과 소통하여 진행상황을 공유하고 관리할 수 있어요.\n또한, 피해를 주는 팀원에게 패널티를 부여할 수 있어요.'
        }
        buttonText={'내 프로젝트로 이동'}
        buttonLink={'/project'}
      />
      <CardWrapper>
        {CardInfo.map((card, index) => {
          return (
            <MainDescriptionCard
              key={index}
              width={card.width}
              height={card.height}
              title={card.title}
              description={card.description}
              imgUrl={card.imgUrl}
              imgWidth={card.imgWidth}
              imgHeight={card.imgHeight}
              imgIsCenter={card.imgIsCenter}
            />
          );
        })}
      </CardWrapper>
      <BackgroundImage
        src={'/images/main_project_background.png'}
        width={418}
        height={418}
        alt={'background'}
      />
    </Block>
  );
};
