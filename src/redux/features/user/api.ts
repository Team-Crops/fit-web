import { User } from '#/entities/user';
import { api } from '#/redux/api';

export interface UserUpdateRequest extends Partial<Omit<User, 'id' | 'status'>> {}
export interface UserUpdateResponse extends Partial<Omit<User, 'id'>> {}

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
  }),
});

export const { useMeQuery, useLazyMeQuery, useUpdateMeMutation } = userApi;
export default userApi;
