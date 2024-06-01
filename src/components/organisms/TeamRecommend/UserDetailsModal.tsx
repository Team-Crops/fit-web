import styled from '@emotion/styled';

import { Backdrop, Icons } from '#/components/atoms';
import { UserDetails } from '#/components/organisms/UserDetails';
import type { User } from '#/types';

interface UserDetailsModalProps {
  userId: User['id'];
  onClose: () => void;
}

export const UserDetailsModal = ({ userId, onClose }: UserDetailsModalProps) => {
  return (
    <Backdrop onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <UserDetails userId={userId} showIsLiked showContacts />
        <CancelButton icon={'cross'} width={22} height={22} color="#BDBDBD" onClick={onClose} />
      </Container>
    </Backdrop>
  );
};

const Container = styled.div`
  position: relative;
`;

const CancelButton = styled(Icons)`
  cursor: pointer;
  position: absolute;
  top: 28px;
  left: 38px;
`;
