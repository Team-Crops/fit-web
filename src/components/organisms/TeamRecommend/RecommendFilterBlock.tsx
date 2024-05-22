import { useCallback, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Select } from '#/components/atoms/Select';
import { Txt } from '#/components/atoms/Text';
import { CareerSelect } from '#/components/molecules/CareerSelect';
import { PositionBadge } from '#/components/molecules/MyPage/PositionBadge';
import { Filter } from '#/components/molecules/TeamRecommend/Filter';
import { TechSelect } from '#/components/molecules/TeamRecommend/TechSelect';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useRecommendStore } from '#/stores/recommend';

interface DibsFilterProps {
  label: string;
  value: boolean;
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

  cursor: pointer;
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
  { label: '전체', value: false },
  { label: '찜만 보기', value: true },
];

const activityTimeList = ['3시간', '6시간', '12시간', '24시간'];
export const RecommendFilterBlock = () => {
  const { data: positionList } = usePositionsQuery();
  const { data: regions } = useRegionsQuery();
  const recommendFilter = useRecommendStore((state) => state.recommendFilter);
  const setRecommendFilter = useRecommendStore((state) => state.setRecommendFilter);
  const filterClear = useRecommendStore((state) => state.clear);

  const handleUpdateRecommendFilter = useCallback(
    (key: string, value: any) => {
      setRecommendFilter({ ...recommendFilter, [key]: value });
    },
    [recommendFilter, setRecommendFilter]
  );
  const handleSelectDibs = useCallback(
    (dibs: boolean) => () => {
      setRecommendFilter({ ...recommendFilter, liked: dibs });
    },
    [recommendFilter, setRecommendFilter]
  );
  const handlePositionClick = useCallback(
    (positionId: number) => () => {
      const tempPosition = recommendFilter.positionId ?? [];
      if (tempPosition.includes(positionId)) {
        handleUpdateRecommendFilter(
          'positionId',
          tempPosition.filter((p) => p !== positionId)
        );
      } else {
        handleUpdateRecommendFilter('positionId', [...tempPosition, positionId]);
      }
    },
    [handleUpdateRecommendFilter, recommendFilter.positionId]
  );
  const handleActivityTimeClick = useCallback(
    (activityTime: string) => () => {
      const inputTime = Number(activityTime.replace('시간', ''));
      const tempActivityTime = recommendFilter.activityHour ?? [];

      if (tempActivityTime.includes(inputTime)) {
        handleUpdateRecommendFilter(
          'activityHour',
          tempActivityTime.filter((p) => p !== inputTime)
        );
      } else {
        handleUpdateRecommendFilter('activityHour', [...tempActivityTime, inputTime]);
      }
    },
    [handleUpdateRecommendFilter, recommendFilter.activityHour]
  );

  return (
    <Block>
      <DibsFilter>
        {dibsFilter.map((dibs) => (
          <DibsBlock
            key={dibs.label}
            size="typo4"
            weight="bold"
            selected={recommendFilter.liked === dibs.value}
            onClick={handleSelectDibs(dibs.value)}
          >
            {dibs.label}
          </DibsBlock>
        ))}
      </DibsFilter>
      <InitFilterButton variant={'outlined'} height={'40'} color={'primary'} onClick={filterClear}>
        필터 초기화
      </InitFilterButton>
      <FilterGridBlock>
        <Filter title="포지션" titleWidth={206} fullColumn>
          <PositionWrapper>
            {positionList?.map((position) => (
              <PositionBadge
                key={position.id}
                position={position.displayName}
                selected={(recommendFilter.positionId ?? []).includes(position.id)}
                onClick={handlePositionClick(position.id)}
              />
            ))}
          </PositionWrapper>
        </Filter>
        <Filter title="사용 가능한 기술 툴" titleWidth={206} fullColumn>
          <TechSelect />
        </Filter>
        <Filter title="학력/경력" titleWidth={206}>
          <CareerSelect
            value={recommendFilter.backgroundStatus ?? ''}
            onChange={(e) => handleUpdateRecommendFilter('backgroundStatus', e.target.value)}
          />
        </Filter>
        <Filter title="프로젝트 경험 수" titleWidth={220}>
          <Select
            value={recommendFilter.projectCount ?? 0}
            onChange={(e) => handleUpdateRecommendFilter('projectCount', e.target.value)}
            width="130px"
            placeholder="선택하세요"
          >
            {[...Array(4)].map((_, i, arr) => (
              <Select.Option key={i} value={i}>
                {i === 0 ? '없음' : i === arr.length - 1 ? `${i}회 이상` : `${i}회`}
              </Select.Option>
            ))}
          </Select>
        </Filter>
        <Filter title="주 활동 지역" titleWidth={206}>
          <Select
            value={recommendFilter.regionId ?? 0}
            onChange={(e) => handleUpdateRecommendFilter('regionId', e.target.value)}
            width="130px"
            placeholder="선택하세요"
          >
            {regions?.map((region) => (
              <Select.Option key={region.id} value={region.id}>
                {region.displayName}
              </Select.Option>
            ))}
          </Select>
        </Filter>
        <Filter title="활동 가능 시간" titleWidth={220} direction="column">
          <PositionWrapper style={{ marginTop: '16px' }}>
            {activityTimeList.map((activityTime) => (
              <PositionBadge
                key={activityTime}
                position={activityTime}
                selected={(recommendFilter.activityHour ?? []).includes(
                  Number(activityTime.replace('시간', ''))
                )}
                onClick={handleActivityTimeClick(activityTime)}
              />
            ))}
          </PositionWrapper>
        </Filter>
      </FilterGridBlock>
    </Block>
  );
};
