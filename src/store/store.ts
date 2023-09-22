import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE,  } from "./user.slice.ts";
import { removeStorage, saveStorage } from "./storage.ts";


export const store = configureStore({
	reducer: {
		user: userSlice
	}
})

store.subscribe(() => {
	if (store.getState().user.token === null) {
		removeStorage(JWT_PERSISTENT_STATE)
		return
	}
	saveStorage(JWT_PERSISTENT_STATE, store.getState().user.token)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch