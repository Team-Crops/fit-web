import { useCallback } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import { usePositionsQuery } from '#/hooks/use-positions';
import { useAuthStore } from '#/stores/auth';
import { Icons, Txt } from '../atoms';
import { ProfileBlock } from '../organisms/ProfileBlock';

const MenuModal = styled.div`
  position: absolute;
  right: 0;
  bottom: -218px;

  width: 250px;
  height: 190px;
  padding: 25px 20px 20px;

  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 10%);
`;
const SummaryBlock = styled.div`
  display: block;
`;
const TopBlock = styled.div`
  display: flex;
  gap: 13px;
`;
const FlexBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  width: 147px;
  margin-bottom: 4px;
`;
const UserName = styled(Txt)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;
const Position = styled(Txt)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 22px;
  padding: 0 17px;

  white-space: nowrap;

  background-color: #ffeae9;
  border-radius: 33px;
`;
const LinkListBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;

  margin-top: 24px;
  padding: 18px 6px 0;

  border-top: 1px solid #f5f5f5;
`;
const LinkBlock = styled(Link)`
  display: flex;
  gap: 16px;
`;
interface HeaderMenuModalProps {
  isOpen: boolean;
  menuToggle: () => void;
}
export const HeaderMenuModal = ({ isOpen, menuToggle }: HeaderMenuModalProps) => {
  const { data: positions } = usePositionsQuery();
  const userData = useAuthStore((store) => store.user);
  const clear = useAuthStore((store) => store.clear);

  const handleLogout = useCallback(() => {
    clear();
    menuToggle();
    localStorage.clear();
    sessionStorage.clear();
    location.href = '/';
  }, [clear, menuToggle]);

  if (!isOpen) return null;
  return (
    <MenuModal
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <TopBlock>
        <ProfileBlock size={50} />
        <SummaryBlock>
          <FlexBlock>
            <UserName size="typo5" weight="bold" color="#212121">
              {userData?.nickname}
            </UserName>
            <Position size={'typo6'} weight="regular" color="#FF706C">
              {positions?.find((position) => position.id === userData?.positionId)?.displayName}
            </Position>
          </FlexBlock>
          <FlexBlock>
            <Icons icon={'email'} width={15} height={15} color="#757575" />
            <Txt size="typo6" weight="regular" color="#757575">
              {userData?.email}
            </Txt>
          </FlexBlock>
        </SummaryBlock>
      </TopBlock>

      <LinkListBlock>
        <LinkBlock href={'/mypage'} onClick={menuToggle}>
          <Icons icon={'userLine'} width={20} height={20} color="#FF706C" />
          <Txt size="typo6" weight="regular" color="#212121">
            마이페이지로 이동
          </Txt>
        </LinkBlock>
        <LinkBlock href={'/mypage'} onClick={handleLogout}>
          <Icons icon={'logout'} width={20} height={20} color="#FF706C" />
          <Txt size="typo6" weight="regular" color="#212121">
            로그아웃
          </Txt>
        </LinkBlock>
      </LinkListBlock>
    </MenuModal>
  );
};
