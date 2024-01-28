import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import styled from '@emotion/styled';

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 100px;
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 20px;
`;
const LinkButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
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
        <Icons icon={'arrow-right'} color="#fff" width={24} />
      </LinkButton>
    </Block>
  );
};
