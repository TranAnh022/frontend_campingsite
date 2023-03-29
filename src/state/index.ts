import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  mode: string;
  user: any | null;
  campsites: Array<CampsiteType>;
  campsite: CampsiteType | null;
  reviews: Array<ReviewType>;
}
const initialState: AuthState = {
  mode: "light",
  user: null,
  campsites: [],
  campsite: null,
  reviews: [],
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setModeLightDark: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setCampsites: (
      state,
      action: PayloadAction<{ campsites: Array<CampsiteType> }>
    ) => {
      state.campsites = action.payload.campsites;
    },
    showCampsite: (
      state,
      action: PayloadAction<{ campsite: CampsiteType }>
    ) => {
      state.campsite = action.payload.campsite;
    },
    removeCampsite: (
      state,
      action: PayloadAction<{ campsite: CampsiteType }>
    ) => {
      state.campsites = state.campsites.filter(
        (campsite) => campsite._id !== action.payload.campsite._id
      );
    },

    setReview: (
      state,
      action: PayloadAction<{ reviews: Array<ReviewType> }>
    ) => {
      state.reviews = action.payload.reviews;
    },
    addReview: (state, action: PayloadAction<{ review: ReviewType }>) => {
      state.reviews = [...state.reviews, action.payload.review];
    },
    removeReview: (state, action: PayloadAction<{ reviewId: string }>) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload.reviewId
      );
    },
  },
});

export const {
  setModeLightDark,
  setLogin,
  setLogout,
  setCampsites,
  showCampsite,
  setReview,
  removeReview,
  addReview,
  removeCampsite,
} = authSlice.actions;

export default authSlice.reducer;
