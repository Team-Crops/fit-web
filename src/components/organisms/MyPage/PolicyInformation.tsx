import Link from 'next/link';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';

const TxtBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const PolicyTxt = styled(Txt)`
  text-decoration: underline;
`;
export const PolicyInformation = () => {
  return (
    <MyInfoBlock title={'정책'}>
      <TxtBlock>
        <Link href="/">
          <PolicyTxt size={'typo5'} weight={'regular'} color="#757575">
            서비스 약관 안내
          </PolicyTxt>
        </Link>
        <Link href="/">
          <PolicyTxt size={'typo5'} weight={'regular'} color="#757575">
            개인정보 처리 방침
          </PolicyTxt>
        </Link>
        <Link href="/">
          <PolicyTxt size={'typo5'} weight={'regular'} color="#757575">
            서비스 탈퇴 안내
          </PolicyTxt>
        </Link>
      </TxtBlock>
    </MyInfoBlock>
  );
};
