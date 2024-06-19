import { useState } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#atoms/Icons';
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
export const HeaderUserBlock = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => setIsOpenMenu((v) => !v);

  return (
    <FlexBlock>
      <Icons icon="bell" width={28} height={35} />
      <MenuBlock onClick={toggleMenu}>
        <ProfileBlock size={45} />
        <HeaderMenuModal isOpen={isOpenMenu} toggleMenu={toggleMenu} />
      </MenuBlock>
      {isOpenMenu && <Background onClick={toggleMenu} />}
    </FlexBlock>
  );
};
