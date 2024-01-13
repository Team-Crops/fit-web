import { Icons } from '#atoms/Icons';
import styled from '@emotion/styled';

const FlexBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
`;

export const HeaderNonLoginBlock = () => {
  return (
    <FlexBlock>
      <Icons icon={'bell'} width={28} height={35} />
      <Icons icon={'account'} width={45} height={45} />
    </FlexBlock>
  );
};
