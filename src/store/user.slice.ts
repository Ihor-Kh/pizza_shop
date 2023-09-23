import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadStorage, removeStorage, saveStorage } from "./storage.ts";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../interfaces/auth.interface.ts";
import { PREFIX } from "../helpers/api.ts";
import { Profile } from "../interfaces/profile.interface.ts";
import { RootState } from "./store.ts";

export const JWT_PERSISTENT_STATE = 'jwt_token'

export interface UserState {
	token: string | null
	errorMessage?: string
	profile?: Profile
}

const initialState: UserState = {
	token: loadStorage(JWT_PERSISTENT_STATE) ?? null,
}

export const login = createAsyncThunk('user/login',
	async (params: { email: string, password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${ PREFIX }/auth/login`, {
				email: params.email,
				password: params.password
			})
			return data
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data?.message ?? e.message)
			}
			console.error(e)
		}
	}
)

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/getProfile',
	// @ts-ignore
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get<Profile>(`${ PREFIX }/user/profile`, {
				headers: {
					Authorization: `Bearer ${ thunkAPI.getState().user.token }`
				}
			})
			console.log(data)
			return data
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data?.message ?? e.message)
			}
			console.error(e)
		}
	})

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
			removeStorage(JWT_PERSISTENT_STATE)
		},
		clearErrorMessage: (state) => {
			state.errorMessage = undefined
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse | undefined>) => {
			if (!action.payload) return
			state.token = action.payload.access_token
		})

		builder.addCase(login.rejected, (state, action) => {
			state.token = null
			state.errorMessage = action.error.message
		})

		builder.addCase(getProfile.fulfilled, (state, action) => {
			if (!action.payload) return
			state.profile = action.payload
		})
	}
})

export default userSlice.reducer
export const usersActions = userSlice.actions


















