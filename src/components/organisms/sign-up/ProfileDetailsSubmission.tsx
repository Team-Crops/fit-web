import styled from '@emotion/styled';

import { Input, Label, Txt } from '#/components/atoms';
import { CareerSelect } from '#/components/molecules/CareerSelect';
import { Me, UserBackgroundStatus } from '#/types';
import { isUserStudent, isUserWorker, media } from '#/utilities';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;

  width: 100%;
  max-width: 580px;
  margin: auto;
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
  gap: 40px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

interface ProfileDetailsSubmissionProps {
  user: Me;

  onUserModified: (updated: Partial<Me>) => void;
}

export const ProfileDetailsSubmission: React.FC<ProfileDetailsSubmissionProps> = ({
  user,
  onUserModified,
}) => {
  return (
    <Container>
      <TitleContainer>
        <Txt size="typo1" weight="bold">
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
            value={user.username ?? ''}
            onChange={(e) => onUserModified({ username: e.target.value })}
          />
        </Label>
        <Label text="이메일">
          <Input
            variant="standard"
            typo="typo3"
            weight="medium"
            value={user.email ?? ''}
            onChange={(e) => onUserModified({ email: e.target.value })}
          />
        </Label>
        <Row>
          <Label text="학력/경력" style={{ flex: 1 }}>
            <CareerSelect
              value={user.backgroundStatus ?? ''}
              onChange={(e) =>
                onUserModified({ backgroundStatus: e.target.value as UserBackgroundStatus })
              }
            />
          </Label>
          {user.backgroundStatus && (
            <Label
              text={
                isUserStudent(user.backgroundStatus)
                  ? '학교명'
                  : isUserWorker(user.backgroundStatus)
                    ? '회사명'
                    : '그룹명'
              }
              style={{ flex: 1 }}
            >
              <Input
                variant="standard"
                typo="typo3"
                weight="medium"
                value={user.backgroundText ?? ''}
                onChange={(e) => onUserModified({ backgroundText: e.target.value })}
              />
            </Label>
          )}
        </Row>
      </SubmissionsContainer>

      <div />
    </Container>
  );
};
