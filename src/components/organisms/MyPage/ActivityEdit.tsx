import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { Select } from '#atoms/Select';
import { BasicInfoEdit } from '#molecules/MyPage/BasicInfoEdit';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import { PositionBadge } from '#molecules/MyPage/PositionBadge';

const PositionBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;

  width: 90%;
  margin: 24px 0 0 8px;
`;
const FlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 32px;
`;

const positionList = ['기획자', '디자이너', '서버개발자', '웹 프론트 개발자', '앱 개발자'];
export const ActivityEdit = () => {
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const handlePositionClick = useCallback(
    (position: string) => () => {
      setSelectedPosition(position);
    },
    []
  );
  return (
    <MyInfoBlock title={'활동'}>
      <MyPageGridBlock>
        <BasicInfoEdit title={'활동명'} titleWidth={100} direction="column" essential>
          <PositionBlock>
            {positionList.map((position) => (
              <PositionBadge
                key={position}
                position={position}
                selected={position === selectedPosition}
                onClick={handlePositionClick(position)}
              />
            ))}
          </PositionBlock>
        </BasicInfoEdit>
        <FlexBlock>
          <BasicInfoEdit title={'프로젝트 경험 수'} titleWidth={172} essential>
            <Select width="130px" placeholder="선택하세요">
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
            </Select>
          </BasicInfoEdit>
          <BasicInfoEdit title={'주 활동 지역'} titleWidth={172} essential>
            <Select width="130px" placeholder="선택하세요">
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
            </Select>
          </BasicInfoEdit>
          <BasicInfoEdit title={'활동 가능 시간'} titleWidth={172} essential>
            <Select width="130px" placeholder="선택하세요">
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
            </Select>
          </BasicInfoEdit>
        </FlexBlock>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
