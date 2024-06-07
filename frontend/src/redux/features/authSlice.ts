import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.accessToken = null;
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
