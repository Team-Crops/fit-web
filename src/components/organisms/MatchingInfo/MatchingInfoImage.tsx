import Image from 'next/image';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const ImageBlock = styled.div`
  pointer-events: none;
  position: relative;
`;
const NoteBookImage = styled(Image)`
  position: absolute;
  z-index: 1;
  left: -325px;
`;
const Chat1Animation = keyframes`
  0%{
    top: -60px;
    opacity: 0;
  }
  20% {
    top: -80px;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  80% {
    top: -130px;
    opacity: 0;
  }
  100% {
    top: -130px;
    opacity: 0;
  }
`;
const Chat1 = styled(Image)`
  position: absolute;
  top: -130px;
  left: -5px;
  animation: ${Chat1Animation} 3s linear infinite;
`;
const Chat2Animation = keyframes`
  0%{
    top: 40px;
    opacity: 0;
  }
  20% {
    top: 20px;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  80% {
    top: -30px;
    opacity: 0;
  }
  100% {
    top: -30px;
    opacity: 0;
  }
`;
const Chat2 = styled(Image)`
  position: absolute;
  top: -30px;
  left: 135px;
  animation: ${Chat2Animation} 3s linear infinite;
`;
const CircleAnimation = keyframes`
    0% {
      top: 50px;
    }
    100% {
      top: 25px;
    }
`;
const Circle = styled(Image)`
  position: absolute;
  top: 50px;
  left: -500px;
  animation: ${CircleAnimation} 2s infinite alternate;
`;
const ShoppingBackAnimation = keyframes`
    0% {
      top: 50px;
    }
    100% {
      top: 25px;
    }
`;
const ShoppingBack = styled(Image)`
  position: absolute;
  top: 50px;
  left: 285px;
  animation: ${ShoppingBackAnimation} 2s infinite alternate;
`;
const ProfileAnimation = keyframes`
    0% {
      top: -50px;
    }
    100% {
      top: -20px;
    }
`;
const ProfileImage = styled(Image)`
  position: absolute;
  z-index: 2;
  top: -20px;
  left: -440px;

  animation: ${ProfileAnimation} 2s infinite alternate;
`;

export const MatchingInfoImage = () => {
  return (
    <ImageBlock>
      <NoteBookImage
        src="/images/matchingInfo/notebook.svg"
        width={840}
        height={630}
        alt={'notebook'}
      />
      <Chat1 src={'/images/matchingInfo/chat1.svg'} alt={''} width={420} height={300} />
      <Chat2 src={'/images/matchingInfo/chat2.svg'} alt={''} width={420} height={300} />
      <Circle src={'/images/matchingInfo/circle.svg'} alt={''} width={89} height={89} />
      <ShoppingBack
        src={'/images/matchingInfo/shoppingback.svg'}
        alt={''}
        width={425}
        height={425}
      />
      <ProfileImage src={'/images/matchingInfo/profile.svg'} alt={''} width={400} height={500} />
    </ImageBlock>
  );
};
