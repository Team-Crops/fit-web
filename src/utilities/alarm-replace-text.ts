import { AlarmCase } from '#/types';

export const alarmReplaceText = (alarmCase: AlarmCase) => {
  switch (alarmCase) {
    case 'FAILED_MATCHING':
      return {
        category: '랜덤매칭',
        main: '새로운 매칭을 시작하세요',
        sub: '충분한 팀원이 모이지 않아 매칭이 성사되지 않았습니다',
        link: '/matching',
      };
    case 'STARTED_PROJECT':
      return {
        category: '프로젝트',
        main: '프로젝트가 시작되었어요',
        sub: '팀원을 확인해보세요!',
        link: '/projects',
      };
    case 'START_PROJECT':
      return {
        category: '랜덤매칭',
        main: '프로젝트를 시작해주세요',
        sub: '대기방의 모든 인원이 참여상태입니다.',
        link: '/matching',
      };
    case 'NEW_MATCHING_ROOM':
      return {
        category: '랜덤매칭',
        main: '대기방이 생성되었어요',
        sub: '랜덤매칭이 성사되었습니다. 대기방을 확인해보세요!',
        link: '/matching',
      };
    case 'PROGRESS_MATCHING':
      return {
        category: '랜덤매칭',
        main: '매칭이 진행중이에요',
        sub: '',
        link: '/matching',
      };
    case 'FORCE_OUT':
      return {
        category: '랜덤매칭',
        main: '매칭방에서 강제퇴장 되었어요',
        sub: '새로운 랜덤매칭을 이용해주세요!',
        link: '/matching',
      };
    case 'NEW_MESSAGE_MATCHING':
      return {
        category: '랜덤매칭',
        main: '새로운 메시지가 있어요',
        sub: '확인해보세요!',
        link: '/matching',
      };
    case 'NEW_MESSAGE_PROJECT':
      return {
        category: '프로젝트',
        main: '새로운 메시지가 있어요',
        sub: '확인해보세요!',
        link: '/projects',
      };
    case 'REPORT':
      return {
        category: '신고',
        main: '신고가 접수되었어요',
        sub: '관리자 확인 후, 상대의 서비스 이용이 제한됩니다.',
      };
  }
};
