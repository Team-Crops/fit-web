import { User } from '#/types';

export const availableActivityHours: User['activityHour'][] = [3, 6, 12, 24];

export const nullUser: User = {
  id: -1,
  projectCount: null,
  activityHour: null,
  introduce: null,
  portfolioUrl: null,
  backgroundText: null,
  linkList: null,
  phoneNumber: null,
  positionId: null,
  regionId: null,
  backgroundStatus: null,
  nickname: null,
  skillIdList: null,
  profileImageUrl: null,
  email: null,
  status: null,
};

export const exampleUsers: User[] = [
  {
    ...nullUser,
    id: 1,
    introduce: '경험에서 우러나온 문제점을 해결하고 싶어요!',
    nickname: '예진',
    positionId: 1,
  },
  {
    ...nullUser,
    id: 2,
    nickname: '은진',
    positionId: 2,
    introduce: '사용자의 불편한 경험을 편안하게 해결하고 싶어요.',
  },
  {
    ...nullUser,
    id: 3,
    nickname: '나현',
    positionId: 2,
    introduce: '사용자의 니즈 실현과 편안한 플로우를 위해 고민하고 있어요!',
  },
  {
    ...nullUser,
    id: 4,
    nickname: '재웅',
    positionId: 3,
    introduce: '일상에서 느낀 불편한 점을 개발을 통해 개선하고 싶어요.',
  },
  {
    ...nullUser,
    id: 5,
    nickname: '세헌',
    positionId: 3,
    introduce: '사용자의 입장에서 함께 고민하며 개발하고 있습니다!',
  },
  {
    ...nullUser,
    id: 6,
    nickname: '준찬',
    positionId: 4,
    introduce: '좋은 프로덕트를 만들어서 사용자들에게 도움이 되고 싶어요!',
  },
  {
    ...nullUser,
    id: 7,
    nickname: '서린',
    positionId: 4,
    introduce: '많은 사람들에게 편리함을 제공하고, 신뢰할 수 있는 서비스를 만들고 싶어요.',
  },
];
