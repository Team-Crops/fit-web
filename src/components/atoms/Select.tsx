'use client';

import type {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';
import { Children, createContext, useContext, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

function getArrowSvg(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
  <path d="M6.4147 8.38433C6.21651 8.67856 5.78348 8.67856 5.5853 8.38433L0.462761 0.779331C0.239057 0.447218 0.47703 4.85377e-09 0.877459 3.51928e-08L11.1225 8.11426e-07C11.523 8.41765e-07 11.7609 0.447218 11.5372 0.779331L6.4147 8.38433Z" fill="${color}"/>
</svg>`;
}

function getArrowImage({ color }: { color: string }) {
  return `url('data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(getArrowSvg(color))}')`;
}

const checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
<path d="M1 5L5 8.66667L9 1" stroke="#FF706C" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const checkImage = `url('data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(checkSvg)}')`;

function getColorCSS({ error, value }: SelectProps) {
  if (error) {
    return css`
      color: #bdbdbd;
      background-color: #fafafa;
      border-color: #ff0800;
    `;
  } else if (value !== undefined) {
    return css`
      color: #212121;
      background-color: #ffffff;
      border-color: #9e9e9e;

      &:hover,
      &:focus {
        border-color: #ff908d;
      }
    `;
  } else {
    return css`
      color: #bdbdbd;
      background-color: #ffffff;
      border-color: #9e9e9e;

      &:hover,
      &:focus {
        border-color: #ff908d;
      }
    `;
  }
}

function getArrowCSS({ error }: SelectProps) {
  if (error) {
    return css`
      background-image: ${getArrowImage({ color: '#bdbdbd' })};
      background-repeat: no-repeat;
      background-position: right 10px center;

      &:focus {
        background-image: ${getArrowImage({ color: '#ff0800' })};
      }
    `;
  } else {
    return css`
      background-image: ${getArrowImage({ color: '#9e9e9e' })};
      background-repeat: no-repeat;
      background-position: right 10px center;

      &:focus {
        background-image: ${getArrowImage({ color: '#ff908d' })};
      }
    `;
  }
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectButton = styled.button<SelectProps>`
  appearance: none;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  padding: 10px;

  width: 100%;

  text-align: left;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;

  ${(props) => getColorCSS(props)}
  ${(props) => getArrowCSS(props)}
`;

const OptionList = styled.ul`
  position: absolute;
  top: 52.5px;
  width: calc(100% - 36px + 2px);

  margin: 0;
  padding: 0;

  border-radius: 5px;
  border: 1px solid #eeeeee;
  background-color: #f5f5f5;
  box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const HelperText = styled.div<{ error?: boolean }>`
  width: 100%;

  color: ${({ error }) => (error ? '#ff0800' : '#9e9e9e')};
  text-align: right;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;

const OptionGroupContainer = styled.div`
  margin-top: 8px;

  background-color: #ffffff;
`;

const OptionGroupLabel = styled.div`
  padding: 4px 12px;

  color: #bdbdbd;
  font-size: 9px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.45px;
`;

const OptionGroupHr = styled.hr`
  width: 100%;
  margin: 0;
  border: 1px solid #eeeeee;
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  list-style-type: none;

  padding: 10px;

  background-color: #ffffff;
  color: #616161;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-image: ${checkImage};
      background-repeat: no-repeat;
      background-position: right 10px center;
    `}

  &:hover {
    background-color: #eeeeee;
  }
`;

const SelectContext = createContext<{
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  setOpened?: Dispatch<SetStateAction<boolean>>;
  setLabel?: Dispatch<SetStateAction<string | undefined>>;
}>({});

type SelectProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  helperText?: string;
};

export const Select = ({
  error,
  helperText,
  value,
  onChange,
  placeholder,
  children,
  ...props
}: SelectProps) => {
  const [isOpened, setOpened] = useState(true);
  const [label, setLabel] = useState<string | undefined>();
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
    <SelectContext.Provider value={{ value, onChange, setOpened, setLabel }}>
      <SelectContainer ref={containerRef}>
        <input type="text" value={value} style={{ display: 'none' }} {...props} />
        <SelectButton error={error} value={value} onClick={() => setOpened((prev) => !prev)}>
          {label ?? placeholder}
        </SelectButton>
        {isOpened && <OptionList>{children}</OptionList>}
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </SelectContainer>
    </SelectContext.Provider>
  );
};

type OptionGroupProps = {
  label: string;
  children?: ReactNode;
};

const OptionGroup = ({ label, children }: OptionGroupProps) => (
  <OptionGroupContainer>
    <OptionGroupLabel>{label}</OptionGroupLabel>
    <OptionGroupHr />
    {children}
  </OptionGroupContainer>
);

Select.OptionGroup = OptionGroup;

type OptionProps = {
  value: string;
  children?: ReactNode;
};

const Option = ({ value, children }: OptionProps) => {
  const { value: currentValue, onChange, setOpened, setLabel } = useContext(SelectContext);
  return (
    <OptionItem
      isSelected={currentValue === value}
      onClick={() => {
        if (onChange) {
          onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
        }
        if (setLabel) {
          let label = '';
          Children.map(children, (child) => {
            if (typeof child === 'string' || typeof child === 'number') {
              label += child.toString();
            }
          });
          setLabel(label);
        }
        if (setOpened) {
          setOpened(false);
        }
      }}
    >
      {children}
    </OptionItem>
  );
};

Select.Option = Option;
