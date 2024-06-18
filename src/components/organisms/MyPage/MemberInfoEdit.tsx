import { use, useCallback, useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { CareerSelect } from '#/components/molecules/CareerSelect';
import { useTempAuthStore } from '#/stores/tempAuth';
import { isUserStudent, isUserWorker } from '#/utilities/user';
import { CheckBox } from '#atoms/CheckBox';
import { Input } from '#atoms/Input';
import { Select } from '#atoms/Select';
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
  cursor: pointer;
  display: flex;
  gap: 9px;
  align-items: center;
`;
export const MemberInfoEdit = () => {
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const [tempEmail, setTempEmail] = useState<{ id: string; domain: string }>({
    id: '',
    domain: '',
  });
  const [tempPhone, setTempPhone] = useState<{ first: string; second: string; third: string }>({
    first: '',
    second: '',
    third: '',
  });
  const setTempUser = useTempAuthStore((state) => state.setTempUser);

  const handleUpdateTempUser = useCallback(
    (key: string, value: any, maxLength?: number) => {
      if (maxLength && value.length > maxLength) {
        alert('최대 글자수를 초과하였습니다.');
        return;
      }
      if (tempUser !== null) setTempUser({ ...tempUser, [key]: value });
    },
    [tempUser, setTempUser]
  );

  const handleUpdateTempEmail = useCallback(
    (key: 'id' | 'domain', value: string, maxLength?: number) => {
      if (maxLength && value.length > maxLength) {
        alert('최대 글자수를 초과하였습니다.');
        return;
      }
      if (tempUser === null) return;
      if (key === 'id') {
        setTempEmail({ ...tempEmail, id: value });
        setTempUser({ ...tempUser, email: `${value}@${tempEmail.domain}` });
      } else {
        setTempEmail({ ...tempEmail, domain: value });
        setTempUser({ ...tempUser, email: `${tempEmail.id}@${value}` });
      }
    },
    [setTempUser, tempEmail, tempUser]
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
    if (tempUser !== null && tempUser.email !== null) {
      const email = tempUser.email.split('@');
      setTempEmail({ id: email[0], domain: email[1] });
    }
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
          <EmailBlock>
            <Input
              value={tempEmail.id}
              onChange={(e) => handleUpdateTempEmail('id', e.target.value, 20)}
              width="118px"
              placeholder="이메일 입력"
            />
            <Select
              value={tempEmail.domain}
              onChange={(e) => handleUpdateTempEmail('domain', e.target.value)}
              width="128px"
              placeholder="선택하세요"
            >
              <Select.Option value="google.com">google.com</Select.Option>
              <Select.Option value="naver.com">naver.com</Select.Option>
            </Select>
          </EmailBlock>
        </BasicInfoEdit>
        <BasicInfoEdit title={'닉네임'} titleWidth={97} essential>
          <Input
            value={tempUser.nickname === null ? '' : tempUser.nickname}
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
          <BasicInfoEdit
            title={
              isUserStudent(tempUser.backgroundStatus)
                ? '학교명'
                : isUserWorker(tempUser.backgroundStatus)
                  ? '회사명'
                  : '그룹명'
            }
            titleWidth={97}
          >
            <Input
              value={tempUser.backgroundText === null ? '' : tempUser.backgroundText}
              onChange={(e) => handleUpdateTempUser('backgroundText', e.target.value, 50)}
              width="207px"
              placeholder="회사명을 입력하세요."
            />
          </BasicInfoEdit>
        )}
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
