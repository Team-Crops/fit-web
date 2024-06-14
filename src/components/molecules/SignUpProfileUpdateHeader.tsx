import React, { useMemo } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
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
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 0 40px;
`;

const IconButton = styled(Icons)<{ disabled?: boolean }>`
  ${({ disabled }) => !disabled && 'cursor: pointer;'}
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
  [SignUpStep.POSITION_SELECTION]: '포지션',
  [SignUpStep.PROFILE_DETAILS_SUBMISSION]: '회원정보',
  [SignUpStep.TIME_AVAILABILITY_SUBMISSION]: '활동정보',
  [SignUpStep.TOOL_AVAILABILITY_SUBMISSION]: '활동정보',
};

interface SignUpProfileUpdateHeaderProps extends Omit<ProgressBarProps, 'current' | 'total'> {
  step: SignUpStep;
  onNextClick: () => void;
  onPrevClick: () => void | Promise<void>;

  canProceed: boolean;
}

export const SignUpProfileUpdateHeader = ({
  step,
  onNextClick,
  onPrevClick,
  canProceed,
  ...props
}: SignUpProfileUpdateHeaderProps) => {
  const current = useMemo(() => step - SignUpStep.POSITION_SELECTION + 1, [step]);
  const total = SignUpStep.COMPLETE - SignUpStep.POSITION_SELECTION;
  return (
    <Container {...props}>
      <StyledProgressBar current={current} total={total} />
      <ButtonsContainer>
        <IconButton
          icon={'arrowBackwardOutlined'}
          width={40}
          height={40}
          onClick={() => onPrevClick()}
        />
        <TextContainer>
          <Txt size="typo6" weight="bold">
            {current}/{total}
          </Txt>
          <Txt size="typo6" weight="medium">
            {stepNames[step]}
          </Txt>
        </TextContainer>
        <IconButton
          icon={canProceed ? 'arrowForwardOutlined' : 'arrowForward'}
          width={40}
          height={40}
          onClick={() => canProceed && onNextClick()}
          disabled={!canProceed}
        />
      </ButtonsContainer>
    </Container>
  );
};
