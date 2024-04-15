'use client';

import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { getPolicyAgreements, updatePolicyAgreements } from '#/actions/user';
import { SignUpTermsHeader } from '#/components/molecules/SignUpTermsHeader';
import { PolicyAgreement, PolicyType, policies } from '#/entities/policy';
import { useSignUpStore } from '#/stores/sign-up';
import { SignUpStep } from '#/types/sign-up-step';
import { PoliciesBox } from '#molecules/Policies';

const Container = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: min(100%, 830px);
  height: 510px;

  background-color: #fff;
  border-radius: 15px;
`;

export const SignUpTermsPopup = () => {
  const [loading, setLoading] = useState(true);
  const [agreements, setAgreements] = useState<Record<PolicyType, PolicyAgreement>>(
    Object.values(policies).reduce(
      (acc, cur) => ({
        ...acc,
        [cur.type]: { type: cur.type, version: cur.version, isAgree: false },
      }),
      {}
    ) as Record<PolicyType, PolicyAgreement>
  );

  const setStep = useSignUpStore((state) => state.setStep);

  const updateAgreements = useCallback(
    async ({ type, value }: { type?: PolicyType; value: boolean }) => {
      if (type) {
        const updated = await updatePolicyAgreements(
          Object.values({ ...agreements, [type]: { ...agreements[type], isAgree: value } })
        );
        setAgreements(updated.reduce((acc, cur) => ({ ...acc, [cur.type]: cur }), agreements));
      } else {
        const updated = await updatePolicyAgreements(
          Object.values(agreements).map((agreement) => ({ ...agreement, isAgree: value }))
        );
        setAgreements(updated.reduce((acc, cur) => ({ ...acc, [cur.type]: cur }), agreements));
      }

      if (Object.values(agreements).every((agreement) => agreement.isAgree)) {
        setStep(SignUpStep.TermsAgreement + 1);
      }
    },
    [agreements, setStep]
  );

  useEffect(() => {
    async function loadAgreements() {
      const loaded = await getPolicyAgreements();
      setAgreements((prev) => ({
        ...prev,
        ...loaded.reduce((acc, cur) => ({ ...acc, [cur.type]: cur }), {}),
      }));
      setLoading(false);
    }

    loadAgreements();
  }, []);

  return (
    <Container>
      <SignUpTermsHeader />
      <PoliciesBox
        allChecked={Object.values(agreements).every((agreement) => agreement.isAgree)}
        disabled={loading}
        toggleAll={(e) => updateAgreements({ value: e.target.checked })}
      >
        {Object.entries(policies).map(([type, policy]) => (
          <PoliciesBox.Policy
            key={type}
            title={policy.title}
            text={policy.text}
            disabled={loading}
            value={agreements[type as PolicyType]?.isAgree}
            onChange={(e) => {
              console.log(
                agreements[type as PolicyType]?.isAgree,
                e.target.value,
                e.target.checked
              );
              updateAgreements({ type: type as PolicyType, value: e.target.checked });
            }}
          />
        ))}
      </PoliciesBox>
      <div />
    </Container>
  );
};
