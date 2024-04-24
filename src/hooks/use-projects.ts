import useSWR, { type KeyedMutator } from 'swr';

import { Project, ProjectStatus } from '#/types';
import { fitFetcher } from '#/utilities';

const PROJECTS_QUERY_KEY = '/v1/project';

interface GetProjectsResponse {
  projectList: {
    projectId: number;
    projectMemberList: {
      userId: number;
      username: string;
      positionId: number;
      profileImageUrl: string;
    }[];
    projectStatus: string;
    projectName: string;
    chatRoomId: number;

    createdAt: string;
    completedAt: string | null;
  }[];
}

function convertDtoToProjects(dto: GetProjectsResponse): Project[] {
  return dto.projectList.map((project) => ({
    id: project.projectId,
    name: project.projectName,
    members: project.projectMemberList.map((member) => ({
      id: member.userId,
      username: member.username,
      positionId: member.positionId,
      profileImageUrl: member.profileImageUrl,
    })),
    status: project.projectStatus as ProjectStatus,
    chatRoomId: project.chatRoomId,

    createdAt: project.createdAt,
    completedAt: project.completedAt,
  }));
}

export function useProjectsQuery() {
  const { data, ...others } = useSWR<GetProjectsResponse>(PROJECTS_QUERY_KEY, fitFetcher, {});
  return {
    data: data && convertDtoToProjects(data),
    ...others,
  };
}
