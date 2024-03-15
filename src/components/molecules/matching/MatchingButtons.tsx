'use client';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

interface MatchingButtonsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MatchingButtons({ ...props }: MatchingButtonsProps) {
  return <ButtonsContainer {...props} />;
}

interface MatchingButtonProps extends Partial<React.ComponentProps<typeof Button>> {}

export function MatchingButton({
  variant = 'round',
  height = '70',
  color = 'primary',
  ...props
}: MatchingButtonProps) {
  return <Button variant={variant} height={height} color={color} {...props} />;
}

MatchingButtons.Button = MatchingButton;
