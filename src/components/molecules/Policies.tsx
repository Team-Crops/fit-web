'use client';

import { useState } from 'react';
import type { ChangeEventHandler, HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { CheckBox } from '#atoms/CheckBox';
import { Divider } from '#atoms/Divider';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  width: 700px;
  padding: 40px 0;

  display: flex;
  flex-direction: column;
  gap: 30px;

  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #fff;
`;

const PolicyContainer = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PolicyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ExpandButtonContainer = styled.div`
  display: flex;
  align-items: center;
  color: #9e9e9e;
`;

interface PoliciesBoxProps extends HTMLAttributes<HTMLDivElement> {
  allChecked?: boolean;
  toggleAll?: ChangeEventHandler<HTMLInputElement>;
}

export const PoliciesBox = ({ children, allChecked, toggleAll, ...props }: PoliciesBoxProps) => {
  return (
    <Container {...props}>
      {allChecked !== undefined && toggleAll && (
        <>
          <PolicyContainer>
            <CheckBoxContainer>
              <CheckBox checked={allChecked} onChange={toggleAll} />
              <Txt size="typo4" weight="bold">
                모두 동의합니다
              </Txt>
            </CheckBoxContainer>
          </PolicyContainer>
          <Divider />
        </>
      )}
      {children}
    </Container>
  );
};

interface PolicyProps {
  title: string;
  text: string;
  value: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Policy = ({ title, text, value, onChange }: PolicyProps) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <PolicyContainer>
      <PolicyHeader>
        <CheckBoxContainer>
          <CheckBox checked={value} onChange={onChange} />
          <Txt size="typo4" weight="bold">
            {title}
          </Txt>
        </CheckBoxContainer>
        <ExpandButtonContainer onClick={() => setExpanded((prev) => !prev)}>
          <Txt size="typo5" weight="medium">
            상세보기
          </Txt>
          <Icons icon="arrowForward" width={20} height={20} color="#9E9E9E" />
        </ExpandButtonContainer>
      </PolicyHeader>
      {isExpanded && (
        <Txt size="typo5" weight={'medium'}>
          {text}
        </Txt>
      )}
    </PolicyContainer>
  );
};

PoliciesBox.Policy = Policy;
