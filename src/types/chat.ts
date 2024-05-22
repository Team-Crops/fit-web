import type { MatchingUser, User } from '.';

export interface ChatUser
  extends Pick<User, 'id' | 'positionId' | 'nickname' | 'profileImageUrl'>,
    Partial<Pick<MatchingUser, 'isHost' | 'isReady'>> {}
