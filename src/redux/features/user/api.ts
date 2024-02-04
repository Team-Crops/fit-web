import { User } from '#/entities/user';
import { api } from '#/redux/api';

export interface UserResponse extends User {}
export interface UserUpdateRequest extends Partial<Omit<User, 'id'>> {}

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<UserResponse, void>({
      query: () => ({
        url: `/v1/user`,
        method: 'GET',
      }),
    }),
    updateMe: build.mutation<UserResponse, UserUpdateRequest>({
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
