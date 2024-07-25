import { useCallback } from 'react';

import styled from '@emotion/styled';

import { useTempAuthStore } from '#/stores/tempAuth';
import { IconName, Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const Portfolio = styled.div`
  position: relative;

  display: flex;
  gap: 5px;
  align-items: center;

  width: 100%;
  height: 25px;
  padding: 0 9px;

  border: 1px solid #ff908d;
  border-radius: 5px;
`;
const DeleteButton = styled.div`
  cursor: pointer;

  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  display: flex;
`;

interface PortfolioTicketProps {
  icon: IconName;
  text: string;
  editMode?: boolean;
}
export const PortfolioTicket = ({ icon, text, editMode }: PortfolioTicketProps) => {
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const setTempUser = useTempAuthStore((state) => state.setTempUser);

  const deleteLink = useCallback(() => {
    if (tempUser === null) return;
    setTempUser({
      ...tempUser,
      linkList: (tempUser.linkList ?? []).filter((link) => link.linkUrl !== text),
    });
  }, [setTempUser, tempUser, text]);

  return (
    <Portfolio>
      <Icons icon={icon} width={12} height={10} color="#FF706C" />
      <Txt size={'typo6'} weight={'regular'} color={'#9E9E9E'}>
        {text}
      </Txt>
      {editMode && (
        <DeleteButton onClick={deleteLink}>
          <Icons icon={'cross'} width={8} height={8} color="#FF908D" />
        </DeleteButton>
      )}
    </Portfolio>
  );
};
