import { Txt } from '#/components/atoms';

export const MatchingChatHeader: React.FC = () => {
  return (
    <>
      <Txt size="typo3" weight="bold">
        현재 팀원
      </Txt>
      <Txt size="typo5" weight="medium" color="#ff908d">
        모든 팀원이 참여 상태여야 프로젝트를 시작할 수 있어요!
      </Txt>
    </>
  );
};
