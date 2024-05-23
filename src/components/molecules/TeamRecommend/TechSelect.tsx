import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { Icons } from '#/components/atoms/Icons';
import { useSkillsQuery } from '#/hooks/use-skills';
import { useRecommendStore } from '#/stores/recommend';
import { TechSelectBlock } from '../MyPage/TechSelectBlock';

const TechSelectContainer = styled.div`
  position: relative;
`;
const TechSelectButton = styled.div`
  cursor: pointer;

  position: relative;
  z-index: 2;

  display: flex;
  gap: 8px;
  align-items: center;

  width: 676px;
  height: 30px;
  margin-bottom: 35px;

  background: #fff;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
`;
const ArrowIcon = styled(Icons)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
const TechSelectWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  left: -8px;
`;
const TechBadge = styled(Txt)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 19px;
  padding: 0 17px;

  background: #ffeae9;
  border-radius: 33px;
`;

export const TechSelect = () => {
  const { data: skills } = useSkillsQuery();
  const recommendFilter = useRecommendStore((state) => state.recommendFilter);
  const setRecommendFilter = useRecommendStore((state) => state.setRecommendFilter);
  const [openSelectBlock, setOpenSelectBlock] = useState(false);

  const onChangeSkillList = useCallback(
    (value: number) => {
      if (recommendFilter === null) return;
      if (recommendFilter.skillId === null)
        setRecommendFilter({ ...recommendFilter, skillId: [value] });
      else
        setRecommendFilter({
          ...recommendFilter,
          skillId: recommendFilter.skillId?.includes(value)
            ? recommendFilter.skillId.filter((id) => id !== value)
            : [...recommendFilter.skillId, value],
        });
    },
    [recommendFilter, setRecommendFilter]
  );

  return (
    <TechSelectContainer>
      <TechSelectButton
        onClick={() => {
          setOpenSelectBlock(!openSelectBlock);
        }}
      >
        {recommendFilter.skillId &&
          recommendFilter.skillId.map((skillId) => {
            const skill = skills?.find((v) => v.id === skillId);
            if (skill === undefined) return;
            return (
              <TechBadge key={skill.id} size={'typo6'} weight={'regular'} color="#FF706C">
                {skill?.displayName}
              </TechBadge>
            );
          })}
        <ArrowIcon icon={'arrowDown'} width={12} height={12} />
      </TechSelectButton>
      {openSelectBlock && (
        <TechSelectWrapper>
          <TechSelectBlock value={recommendFilter.skillId ?? []} onChange={onChangeSkillList} />
        </TechSelectWrapper>
      )}
    </TechSelectContainer>
  );
};
