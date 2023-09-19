import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE,  } from "./user.slice.ts";
import { saveStorage } from "./storage.ts";


export const store = configureStore({
	reducer: {
		user: userSlice
	}
})

store.subscribe(() => {
	saveStorage(JWT_PERSISTENT_STATE, store.getState().user.token)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch