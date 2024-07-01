import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { CareerSelect } from '#/components/molecules/CareerSelect';
import { useTempAuthStore } from '#/stores/tempAuth';
import { UserBackgroundStatus } from '#/types';
import { isUserStudent, isUserWorker } from '#/utilities/user';
import { CheckBox } from '#atoms/CheckBox';
import { Input } from '#atoms/Input';
import { Txt } from '#atoms/Text';
import { BasicInfoEdit } from '#molecules/MyPage/BasicInfoEdit';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';

const StyledTextarea = styled.textarea`
  resize: vertical;

  width: 100%;
  min-height: 73px;
  margin-bottom: 39px;
  padding: 12px;

  font-family: SpoqaHanSansNeo, sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.8px;

  border: 1px solid #bdbdbd;
  border-radius: 5px;

  &::placeholder {
    color: #bdbdbd;
  }
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
  cursor: pointer;
  display: flex;
  gap: 9px;
  align-items: center;
`;

const isUserStudentOrWorker = (backgroundStatus: UserBackgroundStatus) => {
  if (isUserStudent(backgroundStatus)) return '학교명';
  else if (isUserWorker(backgroundStatus)) return '회사명';
  else return '그룹명';
};

export const MemberInfoEdit = () => {
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const [tempPhone, setTempPhone] = useState<{ first: string; second: string; third: string }>({
    first: '',
    second: '',
    third: '',
  });
  const setTempUser = useTempAuthStore((state) => state.setTempUser);

  const handleUpdateTempUser = useCallback(
    (key: string, value: string | boolean, maxLength?: number) => {
      if (maxLength && (value as string).length > maxLength) {
        alert('최대 글자수를 초과하였습니다.');
        return;
      }
      if (tempUser !== null) {
        setTempUser({ ...tempUser, [key]: value });
      }
    },
    [tempUser, setTempUser]
  );

  const handleUpdateTempPhone = useCallback(
    (key: 'first' | 'second' | 'third', value: string, maxLength?: number) => {
      if (maxLength && value.length > maxLength) {
        alert('최대 글자수를 초과하였습니다.');
        return;
      }
      if (tempUser === null) return;
      if (key === 'first') {
        setTempPhone({ ...tempPhone, first: value });
        setTempUser({
          ...tempUser,
          phoneNumber: `${value}-${tempPhone.second}-${tempPhone.third}`,
        });
      } else if (key === 'second') {
        setTempPhone({ ...tempPhone, second: value });
        setTempUser({
          ...tempUser,
          phoneNumber: `${tempPhone.first}-${value}-${tempPhone.third}`,
        });
      } else if (key === 'third') {
        setTempPhone({ ...tempPhone, third: value });
        setTempUser({
          ...tempUser,
          phoneNumber: `${tempPhone.first}-${tempPhone.second}-${value}`,
        });
      }
    },
    [setTempUser, tempPhone, tempUser]
  );

  // init
  useEffect(() => {
    if (tempUser !== null && tempUser.phoneNumber !== null) {
      const phone = tempUser.phoneNumber.split('-');
      setTempPhone({ first: phone[0], second: phone[1], third: phone[2] });
    }
  }, [tempUser]);

  if (tempUser === null) return;
  return (
    <MyInfoBlock title={'회원정보'}>
      <Txt size="typo4" weight="bold" color="#212121" marginBottom={12}>
        나의 소개
      </Txt>
      <StyledTextarea
        value={tempUser.introduce === null ? '' : tempUser.introduce}
        onChange={(e) => handleUpdateTempUser('introduce', e.target.value, 200)}
        placeholder="안녕하세요. 저는 ㅇㅇ대학교에 재학 중인 4학년 ㅇㅇㅇ입니다. 요즘 저의 관심사는...안녕하세요. 저는 ㅇㅇ대학교에 재학 중인 4학년 ㅇㅇㅇ입니다. 요즘 저의 관심사는...안녕하세"
      />
      <MyPageGridBlock>
        <BasicInfoEdit title={'이름'} titleWidth={97} essential>
          <Input
            value={tempUser.username === null ? '' : tempUser.username}
            onChange={(e) => handleUpdateTempUser('username', e.target.value, 10)}
            width="207px"
            placeholder="이름 입력"
          />
        </BasicInfoEdit>
        <BasicInfoEdit title={'이메일'} titleWidth={97} essential>
          <Input
            value={tempUser.email ?? ''}
            onChange={(e) => handleUpdateTempUser('email', e.target.value, 100)}
            placeholder="이메일 입력"
          />
        </BasicInfoEdit>
        <BasicInfoEdit title={'닉네임'} titleWidth={97} essential>
          <Input
            value={tempUser.nickname ?? ''}
            onChange={(e) => handleUpdateTempUser('nickname', e.target.value, 20)}
            width="207px"
            placeholder="닉네임 입력"
          />
        </BasicInfoEdit>
        <BasicInfoEdit title={'학력/경력'} titleWidth={97} essential>
          <CareerSelect
            value={tempUser.backgroundStatus ?? ''}
            onChange={(e) => handleUpdateTempUser('backgroundStatus', e.target.value)}
          />
        </BasicInfoEdit>
        <BasicInfoEdit title={'전화번호'} titleWidth={97}>
          <FlexBlock>
            <PhoneBlock>
              <Input
                value={tempPhone.first}
                onChange={(e) => handleUpdateTempPhone('first', e.target.value, 3)}
                width="49px"
                placeholder="010"
              />
              <Hyphen />
              <Input
                value={tempPhone.second}
                onChange={(e) => handleUpdateTempPhone('second', e.target.value, 4)}
                width="49px"
                placeholder="0000"
              />
              <Hyphen />
              <Input
                value={tempPhone.third}
                onChange={(e) => handleUpdateTempPhone('third', e.target.value, 4)}
                width="49px"
                placeholder="0000"
              />
            </PhoneBlock>
            <Label>
              <CheckBox
                checked={tempUser.isOpenPhoneNum === null ? false : tempUser.isOpenPhoneNum}
                onChange={(e) => handleUpdateTempUser('isOpenPhoneNum', e.target.checked)}
              />
              <Txt size={'typo5'} weight={'regular'} color={'#616161'}>
                공개
              </Txt>
            </Label>
          </FlexBlock>
        </BasicInfoEdit>
        {tempUser.backgroundStatus && (
          <BasicInfoEdit title={isUserStudentOrWorker(tempUser.backgroundStatus)} titleWidth={97}>
            <Input
              value={tempUser.backgroundText === null ? '' : tempUser.backgroundText}
              onChange={(e) => handleUpdateTempUser('backgroundText', e.target.value, 50)}
              width="207px"
              placeholder={isUserStudentOrWorker(tempUser.backgroundStatus) + '을 입력하세요.'}
            />
          </BasicInfoEdit>
        )}
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
