import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { useAuthStore } from '#/stores/auth';
import {
  careerTextToValue,
  careerValueToText,
  checkStudent,
} from '#/utilities/career-text-value-match';
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
  cursor: pointer;
  display: flex;
  gap: 9px;
  align-items: center;
`;

export const MemberInformation = () => {
  const userData = useAuthStore((state) => state.user);

  if (userData === null) return;
  return (
    <MyInfoBlock title={'회원정보'}>
      <Introduction>
        <Txt size={'typo4'} weight={'bold'} color={'#212121'}>
          나의 소개
        </Txt>
        <Txt size={'typo5'} weight={'medium'} color={'#212121'}>
          {userData.introduce || '자신을 소개해주세요!'}
        </Txt>
      </Introduction>
      <MyPageGridBlock>
        <BasicInfo title={'이름'} titleWidth={97} type={'string'}>
          {userData.username}
        </BasicInfo>
        <BasicInfo title={'이메일'} titleWidth={97} type={'string'}>
          {userData.email}
        </BasicInfo>
        <BasicInfo title={'닉네임'} titleWidth={97} type={'string'}>
          {userData.nickname}
        </BasicInfo>
        <BasicInfo title={'학력/경력'} titleWidth={97} type={'string'}>
          {careerTextToValue(userData.backgroundStatus)}
        </BasicInfo>
        <BasicInfo title={'전화번호'} titleWidth={97} type={'reactNode'}>
          <FlexBlock>
            <Txt size={'typo5'} weight={'bold'} color={'#424242'} style={{ height: '24px' }}>
              {userData.phoneNumber}
            </Txt>
            <Label>
              <CheckBox checked={userData.isOpenPhoneNum === true} />
              <Txt size={'typo5'} weight={'regular'} color={'#616161'}>
                공개
              </Txt>
            </Label>
          </FlexBlock>
        </BasicInfo>
        <BasicInfo
          title={checkStudent(userData.backgroundStatus) ? '학교명' : '회사명'}
          titleWidth={97}
          type={'string'}
        >
          {userData.backgroundText}
        </BasicInfo>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
