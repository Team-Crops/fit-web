import { useState } from 'react';

import styled from '@emotion/styled';

import { Txt } from '.';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  disabled?: boolean;
}

export const Tooltip = ({ text, disabled, children, ...props }: TooltipProps) => {
  const [visibility, setVisibility] = useState(false);
  return disabled ? (
    <>{children}</>
  ) : (
    <Container {...props}>
      <div onMouseOver={() => setVisibility(true)} onMouseLeave={() => setVisibility(false)}>
        {children}
      </div>
      <Span opacity={visibility ? 1 : 0} size="typo6" weight="regular">
        {text}
      </Span>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Span = styled(Txt)<{ opacity: number }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;

  padding: 5px 8px;

  color: #fff;
  white-space: nowrap;

  opacity: ${({ opacity }) => opacity};
  background-color: rgb(33 33 33 / 60%);
  border-radius: 4px;

  transition: opacity 0.2s ease-in-out;
`;
