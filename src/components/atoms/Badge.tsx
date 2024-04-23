import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: fit-content;
  padding: 2px 8px;

  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  color: #ff706c;
  letter-spacing: -0.6px;

  forced-color-adjust: auto;
  background: #ff706c52;
  border-radius: 100px;
`;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

export const Badge: React.FC<BadgeProps> = ({ ...props }) => {
  return <StyledSpan {...props} />;
};
