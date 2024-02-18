import { PolicyAgreement } from '#/entities/policyAgreement';
import { User } from '#/entities/user';
import { api } from '#/redux/api';

export interface UserUpdateRequest extends Partial<Omit<User, 'id' | 'status'>> {}
export interface UserUpdateResponse extends Partial<Omit<User, 'id'>> {}

export interface PolicyAgreementResponse {
  policyAgreementList: PolicyAgreement[];
}
export interface PolicyAgreementUpdateRequest {
  policyAgreementList: PolicyAgreement[];
}
export interface PolicyAgreementUpdateResponse {
  policyAgreementList: PolicyAgreement[];
}

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => ({
        url: `/v1/user`,
        method: 'GET',
      }),
    }),
    updateMe: build.mutation<UserUpdateResponse, UserUpdateRequest>({
      query: (user) => ({
        url: `/v1/user`,
        method: 'PUT',
        body: user,
      }),
    }),
    myAgreements: build.query<PolicyAgreementResponse, void>({
      query: () => ({
        url: `/v1/user/policy-agreement`,
        method: 'GET',
      }),
    }),
    updateMyAgreements: build.mutation<PolicyAgreementUpdateResponse, PolicyAgreementUpdateRequest>(
      {
        query: (agreements) => ({
          url: `/v1/user/policy-agreement`,
          method: 'PUT',
          body: {
            policyAgreementList: agreements.policyAgreementList.map((agreement) => ({
              ...agreement,
              updatedAt: new Date().toISOString(),
            })),
          },
        }),
      }
    ),
  }),
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useUpdateMeMutation,
  useMyAgreementsQuery,
  useUpdateMyAgreementsMutation,
} = userApi;
export default userApi;
