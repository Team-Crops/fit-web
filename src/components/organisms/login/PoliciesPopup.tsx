'use client';

import { useCallback, useEffect, useMemo } from 'react';

import styled from '@emotion/styled';

import _ from 'lodash';

import { policies } from '#/entities/policy';
import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useMyAgreementsQuery, useUpdateMyAgreementsMutation } from '#/redux/features/user/api';
import { useAppDispatch } from '#/redux/hooks';
import { Divider } from '#atoms/Divider';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { PoliciesBox } from '#molecules/Policies';

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(180deg, #f0f3ff 0%, #fff 100%);
  border-radius: 15px;

  @media (width >= 768px) {
    width: 768px;
  }

  @media (width <= 768px) {
    padding: 30px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 34px 0 30px;

  background-color: #fafafa;
  border-radius: 15px 15px 0 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 50px 0 60px;

  background-color: #fff;
  border-radius: 0 0 15px 15px;
`;

const HelperTextContainer = styled.div`
  display: flex;
  justify-content: end;

  width: 700px;
  padding: 0 8px;

  color: #9e9e9e;
`;

type PolicyType = keyof typeof policies;
const policyTypes: PolicyType[] = ['SERVICE_POLICY', 'PRIVACY_POLICY'];

export const PoliciesPopup = () => {
  const dispatch = useAppDispatch();
  const { data: fetchedAgreements, isLoading: isLoadingAgreements } = useMyAgreementsQuery();
  const [updateAgreements, { data: updatedAgreements }] = useUpdateMyAgreementsMutation();

  const agreements = useMemo(() => {
    if (!fetchedAgreements) return {};
    return _.keyBy(fetchedAgreements, 'policyType');
  }, [fetchedAgreements]);

  const goForwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.Policies + 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (updatedAgreements && updatedAgreements.policyAgreementList.every((a) => a.isAgree)) {
      goForwardStep();
    }
  }, [updatedAgreements, goForwardStep]);

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
          allChecked={policyTypes.every((name) => agreements[name])}
          disabled={isLoadingAgreements}
          toggleAll={(e) => {
            updateAgreements({
              agreements: policyTypes.map((type) => ({
                policyType: type,
                isAgree: e.target.checked,
              })),
            });
          }}
        >
          {policyTypes.map((name) => (
            <PoliciesBox.Policy
              key={name}
              title={policies[name].title}
              text={policies[name].text}
              value={agreements[name]}
              disabled={isLoadingAgreements}
              onChange={(e) =>
                updateAgreements({
                  agreements: policyTypes.map((type) => ({
                    policyType: type,
                    isAgree: type === name ? e.target.checked : agreements[type] ?? false,
                  })),
                })
              }
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
