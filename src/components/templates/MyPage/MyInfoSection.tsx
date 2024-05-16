import { use, useCallback } from 'react';

import styled from '@emotion/styled';

import { useAuthStore } from '#/stores/auth';
import { useTempAuthStore } from '#/stores/tempAuth';
import { Button } from '#atoms/Button';
import { ActivityInformation } from '#organisms/MyPage/ActivityInformation';
import { MemberInformation } from '#organisms/MyPage/MemberInformation';
import { PolicyInformation } from '#organisms/MyPage/PolicyInformation';
import { PortfolioInformation } from '#organisms/MyPage/PortfolioInformation';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 19px;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const ModifyButton = styled(Button)`
  width: max-content;
  margin: 22px 0 130px auto;
`;

interface MyInfoSectionProps {
  handleEditing: () => void;
}
export const MyInfoSection = ({ handleEditing }: MyInfoSectionProps) => {
  const user = useAuthStore((state) => state.user);
  const setTempUser = useTempAuthStore((state) => state.setTempUser);

  const handleModify = useCallback(() => {
    if (user !== null) setTempUser(user);
    scrollTo(0, 0);
    handleEditing();
  }, [handleEditing, setTempUser, user]);

  return (
    <StyledSection>
      <MemberInformation />
      <ActivityInformation />
      <PortfolioInformation />
      <PolicyInformation />
      <ModifyButton variant={'round'} height={'70'} color={'primary'} onClick={handleModify}>
        수정하기
      </ModifyButton>
    </StyledSection>
  );
};
