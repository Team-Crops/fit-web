import styled from '@emotion/styled';

import { Icons } from '#atoms/Icons';
import { ProfileBlock } from '../organisms/ProfileBlock';

const FlexBlock = styled.div`
  display: flex;
  gap: 36px;
  align-items: center;
`;

export const HeaderUserBlock = () => {
  return (
    <FlexBlock>
      <Icons icon={'bell'} width={28} height={35} />
      <ProfileBlock size={45} />
    </FlexBlock>
  );
};
