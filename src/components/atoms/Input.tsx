import { InputHTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { Txt, TxtProps, TxtSizeCSS, TxtWeightCSS } from './Text';

const InputContainer = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: ${({ width }) => width};
`;

interface CommonInputProps {
  typo: TxtProps['size'];
  weight: TxtProps['weight'];
  error?: boolean;
}

const CommonInput = styled.input<CommonInputProps>`
  width: 100%;
  padding: 10px;
  appearance: none;

  ${({ typo }) => TxtSizeCSS({ size: typo })}
  ${({ weight }) => TxtWeightCSS({ weight })}
`;

const FilledInput = styled(CommonInput)`
  padding: 10px;

  color: #212121;

  background: ${({ error }) => (error ? 'rgba(255, 8, 0, 0.2)' : '#eeeeee')};
  border: 1px solid #eee;
  border-radius: 5px;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    background: ${({ error }) => (error ? 'rgba(255, 8, 0, 0.1)' : '#fff')};
    border: 1px solid #ff706c;
    outline: 2px solid #ffc7c6;
  }
`;

const StandardInput = styled(CommonInput)`
  padding: 10px 0;
  color: #212121;
  border-bottom: 3px solid #ff908d;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    border-bottom: 3px solid #ff706c;
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
  width?: string;
}

export const Input = ({
  variant = 'filled',
  helperText,
  error = false,
  typo = 'typo6',
  weight = 'medium',
  width = '100%',
  ...props
}: InputProps) => {
  return (
    <InputContainer width={width}>
      {variant === 'filled' && <FilledInput typo={typo} weight={weight} error={error} {...props} />}
      {variant === 'standard' && (
        <StandardInput typo={typo} weight={weight} error={error} {...props} />
      )}
      {helperText && (
        <HelperText size="typo6" weight="regular" error={error}>
          {helperText}
        </HelperText>
      )}
    </InputContainer>
  );
};
