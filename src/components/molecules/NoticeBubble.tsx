import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { useMatchingQuery } from '#/hooks/use-matching';
import { useMatchingRoomQuery } from '#/hooks/use-matching-room';
import { NoticeMessage } from '#/types';

interface NoticeBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  message: NoticeMessage;
}

export const NoticeBubble = ({ message }: NoticeBubbleProps) => {
  const router = useRouter();

  const { data: matching, mutate: mutateCachedMatching } = useMatchingQuery();
  const { mutate: mutateCachedRoom } = useMatchingRoomQuery(matching?.id);

  switch (message.messageType) {
    case 'JOIN':
    case 'EXIT':
    case 'READY':
      mutateCachedRoom();
      break;
    case 'COMPLETE':
      mutateCachedRoom();
      mutateCachedMatching();
      router.replace('/projects');
  }

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
