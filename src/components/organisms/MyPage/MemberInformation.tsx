import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { CheckBox } from '#atoms/CheckBox';
import { Txt } from '#atoms/Text';
import { BasicInfo } from '#molecules/MyPage/BasicInfo';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 62px;
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

export const MemberInformation = () => {
  const [isPublicPhone, setIsPublicPhone] = useState<boolean>(false);

  const onChangePublicPhone = useCallback(() => {
    setIsPublicPhone(!isPublicPhone);
  }, [isPublicPhone]);

  return (
    <MyInfoBlock title={'회원정보'}>
      <Introduction>
        <Txt size={'typo4'} weight={'bold'} color={'#212121'}>
          나의 소개
        </Txt>
        <Txt size={'typo5'} weight={'medium'} color={'#212121'}>
          안녕하세요. 저는 ㅇㅇ대학교에 재학 중인 4학년 ㅇㅇㅇ입니다. 요즘 저의
          관심사는...안녕하세요. 저는 ㅇㅇ대학교에 재학 중인 4학년 ㅇㅇㅇ입니다. 요즘 저의
          관심사는...
        </Txt>
      </Introduction>
      <MyPageGridBlock>
        <BasicInfo title={'이름'} titleWidth={97} type={'string'}>
          떙땡땡
        </BasicInfo>
        <BasicInfo title={'이메일'} titleWidth={97} type={'string'}>
          test@gmail.com
        </BasicInfo>
        <BasicInfo title={'닉네임'} titleWidth={97} type={'string'}>
          테스트닉네임
        </BasicInfo>
        <BasicInfo title={'학력/경력'} titleWidth={97} type={'string'}>
          휴학생
        </BasicInfo>
        <BasicInfo title={'전화번호'} titleWidth={97} type={'reactNode'}>
          <FlexBlock>
            <Txt size={'typo5'} weight={'bold'} color={'#424242'}>
              010-1234-1234
            </Txt>
            <Label>
              <CheckBox checked={isPublicPhone} onChange={onChangePublicPhone} />
              <Txt size={'typo5'} weight={'regular'} color={'#616161'}>
                공개
              </Txt>
            </Label>
          </FlexBlock>
        </BasicInfo>
        <BasicInfo title={'학교명'} titleWidth={97} type={'string'}>
          서울과학기술대학교
        </BasicInfo>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
