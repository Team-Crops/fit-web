import styled from '@emotion/styled';

import { Icons, Input } from '#/components/atoms';

export const TalkToolbox: React.FC = () => {
  return (
    <Container>
      <IconBox>
        <Icons icon="image" width={36} height={36} />
      </IconBox>
      <TextInput placeholder="대기방의 팀원에게 메세지를 보내보세요" />
      <SendButton icon="upload" width={50} height={50} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  display: flex;
  gap: 10px;

  padding: 30px;

  background: #fafafa;
`;

const IconBox = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;

  transition: all 0.3s;

  :hover {
    cursor: pointer;
    background-color: #fafafa;
  }
`;

const TextInput = styled(Input)`
  height: 60px;
  padding: 20px 30px;

  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.8px;

  background: #fff;
  border-radius: 100px;
`;

const SendButton = styled(Icons)`
  position: absolute;
  right: 35px;
  bottom: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;

  color: #ff908d;

  background: transparent;
  border-radius: 50%;

  transition: all 0.3s;

  :hover {
    cursor: pointer;
    color: #ff706c;
    background-color: #fafafa;
  }
`;
