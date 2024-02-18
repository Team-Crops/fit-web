'use client';

import { useEffect, useState } from 'react';
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
import { useMeQuery, useUpdateMeMutation } from '#/redux/features/user/api';
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

export const PositionInfoPopup = () => {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const { data: me } = useMeQuery();
  const [updateMe, { data: updatedMe }] = useUpdateMeMutation();

  const dispatch = useAppDispatch();
  const nickname = useAppSelector((state) => state.auth.user?.nickname);

  const positions = [
    { id: 0, image: positionPlannerPic, name: '기획자' },
    { id: 1, image: positionDesignerPic, name: '디자이너' },
    { id: 2, image: positionWebDeveloperPic, name: '웹 개발자' },
    { id: 3, image: positionServerDeveloperPic, name: '서버 개발자' },
    { id: 4, image: positionMobileDeveloperPic, name: '모바일 개발자' },
  ];

  useEffect(() => {
    if (me?.positionId) {
      setSelectedPosition(me.positionId);
    }
  }, [me]);

  useEffect(() => {
    if (me && updatedMe) {
      dispatch(
        updateAuth({
          user: { ...updatedMe, id: me.id },
          step: AuthStep.PositionInfo + 1,
        })
      );
    }
  }, [dispatch, me, updatedMe]);

  return (
    <Container>
      <SignupProgressBar
        currentStep={1}
        totalStep={4}
        progressName="포지션"
        onForwardClick={
          selectedPosition === null
            ? undefined
            : () => {
                if (selectedPosition) {
                  updateMe({ positionId: selectedPosition });
                }
              }
        }
        onBackwardClick={() => {
          dispatch(updateAuth({ step: AuthStep.PositionInfo - 1 }));
        }}
      />
      <Txt size="typo1" weight="bold">
        {nickname}님의 포지션을 설정해주세요!
      </Txt>
      <PositionContainer>
        <PositionCards>
          {positions.map(({ id, image, name }) => (
            <PositionCard
              key={id}
              selected={id === selectedPosition}
              onClick={() => setSelectedPosition(id === selectedPosition ? null : id)}
            >
              <PositionImageContainer>
                <Image src={image} width={130} height={130} alt={name} />
              </PositionImageContainer>
              <Txt size="typo4" weight={id === selectedPosition ? 'bold' : 'medium'}>
                {name}
              </Txt>
            </PositionCard>
          ))}
        </PositionCards>
      </PositionContainer>
      <div />

      <BackgroundImage1 src={positionPageBackground1} alt="" width={221} height={221} />
      <BackgroundImage2 src={positionPageBackground2} alt="" width={69} height={69} />
    </Container>
  );
};
