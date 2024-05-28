'use client';

import type { ChangeEventHandler, HTMLAttributes, MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import { PolicyType } from '#/types';
import { CheckBox } from '#atoms/CheckBox';
import { Divider } from '#atoms/Divider';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { PolicyContent } from '../templates/Policy/PolicyContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin: 50px;

  text-align: right;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  width: 700px;
  padding: 40px 0;

  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

const PolicyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 40px;
`;

const PolicyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ExpandButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #9e9e9e;
`;

interface PoliciesBoxProps extends HTMLAttributes<HTMLDivElement> {
  allChecked?: boolean;
  disabled?: boolean;
  toggleAll?: ChangeEventHandler<HTMLInputElement>;
}

export const PoliciesBox = ({
  children,
  allChecked,
  disabled,
  toggleAll,
  ...props
}: PoliciesBoxProps) => {
  return (
    <Container>
      <Box {...props}>
        {allChecked !== undefined && toggleAll && (
          <>
            <PolicyContainer>
              <CheckBoxContainer>
                <CheckBox checked={allChecked} onChange={toggleAll} disabled={disabled} />
                <Txt size="typo4" weight="bold">
                  모두 동의합니다
                </Txt>
              </CheckBoxContainer>
            </PolicyContainer>
            <Divider />
          </>
        )}
        {children}
      </Box>
      <Txt size="typo5" weight="medium" color="#9e9e9e">
        *필수 약관에 동의하셔야 F-IT 회원가입이 가능합니다.
      </Txt>
    </Container>
  );
};

interface PolicyProps {
  title: string;
  type: PolicyType;
  value?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Policy: React.FC<PolicyProps> = ({
  title,
  type,
  value,
  disabled,
  expanded,
  onClick,
  onChange,
}) => {
  return (
    <PolicyContainer onClick={onClick}>
      <PolicyHeader>
        <CheckBoxContainer>
          <CheckBox checked={value} onChange={onChange} disabled={disabled} />
          <Txt size="typo4" weight="bold">
            {title}
          </Txt>
        </CheckBoxContainer>
        <ExpandButtonContainer>
          <Txt size="typo5" weight="medium">
            상세보기
          </Txt>
          <Icons icon="arrowForward" width={20} height={20} color="#9E9E9E" />
        </ExpandButtonContainer>
      </PolicyHeader>
      {expanded && <PolicyContent type={type} isScrolled />}
    </PolicyContainer>
  );
};

PoliciesBox.Policy = Policy;
