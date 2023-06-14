import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SavedState {
  saved: string[];
}

const initialState: SavedState = {
  saved: []
};

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.saved.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.saved.findIndex((id) => id === itemId);
      if (index !== -1) {
        state.saved.splice(index, 1);
      }
    },
    addItems: (state, action: PayloadAction<string[]>) => {
      state.saved = action.payload;
    },
    clearItems: (state) => {
      state.saved = [];
    }
  }
});

export const { addItem, addItems, removeItem, clearItems } = savedSlice.actions;

export default savedSlice.reducer;
