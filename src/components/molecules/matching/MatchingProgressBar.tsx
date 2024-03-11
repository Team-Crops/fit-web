import styled from '@emotion/styled';

import { ProgressBar } from '#/components/atoms/ProgressBar';

const StyledProgressBar = styled(ProgressBar)`
  height: 8px;
`;

export function MatchingProgressBar() {
  return <StyledProgressBar current={1} total={3} />;
}
