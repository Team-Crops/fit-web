import { InputHTMLAttributes } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Txt, TxtProps, TxtSizeCSS, TxtWeightCSS } from './Text';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface CommonInputProps {
  typo: TxtProps['size'];
  weight: TxtProps['weight'];
  error?: boolean;
}

const CommonInput = styled.input<CommonInputProps>`
  appearance: none;

  padding: 10px;

  ${({ typo }) => TxtSizeCSS({ size: typo })}
  ${({ weight }) => TxtWeightCSS({ weight })}
`;

const FilledInput = styled(CommonInput)`
  border: 1px solid #eeeeee;
  border-radius: 5px;
  background: ${({ error }) => (error ? 'rgba(255, 8, 0, 0.2)' : '#eeeeee')};
  &:focus {
    outline: 2px solid #ffc7c6;
    border: 1px solid #ff706c;
    background: ${({ error }) => (error ? 'rgba(255, 8, 0, 0.1)' : '#fff')};
  }

  color: #212121;
  &::placeholder {
    color: #9e9e9e;
  }
`;

const StandardInput = styled(CommonInput)`
  border-bottom: 3px solid #ff908d;
  &:focus {
    border-bottom: 3px solid #ff706c;
  }

  color: #212121;
  &::placeholder {
    color: #bdbdbd;
  }
`;

interface HelperTextProps {
  error: boolean;
}

const HelperText = styled(Txt)<HelperTextProps>`
  color: ${({ error }) => (error ? '#ff0800' : '#9e9e9e')};
  text-align: right;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'filled' | 'standard';
  helperText?: string;
  error?: boolean;

  typo?: TxtProps['size'];
  weight?: TxtProps['weight'];
}

export const Input = ({
  variant = 'filled',
  helperText,
  error = false,
  typo = 'typo6',
  weight = 'medium',
  ...props
}: InputProps) => {
  return (
    <InputContainer>
      {variant === 'filled' && <FilledInput typo={typo} weight={weight} error={error} {...props} />}
      {variant === 'standard' && (
        <StandardInput typo={typo} weight={weight} error={error} {...props} />
      )}
      <HelperText size="typo6" weight="regular" error={error}>
        {helperText}
      </HelperText>
    </InputContainer>
  );
};
