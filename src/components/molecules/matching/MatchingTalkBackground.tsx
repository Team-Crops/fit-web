import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const TalkBubble = styled.div<{
  bubbleTailPosition: 'left' | 'right';
  size: MatchingTalkBackgroundProps['size'];
}>`
  position: relative;
  background: #fff;
  width: ${({ size }) => (size === 'small' ? '185px' : '230px')};
  height: ${({ size }) => (size === 'small' ? '40px' : '50px')};
  border-radius: ${({ bubbleTailPosition }) =>
    bubbleTailPosition === 'left' ? '0px 8px 8px 8px' : '8px 0px 8px 8px'};

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: ${({ bubbleTailPosition }) => (bubbleTailPosition === 'left' ? '100%' : '0')};
    width: 10px;
    height: 10px;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background: #8393ea;

    animation: pulse 2s linear infinite;
  }
`;

interface MatchingTalkBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'large';
  profilePosition?: 'left' | 'right';
}

export function MatchingTalkBackground({
  size = 'large',
  profilePosition = 'left',
  ...props
}: MatchingTalkBackgroundProps) {
  const profileSize = size === 'small' ? 30 : 40;
  return (
    <Container {...props}>
      {profilePosition === 'left' && (
        <Icons icon="account" width={profileSize} height={profileSize} />
      )}
      <TalkBubble size={size} bubbleTailPosition={profilePosition} />
      {profilePosition === 'right' && (
        <Icons icon="account" width={profileSize} height={profileSize} />
      )}
    </Container>
  );
}
