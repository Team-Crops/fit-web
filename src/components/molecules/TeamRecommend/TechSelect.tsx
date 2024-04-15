import { useState } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { TechSelectBlock } from '../MyPage/TechSelectBlock';

const TechSelectContainer = styled.div`
  position: relative;
`;
const TechSelectButton = styled.div`
  cursor: pointer;

  position: relative;
  z-index: 2;

  width: 676px;
  height: 30px;
  margin-bottom: 35px;

  background: #fff;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
`;
const ArrowIcon = styled(Icons)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
const TechSelectWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  left: -8px;
`;

export const TechSelect = () => {
  const [openSelectBlock, setOpenSelectBlock] = useState(false);
  return (
    <TechSelectContainer>
      <TechSelectButton
        onClick={() => {
          setOpenSelectBlock(!openSelectBlock);
        }}
      >
        <ArrowIcon icon={'arrowDown'} width={12} height={12} />
      </TechSelectButton>
      {openSelectBlock && (
        <TechSelectWrapper>
          <TechSelectBlock />
        </TechSelectWrapper>
      )}
    </TechSelectContainer>
  );
};
