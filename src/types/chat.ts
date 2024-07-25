import { fitSocket } from '#/utilities/socket';

import type { Matching, MatchingUser, Message, Project, ProjectUser, User } from '.';
export interface Chat {
  id: number;
  projectId?: Project['id'];
  matchingId?: Matching['id'];
  users: ChatUser[];
  messages: Message[];

  socket: ReturnType<typeof fitSocket>;
}

export interface ChatUser
  extends Pick<User, 'id' | 'positionId' | 'nickname' | 'profileImageUrl'>,
    Partial<Pick<MatchingUser, 'isHost' | 'isReady'>>,
    Partial<Pick<ProjectUser, 'isReportable'>> {}
