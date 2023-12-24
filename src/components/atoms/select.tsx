'use client';

import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

const arrowSvg = (
  color: string
) => `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
  <path d="M6.4147 8.38433C6.21651 8.67856 5.78348 8.67856 5.5853 8.38433L0.462761 0.779331C0.239057 0.447218 0.47703 4.85377e-09 0.877459 3.51928e-08L11.1225 8.11426e-07C11.523 8.41765e-07 11.7609 0.447218 11.5372 0.779331L6.4147 8.38433Z" fill="${color}"/>
</svg>`;

const arrowImage = ({ color }: { color: string }) =>
  `url('data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(arrowSvg(color))}')`;

const colorCSS = ({ error, value }: SelectProps) => {
  if (error) {
    return css`
      color: #bdbdbd;
      background-color: #fafafa;
      border-color: #ff0800;
    `;
  } else if (value === undefined) {
    return css`
      color: #bdbdbd;
      background-color: #ffffff;
      border-color: #9e9e9e;

      &:hover,
      &:focus {
        border-color: #ff908d;
      }
    `;
  } else {
    return css`
      color: #9e9e9e;
      background-color: #ffffff;
      border-color: #9e9e9e;

      &:hover,
      &:focus {
        border-color: #ff908d;
      }
    `;
  }
};

const arrowCSS = ({ error }: SelectProps) => {
  if (error) {
    return css`
      background-image: ${arrowImage({ color: '#bdbdbd' })};
      background-repeat: no-repeat;
      background-position: right 10px center;

      &:focus {
        background-image: ${arrowImage({ color: '#ff0800' })};
      }
    `;
  } else {
    return css`
      background-image: ${arrowImage({ color: '#9e9e9e' })};
      background-repeat: no-repeat;
      background-position: right 10px center;

      &:focus {
        background-image: ${arrowImage({ color: '#ff908d' })};
      }
    `;
  }
};

const SelectButton = styled.button`
  appearance: none;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  padding: 10px;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;

  ${colorCSS}
  ${arrowCSS}
`;

const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  helperText?: string;
};

export function Select({ error, helperText, value, placeholder, children, ...props }: SelectProps) {
  const [isOpened, setOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div ref={containerRef}>
      <input type="text" value={value} style={{ display: 'none' }} {...props} />
      <SelectButton error={error} onClick={() => setOpened((prev) => !prev)}>
        {value ?? placeholder}
      </SelectButton>
      {isOpened && <OptionList>{children}</OptionList>}
    </div>
  );
}

type OptionGroupProps = {
  label: string;
  children?: React.ReactNode;
};

function OptionGroup({ label, children }: OptionGroupProps) {
  const Container = styled.div``;
  const StyledHr = styled.hr``;
  return (
    <Container>
      {label}
      <StyledHr />
      {children}
    </Container>
  );
}

Select.OptionGroup = OptionGroup;

type OptionProps = {
  value: string;
  children?: React.ReactNode;
};

function Option({ value, children }: OptionProps) {
  return <li>{children}</li>;
}

Select.Option = Option;
