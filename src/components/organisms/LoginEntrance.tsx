import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { SocialLoginButtons } from '#molecules/SocialLoginButtons';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  padding: 100px 250px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 15px;
  background: linear-gradient(180deg, #f0f3ff 0%, #fff 100%);
`;

const CrossButton = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  cursor: pointer;

  width: 50px;
  height: 50px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

interface LoginEntranceProps {
  onClose: () => void;
}

export const LoginEntrance = ({ onClose }: LoginEntranceProps) => (
  <Container>
    <CrossButton onClick={() => onClose()}>
      <Icons icon="cross" width={20} height={20} color="#BDBDBD" />
    </CrossButton>
    <Txt size="typo1" weight="bold">
      로그인
    </Txt>
    <div style={{ height: '30px' }} />
    <Txt size="typo4" weight="regular" style={{ color: '#BDBDBD' }}>
      F-it에 오신 것을 환영해요!
    </Txt>
    <Txt size="typo4" weight="regular" style={{ color: '#BDBDBD' }}>
      간편 로그인으로 서비스를 이용해보세요 😉
    </Txt>
    <div style={{ height: '65px' }} />
    <SocialLoginButtons />
  </Container>
);
