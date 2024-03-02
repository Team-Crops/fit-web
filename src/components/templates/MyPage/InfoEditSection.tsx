import { Button } from '#atoms/Button';
import { ActivityEdit } from '#organisms/MyPage/ActivityEdit';
import { MemberInfoEdit } from '#organisms/MyPage/MemberInfoEdit';
import { PortfolioEdit } from '#organisms/MyPage/PortfolioEdit';
import styled from '@emotion/styled';

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

interface InfoEditSectionProps {
  handleEditing: () => void;
}

export const InfoEditSection = ({ handleEditing }: InfoEditSectionProps) => {
  return (
    <StyledSection>
      <MemberInfoEdit />
      <ActivityEdit />
      <PortfolioEdit />
      <ModifyButton variant={'round'} height={'70'} color={'primary'} onClick={handleEditing}>
        완료
      </ModifyButton>
    </StyledSection>
  );
};
