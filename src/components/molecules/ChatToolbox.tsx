import styled from '@emotion/styled';

import { Icons, Input } from '#/components/atoms';

export const ChatToolbox: React.FC = () => {
  return (
    <Container>
      <ToolIcon icon="image" size={36} />
      <TextInput
        placeholder="대기방의 팀원에게 메세지를 보내보세요"
        typo="typo5"
        weight="regular"
      />
      <SendIcon icon="upload" size={36} color="#ff908d" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  display: flex;
  gap: 10px;
  align-items: center;

  padding: 10px;

  background: #fafafa;
`;

const ToolIcon = styled(Icons)`
  cursor: pointer;

  padding: 12px;

  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TextInput = styled(Input)`
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 1000px;
`;

const SendIcon = styled(Icons)`
  cursor: pointer;

  position: absolute;
  right: 20px;

  background-color: #fff;
  border-radius: 50%;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;
