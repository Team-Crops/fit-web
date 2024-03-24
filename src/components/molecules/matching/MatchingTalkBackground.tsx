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

  width: ${({ size }) => (size === 'small' ? '185px' : '230px')};
  height: ${({ size }) => (size === 'small' ? '40px' : '50px')};

  background: #fff;
  border-radius: ${({ bubbleTailPosition }) =>
    bubbleTailPosition === 'left' ? '0px 8px 8px 8px' : '8px 0px 8px 8px'};

  ::after {
    content: '';

    position: absolute;
    top: 0;
    left: ${({ bubbleTailPosition }) => (bubbleTailPosition === 'left' ? '100%' : '0')};
    transform: translate(-50%, -50%);

    width: 10px;
    height: 10px;

    background: #8393ea;
    border-radius: 10px;

    animation: pulse 2s linear infinite;
  }
`;

interface MatchingTalkBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'large';
  profilePosition?: 'left' | 'right';
}

export const MatchingTalkBackground = ({
  size = 'large',
  profilePosition = 'left',
  ...props
}: MatchingTalkBackgroundProps) => {
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
};
