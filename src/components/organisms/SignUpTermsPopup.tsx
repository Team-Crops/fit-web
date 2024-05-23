import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { SignUpTermsHeader } from '#/components/molecules/SignUpTermsHeader';
import { policies } from '#/entities';
import { usePolicyAgreesMutation, usePolicyAgreesQuery } from '#/hooks/use-policy-agrees';
import { useAuthStore } from '#/stores/auth';
import { PolicyAgreement, PolicyType } from '#/types';
import { PoliciesBox } from '#molecules/Policies';

const Container = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: min(100%, 830px);

  background-color: #fff;
  border-radius: 15px;
`;

interface SignUpTermsPopupProps {
  onSuccess: () => void;
}

export const SignUpTermsPopup: React.FC<SignUpTermsPopupProps> = ({ onSuccess }) => {
  const [policyAgrees, setPolicyAgrees] = useState<{ type: PolicyType; isAgree: boolean }[]>([]);
  const [allAgreed, setAllAgreed] = useState(false);

  const setAgreed = useAuthStore((store) => store.setPolicyAgreed);

  const { data: fetchedAgrees, isLoading: isLoadingAgrees } = usePolicyAgreesQuery();
  const {
    data: mutatedAgreements,
    trigger: updateAgreements,
    isMutating: isMutatingAgreements,
  } = usePolicyAgreesMutation();

  useEffect(() => {
    if (allAgreed && !isMutatingAgreements) {
      updateAgreements(
        policyAgrees.map((agree) => ({ type: agree.type, isAgree: agree.isAgree })),
        {
          optimisticData: {
            policyAgreementList: policyAgrees,
          },
        }
      );
      setAgreed(true);
      onSuccess();
    }
  }, [allAgreed, isMutatingAgreements, onSuccess, policyAgrees, setAgreed, updateAgreements]);

  useEffect(() => {
    if (policyAgrees.length > 0) {
      setAllAgreed(policyAgrees.every((agree) => agree.isAgree));
    }
  }, [policyAgrees]);

  useEffect(() => {
    if (fetchedAgrees || mutatedAgreements) {
      const newAgrees: PolicyAgreement[] = fetchedAgrees || mutatedAgreements || [];
      setPolicyAgrees(
        Object.values(policies).map(({ type }) => {
          const agree = newAgrees.find((agree) => agree.policyType === type);
          return {
            type,
            isAgree: agree?.isAgree ?? false,
          };
        })
      );
    }
  }, [fetchedAgrees, mutatedAgreements]);

  return (
    <Container>
      <SignUpTermsHeader />
      <PoliciesBox
        allChecked={allAgreed}
        disabled={isLoadingAgrees}
        toggleAll={(e) => {
          const newAgrees = policyAgrees.map((agree) => ({ ...agree, isAgree: e.target.checked }));
          setPolicyAgrees(newAgrees);
        }}
      >
        {Object.values(policies).map((policy) => (
          <PoliciesBox.Policy
            key={policy.type}
            title={policy.title}
            type={policy.type}
            disabled={isLoadingAgrees}
            value={policyAgrees.find((agree) => agree.type === policy.type)?.isAgree ?? false}
            onChange={(e) => {
              updateAgreements(
                { type: policy.type, isAgree: e.target.checked },
                {
                  optimisticData: {
                    policyAgreementList: [
                      ...policyAgrees,
                      { type: policy.type, isAgree: e.target.checked },
                    ],
                  },
                }
              );
            }}
          />
        ))}
      </PoliciesBox>
      <div />
    </Container>
  );
};
