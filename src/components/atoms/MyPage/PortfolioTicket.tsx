import { IconName, Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import styled from '@emotion/styled';

const Portfolio = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 25px;
  padding: 0 9px;
  border-radius: 5px;
  border: 1px solid #ff908d;
`;
const DeleteButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  display: flex;
`;

interface PortfolioTicketProps {
  icon: IconName;
  text: string;
  editMode?: boolean;
}
export const PortfolioTicket = ({ icon, text, editMode }: PortfolioTicketProps) => {
  return (
    <Portfolio>
      <Icons icon={icon} width={12} height={10} />
      <Txt size={'typo6'} weight={'regular'} color={'#9E9E9E'}>
        {text}
      </Txt>
      {editMode && (
        <DeleteButton>
          <Icons icon={'cross'} width={8} height={8} color="#FF908D" />
        </DeleteButton>
      )}
    </Portfolio>
  );
};
