import styled from '@emotion/styled';

import { Badge, Divider } from '#/components/atoms';

interface ProjectDividerProps {
  done?: boolean;
}

export const ProjectDivider: React.FC<ProjectDividerProps> = ({ done = false }) => {
  return (
    <Container>
      <Divider color={done ? '#bdbdbd' : '#ffa7a5'} />
      <StyledBadge
        background={done ? '#9e9e9e' : '#ff706c'}
        color="#fff"
        size="typo4"
        weight="bold"
      >
        {done ? '종료' : '진행 중'}
      </StyledBadge>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledBadge = styled(Badge)`
  flex-shrink: 0;
  width: 120px;
  height: 40px;
`;
