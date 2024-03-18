import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const TextBubble = styled(Txt)<{ tailPosition: TalkBubbleProps['tailPosition'] }>`
  background: #fff;
  padding: 20px 35px 20px 25px;
  border-radius: ${({ tailPosition }) =>
    tailPosition === 'left' ? '0 40px 40px 40px' : '40px 0 40px 40px'};
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.08));
  line-height: 2;
`;

interface TalkBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  tailPosition?: 'left' | 'right';
}

export function TalkBubble({ tailPosition = 'left', ...props }: TalkBubbleProps) {
  return (
    <TextBubble
      tailPosition={tailPosition}
      size="typo4"
      weight="regular"
      color="#424242"
      {...props}
    />
  );
}
