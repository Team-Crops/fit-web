import useSWR from 'swr';

import { Skill } from '#/types';
import { Position } from '#/types/position';
import { fitFetcher } from '#/utilities/fetch';

const SKILL_QUERY_KEY = '/v1/skill-set/skill';
const POSITION_SKILLS_QUERY_KEY = (id: Position['id']) => `/v1/skill-set/position/${id}/skill`;

interface SkillsQueryResponse {
  skillList: {
    id: number;
    displayName: string;
  }[];
}

export function useSkillsQuery() {
  return useSWR(SKILL_QUERY_KEY, async (url) => {
    const response = await fitFetcher<SkillsQueryResponse>(url);
    return response.skillList as Skill[];
  });
}

interface PositionSkillsQueryResponse {
  skillList: {
    id: number;
    displayName: string;
  }[];
}

export function usePositionSkillsQuery(positionId?: number | null) {
  return useSWR(positionId ? POSITION_SKILLS_QUERY_KEY(positionId) : null, async (url) => {
    const response = await fitFetcher<PositionSkillsQueryResponse>(url);
    return response.skillList as Skill[];
  });
}
