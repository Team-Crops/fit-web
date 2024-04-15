'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Input } from '#/components/atoms/Input';
import { Label } from '#/components/atoms/Label';
import { Txt } from '#/components/atoms/Text';
import { CareerSelect } from '#/components/molecules/CareerSelect';
import { useUser } from '#/hooks/use-user';
import { useSignUpStore } from '#/stores/sign-up';
import { UserBackgroundStatus, isUserStudent, isUserWorker } from '#/types/user';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmissionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 550px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const ProfileDetailsSubmission = () => {
  const [details, setDetails] = useState<{
    username: string | null;
    email: string | null;
    backgroundStatus: UserBackgroundStatus | null;
    backgroundText: string | null;
  }>({
    username: null,
    email: null,
    backgroundStatus: null,
    backgroundText: null,
  });

  const { data: user, mutate: mutateUser, isError } = useUser();
  const setOnForward = useSignUpStore((store) => store.setOnForward);

  useEffect(() => {
    if (user) {
      setDetails({
        username: user.username ?? null,
        email: user.email ?? null,
        backgroundStatus: user.backgroundStatus ?? null,
        backgroundText: user.backgroundText ?? null,
      });
    }
  }, [user]);

  useEffect(() => {
    const { username, email, backgroundStatus, backgroundText } = details;

    if (username && email && backgroundStatus && backgroundText) {
      setOnForward(async () => {
        await mutateUser({ username, email, backgroundStatus, backgroundText });
        return !isError;
      });
    } else {
      setOnForward(null);
    }
  }, [details, isError, mutateUser, setOnForward]);

  return (
    <Container>
      <TitleContainer>
        <Txt size="typo1" weight="bold" marginBottom={20}>
          이름, 학력/경력, 이메일을 입력해주세요
        </Txt>
        <Txt size="typo4" weight="medium" color="#bdbdbd">
          필수 프로필 정보를 입력하면 서비스를 이용할 수 있어요!
        </Txt>
      </TitleContainer>

      <SubmissionsContainer>
        <Label text="이름">
          <Input
            variant="standard"
            typo="typo3"
            weight="medium"
            value={details.username ?? ''}
            onChange={(e) => setDetails({ ...details, username: e.target.value })}
          />
        </Label>
        <Label text="이메일">
          <Input
            variant="standard"
            typo="typo3"
            weight="medium"
            value={details.email ?? ''}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
        </Label>
        <Row>
          <Label text="학력/경력" style={{ flex: 1 }}>
            <CareerSelect
              value={details.backgroundStatus ?? ''}
              onChange={(e) =>
                setDetails({ ...details, backgroundStatus: e.target.value as UserBackgroundStatus })
              }
            />
          </Label>
          {details.backgroundStatus && (
            <Label
              text={
                isUserStudent(details.backgroundStatus)
                  ? '학교명'
                  : isUserWorker(details.backgroundStatus)
                    ? '회사명'
                    : '그룹명'
              }
              style={{ flex: 1 }}
            >
              <Input
                variant="standard"
                typo="typo3"
                weight="medium"
                value={details.backgroundText ?? ''}
                onChange={(e) => setDetails({ ...details, backgroundText: e.target.value })}
              />
            </Label>
          )}
        </Row>
      </SubmissionsContainer>

      <div />
    </Container>
  );
};
