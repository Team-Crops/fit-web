import styled from '@emotion/styled';

import { usePresignedUrlLazyQuery } from '#/hooks/use-file';
import { useMeMutation, useMeQuery } from '#/hooks/use-user';
import { useTempAuthStore } from '#/stores/tempAuth';
import { Me, User } from '#/types';
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

const checkRequiredValue = (tempUser: Me | null) => {
  if (tempUser === null) return false;
  if (tempUser.username === '' || tempUser.username === null) {
    alert('이름을 입력해주세요.');
    return false;
  } else if (tempUser.email === null) {
    alert('이메일을 입력해주세요.');
    return false;
  } else if (tempUser.nickname === '' || tempUser.nickname === null) {
    alert('닉네임을 입력해주세요.');
    return false;
  } else if (tempUser.backgroundStatus === null) {
    alert('학력/경력을 입력해주세요.');
    return false;
  } else if (tempUser.positionId === null) {
    alert('포지션을 선택해주세요.');
    return false;
  } else if (tempUser.projectCount === null) {
    alert('프로젝트 경험 수를 선택해주세요.');
    return false;
  } else if (tempUser.regionId === null) {
    alert('주 활동 지역을 선택해주세요.');
    return false;
  } else if (tempUser.activityHour === null) {
    alert('활동 가능 시간을 선택해주세요.');
    return false;
  } else if (tempUser.skillIdList === null || tempUser.skillIdList.length === 0) {
    alert('사용 가능한 기술/툴을 선택해주세요.');
    return false;
  } else {
    return true;
  }
};

const checkValidation = (user: User) => {
  if (user.email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return false;
    }
  }
  return true;
};

export const InfoEditSection = ({ handleEditing }: InfoEditSectionProps) => {
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const tempImage = useTempAuthStore((state) => state.tempProfileImage);
  const tempPortfolioFile = useTempAuthStore((state) => state.tempPortfolioFile);
  const initTempAuth = useTempAuthStore((state) => state.initTempAuth);

  const { data: me, mutate: mutateCachedMe } = useMeQuery();
  const { trigger: mutatePreSignedUrl } = usePresignedUrlLazyQuery();
  const { trigger: mutateUser } = useMeMutation();

  const submitModifyHandler = async () => {
    if (!tempUser || !checkRequiredValue(tempUser) || !checkValidation(tempUser)) {
      return;
    }
    let profileImageUrl = me?.profileImageUrl;
    let portfolioUrl = me?.portfolioUrl;
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
    } else if (tempPortfolioFile !== null && me?.portfolioUrl !== tempPortfolioFile.name) {
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
        profileImageUrl,
        portfolioUrl,
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
