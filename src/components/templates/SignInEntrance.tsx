import { Backdrop } from '#atoms/Backdrop';
import { SignInEntrance as Contents } from '#organisms/SignInEntrance';

interface SignInEntranceProps {
  onCancel: () => void;
}

export const SignInEntrance = ({ onCancel }: SignInEntranceProps) => (
  <Backdrop
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onCancel();
      }
    }}
  >
    <Contents onCancel={onCancel} />
  </Backdrop>
);
