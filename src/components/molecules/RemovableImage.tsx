import Image from 'next/image';

import styled from '@emotion/styled';

import { Icons } from '../atoms';

type ImageWidth = Parameters<typeof Image>[0]['width'];
type ImageHeight = Parameters<typeof Image>[0]['height'];
type ImageSize = NonNullable<Extract<ImageWidth, ImageHeight>>;

type RemovableImageProps = Omit<Parameters<typeof Image>[0], 'width' | 'height'> & {
  size: ImageSize;

  onClickRemove?: React.MouseEventHandler;
};

export const RemovableImage = ({ alt, size, onClickRemove, ...props }: RemovableImageProps) => {
  return (
    <Container height={size}>
      <Image alt={alt} width={size} height={size} {...props} />
      <IconContainer>
        <Icons icon="cross" size={12} color="#fafafa" onClick={onClickRemove} />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div<{ height: ImageSize }>`
  position: relative;
  height: ${({ height }) => height}px;
  background-color: #d9d9d9;
  border-radius: 4px;
`;

const IconContainer = styled.div`
  cursor: pointer;

  position: absolute;
  top: -4px;
  right: -4px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  background-color: rgb(33 33 33 / 70%);
  border-radius: 50%;

  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(33 33 33 / 90%);
  }
`;
