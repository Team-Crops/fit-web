import styled from '@emotion/styled';

const ToggleOutBlock = styled.label<Pick<ToggleProps, 'checked'>>`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  width: 38px;
  height: 20px;

  background-color: ${({ checked }) => (checked ? '#FF706C' : '#bdbdbd')};
  border-radius: 10px;

  transition: background-color 0.2s ease-in-out;
`;
const ToggleInBlock = styled.div<Pick<ToggleProps, 'checked'>>`
  position: absolute;
  left: ${({ checked }) => (checked ? '20.2px' : '1.8px')};

  width: 16px;
  height: 16px;

  background-color: #fff;
  border-radius: 50%;

  transition: left 0.2s ease-in-out;
`;
const StyledInput = styled.input`
  display: none;
`;

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Toggle: React.FC<ToggleProps> = ({ checked, ...props }) => {
  return (
    <ToggleOutBlock checked={checked}>
      <ToggleInBlock checked={checked} />
      <StyledInput type="checkbox" checked={checked} {...props} />
    </ToggleOutBlock>
  );
};
