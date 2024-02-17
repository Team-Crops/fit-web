import { Link } from './link';

export interface User {
  id: number;

  projectCount?: number;
  activityHours?: number;
  introduce?: string;
  portfolioUrl?: string;
  backgroundText?: string;
  isOpenPhoneNum?: boolean;
  linkList?: Link[];
  isOpenProfile?: boolean;
  phoneNumber?: string;
  positionId?: number;
  regionId?: number;
  backgroundStatus?: string;
  nickname?: string;
  skillIdList?: number[];
  profileImageUrl?: string;
  email?: string;
  status?: string;
  username?: string;
}
