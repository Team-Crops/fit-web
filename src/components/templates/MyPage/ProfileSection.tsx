'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { useAuthStore } from '#/stores/auth';
import { useTempAuthStore } from '#/stores/tempAuth';
import { Txt } from '#atoms/Text';
import { Toggle } from '#atoms/Toggle';
import { ProfileBlock } from '#organisms/ProfileBlock';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 21px;
  align-items: center;

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
  gap: 9px;
  align-items: center;

  margin-left: auto;
`;
const Tooltip = styled(Image)`
  cursor: pointer;
  margin: 0 -5px 3px;
`;
const ExplainModal = styled.div`
  position: absolute;
  bottom: -32px;
  left: -7px;

  display: flex;
  align-items: center;

  height: 28px;
  padding: 0 7px;

  white-space: nowrap;

  background: #212121b2;
  border-radius: 5px;
`;

interface ProfileSectionProps {
  isEditing: boolean;
}

export const ProfileSection = ({ isEditing }: ProfileSectionProps) => {
  const user = useAuthStore((state) => state.user);
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const setTempUser = useTempAuthStore((state) => state.setTempUser);
  const [isHoverTooltip, setIsHoverTooltip] = useState(false);

  const handleTooltip = () => {
    setIsHoverTooltip((prev) => !prev);
  };

  const handleIsOpenProfile = useCallback(() => {
    if (tempUser === null) return;
    setTempUser({ ...tempUser, isOpenProfile: !tempUser.isOpenProfile });
  }, [setTempUser, tempUser]);

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
          <Toggle checked={tempUser?.isOpenProfile ?? false} onChange={handleIsOpenProfile} />
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
          현재 내 프로필은 <HighLight>{user?.isOpenProfile ? '공개상태' : '비공개상태'}</HighLight>
          입니다
        </CurrentState>
      )}
    </StyledSection>
  );
};
