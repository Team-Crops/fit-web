import { Position } from '#/entities/position';
import { Skill } from '#/entities/skill';
import { api } from '#/redux/api';

interface SkillsResponse {
  skillList: Skill[];
}

interface PositionsResponse {
  positionList: Position[];
}

const skillSetApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPositions: build.query<PositionsResponse, void>({
      query: () => ({
        url: '/v1/skill-set/position',
        method: 'GET',
      }),
    }),
    getSkills: build.query<SkillsResponse, void>({
      query: () => ({
        url: '/v1/skill-set/skill',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetPositionsQuery, useGetSkillsQuery } = skillSetApi;
export default skillSetApi;
