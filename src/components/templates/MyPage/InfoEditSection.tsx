import styled from '@emotion/styled';

import { usePresignedUrlLazyQuery } from '#/hooks/use-file';
import { useMeMutation, useMeQuery } from '#/hooks/use-user';
import { useTempAuthStore } from '#/stores/tempAuth';
import { uploadFile } from '#/utilities/storage';
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
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const tempImage = useTempAuthStore((state) => state.tempProfileImage);
  const tempPortfolioFile = useTempAuthStore((state) => state.tempPortfolioFile);
  const initTempAuth = useTempAuthStore((state) => state.initTempAuth);

  const { data: me, mutate: mutateCachedMe } = useMeQuery();
  const { trigger: mutatePreSignedUrl } = usePresignedUrlLazyQuery();
  const { trigger: mutateUser } = useMeMutation();

  const submitModifyHandler = async () => {
    let profileImageUrl = me?.profileImageUrl;
    let portfolioUrl: string = '';
    if (tempImage !== null) {
      const registerImage = await mutatePreSignedUrl({
        fileName: tempImage.name,
        fileDomain: 'PROFILE_IMAGE',
      });
      await uploadFile({ preSignedUrl: registerImage.preSignedUrl, file: tempImage });
      profileImageUrl = registerImage.fileKey;
    }
    if (me?.portfolioUrl !== null && tempPortfolioFile === null) {
      portfolioUrl = '';
    } else if (tempPortfolioFile !== null) {
      const registerPortfolio = await mutatePreSignedUrl({
        fileName: tempPortfolioFile.name,
        fileDomain: 'PORTFOLIO',
      });
      await uploadFile({ preSignedUrl: registerPortfolio.preSignedUrl, file: tempPortfolioFile });
      portfolioUrl = registerPortfolio.fileKey;
    }

    mutateCachedMe(
      await mutateUser({
        ...tempUser,
        profileImageUrl: profileImageUrl,
        portfolioUrl: '',
      })
    );
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
