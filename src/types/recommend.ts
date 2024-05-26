import { User } from '.';

export interface RecommendUser
  extends Pick<
    User,
    'id' | 'nickname' | 'positionId' | 'introduce' | 'profileImageUrl' | 'skillIdList' | 'isLiked'
  > {}
