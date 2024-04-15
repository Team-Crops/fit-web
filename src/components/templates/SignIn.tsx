'use client';

import React from 'react';

import { useSignInStore } from '#/stores/sign-in';
import { Backdrop } from '#atoms/Backdrop';
import { SignInPopup } from '#organisms/SignInPopup';

export const SignIn = () => {
  const togglePopup = useSignInStore((state) => state.togglePopup);
  return (
    <Backdrop onClick={() => togglePopup()}>
      <SignInPopup />
    </Backdrop>
  );
};
