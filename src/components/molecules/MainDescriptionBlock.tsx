import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const Block = styled.div`
  z-index: 10;

  display: flex;
  gap: 12px;
  align-items: end;
  justify-content: space-between;

  width: 100%;
  max-width: 1200px;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

const LinkButton = styled(Button)`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

interface MainDescriptionBlockProps {
  title: string;
  bigDescription: string;
  smallDescription: string;
  buttonText: string;
  buttonLink: string;
}
export const MainDescriptionBlock = ({
  title,
  bigDescription,
  smallDescription,
  buttonLink,
  buttonText,
}: MainDescriptionBlockProps) => {
  const router = useRouter();
  const onClickLinkButton = useCallback(() => {
    router.push(buttonLink);
  }, [buttonLink, router]);

  return (
    <Block>
      <TextBlock>
        <Txt size={'typo2'} weight={'bold'} color="#FF908D">
          {title}
        </Txt>
        <Txt size={'main2'} weight={'bold'} color="#212121">
          {bigDescription}
        </Txt>
        <Txt size={'typo3'} weight={'regular'} color="#616161">
          {smallDescription}
        </Txt>
      </TextBlock>
      <LinkButton variant={'round'} height={'70'} color={'primary'} onClick={onClickLinkButton}>
        <Txt size={'typo4'} weight={'bold'} color="#fff" style={{ whiteSpace: 'nowrap' }}>
          {buttonText}
        </Txt>
        <Icons icon={'arrowRight'} color="#fff" width={24} />
      </LinkButton>
    </Block>
  );
};
