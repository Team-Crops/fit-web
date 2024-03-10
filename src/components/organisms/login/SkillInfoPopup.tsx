'use client';

import { useCallback, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import {
  useGetPositionsQuery,
  useLazyGetPositionSkillsQuery,
} from '#/redux/features/skill-set/api';
import { useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch } from '#/redux/hooks';
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
  gap: 10px;

  padding: 10px;
`;

const PositionTab = styled(Button)<{ selected?: boolean; loading?: boolean }>`
  flex-grow: 1;

  animation: ${({ loading }) =>
    loading ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'};
  background-color: ${({ loading }) => (loading ? '#f5f5f5' : 'transparent')};
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

  overflow-y: scroll;
`;

const SkillButton = styled(Button)<{ loading?: boolean }>`
  padding: 10px 40px;

  ${({ loading }) =>
    loading &&
    css`
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      background-color: #f5f5f5;
      border: none;
      width: 150px;
    `}
`;

export const SkillInfoPopup = () => {
  const dispatch = useAppDispatch();

  const { data: positions, isLoading: isLoadingPositions } = useGetPositionsQuery();
  const [getPositionSkills, { data: skills, isFetching: isFetchingSkills }] =
    useLazyGetPositionSkillsQuery();
  const [updateMeMutation, { isSuccess: successUpdateMe }] = useUpdateMeMutation();

  const [selectedPosition, setSelectedPosition] = useState<number>();
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const skillClickHandler = useCallback(
    (skillId: number) => {
      if (selectedSkills.includes(skillId)) {
        setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
      } else {
        setSelectedSkills([...selectedSkills, skillId]);
      }
    },
    [selectedSkills]
  );

  const updateMySkills = useCallback(
    (skillIds: number[]) => updateMeMutation({ skillIdList: skillIds }),
    [updateMeMutation]
  );

  useEffect(() => {
    if (selectedPosition) {
      getPositionSkills({ positionId: selectedPosition });
    }
  }, [getPositionSkills, selectedPosition]);

  useEffect(() => {
    if (successUpdateMe) {
      dispatch(updateAuth({ step: AuthStep.SkillInfo + 1 }));
    }
  }, [dispatch, successUpdateMe]);

  return (
    <Container>
      <SignupProgressBar
        currentStep={4}
        totalStep={4}
        progressName="활동정보"
        onForwardClick={() => updateMySkills(selectedSkills)}
        onBackwardClick={() => dispatch(updateAuth({ step: AuthStep.SkillInfo - 1 }))}
      />
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
            {isLoadingPositions
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
              : positions?.positionList.map((position) => (
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
            {isFetchingSkills
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SkillButton
                    key={index}
                    variant="outlined"
                    height="50"
                    color="secondary"
                    disabled
                    loading
                  />
                ))
              : skills?.skillList.map((skill) => (
                  <SkillButton
                    key={skill.id}
                    onClick={() => skillClickHandler(skill.id)}
                    variant="outlined"
                    height="50"
                    color={selectedSkills.includes(skill.id) ? 'primary' : 'secondary'}
                  >
                    <Txt size="typo5" weight="medium">
                      {skill.displayName}
                    </Txt>
                  </SkillButton>
                ))}
          </SkillsContainer>
        </PositionTabContainer>
        <Txt size="typo5" weight="regular" style={{ color: '#9e9e9e' }}>
          *다른 포지션의 툴도 선택할 수 있어요.
        </Txt>
      </ContentsContainer>
      <div />
    </Container>
  );
};
