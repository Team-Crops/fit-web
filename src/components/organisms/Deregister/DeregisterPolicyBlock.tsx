import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';
import { InfoDescription } from '#/components/molecules/Deregister/InfoDescription';

const StyledBlock = styled.div`
  margin-bottom: 20px;
  padding: 40px 30px 35px;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
`;
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;

  margin-bottom: 30px;
  padding: 30px 43px 24px;

  background-color: #fafafa;
  border-radius: 10px;
`;
const Textarea = styled.textarea`
  resize: none;

  width: 100%;
  height: 80px;
  padding: 10px;

  font-size: 0.8rem;
  font-weight: 400;
  line-height: 150%;
  color: #212121;
  letter-spacing: -0.8px;

  background-color: #fafafa;
  border-radius: 10px;
`;

export const DeregisterPolicyBlock = () => {
  return (
    <StyledBlock>
      <Txt size="typo5" weight="regular" color="#FF0800" marginBottom={11}>
        1. 탈퇴 시 회원 정보 및 개인형 서비스 이용 기록은 모두 삭제됩니다.
      </Txt>
      <Txt size="typo5" weight="regular" color="#616161" marginBottom={11}>
        2. 탈퇴 시 계정과 관련된 모든 권한이 사라지며, 복구할 수 없습니다.
      </Txt>
      <Txt size="typo5" weight="regular" color="#616161" marginBottom={7}>
        3. 탈퇴 시 직접 작성한 콘텐츠 및 데이터(회원 정보, 파일, 프로젝트 등)은 모두 자동으로
        삭제되며, 삭제된 콘텐츠 및 데이터는 복구할 수 없습니다.{`\n    `} 아래의 삭제되는 정보을
        확인하고, 필요한 콘텐츠 및 데이터는 미리 백업을 하시길 바랍니다.
      </Txt>
      <InfoBlock>
        <InfoDescription
          title={'회원 정보'}
          description={
            '이름, 닉네임, 학력/경력,  이메일, 전화번호, 나의 소개, 포지션, 활동지역, 프로젝트 경험 수, 활동가능 시간, 사용가능한 기술/툴'
          }
        />
        <InfoDescription title={'파일'} description={'포트폴리오 파일 및 링크'} />
        <InfoDescription
          title={'프로젝트'}
          description={`F-IT에서 진행했던 모든 프로젝트 내용이 사라집니다.\n(단, 함께 프로젝트를 진행했던 팀원에게는 탈퇴자의 프로필만 보이지 않을 뿐 내역이 남아있습니다.)`}
        />
      </InfoBlock>
      <Txt size="typo5" weight="regular" color="#616161" marginBottom={86}>
        4. 탈퇴 후 동일한 메일로 재가입이 가능하나, 탈퇴한 계정과 연동되지 않습니다. 새로운 프로필과
        회원 정보를 설정하셔야 서비스 이용이 가능합니다.
      </Txt>
      <Txt size="typo5" weight="regular" color="#616161" marginBottom={4}>
        🥲 마지막으로 떠나시는 이유를 알려주세요.
      </Txt>
      <Textarea />
    </StyledBlock>
  );
};
