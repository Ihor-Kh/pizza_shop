import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadStorage, saveStorage } from "./storage.ts";

export const JWT_PERSISTENT_STATE = 'jwt_token'

export interface UserState {
	token: string | null
}

const initialState: UserState = {
	token: loadStorage(JWT_PERSISTENT_STATE) ?? null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload
			// localStorage.setItem('jwt_token', action.payload)
			saveStorage(JWT_PERSISTENT_STATE, action.payload)
		},
		logout: (state) => {
			state.token = null
		}
	}
})

export default userSlice.reducer
export const usersActions = userSlice.actions