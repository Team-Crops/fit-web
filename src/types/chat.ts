import type { User } from '.';

export interface ChatUser
  extends Pick<User, 'id' | 'positionId' | 'nickname' | 'profileImageUrl'> {}
