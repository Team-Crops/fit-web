import styled from '@emotion/styled';

export const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  background: rgba(66, 66, 66, 0.4);

  z-index: 100;
`;
