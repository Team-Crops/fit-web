import { Skill } from '#/entities/skill';

export interface Position {
  id: number;
  displayName: string;
  skillList: Skill[];
}
