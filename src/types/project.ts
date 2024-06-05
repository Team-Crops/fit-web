import type { User } from '.';

export enum ProjectStatus {
  PROJECT_IN_PROGRESS = 'PROJECT_IN_PROGRESS',
  PROJECT_COMPLETE = 'PROJECT_COMPLETE',
}

export enum ReportType {
  ESCAPE = 'ESCAPE',
  DIVE = 'DIVE',
  ETC = 'ETC',
}

export interface Project {
  id: number;
  name: string;
  members: ProjectUser[];
  status: ProjectStatus;
  chatId: number;

  createdAt: string;
  completedAt: string | null;
}

export interface ProjectUser
  extends Pick<User, 'id' | 'positionId' | 'nickname' | 'profileImageUrl'> {}
