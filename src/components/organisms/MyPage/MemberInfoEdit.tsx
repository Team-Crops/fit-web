import { useCallback, useState } from 'react';

import { CheckBox } from '#atoms/CheckBox';
import { Input } from '#atoms/Input';
import { Select } from '#atoms/Select';
import { Txt } from '#atoms/Text';
import { BasicInfoEdit } from '#molecules/MyPage/BasicInfoEdit';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import styled from '@emotion/styled';

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 73px;
  padding: 12px;
  margin-bottom: 39px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  resize: vertical;

  font-family: 'SpoqaHanSansNeo';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.8px;
  &::placeholder {
    color: #bdbdbd;
  }
`;
const EmailBlock = styled.div`
  display: flex;
  gap: 3px;
`;
const Hyphen = styled.div`
  width: 10px;
  border: 1px solid #424242;
  border-radius: 3px;
`;
const PhoneBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 207px;
`;
const FlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Label = styled.label`
  display: flex;
  gap: 9px;
  align-items: center;
  cursor: pointer;
`;
export const MemberInfoEdit = () => {
  const [isPublicPhone, setIsPublicPhone] = useState<boolean>(false);

  const onChangePublicPhone = useCallback(() => {
    setIsPublicPhone(!isPublicPhone);
  }, [isPublicPhone]);

  return (
    <MyInfoBlock title={'회원정보'}>
      <Txt size="typo4" weight="bold" color="#212121" marginBottom={12}>
        나의 소개
      </Txt>
      <StyledTextarea placeholder="안녕하세요. 저는 ㅇㅇ대학교에 재학 중인 4학년 ㅇㅇㅇ입니다. 요즘 저의 관심사는...안녕하세요. 저는 ㅇㅇ대학교에 재학 중인 4학년 ㅇㅇㅇ입니다. 요즘 저의 관심사는...안녕하세" />
      <MyPageGridBlock>
        <BasicInfoEdit title={'이름'} titleWidth={97}>
          <Input width="207px" placeholder="이름 입력" />
        </BasicInfoEdit>
        <BasicInfoEdit title={'이메일'} titleWidth={97} essential>
          <EmailBlock>
            <Input width="118px" placeholder="이메일 입력" />
            <Select width="128px" placeholder="선택하세요">
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
              <Select.Option value="1">example</Select.Option>
            </Select>
          </EmailBlock>
        </BasicInfoEdit>
        <BasicInfoEdit title={'닉네임'} titleWidth={97} essential>
          <Input width="207px" placeholder="닉네임 입력" />
        </BasicInfoEdit>
        <BasicInfoEdit title={'학력/경력'} titleWidth={97} essential>
          <Select width="250px" placeholder="선택하세요">
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
            <Select.Option value="1">example</Select.Option>
          </Select>
        </BasicInfoEdit>
        <BasicInfoEdit title={'전화번호'} titleWidth={97}>
          <FlexBlock>
            <PhoneBlock>
              <Input width="49px" placeholder="010" />
              <Hyphen />
              <Input width="49px" placeholder="0000" />
              <Hyphen />
              <Input width="49px" placeholder="0000" />
            </PhoneBlock>
            <Label>
              <CheckBox checked={isPublicPhone} onChange={onChangePublicPhone} />
              <Txt size={'typo5'} weight={'regular'} color={'#616161'}>
                공개
              </Txt>
            </Label>
          </FlexBlock>
        </BasicInfoEdit>
        <BasicInfoEdit title={'회사명'} titleWidth={97} essential>
          <Input width="207px" placeholder="회사명을 입력하세요." />
        </BasicInfoEdit>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
