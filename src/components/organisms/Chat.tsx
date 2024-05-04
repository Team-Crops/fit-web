import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { ChatBubbles } from '#/components/molecules/ChatBubbles';
import { ChatToolbox } from '#/components/molecules/ChatToolbox';

export const Chat: React.FC = () => {
  return (
    <Container>
      <Header>
        <Txt size="typo4" weight="bold" color="#757575">
          채팅방
        </Txt>
      </Header>
      <ChatBubbles />
      <ChatToolbox />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  height: 100%;
  background-color: #fafafa;
`;

const Header = styled.div`
  width: 100%;
  padding: 32px 0 20px 28px;

  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 32px rgb(0 0 0 / 5%);
`;
