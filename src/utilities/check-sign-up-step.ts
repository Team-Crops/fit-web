import { SignUpStep, User } from '#/types';

export function checkSignUpStep(user: User, policyAgreed: boolean): SignUpStep {
  if (!policyAgreed) {
    return SignUpStep.TERMS_AGREEMENT;
  } else if (!user.nickname) {
    return SignUpStep.PROFILE_CREATION;
  } else if (!user.positionId) {
    return SignUpStep.POSITION_SELECTION;
  } else if (!user.username || !user.email || !user.backgroundText || !user.backgroundStatus) {
    return SignUpStep.PROFILE_DETAILS_SUBMISSION;
  } else if (user.projectCount === null || !user.regionId || !user.activityHour) {
    return SignUpStep.TIME_AVAILABILITY_SUBMISSION;
  } else if (!user.skillIdList?.length) {
    return SignUpStep.TOOL_AVAILABILITY_SUBMISSION;
  }
  return SignUpStep.COMPLETE;
}
