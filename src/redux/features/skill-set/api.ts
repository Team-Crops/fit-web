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
    getPositions: build.query<Position[], void>({
      query: () => ({
        url: '/v1/skill-set/position',
        method: 'GET',
      }),
      transformResponse: (response: PositionsResponse) => response.positionList,
    }),
    getPositionSkills: build.query<SkillsResponse, { positionId: number }>({
      query: ({ positionId }) => ({
        url: `/v1/skill-set/position/${positionId}/skill`,
        method: 'GET',
      }),
    }),
    getSkills: build.query<Skill[], void>({
      query: () => ({
        url: '/v1/skill-set/skill',
        method: 'GET',
      }),
      transformResponse: (response: SkillsResponse) => response.skillList,
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useLazyGetPositionsQuery,
  useGetPositionSkillsQuery,
  useLazyGetPositionSkillsQuery,
  useGetSkillsQuery,
  useLazyGetSkillsQuery,
} = skillSetApi;
export default skillSetApi;
