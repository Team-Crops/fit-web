import Link from 'next/link';

import styled from '@emotion/styled';

import { Txt, Icons, Toggle, Button, Tooltip } from '#/components/atoms';
import { useMeMutation, useMeQuery } from '#/hooks/use-user';
import { media } from '#/utilities';

interface SignUpCompletePopupProps {
  onCancel: () => void;
}

export const SignUpCompletePopup: React.FC<SignUpCompletePopupProps> = ({ onCancel }) => {
  const { data: me, mutate: mutateCachedMe } = useMeQuery();
  const { trigger: mutateMe, isMutating: isMutatingUser } = useMeMutation();

  return (
    <Container>
      <CloseButton icon="cross" color="#BDBDBD" onClick={() => onCancel()} size={16} />
      <ProfileVisibilityToggleContainer>
        <Tooltip text="다른 사용자들의 추천 목록에 프로필이 공개됩니다">
          <TooltipIcon icon="info" size={14} />
        </Tooltip>
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

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 830px;
  height: 680px;
  padding: 16px;

  background: #fff;
  border-radius: 15px;
`;

const CloseButton = styled(Icons)`
  cursor: pointer;

  position: absolute;
  top: 28px;
  left: 40px;

  padding: 8px;

  color: #bdbdbd;

  border-radius: 50%;

  transition: all 0.2s ease-in-out;

  &:hover {
    color: #757575;
    background-color: #e0e0e0;
  }

  ${media.small} {
    top: 16px;
    left: 16px;
  }
`;

const ProfileVisibilityToggleContainer = styled.div`
  position: absolute;
  top: 36px;
  right: 36px;

  display: flex;
  gap: 8px;
  align-items: center;

  ${media.small} {
    top: 16px;
    right: 16px;
  }
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
