import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum MatchingStep {
  POSITION_CHECKING,
  QUEUING,
  MATCHED,
}

type MatchingState = {
  step: MatchingStep;
};

const initialState: MatchingState = {
  step: 0,
};

const matchingSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    updateMatchingStep(state, action: PayloadAction<MatchingStep>) {
      state.step = action.payload;
    },
  },
});

export const { updateMatchingStep } = matchingSlice.actions;
export default matchingSlice.reducer;
