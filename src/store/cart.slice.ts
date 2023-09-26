import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadStorage } from "./storage.ts";

export const CART_PERSISTENT_STATE = 'cart_pizza_shop'

export interface CartItem {
	id: number
	count: number
}

interface CartState {
	items: CartItem[]
}

const initialState: CartState = {
	items: loadStorage(CART_PERSISTENT_STATE) ?? [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		deleteItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== action.payload)
		},
		removeItem: (state, action: PayloadAction<number>) => {
			const existItem = state.items.find((item) => item.id === action.payload)
			if (!existItem) return

			existItem.count -= 1
			if (existItem.count === 0) {
				state.items = state.items.filter((item) => item.id !== action.payload)
			}
		},
		addItem: (state, action: PayloadAction<number>) => {
			const existItem = state.items.find((item) => item.id === action.payload)

			if (existItem) existItem.count += 1
			else state.items.push({ id: action.payload, count: 1 })
		},
		clearCart: (state) => {
			state.items = []
		}
	},
})

export default cartSlice.reducer
export const cartActions = cartSlice.actions