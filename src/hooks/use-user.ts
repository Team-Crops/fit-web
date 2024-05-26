import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { ApiError, Me, User } from '#/types';
import { fitFetcher } from '#/utilities';

export const ME_QUERY_KEY = '/v1/user';
const ME_MUTATION_KEY = '/v1/user';
export const USER_QUERY_KEY = (id: User['id']) => `/v1/user/${id}`;

export function useMeQuery() {
  return useSWR<Me, ApiError>(ME_QUERY_KEY, fitFetcher, { dedupingInterval: 1000 * 60 * 10 });
}

interface MeMutationArg extends Partial<Omit<Me, 'id' | 'status'>> {}

export function useMeMutation() {
  return useSWRMutation(ME_MUTATION_KEY, async (url: string, { arg }: { arg: MeMutationArg }) => {
    const nullSafedArg = Object.fromEntries(
      Object.entries(arg).filter(([, value]) => value !== null)
    );
    return await fitFetcher<Me>(url, {
      method: 'PATCH',
      body: JSON.stringify(nullSafedArg),
    });
  });
}

export interface UserResponse {
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
    backgroundStatus: string | null;
    backgroundText: string | null;
    nickname: string | null;
    skillIdList: number[] | null;
    profileImageUrl: string | null;
    email: string | null;
    status: string | null;
    linkList: { linkUrl: string; linkType: string }[] | null;
  };
}

export function useUserQuery(id: User['id']) {
  return useSWR(USER_QUERY_KEY(id), async (url) => {
    const response = await fitFetcher<UserResponse>(url);
    return {
      isLiked: response.isLiked,
      ...response.userProfile,
    } as User;
  });
}
