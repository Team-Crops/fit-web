import { create } from 'zustand';

import { Project, ProjectStatus } from '#/types';

interface ProjectState {
  projects: Project[];
}

interface ProjectAction {
  setProjects: (projects: Project[] | ((projects: Project[]) => Project[])) => void;
}

export const useProjectStore = create<ProjectState & ProjectAction>((set, get) => ({
  projects: [
    {
      id: 1,
      name: 'Project 1',
      members: [],
      status: ProjectStatus.PROJECT_IN_PROGRESS,
      chatRoomId: 1,
      createdAt: '2023-11-01',
      completedAt: null,
    },
  ],

  setProjects: (projects) => {
    if (typeof projects === 'function') {
      set({ projects: projects(get().projects) });
    } else {
      set({ projects });
    }
  },
}));
