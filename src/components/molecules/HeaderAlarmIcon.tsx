import styled from '@emotion/styled';

import { Icons } from '#/components/atoms';
import { useAlarmBadge } from '#/hooks/use-alarm-badge';

export const HeaderAlarmIcon = () => {
  const badged = useAlarmBadge();

  return (
    <Container>
      <Icons icon="bell" width={28} height={35} />
      {badged && <Badge />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Badge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;

  width: 13px;
  height: 13px;

  background-color: #ff0800;
  border: 2px solid #fff;
  border-radius: 9999px;
`;
