import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: fit-content;

  border-radius: 100px;
  padding: 2px 8px;

  color: #ff706c;
  background: #ff706c52;

  font-family: 'Spoqa Han Sans Neo';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.6px;

  forced-color-adjust: auto;
`;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

export const Badge = ({ ...props }: BadgeProps) => {
  return <StyledSpan {...props} />;
};
