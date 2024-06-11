import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

import { Position, Region, Skill, User, UserBackgroundStatus } from '#/types';
import { RecommendUser } from '#/types/recommend';
import { fitFetcher } from '#/utilities';

const RECOMMEND_USER_QUERY_KEY =
  (options: RecommendUserQueryOptions) =>
  (index: number, previousPageData: RecommendUser[] | null) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }

    const params: Record<string, string> = { page: index.toString() };
    for (const [key, value] of Object.entries(options)) {
      if (Array.isArray(value)) {
        if (value.length) {
          params[key] = value.join(',');
        }
      } else if (value !== null && value !== undefined) {
        params[key] = value.toString();
      }
    }
    const searchParams = new URLSearchParams(params);
    return `/v1/recommend/user?${searchParams}`;
  };

const RECOMMEND_LIKE_USER_MUTATION_KEY = '/v1/recommend/like/user';

export interface RecommendUserResponse {
  recommendUserList: {
    isLiked: boolean;
    userSummary: {
      introduce: string | null;
      positionId: number;
      profileImageUrl: string | null;
      skillIdList: number[] | null;
      userId: number;
      nickname: string;
    };
  }[];
}

export interface RecommendUserQueryOptions {
  positionIds?: Position['id'][];
  skillIds?: Skill['id'][];
  backgroundStatus?: UserBackgroundStatus;
  regionId?: Region['id'];
  projectCount?: User['projectCount'];
  activityHours?: User['activityHour'][];
  liked?: boolean;
}

export function useRecommendUserQuery(options: RecommendUserQueryOptions) {
  return useSWRInfinite(RECOMMEND_USER_QUERY_KEY(options), async (url) => {
    const response = await fitFetcher<RecommendUserResponse>(url);
    return response.recommendUserList.map((u) => ({
      id: u.userSummary.userId,
      nickname: u.userSummary.nickname,
      profileImageUrl: u.userSummary.profileImageUrl,
      positionId: u.userSummary.positionId,
      skillIdList: u.userSummary.skillIdList,
      introduce: u.userSummary.introduce,
      isLiked: u.isLiked,
    })) as RecommendUser[];
  });
}

interface RecommendLikeUserArg {
  userId: number;
  like: boolean;
}

export function useRecommendLikeUserMutation() {
  return useSWRMutation(
    RECOMMEND_LIKE_USER_MUTATION_KEY,
    async (url: string, { arg }: { arg: RecommendLikeUserArg }) => {
      await fitFetcher<null>(url, {
        method: 'POST',
        body: JSON.stringify({ userId: arg.userId, like: arg.like }),
      });
      return arg.like;
    }
  );
}
