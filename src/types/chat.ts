import type { MatchingUser, Message, User } from '.';

export interface ChatUser
  extends Pick<User, 'id' | 'positionId' | 'nickname' | 'profileImageUrl'>,
    Partial<Pick<MatchingUser, 'isHost' | 'isReady'>> {}

export interface Chat {
  id: number;
  messages: Message[];
}
