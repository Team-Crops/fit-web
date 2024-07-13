import { useEffect } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms';
import { useAlarmQuery } from '#/hooks';

export const HeaderAlarmIcon = () => {
  const { data, mutate } = useAlarmQuery();

  useEffect(() => {
    const interval = setInterval(() => mutate(), 10000);
    return () => clearInterval(interval);
  }, [mutate]);

  return (
    <Container>
      <Icons icon="bell" width={28} height={35} />
      {data?.[0].pageResult.values?.at(0)?.isRead === false && <Badge />}
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
