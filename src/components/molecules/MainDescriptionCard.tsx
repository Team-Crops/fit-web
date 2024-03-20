import Image from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const Card = styled.div<{ width: number; height: number }>`
  display: flex;
  gap: 30px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 46px;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const Index = styled(Txt)``;
const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
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
const CardImage = styled(Image)<{ imgLeftPx?: number }>`
  position: absolute;
  left: ${({ imgLeftPx }) => imgLeftPx}px;
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
        <Index size={'typo1'} weight={'medium'} color="#FF706C">
          {index.toString().padStart(2, '0')}
        </Index>
      )}
      <ContentBlock>
        <Txt size={'typo1'} weight={'bold'} color="#212121">
          {title}
        </Txt>
        <Txt size={'typo4'} weight={'regular'} color="#616161">
          {description}
        </Txt>
        <ImageBlock>
          <CardImage
            src={imgUrl}
            alt="image"
            width={imgWidth}
            height={imgHeight}
            imgLeftPx={imgLeftPx}
          />
        </ImageBlock>
      </ContentBlock>
    </Card>
  );
};
