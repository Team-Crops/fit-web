'use client';

import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { useCreateRegionMutation, useGetRegionsQuery } from '#/redux/features/region/api';
import { Button } from '#atoms/Button';
import { Input } from '#atoms/Input';
import { Select, type SelectProps } from '#atoms/Select';
import { Txt } from '#atoms/Text';

const StyledButton = styled(Button)`
  width: 100%;
`;

interface RegionSelectProps extends SelectProps {}

export const RegionSelect = (props: RegionSelectProps) => {
  const { data: regions, refetch: refetchRegions } = useGetRegionsQuery();
  const [createRegion, { error, isLoading, isSuccess }] = useCreateRegionMutation();
  const [regionInputToggle, setRegionInputToggle] = useState(false);
  const [newRegionName, setNewRegionName] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setRegionInputToggle(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setNewRegionName('');
      setRegionInputToggle(false);
      refetchRegions();
    } else if (error) {
      const queryError = error as FetchBaseQueryError;
      if (queryError.status === 409) {
        alert('이미 존재하는 지역입니다.');
      }
    }
  }, [isLoading, isSuccess, error, refetchRegions]);

  return regions ? (
    <div ref={containerRef}>
      <Select {...props}>
        {regions.map((region, index) => (
          <Select.Option key={index} value={region.id}>
            {region.displayName}
          </Select.Option>
        ))}
        {regionInputToggle ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createRegion({ displayName: newRegionName });
            }}
          >
            <Input
              autoFocus
              disabled={isLoading}
              value={newRegionName}
              placeholder="새로운 지역 명을 입력해주세요"
              onChange={(e) => setNewRegionName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </form>
        ) : (
          <StyledButton
            variant="angular"
            height="30"
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setRegionInputToggle(true);
            }}
          >
            <Txt size="typo5" weight="medium">
              + 지역 추가하기
            </Txt>
          </StyledButton>
        )}
      </Select>
    </div>
  ) : (
    <Select disabled />
  );
};
