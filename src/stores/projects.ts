import { produce } from 'immer';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { emptyFetchState } from '#/entities/empty-fetch-state';
import { FetchState, Project } from '#/types';

interface ProjectsState {
  projects: FetchState<Project[]>;
}

interface ProjectsAction {
  setProjects: (projects: FetchState<Project[]>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: Project['id']) => void;
  clearProjects: () => void;
}

export const useProjectsStore = create<ProjectsState & ProjectsAction>((set) => ({
  projects: emptyFetchState,

  setProjects: (projects) =>
    set(
      produce((state: ProjectsState) => {
        state.projects = projects;
      })
    ),
  updateProject: (project) =>
    set(
      produce((state: ProjectsState) => {
        state.projects.data = [
          ...(state.projects.data?.filter((p) => p.id !== project.id) ?? []),
          project,
        ];
      })
    ),
  deleteProject: (id) =>
    set(
      produce((state: ProjectsState) => {
        state.projects.data = [...(state.projects.data?.filter((p) => p.id !== id) ?? [])];
      })
    ),
  clearProjects: () =>
    set(
      produce((state: ProjectsState) => {
        state.projects = emptyFetchState;
      })
    ),
}));

export const useProject = (id?: Project['id'] | null) => {
  return useProjectsStore(
    useShallow((state) => ({
      data: state.projects.data?.find((p) => p.id === id),
      isLoading: state.projects.isLoading,
      error: state.projects.error,
    }))
  );
};
