import { User } from './user';

export enum ProjectStatus {
  PROJECT_IN_PROGRESS = 'PROJECT_IN_PROGRESS',
  PROJECT_COMPLETE = 'PROJECT_COMPLETE',
}

export interface Project {
  id: number;
  name: string;
  members: Pick<User, 'id' | 'positionId' | 'username' | 'profileImageUrl'>[];
  status: ProjectStatus;
  chatRoomId: number;

  createdAt: string;
  completedAt: string | null;
}
