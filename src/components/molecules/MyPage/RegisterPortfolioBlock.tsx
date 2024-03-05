import { Icons } from '#atoms/Icons';
import { PortfolioFileBlock } from '#atoms/MyPage/PortfolioFileBlock';
import { PortfolioTicket } from '#atoms/MyPage/PortfolioTicket';
import { Select } from '#atoms/Select';
import styled from '@emotion/styled';

const RegisterPortfolioContainer = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 27px;
`;
const PortfolioRightBlock = styled.div`
  width: calc(100% - 110px);
`;
const Register = styled.div`
  display: flex;
  gap: 8px;
`;
const InputBlock = styled.div`
  position: relative;
  width: calc(100% - 100px);
`;
const PortfolioUrlInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 11px 35px 10px 10px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;

  font-family: 'SpoqaHanSansNeo';
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.6px;
  ::placeholder {
    color: #9e9e9e;
  }
`;
const UploadButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 9px;
  display: flex;
`;
const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 20px;
`;

export const RegisterPortfolioBlock = () => {
  return (
    <RegisterPortfolioContainer>
      <PortfolioFileBlock />
      <PortfolioRightBlock>
        <Register>
          <Select width="92px">
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
          </Select>
          <InputBlock>
            <PortfolioUrlInput placeholder="URL 주소를 입력하세요" />
            <UploadButton>
              <Icons icon="upload" width={21} height={21} />
            </UploadButton>
          </InputBlock>
        </Register>
        <PortfolioList>
          <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} editMode />
          <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} editMode />
          <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} editMode />
          <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} editMode />
        </PortfolioList>
      </PortfolioRightBlock>
    </RegisterPortfolioContainer>
  );
};
