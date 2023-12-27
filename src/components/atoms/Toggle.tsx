import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

const ToggleOutBlock = styled.div<ToggleProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 38px;
  height: 20px;
  background-color: ${({ checked }) => (checked ? '#FF706C' : '#bdbdbd')};
  border-radius: 10px;

  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
`;
const ToggleInBlock = styled.div<Pick<ToggleProps, 'checked'>>`
  position: absolute;
  left: ${({ checked }) => (checked ? '20.2px' : '1.8px')};
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;

  transition: left 0.2s ease-in-out;
`;

interface ToggleProps {
  checked: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Toggle = ({ checked, onClick }: ToggleProps) => {
  return (
    <ToggleOutBlock checked={checked} onClick={onClick}>
      <ToggleInBlock checked={checked} />
    </ToggleOutBlock>
  );
};
