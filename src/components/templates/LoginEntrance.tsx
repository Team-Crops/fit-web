import { LoginEntrance as Contents } from '#organisms/LoginEntrance';
import styled from '@emotion/styled';

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(66, 66, 66, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
`;

interface LoginTemplateProps {
  onClose: () => void;
}

export const LoginEntrance = ({ onClose }: LoginTemplateProps) => {
  return (
    <Backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Contents onClose={onClose} />
    </Backdrop>
  );
};
