import { Txt } from '#/components/atoms/Text';
import { useAppSelector } from '#/redux/hooks';

export function MatchingTitle() {
  const nickname = useAppSelector((state) => state.user.me?.nickname);
  return (
    <>
      <Txt size="typo1" weight="bold">
        잠깐, {nickname} 님이 설정한 포지션과 기술/툴이 맞나요?
      </Txt>
      <Txt size="typo5" weight="regular" color="#9E9E9E">
        마이페이지에서 포지션과 사용가능한 기술/툴을 변경할 수 있습니다.
      </Txt>
    </>
  );
}
