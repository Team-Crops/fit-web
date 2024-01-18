import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import styled from '@emotion/styled';

const SocialButton = styled(Button)`
  color: #616161;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    color: #212121;
  }
`;

const KakaoButton = styled(SocialButton)`
  background-color: #fbe80c;

  &:hover {
    background-color: #f7d30c;
  }
`;

const GoogleButton = styled(SocialButton)`
  background-color: #ffffff;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

interface Props {
  onSuccess: () => void;
  onFailure: () => void;
}

export const SocialLoginButtons = ({ onSuccess }: Props) => {
  return (
    <Column>
      <KakaoButton variant="angular" height="60" color="primary" onClick={onSuccess}>
        <Icons icon="kakao" width={27} height={25} />
        <div style={{ width: '18px' }} />
        <Txt size="typo4" weight="regular">
          카카오톡으로 로그인하기
        </Txt>
      </KakaoButton>
      <GoogleButton variant="angular" height="60" color="primary" onClick={onSuccess}>
        <Icons icon="google" width={32} height={32} />
        <div style={{ width: '18px' }} />
        <Txt size="typo4" weight="regular">
          구글 계정으로 로그인하기
        </Txt>
      </GoogleButton>
    </Column>
  );
};
