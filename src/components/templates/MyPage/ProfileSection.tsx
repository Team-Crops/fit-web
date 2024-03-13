'use client';

import { useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';
import { Toggle } from '#atoms/Toggle';
import { ProfileBlock } from '#organisms/ProfileBlock';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
  width: 100%;
  max-width: 1200px;
  margin: 130px auto 20px;
`;
const CurrentState = styled(Txt)`
  margin-left: auto;
`;
const HighLight = styled.span`
  color: #ff706c;
`;
const ExposeProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 9px;
`;
const Tooltip = styled(Image)`
  margin: 0 -5px 3px;
  cursor: pointer;
`;
const ExplainModal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: -7px;
  bottom: -32px;
  height: 28px;
  padding: 0 7px;
  border-radius: 5px;
  background: #212121b2;
  white-space: nowrap;
`;

interface ProfileSectionProps {
  isEditing: boolean;
}

export const ProfileSection = ({ isEditing }: ProfileSectionProps) => {
  const [isHoverTooltip, setIsHoverTooltip] = useState(false);
  const [exposeProfile, setExposeProfile] = useState(false);

  const handleTooltip = () => {
    setIsHoverTooltip((prev) => !prev);
  };

  return (
    <StyledSection>
      <ProfileBlock size={229} editable={isEditing} />

      {isEditing ? (
        <ExposeProfile>
          <Tooltip
            src="/images/tooltip.svg"
            alt="tooltip"
            width={13}
            height={16}
            onMouseOver={handleTooltip}
            onMouseLeave={handleTooltip}
          />
          <Txt size={'typo5'} weight={'bold'} color="#424242">
            내 프로필 공개
          </Txt>
          <Toggle
            checked={exposeProfile}
            onChange={() => {
              setExposeProfile((prev) => !prev);
            }}
          />
          {isHoverTooltip && (
            <ExplainModal>
              <Txt size={'typo6'} weight={'regular'} color="#fff">
                다른 사용자들의 추천 목록에 프로필이 공개됩니다.
              </Txt>
            </ExplainModal>
          )}
        </ExposeProfile>
      ) : (
        <CurrentState size={'typo5'} weight={'bold'} color="#BDBDBD">
          현재 내 프로필은 <HighLight>공개상태</HighLight>입니다
        </CurrentState>
      )}
    </StyledSection>
  );
};
