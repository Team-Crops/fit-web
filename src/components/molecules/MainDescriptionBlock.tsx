import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const Block = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 100px;
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;
const LinkButton = styled(Button)`
  display: flex;
  gap: 13px;
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
        <Txt size={'display2'} weight={'bold'} color="#212121">
          {bigDescription}
        </Txt>
        <Txt size={'typo3'} weight={'regular'} color="#616161">
          {smallDescription}
        </Txt>
      </TextBlock>
      <LinkButton variant={'round'} height={'70'} color={'primary'} onClick={onClickLinkButton}>
        <Txt size={'typo4'} weight={'bold'} color="#fff">
          {buttonText}
        </Txt>
        <Icons icon={'arrowRight'} color="#fff" width={24} />
      </LinkButton>
    </Block>
  );
};
