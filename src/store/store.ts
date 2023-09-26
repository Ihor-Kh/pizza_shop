import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE, } from "./user.slice.ts";
import { removeStorage, saveStorage } from "./storage.ts";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice.ts";


export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice,
	}
})

store.subscribe(() => {
	if (store.getState().user.token === null) {
		removeStorage(JWT_PERSISTENT_STATE)
		return
	}
	saveStorage(JWT_PERSISTENT_STATE, store.getState().user.token)

	// if (store.getState().cart.items.length > 0) {
		saveStorage(CART_PERSISTENT_STATE, store.getState().cart.items)
	// }

	console.log('store.subscribe')
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch