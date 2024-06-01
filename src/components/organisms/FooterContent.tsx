import Link from 'next/link';

import styled from '@emotion/styled';

import { Divider } from '#atoms/Divider';
import { FitLogo } from '#atoms/FitLogo';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const ContentBlock = styled.div`
  width: 1200px;
  height: 100%;
  padding: 60px 0;
`;
const FlexBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PolicyLinkBlock = styled.div`
  display: flex;
  gap: 13px;
  align-items: flex-end;
`;
const PolicyDivider = styled.div`
  width: 1px;
  height: 14px;
  margin-bottom: 3px;
  background-color: #bdbdbd;
`;
const FooterDivider = styled(Divider)`
  margin: 23px 0 39px;
  border-top: 1px solid #bdbdbd;
`;
const TxtBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  white-space: pre-wrap;
`;
const LinkBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const FooterContent = () => {
  return (
    <ContentBlock>
      <FlexBlock>
        <FitLogo width={118} height={39} color="gray" />
        <PolicyLinkBlock>
          <Link href={'/policy/terms'}>
            <Txt size={'typo5'} weight={'bold'} color="#757575">
              서비스 이용약관
            </Txt>
          </Link>
          <PolicyDivider />
          <Link href={'/policy/privacy'}>
            <Txt size={'typo5'} weight={'bold'} color="#757575">
              개인정보 처리방침
            </Txt>
          </Link>
        </PolicyLinkBlock>
      </FlexBlock>

      <FooterDivider />

      <FlexBlock>
        <TxtBlock>
          <Txt size={'typo5'} weight={'regular'} color="#616161">
            문의{`\n\n`}010-9295-9776{`\n`}crops.project.fit@gmail.com
          </Txt>
          <Txt size={'typo5'} weight={'regular'} color="#616161">
            @ 2023 F-IT, All Rights Reserved
          </Txt>
        </TxtBlock>
        <LinkBlock>
          <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? ''} target="_blank">
            <Icons icon={'instagram'} color="#9E9E9E" width={37} />
          </Link>
        </LinkBlock>
      </FlexBlock>
    </ContentBlock>
  );
};
