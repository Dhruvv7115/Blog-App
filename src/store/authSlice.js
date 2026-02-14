import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	userData: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.status = false;
			state.userData = null;
		},
		login(state, action) {
			state.status = true;
			state.userData = action.payload.userData;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
