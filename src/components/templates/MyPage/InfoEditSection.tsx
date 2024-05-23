import styled from '@emotion/styled';

import { uploadImageToS3, usePreSignedUrl } from '#/hooks/use-file';
import { useUserMutation } from '#/hooks/use-user';
import { useAuthStore } from '#/stores/auth';
import { useTempAuthStore } from '#/stores/tempAuth';
import { Button } from '#atoms/Button';
import { ActivityEdit } from '#organisms/MyPage/ActivityEdit';
import { MemberInfoEdit } from '#organisms/MyPage/MemberInfoEdit';
import { PortfolioEdit } from '#organisms/MyPage/PortfolioEdit';

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
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const tempImage = useTempAuthStore((state) => state.tempProfileImage);
  const tempPortfolioFile = useTempAuthStore((state) => state.tempPortfolioFile);
  const initTempAuth = useTempAuthStore((state) => state.initTempAuth);
  const { trigger: mutateUser } = useUserMutation();
  const { trigger: mutatePreSignedUrl } = usePreSignedUrl();

  const submitModifyHandler = async () => {
    let profileImageUrl = user?.profileImageUrl;
    let portfolioUrl: string | null = null;
    if (tempImage !== null) {
      const registerImage = await mutatePreSignedUrl({
        fileName: tempImage.name,
        fileDomain: 'PROFILE_IMAGE',
      });
      await uploadImageToS3(registerImage.preSignedUrl, tempImage);
      profileImageUrl = registerImage.fileKey;
    }
    if (user?.portfolioUrl !== null && tempPortfolioFile === null) {
      portfolioUrl = null;
    } else if (tempPortfolioFile !== null) {
      const registerPortfolio = await mutatePreSignedUrl({
        fileName: tempPortfolioFile.name,
        fileDomain: 'PORTFOLIO',
      });
      await uploadImageToS3(registerPortfolio.preSignedUrl, tempPortfolioFile);
      portfolioUrl = registerPortfolio.fileKey;
    }

    const mutated = await mutateUser({
      ...tempUser,
      profileImageUrl: profileImageUrl,
      portfolioUrl: portfolioUrl,
    });
    setUser(mutated);
    initTempAuth();
    handleEditing();
  };

  return (
    <StyledSection>
      <MemberInfoEdit />
      <ActivityEdit />
      <PortfolioEdit />
      <ModifyButton variant={'round'} height={'70'} color={'primary'} onClick={submitModifyHandler}>
        완료
      </ModifyButton>
    </StyledSection>
  );
};
