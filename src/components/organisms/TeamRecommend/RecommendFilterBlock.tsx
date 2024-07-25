import { Dispatch, SetStateAction, useCallback } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { Button } from '#/components/atoms/Button';
import { Select } from '#/components/atoms/Select';
import { CareerSelect } from '#/components/molecules/CareerSelect';
import { PositionBadge } from '#/components/molecules/MyPage/PositionBadge';
import { Filter } from '#/components/molecules/TeamRecommend/Filter';
import { TechSelect } from '#/components/molecules/TeamRecommend/TechSelect';
import { availableActivityHours } from '#/entities/user';
import { usePositionsQuery } from '#/hooks/use-positions';
import { RecommendUserQueryOptions } from '#/hooks/use-recommend';
import { useRegionsQuery } from '#/hooks/use-regions';
import { Position, UserBackgroundStatus } from '#/types';

const FilterTopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 75px;
  padding: 0 30px;

  background-color: #fff;
  border-bottom: 1px solid #eee;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
`;
const InitFilterButton = styled(Button)`
  border-radius: 50px;
`;
const FilterGridBlock = styled.div<{ isBorder?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 150px;
  padding: 40px 30px;
  ${({ isBorder }) => (isBorder ? 'border-bottom: 1px solid #eee;' : '')}
`;
const PositionWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const SubmitButton = styled(Button)`
  margin: 0 30px 20px;
`;

interface RecommendFilterBlockProps {
  options: RecommendUserQueryOptions;
  setOptions: Dispatch<SetStateAction<RecommendUserQueryOptions>>;
  trigger: (options: RecommendUserQueryOptions) => void;
}

export const RecommendFilterBlock = ({
  options,
  setOptions,
  trigger,
}: RecommendFilterBlockProps) => {
  const { data: positionList } = usePositionsQuery();
  const { data: regions } = useRegionsQuery();

  const handlePositionClick = useCallback(
    (positionId: Position['id']) => {
      return () => {
        setOptions((options) => {
          const positionIds = options.positionIds ?? [];
          if (positionIds.includes(positionId)) {
            return { ...options, positionIds: positionIds.filter((id) => id !== positionId) };
          } else {
            return { ...options, positionIds: [...positionIds, positionId] };
          }
        });
      };
    },
    [setOptions]
  );

  return (
    <Block>
      <FilterTopBlock>
        <Txt size="typo4" weight="bold">
          필터
        </Txt>
        <InitFilterButton
          variant={'outlined'}
          height={'40'}
          color={'secondary'}
          onClick={() => setOptions((opts) => ({ liked: opts.liked }))}
        >
          초기화
        </InitFilterButton>
      </FilterTopBlock>

      <FilterGridBlock isBorder>
        <Filter title="포지션" titleWidth={173} fullColumn>
          <PositionWrapper>
            {positionList?.map((position) => (
              <PositionBadge
                key={position.id}
                position={position.displayName}
                selected={options.positionIds?.includes(position.id) ?? false}
                onClick={handlePositionClick(position.id)}
              />
            ))}
          </PositionWrapper>
        </Filter>
        <Filter title="사용 가능한 기술 툴" titleWidth={173} fullColumn>
          <TechSelect options={options} setOptions={setOptions} />
        </Filter>
      </FilterGridBlock>
      <FilterGridBlock>
        <Filter title="학력/경력" titleWidth={173}>
          <CareerSelect
            value={options.backgroundStatus}
            onChange={(e) =>
              setOptions((opts) => ({
                ...opts,
                backgroundStatus: e.target.value as UserBackgroundStatus,
              }))
            }
            placeholder="선택하세요"
          />
        </Filter>
        <Filter title="프로젝트 경험 수" titleWidth={220}>
          <Select
            value={options.projectCount ?? undefined}
            onChange={(e) =>
              setOptions((opts) => ({ ...opts, projectCount: Number.parseInt(e.target.value) }))
            }
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

        <Filter title="활동 가능 시간" titleWidth={173}>
          <PositionWrapper>
            {availableActivityHours.map((value) => (
              <PositionBadge
                key={value}
                position={`${value}시간`}
                selected={options.activityHours?.includes(value) ?? false}
                onClick={() =>
                  setOptions((options) => {
                    const activityHours = options.activityHours ?? [];
                    if (activityHours.includes(value)) {
                      return {
                        ...options,
                        activityHours: activityHours.filter((h) => h !== value),
                      };
                    } else {
                      return { ...options, activityHours: [...activityHours, value] };
                    }
                  })
                }
              />
            ))}
          </PositionWrapper>
        </Filter>
        <Filter title="주 활동 지역" titleWidth={220}>
          <Select
            value={options.regionId}
            onChange={(e) =>
              setOptions((opts) => ({ ...opts, regionId: Number.parseInt(e.target.value) }))
            }
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
      </FilterGridBlock>
      <SubmitButton
        onClick={() => trigger(options)}
        variant={'round'}
        height={'50'}
        color={'primary'}
      >
        팀원 추천
      </SubmitButton>
    </Block>
  );
};
