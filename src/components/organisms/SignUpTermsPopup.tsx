import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { produce } from 'immer';

import { Button } from '#/components/atoms';
import { PoliciesBox } from '#/components/molecules/Policies';
import { SignUpTermsHeader } from '#/components/molecules/SignUpTermsHeader';
import { policies } from '#/entities';
import { usePolicyAgreesMutation, usePolicyAgreesQuery } from '#/hooks/use-policy-agrees';
import { PolicyAgreement, PolicyType } from '#/types';

export const SignUpTermsPopup = () => {
  const [policyAgrees, setPolicyAgrees] = useState<Record<PolicyType, PolicyAgreement>>(
    Object.values(policies).reduce(
      (acc, { type }) => ({ ...acc, [type]: { type, version: '', isAgreed: false } }),
      {} as Record<PolicyType, PolicyAgreement>
    )
  );
  const [expandedPolicy, setExpandedPolicy] = useState<PolicyType | null>(null);

  const isAllAgreed = useMemo(() => {
    return Object.values(policyAgrees).every(({ isAgreed }) => isAgreed);
  }, [policyAgrees]);

  const { data: fetchedAgrees, isLoading: isLoadingAgrees } = usePolicyAgreesQuery();
  const { trigger: updateAgreements, isMutating: isMutatingAgreements } = usePolicyAgreesMutation();

  useEffect(() => {
    if (fetchedAgrees) {
      setPolicyAgrees(
        produce((draft) => {
          for (const { type, isAgreed } of fetchedAgrees) {
            draft[type].isAgreed = isAgreed;
          }
        })
      );
    }
  }, [fetchedAgrees]);

  return (
    <Container>
      <SignUpTermsHeader />
      <PoliciesBox
        allChecked={isAllAgreed}
        disabled={isLoadingAgrees}
        toggleAll={(e) => {
          setPolicyAgrees(
            produce((draft) => {
              for (const { type } of Object.values(policies)) {
                draft[type].isAgreed = e.target.checked;
              }
            })
          );
        }}
      >
        {Object.values(policies).map((policy) => (
          <PoliciesBox.Policy
            key={policy.type}
            title={policy.title}
            type={policy.type}
            disabled={isLoadingAgrees}
            expanded={expandedPolicy === policy.type}
            value={policyAgrees[policy.type].isAgreed}
            onClick={() => setExpandedPolicy((t) => (policy.type === t ? null : policy.type))}
            onChange={(e) =>
              setPolicyAgrees(
                produce((draft) => {
                  draft[policy.type].isAgreed = e.target.checked;
                })
              )
            }
          />
        ))}
      </PoliciesBox>
      <Button
        height="70"
        variant="round"
        color={isAllAgreed ? 'primary' : 'secondary'}
        disabled={!isAllAgreed && isMutatingAgreements}
        onClick={() => updateAgreements(Object.values(policyAgrees))}
      >
        다음
      </Button>
      <div />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;

  width: min(100%, 830px);
  max-height: 100vh;
  margin: 0 4px;

  background-color: #fff;
  border-radius: 15px;
`;
