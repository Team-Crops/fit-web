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

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { transientStyled } from '#/utilities/transient-styled';
import { Icons } from '#atoms/Icons';

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
      background-color: #fff;
      border-color: #9e9e9e;

      &:hover,
      &:focus {
        border-color: #ff908d;
      }
    `;
  } else {
    return css`
      color: #bdbdbd;
      background-color: #fff;
      border-color: #9e9e9e;

      &:hover,
      &:focus {
        border-color: #ff908d;
      }
    `;
  }
}

const SelectContainer = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${({ width }) => width !== undefined && `width: ${width};`}
`;

const ArrowIcon = transientStyled(Icons)<{ $isError: boolean; $isOpened: boolean }>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  transition: 0.25s;

  ${({ $isError, $isOpened }) =>
    $isError
      ? css`
          color: ${$isOpened ? '#ff0800' : '#bdbdbd'};
        `
      : css`
          color: ${$isOpened ? '#ff706c' : '#bdbdbd'};
        `}
  ${({ $isOpened }) =>
    $isOpened &&
    css`
      transform: translateY(-50%) rotate(-180deg);
    `}
`;

const SelectButton = styled.button<SelectProps>`
  position: relative;

  width: 100%;
  height: 30px;
  padding: 0 20px 0 10px;

  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  text-align: left;
  letter-spacing: -0.6px;

  appearance: none;
  border: 1px solid #9e9e9e;
  border-radius: 4px;

  ${(props) => getColorCSS(props)};
`;

const OptionList = styled.ul<{ position: 'top' | 'bottom' }>`
  position: absolute;
  z-index: 10;
  left: 0;

  overflow-y: auto;

  width: 100%;
  max-height: calc(100vh - 100%);
  margin: 0;
  padding: 0;

  background-color: #f5f5f5;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 2px 4px 8px 0 rgb(0 0 0 / 15%);

  ${({ position }) =>
    position === 'top'
      ? css`
          bottom: 100%;
        `
      : css`
          top: 100%;
        `}
`;

const HelperText = styled.div<{ error?: boolean }>`
  width: 100%;

  font-size: 8px;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  color: ${({ error }) => (error ? '#ff0800' : '#9e9e9e')};
  text-align: right;
  letter-spacing: -0.4px;
`;

const OptionGroupContainer = styled.div`
  margin-top: 8px;
  background-color: #fff;
`;

const OptionGroupLabel = styled.div`
  padding: 4px 12px;

  font-size: 9px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  color: #bdbdbd;
  letter-spacing: -0.45px;
`;

const OptionGroupHr = styled.hr`
  width: 100%;
  margin: 0;
  border: 1px solid #eee;
`;

const OptionItem = styled.li<{ selected: boolean }>`
  cursor: pointer;

  position: relative;

  padding: 10px;

  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  color: ${({ selected }) => (selected ? '#ff706c' : '#616161')};
  letter-spacing: -0.6px;
  list-style-type: none;

  background-color: #fff;

  &:hover {
    background-color: #eee;
  }
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
  setLabel?: Dispatch<SetStateAction<ReactNode | string | undefined>>;
}>({});

export interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  width?: string;
}

export const Select: React.FC<SelectProps> & {
  OptionGroup: React.FC<OptionGroupProps>;
  Option: React.FC<OptionProps>;
} = ({
  className,
  error = false,
  helperText,
  value,
  onChange,
  placeholder,
  children,
  width,
  ...props
}) => {
  const [isOpened, setOpened] = useState(false);
  const [label, setLabel] = useState<ReactNode | string | undefined>();
  const [optionsPosition, setOptionsPosition] = useState<'top' | 'bottom'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (optionsRef.current) {
      const listTop = optionsRef.current.getBoundingClientRect().top;
      const listHeight = optionsRef.current.offsetHeight;

      if (listTop + listHeight > window.innerHeight) {
        setOptionsPosition('top');
      } else {
        setOptionsPosition('bottom');
      }
    }
  }, [isOpened]);

  return (
    <SelectContext.Provider value={{ value, onChange, setLabel }}>
      <SelectContainer className={className} ref={containerRef} width={width}>
        <input type="text" readOnly value={value} style={{ display: 'none' }} {...props} />
        <SelectButton error={error} value={value} onClick={() => setOpened((prev) => !prev)}>
          {(value && label) ?? placeholder}
          <ArrowIcon icon="arrowDown" size={12} $isError={error} $isOpened={isOpened} />
          <OptionList position={optionsPosition} hidden={!isOpened} ref={optionsRef}>
            {children}
          </OptionList>
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

const OptionGroup: React.FC<OptionGroupProps> = ({ label, children }) => (
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

const Option: React.FC<OptionProps> = ({ value, children }) => {
  const { value: currentValue, onChange, setLabel } = useContext(SelectContext);

  const selected = useMemo(() => value == currentValue, [currentValue, value]);
  const label = useMemo(() => {
    let label: ReactNode | string = '';
    Children.map(children, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        label += child.toString();
      } else label = children;
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
