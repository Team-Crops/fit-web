'use client';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { ProgressBar, ProgressBarProps } from '#molecules/ProgressBar';

const StyledProgressBar = styled(ProgressBar)`
  border-radius: 15px 15px 0 0;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 100%;

  overflow: hidden;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 45px;

  width: 100%;
`;

const IconButton = styled(Icons)<{ disabled: boolean }>`
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid #ff706c;
  background: #fff;
  color: #ff706c;
`;

interface SignupProgressBarProps extends Omit<ProgressBarProps, 'value'> {
  currentStep: number;
  totalStep: number;
  progressName: string;
  onForwardClick?: () => void;
  onBackwardClick?: () => void;
}

export const SignupProgressBar = ({
  currentStep,
  totalStep,
  progressName,
  onForwardClick,
  onBackwardClick,
  ...props
}: SignupProgressBarProps) => {
  const enabledForward = onForwardClick !== undefined;
  const enabledBackward = onBackwardClick !== undefined;
  return (
    <Container {...props}>
      <StyledProgressBar current={currentStep} total={totalStep} />
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
            {currentStep}/{totalStep}
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
