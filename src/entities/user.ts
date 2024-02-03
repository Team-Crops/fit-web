import { Contact } from './contact';

export interface User {
  id: number;
  profileImageUrl: string | null;
  username: string | null;
  nickname: string | null;
  phoneNumber: string | null;
  email: string | null;
  backgroundStatus: string | null;
  backgroundText: string | null;
  portfolioUrl: string | null;
  projectCount: number | null;
  activityHours: number | null;
  introduction: string | null;
  contacts: Contact[];
  positionId: number | null;
  regionId: number | null;
  skillIds: number[];
  status: string | null;
  isPublicPhoneNumber: boolean;
  isPublicProfile: boolean;
}
