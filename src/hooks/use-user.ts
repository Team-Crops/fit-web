import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { User, UserBackgroundStatus } from '#/types/user';
import { fitFetch, fitFetcher } from '#/utilities/fetch';
import { RecommendUser } from './use-recommend';

export const USER_QUERY_KEY = '/v1/user';
const USER_MUTATE_KEY = '/v1/user';

interface UserQueryResponse extends User {}

export function useUserQuery() {
  return useSWR<UserQueryResponse>(USER_QUERY_KEY, fitFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
}

interface UserMutationArgs extends Partial<Omit<User, 'id' | 'status'>> {}
interface UserMutationResponse extends User {}

async function sendUserMutationRequest(url: string, { arg }: { arg: UserMutationArgs }) {
  const nullSafedArg = Object.fromEntries(
    Object.entries(arg).filter(([, value]) => value !== null)
  );
  const response = await fitFetch(url, { method: 'PATCH', body: JSON.stringify(nullSafedArg) });
  const json = await response.json();
  return json as UserMutationResponse;
}

export function useUserMutation() {
  return useSWRMutation<User, any, typeof USER_MUTATE_KEY, UserMutationArgs>(
    USER_MUTATE_KEY,
    sendUserMutationRequest,
    {
      onSuccess: (data) => mutate<User>(USER_QUERY_KEY, data),
    }
  );
}

export interface UserIdResponse {
  isLiked: boolean;
  userProfile: {
    id: number;
    projectCount: number | null;
    activityHour: number | null;
    introduce: string | null;
    portfolioUrl: string | null;
    phoneNumber: string | null;
    positionId: number | null;
    regionId: number | null;
    backgroundStatus: UserBackgroundStatus | null;
    nickname: string | null;
    skillIdList: number[] | null;
    profileImageUrl: string | null;
    email: string | null;
    status: string | null;
    education: string | null;
    linkList: { linkUrl: string; linkType: string }[] | null;
  };
}

export function useUserUserIdQuery(userId: number) {
  return useSWR<UserIdResponse>(`${USER_QUERY_KEY}/${userId}`, fitFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
}
