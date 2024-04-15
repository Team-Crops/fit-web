'use client';

import { useEffect, useState } from 'react';

import { getPositions } from '#/actions/skill-set';
import { Position } from '#/entities/position';

export function usePositions() {
  const [{ data, error, isLoading, isError }, set] = useState<{
    data: Position[] | null;
    error: any;
    isLoading: boolean;
    isError: boolean;
  }>({
    data: null,
    error: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    async function fetchPositions() {
      try {
        const positions = await getPositions();
        set({ data: positions, error: null, isLoading: false, isError: false });
      } catch (error) {
        set({ data: null, error, isLoading: false, isError: true });
      }
    }
    fetchPositions();
  }, []);

  return { data, error, isLoading, isError };
}
