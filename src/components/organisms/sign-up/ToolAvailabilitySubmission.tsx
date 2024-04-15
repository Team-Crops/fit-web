import { useCallback, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Divider } from '#/components/atoms/Divider';
import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { Skill } from '#/entities/skill';
import { usePositions } from '#/hooks/use-positions';
import { useUser } from '#/hooks/use-user';
import { useSignUpStore } from '#/stores/sign-up';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 0 52px;

  @media (width <= 768px) {
    padding: 16px;
  }
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
  gap: 10px;
  align-items: end;

  width: calc(100% - 104px);
`;

const ToolsContainer = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

const PositionTabs = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 10px;
  padding: 10px;
`;

const PositionTab = styled(Button)<{ selected?: boolean; loading?: boolean }>`
  flex-grow: 1;
  color: ${({ selected }) => (selected ? '#ff706c' : '#9e9e9e')};
  background-color: ${({ loading }) => (loading ? '#f5f5f5' : 'transparent')};
  animation: ${({ loading }) =>
    loading ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'};

  &:hover {
    color: ${({ selected }) => (selected ? '#ff706c' : '#000000')};
    background-color: #f5f5f5;
  }
`;

const SkillsContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-content: flex-start;

  height: 220px;
  padding: 36px;
`;

const SkillButton = styled(Button)<{ loading?: boolean }>`
  padding: 10px 40px;

  ${({ loading }) =>
    loading &&
    css`
      width: 150px;
      background-color: #f5f5f5;
      border: none;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    `}
`;

export const ToolAvailabilitySubmission = () => {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const { data: positions, isLoading } = usePositions();
  const { data: user, mutate: mutateUser, isError } = useUser();

  const setOnForward = useSignUpStore((store) => store.setOnForward);

  const skillClickHandler = useCallback(
    (skillId: number) => {
      if (selectedSkills.includes(skillId)) {
        setSelectedSkills((prev) => prev.filter((id) => id !== skillId));
      } else {
        setSelectedSkills((prev) => [...prev, skillId]);
      }
    },
    [selectedSkills]
  );

  useEffect(() => {
    if (user?.skillIdList) {
      setSelectedSkills(user.skillIdList || []);
    }
  }, [user?.skillIdList]);

  useEffect(() => {
    if (positions && user?.positionId) {
      setSelectedPosition(user.positionId);
    }
  }, [positions, user?.positionId]);

  useEffect(() => {
    if (positions && selectedPosition) {
      setSkills(positions.find((position) => position.id === selectedPosition)?.skillList || []);
    }
  }, [positions, selectedPosition]);

  useEffect(() => {
    setOnForward(async () => {
      await mutateUser({ skillIdList: selectedSkills });
      return !isError;
    });
  }, [isError, mutateUser, selectedSkills, setOnForward]);

  return (
    <Container>
      <TitleContainer>
        <Txt size="typo1" weight="bold">
          사용 가능한 툴을 선택해주세요
        </Txt>
        <Txt size="typo4" weight="medium" color="#bdbdbd">
          마지막 항목이에요! <Icons icon="emojiFire" width={20} height={20} />
        </Txt>
      </TitleContainer>

      <SubmissionsContainer>
        <ToolsContainer>
          <PositionTabs>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <PositionTab
                    key={index}
                    variant="angular"
                    height="70"
                    color="primary"
                    disabled
                    loading
                  />
                ))
              : positions?.map((position) => (
                  <PositionTab
                    key={position.id}
                    variant="angular"
                    height="70"
                    color="primary"
                    selected={selectedPosition === position.id}
                    onClick={() => setSelectedPosition(position.id)}
                  >
                    <Txt
                      size="typo5"
                      weight={position.id === selectedPosition ? 'bold' : 'medium'}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {position.displayName}
                    </Txt>
                  </PositionTab>
                ))}
          </PositionTabs>
          <Divider style={{ margin: '0 10px', width: 'calc(100% - 20px)' }} />
          <SkillsContainer>
            {skills.map((skill) => (
              <SkillButton
                key={skill.id}
                onClick={() => skillClickHandler(skill.id)}
                variant="outlined"
                height="50"
                color={selectedSkills.includes(skill.id) ? 'primary' : 'secondary'}
              >
                <Txt size="typo5" weight={selectedSkills.includes(skill.id) ? 'medium' : 'regular'}>
                  {skill.displayName}
                </Txt>
              </SkillButton>
            ))}
          </SkillsContainer>
        </ToolsContainer>
        <Txt size="typo5" weight="regular" style={{ color: '#9e9e9e' }}>
          *다른 포지션의 툴도 선택할 수 있어요.
        </Txt>
      </SubmissionsContainer>
      <div />
    </Container>
  );
};
