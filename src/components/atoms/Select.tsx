'use client';

import type {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';
import { Children, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Icons } from '#atoms/Icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ArrowIcon = styled(Icons)<{ error: boolean; opened: boolean }>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  width: 12px;
  height: 12px;

  ${({ error, opened }) =>
    error
      ? css`
          color: ${opened ? '#ff0800' : '#bdbdbd'};
        `
      : css`
          color: ${opened ? '#ff706c' : '#bdbdbd'};
        `}

  ${({ opened }) =>
    opened &&
    css`
      transform: translateY(-50%) rotate(-180deg);
    `}

  transition: 0.25s;
`;

const SelectButton = styled.button<SelectProps>`
  appearance: none;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  padding: 10px;

  width: 100%;
  height: 30px;

  text-align: left;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;

  position: relative;

  ${(props) => getColorCSS(props)};
`;

const OptionList = styled.ul`
  z-index: 999;

  position: absolute;
  top: calc(100%);
  left: 0;
  width: 100%;

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

const OptionItem = styled.li<{ selected: boolean }>`
  cursor: pointer;
  list-style-type: none;

  padding: 10px;

  background-color: #ffffff;
  color: ${({ selected }) => (selected ? '#ff706c' : '#616161')};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;

  &:hover {
    background-color: #eeeeee;
  }

  position: relative;
`;

const OptionItemCheckIcon = styled(Icons)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  width: 8px;
  height: 8px;
  color: #ff706c;
`;

const SelectContext = createContext<{
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  setLabel?: Dispatch<SetStateAction<string | undefined>>;
}>({});

export interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export const Select = ({
  className,
  error = false,
  helperText,
  value,
  onChange,
  placeholder,
  children,
  ...props
}: SelectProps) => {
  const [isOpened, setOpened] = useState(false);
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
    <SelectContext.Provider value={{ value, onChange, setLabel }}>
      <SelectContainer className={className} ref={containerRef}>
        <input type="text" readOnly value={value} style={{ display: 'none' }} {...props} />
        <SelectButton error={error} value={value} onClick={() => setOpened((prev) => !prev)}>
          {label ?? placeholder}
          <ArrowIcon icon="arrowDown" error={error} opened={isOpened} />
          <OptionList hidden={!isOpened}>{children}</OptionList>
        </SelectButton>
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
  value: string | number | readonly string[];
  children?: ReactNode;
};

const Option = ({ value, children }: OptionProps) => {
  const { value: currentValue, onChange, setLabel } = useContext(SelectContext);

  const selected = useMemo(() => value == currentValue, [currentValue, value]);
  const label = useMemo(() => {
    let label = '';
    Children.map(children, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        label += child.toString();
      }
    });
    return label;
  }, [children]);

  useEffect(() => {
    if (selected && setLabel) {
      setLabel(label);
    }
  }, [label, selected, setLabel]);

  return (
    <OptionItem
      value={value}
      selected={selected}
      onClick={() => {
        if (onChange) {
          onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
        }
        if (setLabel) {
          setLabel(label);
        }
      }}
    >
      {selected && <OptionItemCheckIcon icon="check" />}
      {children}
    </OptionItem>
  );
};

Select.Option = Option;
