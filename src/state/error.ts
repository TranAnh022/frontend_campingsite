import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  setShowAlert: (value: boolean) => void;
  errorMess: string;
  showAlert: boolean;
  status: string;
}

const initialState: AlertState = {
  setShowAlert() {},
  errorMess: "",
  showAlert: false,
  status: "danger",
};

export const alertSlice = createSlice({
  name: "alertMaterial",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ errorMess: string; status: string }>
    ) => {
      state.errorMess = action.payload.errorMess;
      state.status = action.payload.status;
    },
    setShow: (state, action: PayloadAction<{ value: boolean }>) => {
      state.showAlert = action.payload.value;
     
    },
  },
});

export const { setError, setShow } = alertSlice.actions;

export default alertSlice.reducer;
