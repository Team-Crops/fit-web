import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';

export const EmptyProjectList = () => {
  return (
    <Container>
      <Txt size="typo1" weight="bold" color="#9e9e9e">
        진행중인 프로젝트가 없습니다.
      </Txt>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;

  width: 100%;
  padding: 120px 0;
`;
