import { Dispatch, SetStateAction, useCallback } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icons, Txt } from '#/components/atoms';
import { RecommendUserQueryOptions } from '#/hooks';

const dibsFilter = [
  { label: '전체', value: false },
  {
    label: (
      <>
        <Icons size={25} icon={'heartFilled'} color="inherit" />
        찜만 보기
      </>
    ),
    value: true,
  },
];

interface DibsFilterBlockProps {
  options: RecommendUserQueryOptions;
  setOptions: Dispatch<SetStateAction<RecommendUserQueryOptions>>;
  trigger: (options: RecommendUserQueryOptions) => void;
}
export const DibsFilterBlock = ({ options, setOptions, trigger }: DibsFilterBlockProps) => {
  const handleDibsClick = useCallback(
    (dibsValue: boolean) => () => {
      setOptions((opts) => ({ ...opts, liked: dibsValue }));
      trigger({ ...options, liked: dibsValue });
    },
    [setOptions, options, trigger]
  );
  return (
    <DibsFilter>
      {dibsFilter.map((dibs, index) => (
        <DibsBlock
          key={index}
          size="typo3"
          weight="bold"
          selected={options.liked === dibs.value}
          color={options.liked === dibs.value ? '#212121' : '#9e9e9e'}
          onClick={handleDibsClick(dibs.value)}
        >
          {dibs.label}
        </DibsBlock>
      ))}
    </DibsFilter>
  );
};

const DibsFilter = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 2px solid #eee;
`;
const DibsBlock = styled(Txt)<{ selected: boolean }>`
  cursor: pointer;

  position: relative;
  bottom: -2px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 20px 16px;

  border-bottom: 2px solid transparent;

  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 2px solid #ff706c;
    `}
`;
