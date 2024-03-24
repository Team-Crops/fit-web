'use client';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
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
  padding: 0 45px;
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

interface SignupProgressBarProps extends Omit<ProgressBarProps, 'value'> {
  progressName: string;
  onForwardClick?: () => void;
  onBackwardClick?: () => void;
}

export const SignupProgressBar = ({
  current,
  total,
  progressName,
  onForwardClick,
  onBackwardClick,
  ...props
}: SignupProgressBarProps) => {
  const enabledForward = onForwardClick !== undefined;
  const enabledBackward = onBackwardClick !== undefined;
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
