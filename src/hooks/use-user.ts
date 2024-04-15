'use client';

import { useCallback, useEffect, useState } from 'react';

import { getMe, updateMe } from '#/actions/user';
import { useAuthStore } from '#/stores/auth';

export function useUser() {
  const [{ error, isLoading, isError }, set] = useState<{
    error: any;
    isLoading: boolean;
    isError: boolean;
  }>({
    error: null,
    isLoading: true,
    isError: false,
  });

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const mutate = useCallback(
    async (data: Parameters<typeof updateMe>[0]) => {
      try {
        if (user) {
          set({ error: null, isLoading: true, isError: false });
          const me = await updateMe(data);
          setUser({ ...user, ...me });
          set({ error: null, isLoading: false, isError: false });
        }
      } catch (error) {
        set({ error, isLoading: false, isError: true });
      }
    },
    [setUser, user]
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const me = await getMe();
        setUser(me);
        set({ error: null, isLoading: false, isError: false });
      } catch (error) {
        set({ error, isLoading: false, isError: true });
      }
    }
    fetchUser();
  }, [setUser]);

  return { data: user, mutate, error, isLoading, isError };
}
