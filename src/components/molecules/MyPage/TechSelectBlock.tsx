import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { usePositionsQuery } from '#/hooks/use-positions';
import { useTempAuthStore } from '#/stores/tempAuth';
import { Skill } from '#/types';
import { Txt } from '#atoms/Text';
import { PositionBadge } from './PositionBadge';

const TechContainer = styled.div`
  width: 449px;
  min-height: 178px;
  margin: 28px 0 0 8px;
  padding: 7px 20px;

  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 11px;
`;
const TechType = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;

  span {
    cursor: pointer;
    padding: 11px 5px;
  }
`;
const TechListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  padding: 20px 0 0;
`;

export const TechSelectBlock = () => {
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const setTempUser = useTempAuthStore((state) => state.setTempUser);
  const { data: positions } = usePositionsQuery();
  const [selectedPosition, setSelectedPosition] = useState<number>(0);
  const [skills, setSkills] = useState<Skill[]>([]);

  const handlePosition = useCallback(
    (positionId: number) => () => {
      setSelectedPosition(positionId);
    },
    []
  );

  const handleSkill = useCallback(
    (skillId: number) => () => {
      if (tempUser === null) return;
      if (tempUser.skillIdList === null) setTempUser({ ...tempUser, skillIdList: [skillId] });
      else
        setTempUser({
          ...tempUser,
          skillIdList: tempUser.skillIdList?.includes(skillId)
            ? tempUser.skillIdList.filter((id) => id !== skillId)
            : [...tempUser.skillIdList, skillId],
        });
    },
    [setTempUser, tempUser]
  );

  useEffect(() => {
    if (positions && selectedPosition) {
      setSkills(positions.find((position) => position.id === selectedPosition)?.skillList || []);
    }
  }, [positions, selectedPosition]);
  // init
  useEffect(() => {
    if (tempUser === null) return;
    setSelectedPosition(tempUser.positionId ?? 0);
  }, [tempUser]);

  if (tempUser === null) return;
  return (
    <TechContainer>
      <TechType>
        {positions?.map((position) => (
          <Txt
            key={position.id}
            size="typo6"
            weight={selectedPosition === position.id ? 'bold' : 'regular'}
            color={selectedPosition === position.id ? '#FF706C' : '#9E9E9E'}
            onClick={handlePosition(position.id)}
          >
            {position.displayName}
          </Txt>
        ))}
      </TechType>
      <TechListBlock>
        {skills.map((skill) => (
          <PositionBadge
            key={skill.id}
            position={skill.displayName}
            selected={tempUser.skillIdList?.includes(skill.id) ?? false}
            onClick={handleSkill(skill.id)}
          />
        ))}
      </TechListBlock>
    </TechContainer>
  );
};
