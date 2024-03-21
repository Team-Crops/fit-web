'use client';

import { useCallback } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import {
  positionDesignerPic,
  positionMobileDeveloperPic,
  positionPlannerPic,
  positionServerDeveloperPic,
  positionWebDeveloperPic,
} from '#/assets/images';
import { positionPageBackground1, positionPageBackground2 } from '#/assets/images';
import { Txt } from '#/components/atoms/Text';
import { SignupProgressBar } from '#/components/molecules/SignupProgressBar';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useGetPositionsQuery } from '#/redux/features/skill-set/api';
import { useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 830px;
  height: 680px;

  border-radius: 15px;
  background: linear-gradient(180deg, #ffffff 0%, #fff2f1 91.5%, #ffeae9 100%);

  position: relative;
`;

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;
`;

const PositionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
`;

const PositionCard = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 1;

  width: 180px;
  height: 200px;

  border-radius: 20px;
  border: 1px solid ${({ selected }) => (selected ? '#ff706c' : '#fff')};
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  cursor: pointer;
  color: ${({ selected }) => (selected ? '#FF706C' : '#9e9e9e')};

  transition: 0.3s;
  &:hover {
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.2);
  }
`;

const PositionImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  width: 112px;
  height: 112px;
  background-color: #ffeae9;
  border-radius: 50%;
`;

const BackgroundImage1 = styled(Image)`
  position: absolute;
  top: 470px;
  left: 30px;

  width: 221px;
  height: 221px;
  transform: rotate(-15deg);

  filter: blur(1.5px);
`;

const BackgroundImage2 = styled(Image)`
  position: absolute;
  top: 200px;
  left: 750px;

  width: 69px;
  height: 69px;

  filter: blur(1px);
`;

const images = [
  positionPlannerPic,
  positionDesignerPic,
  positionWebDeveloperPic,
  positionServerDeveloperPic,
  positionMobileDeveloperPic,
];

export const PositionInfoPopup = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.user.me);
  const [updateMe] = useUpdateMeMutation();
  const { data: positions } = useGetPositionsQuery();

  const goBackwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.PositionInfo - 1 }));
  }, [dispatch]);
  const goForwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.PositionInfo + 1 }));
  }, [dispatch]);

  return (
    <Container>
      <SignupProgressBar
        current={1}
        total={4}
        progressName="포지션"
        onBackwardClick={() => goBackwardStep()}
        onForwardClick={me?.positionId ? () => goForwardStep() : undefined}
      />
      <Txt size="typo1" weight="bold">
        {me?.nickname}님의 포지션을 설정해주세요!
      </Txt>
      <PositionContainer>
        <PositionCards>
          {positions ? (
            positions.map(({ id, displayName }, index) => (
              <PositionCard
                key={id}
                selected={id === me?.positionId}
                onClick={() => updateMe({ positionId: id })}
              >
                <PositionImageContainer>
                  <Image src={images[index]} width={130} height={130} alt={displayName} />
                </PositionImageContainer>
                <Txt size="typo4" weight={id === me?.positionId ? 'bold' : 'medium'}>
                  {displayName}
                </Txt>
              </PositionCard>
            ))
          ) : (
            <div />
          )}
        </PositionCards>
      </PositionContainer>
      <div />

      <BackgroundImage1 src={positionPageBackground1} alt="" width={221} height={221} />
      <BackgroundImage2 src={positionPageBackground2} alt="" width={69} height={69} />
    </Container>
  );
};
