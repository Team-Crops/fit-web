import { Backdrop } from '#atoms/Backdrop';
import { SignInEntrance as Contents } from '#organisms/SignInEntrance';
import styled from '@emotion/styled';

interface SignInEntranceProps {
  onCancel: () => void;
  onSuccess: () => void;
  onFailure: () => void;
}

export const SignInEntrance = ({ onCancel, onSuccess, onFailure }: SignInEntranceProps) => (
  <Backdrop
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onCancel();
      }
    }}
  >
    <Contents onCancel={onCancel} onSuccess={onSuccess} onFailure={onFailure} />
  </Backdrop>
);
