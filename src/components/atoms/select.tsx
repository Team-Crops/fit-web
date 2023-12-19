import React, { SelectHTMLAttributes } from 'react';

import styled from '@emotion/styled';

const StyledSelect = styled.select`
  appearance: none;
`;

const StyledOptgroup = styled.optgroup``;
const StyledOption = styled.option``;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}
interface OptgroupProps extends SelectHTMLAttributes<HTMLOptGroupElement> {}
interface OptionProps extends SelectHTMLAttributes<HTMLOptionElement> {}

const Optgroup = ({ children, ...props }: OptgroupProps) => (
  <StyledOptgroup {...props}>{children}</StyledOptgroup>
);

const Option = ({ children, ...props }: OptionProps) => (
  <StyledOption {...props}>{children}</StyledOption>
);

export const Select = ({ children, ...props }: SelectProps) => (
  <StyledSelect {...props}>{children}</StyledSelect>
);

Select.Optgroup = Optgroup;
Select.Option = Option;
