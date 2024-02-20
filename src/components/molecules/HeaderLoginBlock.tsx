import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';

const LoginButton = styled(Button)`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0 23px;

  font-size: 18px;
  font-weight: 400;
  font-family: 'SpoqaHanSansNeo';
`;
export const HeaderLoginBlock = () => {
  const router = useRouter();

  const onClickLoginButton = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <div>
      <LoginButton variant={'round'} height={'50'} color={'primary'} onClick={onClickLoginButton}>
        <Icons icon={'user'} width={24} height={20} />
        로그인
      </LoginButton>
    </div>
  );
};
