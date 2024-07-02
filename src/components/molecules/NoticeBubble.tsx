import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { NoticeMessage } from '#/types';

interface NoticeBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  message: NoticeMessage;
}

export const NoticeBubble = ({ message }: NoticeBubbleProps) => {
  return (
    <Bubble>
      <Txt size="typo5" weight="regular" color="#616161">
        {message.notice}
      </Txt>
    </Bubble>
  );
};

const Bubble = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 5px 20px;

  background-color: #eee;
  border-radius: 20px;
`;
