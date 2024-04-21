import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { User } from '#/types/user';
import { fitFetch, fitFetcher } from '#/utilities/fetch';

export const USER_QUERY_KEY = '/v1/user';
const USER_MUTATE_KEY = '/v1/user';

interface UserQueryResponse extends User {}

export function useUserQuery() {
  return useSWR<UserQueryResponse>(USER_QUERY_KEY, fitFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
}

interface UserMutationArgs extends Partial<Omit<User, 'id' | 'status'>> {}
interface UserMutationResponse extends User {}

async function sendUserMutationRequest(url: string, { arg }: { arg: UserMutationArgs }) {
  const nullSafedArg = Object.fromEntries(
    Object.entries(arg).filter(([, value]) => value !== null)
  );
  const response = await fitFetch(url, { method: 'PATCH', body: JSON.stringify(nullSafedArg) });
  const json = await response.json();
  return json as UserMutationResponse;
}

export function useUserMutation() {
  return useSWRMutation<User, any, typeof USER_MUTATE_KEY, UserMutationArgs>(
    USER_MUTATE_KEY,
    sendUserMutationRequest,
    {
      onSuccess: (data) => mutate<User>(USER_QUERY_KEY, data),
    }
  );
}
