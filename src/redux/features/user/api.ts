import { PolicyAgreement, PolicyType, policies } from '#/entities/policy';
import { User } from '#/entities/user';
import { api } from '#/redux/api';
import { updateMe } from './slice';

export interface UserUpdateRequest extends Partial<Omit<User, 'id' | 'status'>> {}
export interface UserUpdateResponse extends Partial<Omit<User, 'id'>> {}

export interface PolicyAgreementResponse {
  policyAgreementList: PolicyAgreement[];
}
export interface PolicyAgreementUpdateRequest {
  agreements: {
    policyType: string;
    isAgree: boolean;
  }[];
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
        method: 'PATCH',
        body: user,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(updateMe(data));
      },
    }),
    myAgreements: build.query<PolicyAgreement[], void>({
      query: () => ({
        url: `/v1/user/policy-agreement`,
        method: 'GET',
      }),
      transformResponse: (response: PolicyAgreementResponse) => response.policyAgreementList,
    }),
    updateMyAgreements: build.mutation<PolicyAgreementUpdateResponse, PolicyAgreementUpdateRequest>(
      {
        query: ({ agreements }) => ({
          url: `/v1/user/policy-agreement`,
          method: 'PUT',
          body: {
            policyAgreementList: Object.keys(policies).map((policyType) => ({
              policyType,
              version: policies[policyType as PolicyType].version,
              isAgree:
                agreements.find((agreement) => agreement.policyType === policyType)?.isAgree ??
                false,
            })),
          },
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          const { data } = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData('myAgreements', undefined, () => data.policyAgreementList)
          );
        },
      }
    ),
  }),
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useUpdateMeMutation,

  useMyAgreementsQuery,
  useLazyMyAgreementsQuery,
  useUpdateMyAgreementsMutation,
} = userApi;
export default userApi;
