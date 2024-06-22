import { useCallback, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useMeQuery } from '#/hooks/use-user';
import { useTempAuthStore } from '#/stores/tempAuth';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const BlockEmptyCss = ({ haveFile }: { haveFile: boolean }) => {
  switch (haveFile) {
    case true:
      return css`
        padding: 20px 10px 0;
        border: 1px solid #e0e0e0;
      `;
    default:
      return css`
        background-color: #ffc7c6;
      `;
  }
};
const Block = styled.div<{ haveFile: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  width: 92px;
  height: 98px;

  text-align: center;
  word-break: keep-all;
  white-space: pre-wrap;

  border-radius: 5px;

  ${BlockEmptyCss}
`;
const CancelButton = styled.div`
  cursor: pointer;

  position: absolute;
  top: 8px;
  right: 8px;

  display: flex;
`;
const Label = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 20px 10px 0;
`;
const PortfolioFileInput = styled.input`
  display: none;
`;

interface PortfolioFileBlockProps {
  isEdit?: boolean;
}

export const PortfolioFileBlock: React.FC<PortfolioFileBlockProps> = ({ isEdit }) => {
  const [haveFile, setHaveFile] = useState<boolean>(false);

  const tempUser = useTempAuthStore((state) => state.tempUser);
  const setTempPortfolioFile = useTempAuthStore((state) => state.setTempPortfolioFile);
  const { data: user } = useMeQuery();

  const handleTempPortfolioFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files === null) return;
      const file = e.target.files[0];
      if (file) {
        setTempPortfolioFile(file);
        setHaveFile(true);
      }
    },
    [setTempPortfolioFile]
  );
  const deletePortfolioFile = useCallback(() => {
    setTempPortfolioFile(null);
    setHaveFile(false);
  }, [setTempPortfolioFile]);

  // init
  useEffect(() => {
    if (tempUser?.portfolioUrl) {
      const currentFile = new File([], tempUser.portfolioUrl);
      setTempPortfolioFile(currentFile);
      setHaveFile(true);
    }
  }, [setTempPortfolioFile, tempUser?.portfolioUrl]);

  return (
    <Block haveFile={haveFile || !isEdit}>
      {isEdit ? (
        haveFile ? (
          <>
            <Icons icon="clip" width={28} height={26} />
            <Txt size={'typo6'} weight={'regular'} color={'#FF706C'}>
              {tempUser?.nickname}_포트폴리오
            </Txt>
            <CancelButton onClick={deletePortfolioFile}>
              <Icons icon="cross" width={8} height={8} color="#FF706C" />
            </CancelButton>
          </>
        ) : (
          <Label htmlFor="portfolioFile">
            <Icons icon="plus" width={28} height={26} />
            <Txt size={'typo6'} weight={'regular'} color={'#FF706C'}>
              PDF{'\n'}파일 선택
            </Txt>
            <PortfolioFileInput
              onChange={handleTempPortfolioFileChange}
              type="file"
              id="portfolioFile"
            />
          </Label>
        )
      ) : (
        user?.portfolioUrl && (
          <>
            <Icons icon="clip" width={28} height={26} />
            <Txt size={'typo6'} weight={'regular'} color={'#FF706C'}>
              {user?.nickname}_포트폴리오
            </Txt>
          </>
        )
      )}
    </Block>
  );
};
