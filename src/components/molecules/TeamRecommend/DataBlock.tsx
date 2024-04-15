import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';

const Block = styled.div`
  display: flex;
  width: 100%;
`;
const Title = styled(Txt)`
  width: 194px;
`;
const Content = styled(Txt)`
  overflow: hidden;

  width: calc(100% - 194px);

  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

interface DataBlockProps {
  title: string;
  content: string;
}
export const DataBlock = ({ title, content }: DataBlockProps) => {
  return (
    <Block>
      <Title size="typo5" weight="regular" color="#616161">
        {title}
      </Title>
      <Content size="typo5" weight="medium" color="#212121">
        {content}
      </Content>
    </Block>
  );
};
