import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Label } from '#/components/atoms/Label';
import { Select } from '#/components/atoms/Select';
import { Txt } from '#/components/atoms/Text';
import { useRegionsQuery } from '#/hooks/use-regions';
import { User } from '#/types';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const SubmissionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

interface TimeAvailabilitySubmissionProps {
  user: User;

  onUserModified: (modified: Partial<User>) => void;
}

export const TimeAvailabilitySubmission: React.FC<TimeAvailabilitySubmissionProps> = ({
  user,
  onUserModified,
}) => {
  const { data: regions } = useRegionsQuery();
  return (
    <Container>
      <TitleContainer>
        <Txt size="typo1" weight="bold">
          나의 프로젝트 경험과 활동 정보를 알려주세요
        </Txt>
        <Txt size="typo4" weight="medium" color="#bdbdbd">
          거의 다 왔어요. 조금만 더 화이팅!{' '}
          <Icons icon="emojiHoldingBackTears" width={20} height={20} />
        </Txt>
      </TitleContainer>
      <SubmissionsContainer>
        <Label text="프로젝트 경험 수">
          <Select
            width="100%"
            value={user.projectCount ?? 0}
            onChange={(e) => onUserModified({ projectCount: parseInt(e.target.value, 10) })}
          >
            {[...Array(4)].map((_, i, arr) => (
              <Select.Option key={i} value={i}>
                {i === 0 ? '없음' : i === arr.length - 1 ? `${i}회 이상` : `${i}회`}
              </Select.Option>
            ))}
          </Select>
        </Label>
        <Label text="주 활동 지역">
          <Select
            width="100%"
            value={user.regionId ?? 0}
            onChange={(e) => onUserModified({ regionId: parseInt(e.target.value, 10) })}
          >
            {regions?.map((region) => (
              <Select.Option key={region.id} value={region.id}>
                {region.displayName}
              </Select.Option>
            ))}
          </Select>
        </Label>
        <Label text="활동 가능 시간">
          <Select
            width="100%"
            value={user.activityHour ?? 0}
            onChange={(e) => onUserModified({ activityHour: parseInt(e.target.value, 10) })}
          >
            {[3, 6, 12, 24].map((n) => (
              <Select.Option key={n} value={n}>
                {n}시간
              </Select.Option>
            ))}
          </Select>
        </Label>
      </SubmissionsContainer>
      <div />
    </Container>
  );
};
