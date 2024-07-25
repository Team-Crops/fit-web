import { Skill } from '#/types/skill';

export interface Position {
  id: number;
  displayName: string;
  skillList: Skill[];
  imageUrl: string;
}
