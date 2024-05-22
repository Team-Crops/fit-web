import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { fitFetch, fitFetcher } from '#/utilities';

const RECOMMEND_USER_KEY = '/v1/recommend/user';
const RECOMMEND_LIKE_USER_KEY = '/v1/recommend/like/user';

export interface RecommendUser {
  recommendUserList: {
    isLiked: boolean;
    userSummary: {
      introduce: string | null;
      positionId: number;
      profileImageUrl: string | null;
      skillIdList: number[] | null;
      userId: number;
      username: string;
    };
  }[];
}
export interface RecommendUserQueryArgs {
  positionId: number[] | null;
  skillId: number[] | null;
  backgroundStatus: string | null;
  regionId: number | null;
  projectCount: number | null;
  activityHour: number[] | null;
  liked: boolean;
  page: number;
}
async function sendPostRequest(url: string, { arg }: { arg: RecommendUserQueryArgs }) {
  let params = {};
  for (let [key, value] of Object.entries(arg)) {
    if (value !== null) {
      params = { ...params, [key]: value };
    }
  }
  const queryParams = new URLSearchParams(params);
  const fullUrl = `${url}?${queryParams}`;

  const requestOptions: RequestInit = {
    method: 'GET',
  };

  const response = await fitFetch(fullUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch pre-signed URL');
  }
  return (await response.json()) as RecommendUser;
}

export function useRecommendUserQuery() {
  return useSWRMutation<RecommendUser, any, typeof RECOMMEND_USER_KEY, RecommendUserQueryArgs>(
    RECOMMEND_USER_KEY,
    sendPostRequest
  );
}

interface RecommendLikeUserArgs {
  userId: number;
  like: boolean;
}
async function sendPostRequestLikeUser(url: string, { arg }: { arg: RecommendLikeUserArgs }) {
  const requestOptions: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg),
  };

  await fitFetch(url, requestOptions);
}
export function useRecommendLikeUserQuery() {
  return useSWRMutation(RECOMMEND_LIKE_USER_KEY, sendPostRequestLikeUser);
}
