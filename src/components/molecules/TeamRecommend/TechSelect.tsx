import { Dispatch, SetStateAction, useState } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { Icons } from '#/components/atoms/Icons';
import { RecommendUserQueryOptions } from '#/hooks/use-recommend';
import { useSkillsQuery } from '#/hooks/use-skills';
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

interface TechSelectProps {
  options: RecommendUserQueryOptions;
  setOptions: Dispatch<SetStateAction<RecommendUserQueryOptions>>;
}

export const TechSelect = ({ options, setOptions }: TechSelectProps) => {
  const [openSelectBlock, setOpenSelectBlock] = useState(false);

  const { data: skills } = useSkillsQuery();

  return (
    <TechSelectContainer>
      <TechSelectButton
        onClick={() => {
          setOpenSelectBlock(!openSelectBlock);
        }}
      >
        {options.skillIds?.map((id) => {
          const skill = skills?.find((s) => s.id === id);
          if (!skill) return null;
          return (
            <TechBadge key={skill.id} size={'typo6'} weight={'regular'} color="#FF706C">
              {skill.displayName}
            </TechBadge>
          );
        })}
        <ArrowIcon icon={'arrowDown'} width={12} height={12} />
      </TechSelectButton>
      {openSelectBlock && (
        <TechSelectWrapper>
          <TechSelectBlock
            value={options.skillIds ?? []}
            onTechClick={(skillId) => {
              setOptions((options) => {
                const skillIds = options.skillIds ?? [];
                if (skillIds.includes(skillId)) {
                  return { ...options, skillIds: skillIds.filter((id) => id !== skillId) };
                } else {
                  return { ...options, skillIds: [...skillIds, skillId] };
                }
              });
            }}
          />
        </TechSelectWrapper>
      )}
    </TechSelectContainer>
  );
};
