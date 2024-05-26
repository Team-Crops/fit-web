import { useState } from 'react';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Txt } from '#/components/atoms/Text';
import { RecommendFilterBlock } from '#/components/organisms/TeamRecommend/RecommendFilterBlock';
import { RecommendUserQueryOptions } from '#/hooks/use-recommend';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 21px;
  align-items: center;

  width: 100%;
  max-width: 1200px;
  margin: 136px auto 100px;
`;
const StyledFlexBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;
const FocusTxt = styled.span`
  color: #ff706c;
`;

interface RecommendFilterProps {
  defaultOptions: RecommendUserQueryOptions;
  trigger: (options: RecommendUserQueryOptions) => void;
}

export const RecommendFilter = ({ defaultOptions, trigger }: RecommendFilterProps) => {
  const [options, setOptions] = useState(defaultOptions);
  return (
    <StyledSection>
      <StyledFlexBlock>
        <Txt size="typo1" weight="bold">
          설정한 조건에 맞는 <FocusTxt>팀원을 추천해드릴게요!</FocusTxt>
        </Txt>
        <Button onClick={() => trigger(options)} variant={'round'} height={'50'} color={'primary'}>
          팀원 추천
        </Button>
      </StyledFlexBlock>
      <RecommendFilterBlock options={options} setOptions={setOptions} />
    </StyledSection>
  );
};
