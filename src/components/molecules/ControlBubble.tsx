import { useRouter } from 'next/navigation';

import { useMatchingQuery } from '#/hooks/use-matching';
import { useMatchingRoomQuery } from '#/hooks/use-matching-room';
import { ControlMessage } from '#/types';

export const ControlBubble = ({ message }: { message: ControlMessage }) => {
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
  return null;
};
