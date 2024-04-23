import React from 'react';

import { Backdrop } from '#atoms/Backdrop';
import { LoginPopup as Login } from '#organisms/LoginPopup';

interface LoginPopupProps {
  onCancel: () => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ onCancel }) => {
  return (
    <Backdrop onClick={() => onCancel()}>
      <Login />
    </Backdrop>
  );
};
