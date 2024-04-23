import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';

const InfoDescriptionBlock = styled.div`
  display: flex;
`;
const Title = styled(Txt)`
  width: 160px;
`;
const Description = styled(Txt)`
  line-height: 180%;
`;

interface InfoDescriptionProps {
  title: string;
  description: string;
}
export const InfoDescription = ({ title, description }: InfoDescriptionProps) => {
  return (
    <InfoDescriptionBlock>
      <Title size="typo5" weight="regular" color="#616161">
        {title}
      </Title>
      <Description size="typo6" weight="regular" color="#616161">
        {description}
      </Description>
    </InfoDescriptionBlock>
  );
};
