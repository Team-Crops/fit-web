import { HeaderLoginBlock } from '#molecules/HeaderLoginBlock';
import { HeaderLogo } from '#molecules/HeaderLogo';
import { HeaderNav } from '#molecules/HeaderNav';
import styled from '@emotion/styled';

const ContentBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
`;
const HeaderLeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 128px;
  height: 100%;
`;
const HeaderRightBlock = styled.div`
  display: flex;
`;

export const HeaderContent = () => {
  return (
    <ContentBlock>
      <HeaderLeftBlock>
        <HeaderLogo />
        <HeaderNav />
      </HeaderLeftBlock>
      <HeaderRightBlock>
        {/* TODO: 로그인 전, 후 Component 구분하기 */}
        <HeaderLoginBlock />
        {/* <HeaderNonLoginBlock /> */}
      </HeaderRightBlock>
    </ContentBlock>
  );
};
