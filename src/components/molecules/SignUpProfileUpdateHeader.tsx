'use client';

import { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { useSignUpStore } from '#/stores/sign-up';
import { SignUpStep } from '#/types/sign-up-step';
import { ProgressBar, ProgressBarProps } from '#molecules/ProgressBar';

const StyledProgressBar = styled(ProgressBar)`
  overflow: hidden;
  border-radius: 15px 15px 0 0;
`;

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 100%;
  padding-bottom: 52px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 0 40px;
`;

const IconButton = styled(Icons)<{ disabled: boolean }>`
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;

  padding: 8px 16px;

  color: #ff706c;

  background: #fff;
  border: 1px solid #ff706c;
  border-radius: 50px;
`;

const stepNames: Partial<Record<SignUpStep, string>> = {
  [SignUpStep.PositionSelection]: '포지션',
  [SignUpStep.ProfileDetailsSubmission]: '회원정보',
  [SignUpStep.TimeAvailabilitySubmission]: '활동정보',
  [SignUpStep.ToolAvailabilitySubmission]: '활동정보',
};

interface SignUpProfileUpdateHeaderProps extends Omit<ProgressBarProps, 'current' | 'total'> {}

export const SignUpProfileUpdateHeader = ({ ...props }: SignUpProfileUpdateHeaderProps) => {
  const { step, setStep, onForward, setOnForward } = useSignUpStore();

  const onBackwardClick = useCallback(() => step && setStep(step - 1), [setStep, step]);
  const onForwardClick = useCallback(async () => {
    if (step && onForward && (await onForward())) {
      setStep(step + 1);
      setOnForward(null);
    }
  }, [onForward, setOnForward, setStep, step]);

  const current = useMemo(() => (step ? step - SignUpStep.PositionSelection + 1 : 1), [step]);
  const total = 4;

  const enabledBackward = useMemo(() => (step ? step > SignUpStep.ProfileCreation : false), [step]);
  const enabledForward = useMemo(() => onForward !== null, [onForward]);
  const progressName = useMemo(() => {
    if (step && stepNames[step]) {
      return stepNames[step];
    }
    return '';
  }, [step]);

  return (
    <Container {...props}>
      <StyledProgressBar current={current} total={total} />
      <ButtonsContainer>
        <IconButton
          icon={enabledBackward ? 'arrowBackwardOutlined' : 'arrowBackward'}
          width={40}
          height={40}
          onClick={onBackwardClick}
          disabled={enabledBackward}
        />
        <TextContainer>
          <Txt size="typo6" weight="bold">
            {current}/{total}
          </Txt>
          <Txt size="typo6" weight="medium">
            {progressName}
          </Txt>
        </TextContainer>
        <IconButton
          icon={enabledForward ? 'arrowForwardOutlined' : 'arrowForward'}
          width={40}
          height={40}
          onClick={onForwardClick}
          disabled={enabledForward}
        />
      </ButtonsContainer>
    </Container>
  );
};
