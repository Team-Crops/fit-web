import Image from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const Card = styled.div<{ width: number; height: number }>`
  z-index: 1;

  display: flex;
  gap: 30px;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 40px;

  background: #fff;
  border-radius: 40px;
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 10%);
`;
const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;

  text-align: left;
  white-space: pre-wrap;
`;
const ImageBlock = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CardImageWrapper = styled.div<{ imgLeftPx?: number }>`
  position: absolute;
  left: ${({ imgLeftPx }) => `${imgLeftPx}px`};
`;

interface MainDescriptionCardProps {
  width: number;
  height: number;
  index?: number;
  title: string;
  description: string;
  imgUrl: string;
  imgWidth: number;
  imgHeight: number;
  imgLeftPx?: number;
}
export const MainDescriptionCard = ({
  width,
  height,
  index,
  title,
  description,
  imgUrl,
  imgWidth,
  imgHeight,
  imgLeftPx,
}: MainDescriptionCardProps) => {
  return (
    <Card width={width} height={height}>
      {index && (
        <Txt size={'typo1'} weight={'medium'} color="#FF706C">
          {index.toString().padStart(2, '0')}
        </Txt>
      )}
      <ContentBlock>
        <Txt size={'typo1'} weight={'bold'} color="#212121">
          {title}
        </Txt>
        <Txt size={'typo4'} weight={'regular'} color="#616161">
          {description}
        </Txt>
        <ImageBlock>
          <CardImageWrapper imgLeftPx={imgLeftPx}>
            <Image src={imgUrl} alt="image" width={imgWidth} height={imgHeight} />
          </CardImageWrapper>
        </ImageBlock>
      </ContentBlock>
    </Card>
  );
};
