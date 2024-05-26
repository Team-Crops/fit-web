import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Project, ProjectStatus } from '#/types';
import { fitFetcher } from '#/utilities';

const PROJECTS_QUERY_KEY = '/v1/project';
const PROJECTS_MUTATION_KEY = (id: Project['id']) => `/v1/project/${id}`;

interface GetProjectsResponse {
  projectList: {
    projectId: number;
    projectMemberList: {
      userId: number;
      nickname: string;
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

export function useProjectsQuery() {
  return useSWR(PROJECTS_QUERY_KEY, async (url) => {
    const response = await fitFetcher<GetProjectsResponse>(url);
    return response.projectList.map((p) => ({
      id: p.projectId,
      name: p.projectName,
      members: p.projectMemberList.map((m) => ({
        id: m.userId,
        nickname: m.nickname,
        positionId: m.positionId,
        profileImageUrl: m.profileImageUrl,
      })),
      status: p.projectStatus as ProjectStatus,
      chatId: p.chatRoomId,

      createdAt: p.createdAt,
      completedAt: p.completedAt,
    })) as Project[];
  });
}

interface ProjectMutationArg {
  status?: ProjectStatus;
  name?: string;
}

export function useProjectMutator(id: Project['id']) {
  return useSWRMutation(
    PROJECTS_MUTATION_KEY(id),
    (url, { arg: { status, name } }: { arg: ProjectMutationArg }) =>
      fitFetcher<Project>(url, {
        method: 'PATCH',
        body: JSON.stringify({ projectStatus: status, projectName: name }),
      })
  );
}
