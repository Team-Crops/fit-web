import { Me, PolicyAgreement, SignUpStep } from '#/types';

export function checkSignUpStep(me: Me, policyAgreed?: PolicyAgreement[]): SignUpStep {
  if (policyAgreed && policyAgreed.some((p) => p.isAgreed === false)) {
    return SignUpStep.TERMS_AGREEMENT;
  } else if (!me.nickname) {
    return SignUpStep.PROFILE_CREATION;
  } else if (!me.positionId) {
    return SignUpStep.POSITION_SELECTION;
  } else if (!me.username || !me.email || !me.backgroundStatus) {
    return SignUpStep.PROFILE_DETAILS_SUBMISSION;
  } else if (me.projectCount === null || !me.regionId || !me.activityHour) {
    return SignUpStep.TIME_AVAILABILITY_SUBMISSION;
  } else if (!me.skillIdList?.length) {
    return SignUpStep.TOOL_AVAILABILITY_SUBMISSION;
  }
  return SignUpStep.COMPLETE;
}
