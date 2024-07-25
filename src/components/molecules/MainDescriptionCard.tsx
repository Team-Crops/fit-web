import Image, { type StaticImageData } from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const Card = styled.div<Pick<MainDescriptionCardProps, 'width' | 'height'>>`
  z-index: 1;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 40px;

  background: #fff;
  border-radius: 40px;
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 10%);
`;
const TextBlock = styled.div`
  display: flex;
  gap: 30px;

  width: 100%;

  text-align: left;
  white-space: pre-wrap;
`;
const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ImageBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface MainDescriptionCardProps {
  width: number;
  height: number;
  index?: number;
  title: string;
  description: string;
  image: StaticImageData;
}
export const MainDescriptionCard = ({
  width,
  height,
  index,
  title,
  description,
  image,
}: MainDescriptionCardProps) => {
  return (
    <Card width={width} height={height}>
      <TextBlock>
        {index && (
          <Txt size={'typo1'} weight={'medium'} color="#FF706C">
            {index.toString().padStart(2, '0')}
          </Txt>
        )}
        <ContentBlock>
          <Txt size={'typo1'} weight={'bold'} color="#212121">
            {title}
          </Txt>
          <Txt
            size={'typo4'}
            weight={'regular'}
            color="#616161"
            style={{ whiteSpace: 'break-spaces' }}
          >
            {description}
          </Txt>
        </ContentBlock>
      </TextBlock>
      <ImageBlock>
        <Image
          src={image}
          alt="description image"
          fill
          style={{ objectFit: 'contain', padding: '28px' }}
        />
      </ImageBlock>
    </Card>
  );
};
