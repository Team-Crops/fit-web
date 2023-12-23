import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const StyledInput = styled.input<StyledInputProps>`
  height: 32px;
  border: none;
  border-radius: 5px;
  padding: 1px 10px 0px;
  background-color: #eeeeee;
  /* error css */
  ${(props) =>
    props.isError &&
    css`
      border: 1px solid #ff0800;
      background-color: #f7c6c4;
    `}

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* font css */
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;
  &::placeholder {
    color: #9e9e9e;
  }
  &:focus,
  &:focus-visible {
    padding: 0px 9px;
    outline: 2px solid #ffc7c6;
    border: 1px solid #ff706c;
    background-color: #fff;
  }
`;
const ErrorText = styled.span`
  color: #ff0800;
  font-family: Spoqa Han Sans Neo;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
  text-align: right;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  errorText?: string;
}
interface StyledInputProps {
  isError: boolean;
}

export const Input = ({ errorText, ...props }: InputProps) => {
  return (
    <InputContainer>
      <StyledInput isError={errorText !== '' && errorText !== undefined} type="text" {...props} />
      {/* TODO: Text Component 추가 시 교체 */}
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputContainer>
  );
};
