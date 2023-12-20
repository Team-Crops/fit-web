import React, { SelectHTMLAttributes, useState } from 'react';

import styled from '@emotion/styled';

const arrowImage = ({ color }: { color: string }) =>
  `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${color}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select<{
  isSelected: boolean;
  isError: boolean;
  width: 'medium' | 'large';
}>`
  outline: none;
  appearance: none;
  background-image: ${arrowImage({ color: '424242' })};
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;

  width: ${(props) => (props.width == 'medium' ? '7.5rem' : '12.5rem')};
  padding: 0.5rem;
  border: ${(props) => (props.isError ? '1px solid #ff0800' : '1px solid #424242')};
  border-radius: 0.25rem;

  font-size: 0.75rem;
  font-style: normal;
  font-weight: ${(props) => (props.isSelected ? '500' : '400')};
  color: ${(props) => (props.isSelected ? '#212121' : '#bdbdbd')};

  &:hover {
    border-color: ${(props) => (props.isError ? '#ff0800' : '#ff908d')};
  }

  &:focus {
    border-color: ${(props) => (props.isError ? '#ff0800' : '#ff908d')};
    background-image: ${(props) => arrowImage({ color: props.isError ? 'ff0800' : 'ff908d' })};
  }
`;

const StyledSpan = styled.span<{ isError: boolean }>`
  margin: 0.25rem;

  font-size: 0.5rem;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => (props.isError ? '#ff0800' : '#424242')};
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: 'medium' | 'large';
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

export function Select({
  width = 'medium',
  placeholder,
  error,
  helperText,
  onChange,
  children,
  ...props
}: SelectProps) {
  const [selected, setSelected] = useState(false);
  return (
    <StyledContainer>
      <StyledSelect
        width={width}
        isError={error ?? false}
        isSelected={selected}
        {...props}
        onChange={(event) => {
          setSelected(event.target.value !== placeholder);
          event.target.blur();
          onChange?.(event);
        }}
      >
        <Select.Option disabled hidden selected>
          {placeholder}
        </Select.Option>
        {children}
      </StyledSelect>
      {helperText && <StyledSpan isError={error ?? false}>{helperText}</StyledSpan>}
    </StyledContainer>
  );
}

Select.Optgroup = styled.optgroup``;
Select.Option = styled.option``;
