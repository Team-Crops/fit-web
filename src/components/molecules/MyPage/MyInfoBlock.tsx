import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const InfoContainer = styled.div`
  display: flex;
`;
const InfoTitle = styled(Txt)`
  display: block;
  width: 144px;
  margin-top: 13px;
`;
const InfoBlock = styled.div`
  width: calc(100% - 144px);
  padding: 28px 33px 28px 46px;
  border: 1px solid #e0e0e0;
  border-radius: 11px;
`;

interface MyInfoBlockProps {
  title: string;
  children: React.ReactNode;
}
export const MyInfoBlock = ({ title, children }: MyInfoBlockProps) => {
  return (
    <InfoContainer>
      <InfoTitle size={'typo3'} weight={'bold'} color="#FFA7A5">
        {title}
      </InfoTitle>
      <InfoBlock>{children}</InfoBlock>
    </InfoContainer>
  );
};
