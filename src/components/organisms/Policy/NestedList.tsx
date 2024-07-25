import React from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';

type NestedData = string | NestedData[];

interface NestedListProps {
  data: NestedData;
}

const StyledOl = styled.ol`
  padding: 0 0 0 20px;
`;
const StyledLi = styled.li`
  &::marker {
    color: #757575;
  }
`;

const renderNestedList = (data: NestedData[], key?: React.Key) => {
  return (
    <ol type="a" key={key}>
      {data.map((item, index) => (
        <StyledLi key={index}>
          <Txt size="typo5" weight="regular" color="#757575" marginBottom={15}>
            {item}
          </Txt>
        </StyledLi>
      ))}
    </ol>
  );
};

export const NestedList = ({ data }: NestedListProps) => {
  if (typeof data === 'string') {
    return (
      <Txt size="typo5" weight="regular" color="#757575">
        {data}
      </Txt>
    );
  }
  return (
    <StyledOl>
      {data.map((item, index) =>
        Array.isArray(item) ? (
          renderNestedList(item, index)
        ) : (
          <StyledLi key={index}>
            <Txt size="typo5" weight="regular" color="#757575" marginBottom={15}>
              {item}
            </Txt>
          </StyledLi>
        )
      )}
    </StyledOl>
  );
};
