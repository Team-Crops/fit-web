import { useEffect, useState } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import { useShallow } from 'zustand/react/shallow';

import { useMeMutation, useMeQuery } from '#/hooks/use-user';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { Toggle } from '#atoms/Toggle';
import { Button } from '../atoms/Button';

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 830px;
  height: 680px;

  background: #fff;
  border-radius: 15px;
`;

const CloseButton = styled(Icons)`
  cursor: pointer;

  position: absolute;
  top: 20px;
  left: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;

  color: #bdbdbd;

  border-radius: 50%;

  transition: all 0.2s ease-in-out;

  &:hover {
    color: #757575;
    background-color: #e0e0e0;
  }

  @media (width <= 768px) {
    top: 16px;
    right: 16px;
  }
`;

const ProfileVisibilityToggleContainer = styled.div`
  position: absolute;
  top: 36px;
  right: 36px;

  display: flex;
  gap: 8px;
  align-items: center;
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  top: 28px;
  right: 0;

  padding: 8px;

  color: #fff;
  white-space: nowrap;

  opacity: ${({ show }) => (show ? 1 : 0)};
  background-color: #212121b2;
  border-radius: 5px;

  transition: opacity 0.2s ease-in-out;
`;

const TooltipIcon = styled(Icons)`
  cursor: pointer;
  color: #bdbdbd;
  transition: color 0.2s ease-in-out;

  :hover {
    color: #757575;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

interface SignUpCompletePopupProps {
  onCancel: () => void;
}

export const SignUpCompletePopup: React.FC<SignUpCompletePopupProps> = ({ onCancel }) => {
  const [showProfileVisibilityTooltip, setShowProfileVisibilityTooltip] = useState(false);

  const { data: me, mutate: mutateCachedMe } = useMeQuery();
  const { trigger: mutateMe, isMutating: isMutatingUser } = useMeMutation();

  return (
    <Container>
      <CloseButton icon="cross" size={20} color="#BDBDBD" onClick={() => onCancel()} />
      <ProfileVisibilityToggleContainer>
        <Tooltip show={showProfileVisibilityTooltip}>
          <Txt size="typo6" weight="regular">
            다른 사용자들의 추천 목록에 프로필이 공개됩니다.
          </Txt>
        </Tooltip>
        <TooltipIcon
          icon="info"
          size={14}
          onMouseOver={() => setShowProfileVisibilityTooltip(true)}
          onMouseLeave={() => setShowProfileVisibilityTooltip(false)}
        />
        <Txt size="typo5" weight="bold">
          내 프로필 공개
        </Txt>
        <Toggle
          checked={!!me?.isOpenProfile}
          disabled={isMutatingUser}
          onChange={async (e) =>
            mutateCachedMe(await mutateMe({ isOpenProfile: e.target.checked }))
          }
        />
      </ProfileVisibilityToggleContainer>

      <div />
      <ContentContainer>
        <Icons icon="emojiPartyingFace" size={64} />
        <Txt size="typo1" weight="bold">
          프로필 설정이 모두 완료되었어요!
        </Txt>
        <TextContainer>
          <Txt size="typo4" weight="medium" color="#bdbdbd">
            이제 F-IT의 모든 서비스를 이용할 수 있어요.
          </Txt>
          <Txt size="typo4" weight="medium" color="#bdbdbd">
            마이페이지에서 포트폴리오를 업로드하여 내 강점을 어필해보세요!
          </Txt>
        </TextContainer>
      </ContentContainer>
      <Link href="/mypage">
        <Button variant="round" height="70" color="primary" onClick={() => onCancel()}>
          포트폴리오 업로드 하러가기
        </Button>
      </Link>
    </Container>
  );
};
