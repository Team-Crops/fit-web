import { produce } from 'immer';
import { create } from 'zustand';

import { emptyFetchState } from '#/entities/empty-fetch-state';
import { FetchState, Matching, MatchingRoom } from '#/types';

interface MatchingState {
  matching: FetchState<Matching>;
  room: Record<MatchingRoom['id'], FetchState<MatchingRoom>>;
}

interface MatchingAction {
  setMatching: (state: FetchState<Matching>) => void;
  clearMatching: () => void;

  setRoom: (id: MatchingRoom['id'], state: FetchState<MatchingRoom>) => void;
  clearRoom: () => void;
}

export const useMatchingStore = create<MatchingState & MatchingAction>((set) => ({
  matching: emptyFetchState,
  room: {},

  setMatching: (matching) =>
    set(
      produce((state: MatchingState) => {
        state.matching = matching;
      })
    ),
  clearMatching: () =>
    set(
      produce((state: MatchingState) => {
        state.matching = emptyFetchState;
      })
    ),

  setRoom: (id, room) =>
    set(
      produce((state: MatchingState) => {
        state.room[id] = room;
      })
    ),
  clearRoom: () =>
    set(
      produce((state: MatchingState) => {
        state.room = {};
      })
    ),
}));

export const useMatching = () => {
  return useMatchingStore((state) => state.matching);
};

export const useMatchingRoom = (id?: MatchingRoom['id'] | null) => {
  return useMatchingStore((state) => (id ? state.room[id] : emptyFetchState));
};
