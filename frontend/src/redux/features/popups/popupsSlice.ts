import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type MainState = {
  activePopup: string | null;
  popupTitle: string | null;
  data: any;
};

const initialState: MainState = {
  activePopup: null,
  popupTitle: null,
  data: null,
};

export interface PopupOpenParams {
  name: string;
  title?: string;
  data?: any;
}

export const popupSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    popupOpen(state, action: PayloadAction<PopupOpenParams>) {
      state.activePopup = action.payload.name;
      state.popupTitle = action.payload.title || null;
      state.data = action.payload.data || null;
    },
    popupClose(state) {
      state.activePopup = null;
      state.popupTitle = null;
      state.data = null;
    },
    setPopupTitle(state, action: PayloadAction<string>) {
      state.popupTitle = action.payload;
    },
    resetPopupTitle(state) {
      state.popupTitle = null;
    },
  },
});

export const { popupOpen, popupClose, setPopupTitle, resetPopupTitle } = popupSlice.actions;
export default popupSlice.reducer;
