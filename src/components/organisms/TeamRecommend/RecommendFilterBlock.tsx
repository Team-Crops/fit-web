import { useCallback, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Select } from '#/components/atoms/Select';
import { Txt } from '#/components/atoms/Text';
import { PositionBadge } from '#/components/molecules/MyPage/PositionBadge';
import { Filter } from '#/components/molecules/TeamRecommend/Filter';
import { TechSelect } from '#/components/molecules/TeamRecommend/TechSelect';

type filterValue = 'all' | 'dibs';
interface DibsFilterProps {
  label: string;
  value: filterValue;
}

const Block = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 456px;

  background-color: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
`;
const DibsFilter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  height: 78px;

  border-bottom: 2px solid #eee;
`;
const DibsBlock = styled(Txt)<{ selected: boolean }>`
  position: relative;
  bottom: -2px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 2px solid transparent;
  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 2px solid #ff706c;
    `}
`;
const InitFilterButton = styled(Button)`
  margin: 20px 40px 14px auto;
`;
const FilterGridBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 196px;
  padding: 0 231px 0 90px;
`;
const PositionWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const dibsFilter: DibsFilterProps[] = [
  { label: '전체', value: 'all' },
  { label: '찜만 보기', value: 'dibs' },
];

const positionList = [
  '기획자',
  '디자이너',
  '서버 개발자',
  '웹 프론트 개발자',
  'IOS 개발자',
  'Android 개발자',
];
const activityTimeList = ['3시간', '6시간', '12시간', '24시간'];
export const RecommendFilterBlock = () => {
  const [selectedDibs, setSelectedDibs] = useState<filterValue>('all');
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [selectedActivityTime, setSelectedActivityTime] = useState<string[]>([]);

  const handleSelectDibs = useCallback(
    (dibs: filterValue) => () => {
      setSelectedDibs(dibs);
    },
    []
  );
  const handlePositionClick = useCallback(
    (position: string) => () => {
      setSelectedPosition((prev) => {
        if (prev.includes(position)) {
          return prev.filter((p) => p !== position);
        }
        return [...prev, position];
      });
    },
    []
  );
  const handleActivityTimeClick = useCallback(
    (activityTime: string) => () => {
      setSelectedActivityTime((prev) => {
        if (prev.includes(activityTime)) {
          return prev.filter((p) => p !== activityTime);
        }
        return [...prev, activityTime];
      });
    },
    []
  );

  return (
    <Block>
      <DibsFilter>
        {dibsFilter.map((dibs) => (
          <DibsBlock
            key={dibs.value}
            size="typo4"
            weight="bold"
            selected={selectedDibs === dibs.value}
            onClick={handleSelectDibs(dibs.value)}
          >
            {dibs.label}
          </DibsBlock>
        ))}
      </DibsFilter>
      <InitFilterButton variant={'outlined'} height={'40'} color={'primary'}>
        필터 초기화
      </InitFilterButton>
      <FilterGridBlock>
        <Filter title="포지션" titleWidth={206} fullColumn>
          <PositionWrapper>
            {positionList.map((position) => (
              <PositionBadge
                key={position}
                position={position}
                selected={selectedPosition.includes(position)}
                onClick={handlePositionClick(position)}
              />
            ))}
          </PositionWrapper>
        </Filter>
        <Filter title="사용 가능한 기술 툴" titleWidth={206} fullColumn>
          <TechSelect />
        </Filter>
        <Filter title="학력/경력" titleWidth={206}>
          <Select width="130px" placeholder="선택하세요">
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
          </Select>
        </Filter>
        <Filter title="프로젝트 경험 수" titleWidth={220}>
          <Select width="130px" placeholder="선택하세요">
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
          </Select>
        </Filter>
        <Filter title="주 활동 지역" titleWidth={206}>
          <Select width="130px" placeholder="선택하세요">
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
          </Select>
        </Filter>
        <Filter title="활동 가능 시간" titleWidth={220} direction="column">
          <PositionWrapper style={{ marginTop: '16px' }}>
            {activityTimeList.map((activityTime) => (
              <PositionBadge
                key={activityTime}
                position={activityTime}
                selected={selectedActivityTime.includes(activityTime)}
                onClick={handleActivityTimeClick(activityTime)}
              />
            ))}
          </PositionWrapper>
        </Filter>
      </FilterGridBlock>
    </Block>
  );
};
