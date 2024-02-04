import { useState } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#atoms/Icons';
import { Select } from '#atoms/Select';
import { Txt } from '#atoms/Text';
import { SignupProgressBar } from '#molecules/SignupProgressBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 830px;
  height: 680px;

  border-radius: 15px;
  background: #ffffff;

  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;

  width: 550px;
  color: #9e9e9e;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  height: 36px;
`;

const Spacer = styled.div``;

export const ActivityInfoPopup = () => {
  const [projectCount, setProjectCount] = useState<number>();

  return (
    <Container>
      <SignupProgressBar currentStep={3} totalStep={4} progressName="활동정보" />
      <TitleContainer>
        <Txt size="typo1" weight="bold">
          나의 프로젝트 경험과 활동 정보를 알려주세요
        </Txt>
        <Txt size="typo4" weight="medium" style={{ color: '#bdbdbd' }}>
          거의 다 왔어요. 조금만 더 화이팅! <Icons width={20} icon="emojiHoldingBackTears" />
        </Txt>
      </TitleContainer>
      <FormContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            프로젝트 경험 수
          </Txt>
          <StyledSelect
            value={projectCount}
            onChange={(e) => setProjectCount(e.target.valueAsNumber)}
          >
            <Select.Option value={1}>1번</Select.Option>
            <Select.Option value={2}>2번</Select.Option>
            <Select.Option value={3}>3번</Select.Option>
            <Select.Option value={4}>4번</Select.Option>
          </StyledSelect>
        </InputContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            주 활동 지역
          </Txt>
          <StyledSelect />
        </InputContainer>
        <InputContainer>
          <Txt size="typo5" weight="medium">
            활동 가능 시간
          </Txt>
          <StyledSelect />
        </InputContainer>
      </FormContainer>
      <Spacer />
      <Spacer />
    </Container>
  );
};
