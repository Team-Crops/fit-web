import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch } from '#/redux/hooks';
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
  gap: 16px;
`;

const CareerContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledSelect = styled(CareerSelect)`
  width: 100%;
  height: 36px;
`;

const Spacer = styled.div`
  flex: 0;
`;

export const PersonalInfoPopup = () => {
  const dispatch = useAppDispatch();
  const [updateMe, { error, isLoading, isSuccess, isError }] = useUpdateMeMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [career, setCareer] = useState('');
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    if (isLoading === false) {
      if (isSuccess) {
        dispatch(updateAuth({ step: AuthStep.PositionInfo }));
      }
      if (isError) {
        throw error;
      }
    }
  }, [dispatch, error, isError, isLoading, isSuccess]);

  return (
    <Container>
      <SignupProgressBar
        currentStep={2}
        totalStep={4}
        progressName="회원정보"
        onForwardClick={
          [name, email, career, groupName].every((v) => v !== undefined)
            ? () => {
                updateMe({
                  username: name,
                  email,
                  backgroundStatus: career,
                  backgroundText: groupName,
                });
              }
            : undefined
        }
        onBackwardClick={() => dispatch(updateAuth({ step: AuthStep.PositionInfo }))}
      />
      <TitleContainer>
        <Txt size="typo1" weight="bold">
          이름, 학력/경력, 이메일을 입력해주세요
        </Txt>
        <Txt size="typo4" weight="medium">
          필수 프로필 정보를 입력하면 서비스를 이용할 수 있어요!
        </Txt>
      </TitleContainer>
      <Spacer />
      <FormContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            이름
          </Txt>
          <StyledInput value={name} onChange={(e) => setName(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            이메일
          </Txt>
          <StyledInput value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputContainer>
        <CareerContainer>
          <InputContainer style={{ width: '50%' }}>
            <Txt size="typo5" weight="medium">
              학력/경력
            </Txt>
            <StyledSelect value={career} onChange={(e) => setCareer(e.target.value)} />
          </InputContainer>
          {career && (
            <InputContainer style={{ width: '50%' }}>
              <Txt size="typo5" weight="medium">
                {career.startsWith('highschool') || career.startsWith('university')
                  ? '학교명'
                  : '회사명'}
              </Txt>
              <StyledInput value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </InputContainer>
          )}
        </CareerContainer>
      </FormContainer>
      <Spacer />
      <Spacer />
    </Container>
  );
};
