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
    getPositionSkills: build.query<SkillsResponse, { positionId: number }>({
      query: ({ positionId }) => ({
        url: `/v1/skill-set/position/${positionId}/skill`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useLazyGetPositionsQuery,
  useGetPositionSkillsQuery,
  useLazyGetPositionSkillsQuery,
} = skillSetApi;
export default skillSetApi;
