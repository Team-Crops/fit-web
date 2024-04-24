import useSWR from 'swr';

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
  const { data, ...others } = useSWR<SkillsQueryResponse>(SKILL_QUERY_KEY, fitFetcher, {});
  return { data: data?.skillList, ...others };
}

interface PositionSkillsQueryResponse {
  skillList: {
    id: number;
    displayName: string;
  }[];
}

export function usePositionSkillsQuery(positionId: number | null) {
  const { data, ...others } = useSWR<PositionSkillsQueryResponse>(
    positionId ? POSITION_SKILLS_QUERY_KEY(positionId) : null,
    fitFetcher,
    {}
  );
  return { data: data?.skillList, ...others };
}
