import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const Container = styled.div``;

const TextBubble = styled(Txt)`
  background: #fff;
  padding: 20px 35px 20px 25px;
  border-radius: 0 40px 40px 40px;
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.08));
  line-height: 2;
`;

interface TalkBubbleProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TalkBubble({ ...props }: TalkBubbleProps) {
  return <TextBubble size="typo4" weight="regular" color="#424242" {...props} />;
}
