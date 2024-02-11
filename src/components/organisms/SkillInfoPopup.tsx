'use client';

import { useState } from 'react';

import styled from '@emotion/styled';

import { Position } from '#/entities/position';
import { Skill } from '#/entities/skill';
import { useGetPositionsQuery, useGetSkillsQuery } from '#/redux/features/skill-set/api';
import { Button } from '#atoms/Button';
import { Divider } from '#atoms/Divider';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { SignupProgressBar } from '#molecules/SignupProgressBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 830px;
  height: 680px;

  border-radius: 15px;
  background: #ffffff;

  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
`;

const PositionTabContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

const PositionTabs = styled.div`
  display: flex;
`;

const PositionTab = styled(Button)<{ selected: boolean }>`
  margin: 10px;
  padding: 10px 0;
  flex-grow: 1;

  background-color: transparent;
  color: ${({ selected }) => (selected ? '#ff706c' : '#9e9e9e')};

  &:hover {
    background-color: #f5f5f5;
    color: ${({ selected }) => (selected ? '#ff706c' : '#000000')};
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 30px;

  width: 720px;

  padding: 36px;
  height: 220px;
`;

const SkillButton = styled(Button)`
  padding: 10px 40px;
`;

export const SkillInfoPopup = () => {
  // const { data: positions, isLoading: isLoadingPositions } = useGetPositionsQuery();
  const positions: { positionList: Position[] } = {
    positionList: [
      {
        id: 1,
        displayName: '기획자',
        skillList: [],
      },
      {
        id: 2,
        displayName: '디자이너',
        skillList: [],
      },
      {
        id: 3,
        displayName: '서버 개발자',
        skillList: [],
      },
      {
        id: 4,
        displayName: '웹 프론트 개발자',
        skillList: [],
      },
      {
        id: 5,
        displayName: '앱 개발자',
        skillList: [],
      },
    ],
  };
  // const { data: skills, isLoading: isLoadingSkills } = useGetSkillsQuery();
  const skills: { skillList: Skill[] } = {
    skillList: [
      {
        id: 1,
        displayName: 'Figma',
      },
      {
        id: 2,
        displayName: 'Photoshop',
      },
      {
        id: 3,
        displayName: 'Illustrator',
      },
      {
        id: 4,
        displayName: 'Zeplin',
      },
      {
        id: 5,
        displayName: 'Photoshop',
      },
      {
        id: 6,
        displayName: 'Adobe XD',
      },
    ],
  };
  const [selectedPosition, setSelectedPosition] = useState<number>();
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const skillClickHandler = (skillId: number) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  return (
    <Container>
      <SignupProgressBar currentStep={4} totalStep={4} progressName="활동정보" />
      <HeaderContainer>
        <Txt size="typo1" weight="bold">
          사용 가능한 툴을 선택해주세요
        </Txt>
        <Txt size="typo4" weight="medium" style={{ color: '#bdbdbd' }}>
          마지막 항목이에요! <Icons width={20} icon="emojiFire" />
        </Txt>
      </HeaderContainer>
      <ContentsContainer>
        <PositionTabContainer>
          <PositionTabs>
            {positions?.positionList.map((position) => (
              <PositionTab
                key={position.id}
                variant="angular"
                height="70"
                color="primary"
                selected={selectedPosition === position.id}
                onClick={() => setSelectedPosition(position.id)}
              >
                <Txt size="typo5" weight={position.id === selectedPosition ? 'bold' : 'medium'}>
                  {position.displayName}
                </Txt>
              </PositionTab>
            ))}
          </PositionTabs>
          <Divider style={{ margin: '0 10px', width: 'calc(100% - 20px)' }} />
          <SkillsContainer>
            {skills?.skillList.map((skill) => (
              <SkillButton
                key={skill.id}
                onClick={() => skillClickHandler(skill.id)}
                variant="angular"
                height="50"
                color={selectedSkills.includes(skill.id) ? 'primary' : 'secondary'}
              >
                {skill.displayName}
              </SkillButton>
            ))}
          </SkillsContainer>
        </PositionTabContainer>
        <Txt size="typo5" weight="regular" style={{ color: '#9e9e9e' }}>
          *다른 포지션의 툴도 선택할 수 있어요.
        </Txt>
      </ContentsContainer>
    </Container>
  );
};
