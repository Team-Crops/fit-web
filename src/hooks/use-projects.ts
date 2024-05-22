import { useMemo } from 'react';

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

function convertDtoToProjects(dto: GetProjectsResponse): Project[] {
  return dto.projectList.map((project) => ({
    id: project.projectId,
    name: project.projectName,
    members: project.projectMemberList.map((member) => ({
      id: member.userId,
      nickname: member.nickname,
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
  const { data, mutate, ...others } = useSWR<GetProjectsResponse>(PROJECTS_QUERY_KEY, fitFetcher);
  const projects = useMemo(() => data && convertDtoToProjects(data), [data]);

  return {
    data: projects,
    ...others,
  };
}

export function useProjectQuery(id: Project['id'] | null) {
  const { data, mutate, ...others } = useSWR<GetProjectsResponse>(
    id === null ? null : PROJECTS_QUERY_KEY,
    fitFetcher
  );

  const project = useMemo(() => {
    if (!data) {
      return data;
    }
    const projects = convertDtoToProjects(data);
    return projects.find((p) => p.id === id);
  }, [data, id]);

  return {
    data: project,
    ...others,
  };
}

interface ProjectMutationArgs {
  status?: ProjectStatus;
  name?: string;
}

async function sendProjectsMutationRequest(
  url: string,
  { arg }: { arg: ProjectMutationArgs }
): Promise<Project> {
  const project = await fitFetcher<Project>(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectStatus: arg.status,
      projectName: arg.name,
    }),
  });
  return project;
}

export function useProjectMutator(id: Project['id']) {
  return useSWRMutation(PROJECTS_MUTATION_KEY(id), sendProjectsMutationRequest);
}
