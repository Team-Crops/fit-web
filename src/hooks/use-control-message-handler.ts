import { useRouter } from 'next/navigation';

import { mutate } from 'swr';

import { MatchingRoom, Project } from '#/types';
import { ControlMessage } from '#/types/message';
import { MATCHING_QUERY_KEY, PROJECTS_QUERY_KEY } from '.';

export function useControlMessageHandler({
  projectId,
  matchingId,
}: {
  projectId?: Project['id'];
  matchingId?: MatchingRoom['id'];
}) {
  const router = useRouter();
  return (message: ControlMessage) => {
    if (message.type === 'COMPLETE' && matchingId) {
      mutate(MATCHING_QUERY_KEY);
      router.replace(`/projects/${message.notice}`);
    }
    if (message.type === 'COMPLETE' && projectId) {
      mutate(PROJECTS_QUERY_KEY);
    }
  };
}
