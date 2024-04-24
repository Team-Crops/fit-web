import styled from '@emotion/styled';

import { Icons } from '#atoms/Icons';

const FlexBlock = styled.div`
  display: flex;
  gap: 36px;
  align-items: center;
`;

export const HeaderUserBlock = () => {
  return (
    <FlexBlock>
      <Icons icon={'bell'} width={28} height={35} />
      <Icons icon={'account'} width={45} height={45} />
    </FlexBlock>
  );
};
