import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { mutate } from 'swr';

import { ALARM_QUERY_KEY } from '#/hooks';
import { HeaderAlarmIcon } from './HeaderAlarmIcon';
import { HeaderAlarmModal } from './HeaderAlarmModal';
import { HeaderMenuModal } from './HeaderMenuModal';
import { ProfileBlock } from '../organisms/ProfileBlock';

const FlexBlock = styled.div`
  display: flex;
  gap: 36px;
  align-items: center;
`;
const MenuBlock = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 2;
`;
const Background = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
`;
const AlarmBlock = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 2;
`;

type OpenModal = 'alarm' | 'menu' | null;

export const HeaderUserBlock = () => {
  const [openedModal, setOpenModal] = useState<OpenModal>(null);

  const toggleModal = useCallback((type: OpenModal) => {
    setOpenModal((prev) => (prev === type ? null : type));
  }, []);

  useEffect(() => {
    if (openedModal === 'alarm') {
      mutate(ALARM_QUERY_KEY);
    }
  }, [openedModal]);

  return (
    <FlexBlock>
      <AlarmBlock onClick={() => toggleModal('alarm')}>
        <HeaderAlarmIcon />
        <HeaderAlarmModal isOpen={openedModal === 'alarm'} toggleModal={() => toggleModal(null)} />
      </AlarmBlock>
      <MenuBlock onClick={() => toggleModal('menu')}>
        <ProfileBlock size={45} />
        <HeaderMenuModal isOpen={openedModal === 'menu'} toggleMenu={() => toggleModal(null)} />
      </MenuBlock>
      {openedModal !== null && <Background onClick={() => toggleModal(null)} />}
    </FlexBlock>
  );
};
