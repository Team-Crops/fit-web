import { create } from 'zustand';

import { RecommendUser, RecommendUserQueryArgs } from '#/hooks/use-recommend';

interface RecommendState {
  recommendUserList: RecommendUser['recommendUserList'];
  recommendFilter: Omit<RecommendUserQueryArgs, 'page'>;
  currentFilter: Omit<RecommendUserQueryArgs, 'page'>;
}

interface RecommendAction {
  setRecommendFilter: (filter: RecommendState['recommendFilter']) => void;
  setCurrentFilter: (filter: RecommendState['currentFilter']) => void;
  setRecommendUserList: (userList: RecommendState['recommendUserList']) => void;
  clear: () => void;
}

export const useRecommendStore = create<RecommendState & RecommendAction>((set) => ({
  recommendUserList: [],
  recommendFilter: {
    positionId: null,
    skillId: null,
    backgroundStatus: null,
    regionId: null,
    projectCount: null,
    activityHour: null,
    liked: false,
  },
  currentFilter: {
    positionId: null,
    skillId: null,
    backgroundStatus: null,
    regionId: null,
    projectCount: null,
    activityHour: null,
    liked: false,
  },

  setRecommendFilter: (filter) => set({ recommendFilter: filter }),
  setRecommendUserList: (userList) => set({ recommendUserList: userList }),
  setCurrentFilter: (filter) => set({ currentFilter: filter }),
  clear: () =>
    set({
      recommendFilter: {
        positionId: null,
        skillId: null,
        backgroundStatus: null,
        regionId: null,
        projectCount: null,
        activityHour: null,
        liked: false,
      },
      currentFilter: {
        positionId: null,
        skillId: null,
        backgroundStatus: null,
        regionId: null,
        projectCount: null,
        activityHour: null,
        liked: false,
      },
    }),
}));
