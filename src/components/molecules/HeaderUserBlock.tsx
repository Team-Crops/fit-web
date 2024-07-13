import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

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
  const [openModal, setOpenModal] = useState<OpenModal>(null);

  const openModalHandler = useCallback(
    (type: OpenModal) => () => {
      if (openModal === type) setOpenModal(null);
      else setOpenModal(type);
    },
    [openModal]
  );

  return (
    <FlexBlock>
      <AlarmBlock onClick={openModalHandler('alarm')}>
        <HeaderAlarmIcon />
        <HeaderAlarmModal isOpen={openModal === 'alarm'} toggleModal={openModalHandler(null)} />
      </AlarmBlock>
      <MenuBlock onClick={openModalHandler('menu')}>
        <ProfileBlock size={45} />
        <HeaderMenuModal isOpen={openModal === 'menu'} toggleMenu={openModalHandler(null)} />
      </MenuBlock>
      {openModal !== null && <Background onClick={openModalHandler(null)} />}
    </FlexBlock>
  );
};
