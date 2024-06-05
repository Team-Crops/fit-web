'use client';

import React from 'react';

import { useLoginGuardStore } from '#/stores';
import { Backdrop } from '#atoms/Backdrop';
import { LoginPopup as Login } from '#organisms/LoginPopup';

export const LoginPopup = () => {
  const { isShowLoginPopup, hideLoginPopup } = useLoginGuardStore();
  return isShowLoginPopup ? (
    <Backdrop onClick={() => hideLoginPopup()}>
      <Login />
    </Backdrop>
  ) : null;
};
