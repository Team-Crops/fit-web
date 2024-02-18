'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { policies } from '#/entities/policy';
import { useUpdateMyAgreementsMutation } from '#/redux/features/user/api';
import { Divider } from '#atoms/Divider';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { PoliciesBox } from '#molecules/Policies';

import type { PolicyName } from 'src/entities/policy';

const Container = styled.div`
  position: relative;

  @media (min-width: 768px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 15px;
  background: linear-gradient(180deg, #f0f3ff 0%, #fff 100%);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  padding: 34px 0 30px 0;

  border-radius: 15px 15px 0 0;
  background-color: #fafafa;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  padding: 50px 0 60px 0;

  border-radius: 0 0 15px 15px;
  background-color: #fff;
`;

const HelperTextContainer = styled.div`
  width: 700px;
  padding: 0 8px;
  display: flex;
  justify-content: end;
  color: #9e9e9e;
`;

const signUpTermNames: PolicyName[] = ['service', 'privacy'];

export const PoliciesPopup = () => {
  const [updateAgreements, { data: agreementsResult }] = useUpdateMyAgreementsMutation();

  const [agreements, setAgreements] = useState<Record<PolicyName, boolean>>(
    signUpTermNames.reduce((acc, name) => ({ ...acc, [name]: false }), {}) as Record<
      PolicyName,
      boolean
    >
  );

  useEffect(() => {
    if (Object.values(agreements).every((v) => v)) {
      updateAgreements({
        policyAgreementList: signUpTermNames.map((name) => ({
          policyType: policies[name].title,
          version: policies[name].version,
          isAgree: agreements[name],
        })),
      });
    }
  }, [agreements, updateAgreements]);

  return (
    <Container>
      <Header>
        <Icons icon="logo" width={80} height={26} />
        <div style={{ width: '16px' }} />
        <Txt size="typo2" weight="bold">
          이용 약관
        </Txt>
      </Header>
      <Divider />
      <Body>
        <PoliciesBox
          allChecked={Object.values(agreements).every((v) => v)}
          toggleAll={(e) => setAgreements(getAgreements(e.target.checked))}
        >
          {signUpTermNames.map((name) => (
            <PoliciesBox.Policy
              key={name}
              title={policies[name].title}
              text={policies[name].text}
              value={agreements[name]}
              onChange={(e) => setAgreements({ ...agreements, [name]: e.target.checked })}
            />
          ))}
        </PoliciesBox>
        <HelperTextContainer>
          <Txt size="typo5" weight="medium">
            *필수 약관에 동의하셔야 F-IT 회원가입이 가능합니다.
          </Txt>
        </HelperTextContainer>
      </Body>
    </Container>
  );
};

function getAgreements(value: boolean = false): Record<PolicyName, boolean> {
  return signUpTermNames.reduce((acc, name) => ({ ...acc, [name]: value }), {}) as Record<
    PolicyName,
    boolean
  >;
}
