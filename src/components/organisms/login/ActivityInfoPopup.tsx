import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { User } from '#/entities/user';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { Icons } from '#atoms/Icons';
import { Select } from '#atoms/Select';
import { Txt } from '#atoms/Text';
import { RegionSelect } from '#molecules/RegionSelect';
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;

  width: 550px;
  color: #9e9e9e;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  height: 36px;
`;

const Spacer = styled.div``;

export const ActivityInfoPopup = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.auth.user);
  const [updateMeMutation, { isLoading, isSuccess, isError }] = useUpdateMeMutation();

  const goBackwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.ActivityInfo - 1 }));
  }, [dispatch]);
  const goForwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.ActivityInfo + 1 }));
  }, [dispatch]);

  useEffect(() => {}, [isLoading, isSuccess, isError]);

  return (
    <Container>
      <SignupProgressBar
        currentStep={3}
        totalStep={4}
        progressName="활동정보"
        onBackwardClick={() => goBackwardStep()}
        onForwardClick={
          [me?.projectCount, me?.regionId, me?.activityHour].every((v) => v !== undefined)
            ? () => goForwardStep()
            : undefined
        }
      />
      <TitleContainer>
        <Txt size="typo1" weight="bold">
          나의 프로젝트 경험과 활동 정보를 알려주세요
        </Txt>
        <Txt size="typo4" weight="medium" style={{ color: '#bdbdbd' }}>
          거의 다 왔어요. 조금만 더 화이팅! <Icons width={20} icon="emojiHoldingBackTears" />
        </Txt>
      </TitleContainer>
      <FormContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            프로젝트 경험 수
          </Txt>
          <StyledSelect
            value={me?.projectCount?.toString()}
            onChange={(e) => updateMeMutation({ projectCount: parseInt(e.target.value, 10) })}
          >
            {[...Array(4)].map((_, i, arr) => (
              <Select.Option key={i} value={i}>
                {i === 0 ? '없음' : i === arr.length - 1 ? `${i}회 이상` : `${i}회`}
              </Select.Option>
            ))}
          </StyledSelect>
        </InputContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            주 활동 지역
          </Txt>
          <RegionSelect
            value={me?.regionId}
            onChange={(e) => updateMeMutation({ regionId: parseInt(e.target.value, 10) })}
          />
        </InputContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            활동 가능 시간
          </Txt>
          <StyledSelect
            value={me?.activityHour}
            onChange={(e) => updateMeMutation({ activityHour: parseInt(e.target.value, 10) })}
          >
            {[3, 6, 12, 24].map((n) => (
              <Select.Option key={n} value={n}>
                {n}시간
              </Select.Option>
            ))}
          </StyledSelect>
        </InputContainer>
      </FormContainer>
      <Spacer />
      <Spacer />
    </Container>
  );
};
