import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const BlockEmptyCss = ({ isEmpty }: PortfolioFileBlockProps) => {
  switch (isEmpty) {
    case true:
      return css`
        background-color: #ffc7c6;
      `;
    default:
      return css`
        border: 1px solid #e0e0e0;
      `;
  }
};
const Block = styled.div<PortfolioFileBlockProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 92px;
  height: 98px;
  padding: 20px 10px 0;
  border-radius: 5px;
  word-break: keep-all;
  white-space: pre-wrap;
  text-align: center;
  ${BlockEmptyCss}
`;
const CancelButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
`;

interface PortfolioFileBlockProps {
  isEmpty?: boolean;
}
export const PortfolioFileBlock = ({ isEmpty }: PortfolioFileBlockProps) => {
  return (
    <Block isEmpty={isEmpty}>
      {isEmpty ? (
        <>
          <Icons icon="plus" width={28} height={26} />
          <Txt size={'typo6'} weight={'regular'} color={'#FF706C'}>
            PDF{'\n'}파일 선택
          </Txt>
        </>
      ) : (
        <>
          <Icons icon="clip" width={28} height={26} />
          <Txt size={'typo6'} weight={'regular'} color={'#FF706C'}>
            EZ안_포트폴리오
          </Txt>
          <CancelButton>
            <Icons icon="cross" width={8} height={8} color="#FF706C" />
          </CancelButton>
        </>
      )}
    </Block>
  );
};
