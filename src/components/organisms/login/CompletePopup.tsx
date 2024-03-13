'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styled from '@emotion/styled';

import PartyingFaceImage from '#/assets/images/partying-face.png';
import { updateAuth } from '#/redux/features/auth/slice';
import { useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { Toggle } from '#atoms/Toggle';
import { Button } from '../../atoms/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 830px;
  height: 680px;

  border-radius: 15px;
  background: #ffffff;

  position: relative;
`;

const ProfileVisibilityToggleContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 50px;
  display: flex;
  align-items: center;
`;

const CrossButton = styled(Icons)`
  position: absolute;
  top: 40px;
  right: 50px;

  @media (max-width: 768px) {
    top: 15px;
    right: 10px;
  }

  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  top: 30px;

  padding: 8px;

  border-radius: 5px;
  background-color: #212121b2;
  color: #ffffff;
  opacity: ${({ show }) => (show ? 1 : 0)};

  transition: opacity 0.2s ease-in-out;

  white-space: nowrap;
`;

const HeaderText = styled(Txt)`
  margin: 20px 0;
`;

const BodyText = styled(Txt)`
  margin-bottom: 4px;
  color: #bdbdbd;
`;

const ContinueButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CompletePopup = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.user.me);

  const [updateMe] = useUpdateMeMutation();
  const [showTooltip, setShowTooltip] = useState(false);

  const closePopup = useCallback(() => {
    dispatch(updateAuth({ showLoginPopup: false }));
  }, [dispatch]);

  return (
    <Container>
      <ProfileVisibilityToggleContainer>
        <Tooltip show={showTooltip}>
          <Txt size="typo6" weight="regular">
            다른 사용자들의 추천 목록에 프로필이 공개됩니다.
          </Txt>
        </Tooltip>
        <Icons
          icon="info"
          width={13}
          height={13}
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
        <div style={{ width: '5px' }} />
        <Txt size="typo5" weight="bold">
          내 프로필 공개
        </Txt>
        <div style={{ width: '9px' }} />
        <Toggle
          checked={me?.isOpenProfile}
          onChange={(e) => updateMe({ isOpenProfile: e.target.checked })}
        />
      </ProfileVisibilityToggleContainer>
      <CrossButton
        icon="cross"
        width={24}
        height={24}
        color="#bdbdbd"
        onClick={() => closePopup()}
      />
      <div />
      <ContentContainer>
        <Image src={PartyingFaceImage} alt={'Partying Face Icon'} width={65} height={65} />
        <HeaderText size="typo1" weight="bold">
          프로필 설정이 모두 완료되었어요!
        </HeaderText>
        <BodyText size="typo4" weight="medium">
          이제 F-IT의 모든 서비스를 이용할 수 있어요.
        </BodyText>
        <BodyText size="typo4" weight="medium">
          마이페이지에서 포트폴리오를 업로드하여 내 강점을 어필해보세요!
        </BodyText>
      </ContentContainer>
      <ContinueButtonContainer>
        <Link href="/mypage">
          <Button variant="round" color="primary" height="70">
            포트폴리오 업로드 하러가기
          </Button>
        </Link>
      </ContinueButtonContainer>
    </Container>
  );
};
