import { PolicyAgreement } from '#/entities/policy';
import { User } from '#/entities/user';
import { api } from '#/redux/api';
import { updateMe } from './slice';

export interface UserUpdateRequest extends Partial<Omit<User, 'id' | 'status'>> {}
export interface UserUpdateResponse extends Partial<Omit<User, 'id'>> {}

export interface PolicyAgreementResponse {
  policyAgreementList: PolicyAgreement[];
}
export interface PolicyAgreementUpdateRequest {
  agreements: PolicyAgreement[];
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
            policyAgreementList: agreements.map((agreement) => ({
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
  useLazyMyAgreementsQuery,
  useUpdateMyAgreementsMutation,
} = userApi;
export default userApi;
