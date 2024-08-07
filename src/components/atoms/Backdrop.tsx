import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: rgb(66 66 66 / 40%);
`;
