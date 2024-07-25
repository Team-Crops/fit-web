'use client';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { CheckBox } from '#/components/atoms/CheckBox';
import { Txt } from '#/components/atoms/Text';
import { DeregisterPolicyBlock } from '#/components/organisms/Deregister/DeregisterPolicyBlock';

const StyledSection = styled.section`
  width: 1200px;
  margin: 0 auto;
  padding: 130px 0 125px;
  white-space: pre-wrap;
`;
const ConsentBlock = styled.label`
  cursor: pointer;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;

  margin-bottom: 46px;
`;
const DeregisterButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;

export const DeregisterSection = () => {
  return (
    <StyledSection>
      <Txt size="typo1" weight="bold" color="#212121" marginBottom={19}>
        탈퇴 안내 사항
      </Txt>
      <Txt size="typo5" weight="medium" color="#616161" marginBottom={27}>
        서비스에 만족하지 못하셨나요? 탈퇴하기 전에 먼저 서비스 개선 요청을 해보는 것은 어떨까요?
        {`\n`}
        그래도 탈퇴하시겠다면 아래 안내사항을 꼭 확인해주세요!
      </Txt>
      <DeregisterPolicyBlock />
      <ConsentBlock htmlFor="consent">
        <CheckBox id="consent" />
        <Txt size="typo5" weight="regular" color="#616161">
          회원 탈퇴 안내사항을 모두 확인하였으며 동의합니다.
        </Txt>
      </ConsentBlock>
      <DeregisterButton variant={'angular'} height={'70'} color={'primary'}>
        탈퇴하기
      </DeregisterButton>
    </StyledSection>
  );
};
