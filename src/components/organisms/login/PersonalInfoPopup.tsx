import { useCallback, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import _ from 'lodash';

import { UserBackgroundStatus, isUserStudent, isUserWorker } from '#/entities/user';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { type UserUpdateRequest, useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { Input } from '#atoms/Input';
import { Txt } from '#atoms/Text';
import { CareerSelect } from '#molecules/CareerSelect';
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
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const InputLabel = styled(Txt)`
  color: #9e9e9e;
`;

const CareerContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledCareerSelect = styled(CareerSelect)`
  width: 100%;
  height: 36px;
`;

const Spacer = styled.div`
  flex: 0;
`;

export const PersonalInfoPopup = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.user.me);
  const [updateMe] = useUpdateMeMutation();

  const [username, setUsername] = useState(me?.username);
  const [email, setEmail] = useState(me?.email);
  const [backgroundText, setBackgroundText] = useState(me?.backgroundText);

  const goBackwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.PersonalInfo - 1 }));
  }, [dispatch]);
  const goForwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.PersonalInfo + 1 }));
  }, [dispatch]);

  const debouncedUpdateMe = useMemo(
    () =>
      _.debounce((arg: UserUpdateRequest) => {
        updateMe(arg);
      }, 500),
    [updateMe]
  );

  return (
    <Container>
      <SignupProgressBar
        current={2}
        total={4}
        progressName="회원정보"
        onBackwardClick={() => goBackwardStep()}
        onForwardClick={
          [me?.username, me?.email, me?.backgroundStatus, me?.backgroundText].every(
            (v) => v !== undefined
          )
            ? () => goForwardStep()
            : undefined
        }
      />
      <TitleContainer>
        <Txt size="typo1" weight="bold">
          이름, 학력/경력, 이메일을 입력해주세요
        </Txt>
        <Txt size="typo4" weight="medium" color="#bdbdbd">
          필수 프로필 정보를 입력하면 서비스를 이용할 수 있어요!
        </Txt>
      </TitleContainer>
      <Spacer />
      <FormContainer>
        <InputContainer>
          <InputLabel size="typo5" weight="medium">
            이름
          </InputLabel>
          <StyledInput
            variant="standard"
            typo="typo3"
            weight="medium"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              debouncedUpdateMe({ username: e.target.value });
            }}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel size="typo5" weight="medium">
            이메일
          </InputLabel>
          <StyledInput
            variant="standard"
            typo="typo3"
            weight="medium"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              debouncedUpdateMe({ email: e.target.value });
            }}
          />
        </InputContainer>
        <CareerContainer>
          <InputContainer style={{ width: '50%' }}>
            <InputLabel size="typo5" weight="medium">
              학력/경력
            </InputLabel>
            <StyledCareerSelect
              value={me?.backgroundStatus}
              onChange={(e) =>
                updateMe({ backgroundStatus: e.target.value as UserBackgroundStatus })
              }
            />
          </InputContainer>
          {me?.backgroundStatus && (
            <InputContainer style={{ width: '50%' }}>
              <InputLabel size="typo5" weight="medium">
                {isUserStudent(me.backgroundStatus)
                  ? '학교명'
                  : isUserWorker(me.backgroundStatus)
                    ? '회사명'
                    : '그룹명'}
              </InputLabel>
              <StyledInput
                variant="standard"
                typo="typo3"
                weight="medium"
                value={backgroundText}
                onChange={(e) => {
                  setBackgroundText(e.target.value);
                  debouncedUpdateMe({
                    backgroundStatus: me?.backgroundStatus,
                    backgroundText: e.target.value,
                  });
                }}
              />
            </InputContainer>
          )}
        </CareerContainer>
        <Spacer />
      </FormContainer>
      <Spacer />
      <Spacer />
    </Container>
  );
};
