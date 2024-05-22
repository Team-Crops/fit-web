'use client';

import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Txt } from '#/components/atoms/Text';
import { RecommendFilterBlock } from '#/components/organisms/TeamRecommend/RecommendFilterBlock';
import { useRecommendUserQuery } from '#/hooks/use-recommend';
import { useRecommendStore } from '#/stores/recommend';

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

export const RecommendFilter = () => {
  const recommendFilter = useRecommendStore((state) => state.recommendFilter);
  const setRecommendUserList = useRecommendStore((state) => state.setRecommendUserList);
  const setCurrentFilter = useRecommendStore((state) => state.setCurrentFilter);
  const { trigger: getUser } = useRecommendUserQuery();

  const recommendUserHandler = useCallback(() => {
    if (recommendFilter === null) return;
    getUser({ ...recommendFilter, page: 0 }).then((data) => {
      setCurrentFilter(recommendFilter);
      setRecommendUserList(data.recommendUserList);
    });
  }, [getUser, recommendFilter, setCurrentFilter, setRecommendUserList]);

  return (
    <StyledSection>
      <StyledFlexBlock>
        <Txt size="typo1" weight="bold">
          설정한 조건에 맞는 <FocusTxt>팀원을 추천해드릴게요!</FocusTxt>
        </Txt>
        <Button onClick={recommendUserHandler} variant={'round'} height={'50'} color={'primary'}>
          팀원 추천
        </Button>
      </StyledFlexBlock>
      <RecommendFilterBlock />
    </StyledSection>
  );
};
