import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const BasicInfoBlock = styled.div`
  display: flex;
`;
const InfoTitle = styled(Txt)<{ titleWidth: number }>`
  width: ${({ titleWidth }) => titleWidth}px;
`;

interface BasicInfoProps {
  title: string;
  titleWidth: number;
  type: 'string' | 'reactNode';
  children: React.ReactNode;
}
export const BasicInfo = ({ title, titleWidth, type, children }: BasicInfoProps) => {
  return (
    <BasicInfoBlock>
      <InfoTitle size={'typo5'} weight={'bold'} color={'#9E9E9E'} titleWidth={titleWidth}>
        {title}
      </InfoTitle>
      {type === 'string' ? (
        <Txt size={'typo5'} weight={'bold'} color={'#424242'}>
          {children}
        </Txt>
      ) : (
        children
      )}
    </BasicInfoBlock>
  );
};
