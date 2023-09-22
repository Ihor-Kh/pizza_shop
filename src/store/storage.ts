export function loadStorage (key: string) {
	try {
		const jsonStore = localStorage.getItem(key)
		if (!jsonStore) return undefined
		return JSON.parse(jsonStore)
	}
	catch (e) {
	   console.error(e)
		return undefined
	}
}

export function saveStorage<T>(key: string, value: T) {
	const stringState = JSON.stringify(value)
	localStorage.setItem(key, stringState)
}

export function removeStorage(key: string) {
	localStorage.removeItem(key)
}