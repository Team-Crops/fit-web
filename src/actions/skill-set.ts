import { Position } from '#/entities/position';
import { Skill } from '#/entities/skill';

interface GetPositionsResponse {
  positionList: {
    id: number;
    displayName: string;
    skillList: {
      id: number;
      displayName: string;
    }[];
  }[];
}

export async function getPositions(): Promise<Position[]> {
  const response = await fetch(`/v1/skill-set/position`);
  const json = (await response.json()) as GetPositionsResponse;
  return json.positionList;
}

interface GetSkillsResponse {
  skillList: {
    id: number;
    displayName: string;
  }[];
}

export async function getSkills(): Promise<Skill[]> {
  const response = await fetch(`/v1/skill-set/skill`);
  const json = (await response.json()) as GetSkillsResponse;
  return json.skillList;
}

interface GetPositionSkillsResponse {
  skillList: {
    id: number;
    displayName: string;
  }[];
}

export async function getPositionSkills(positionId: number): Promise<Skill[]> {
  const response = await fetch(`/v1/skill-set/position/${positionId}/skill`);
  const json = (await response.json()) as GetPositionSkillsResponse;
  return json.skillList;
}
