export const arrFromFirebaseObj = <T>(
	obj: T
): Array<T[keyof T] & { id: string }> => {
	if (!(obj instanceof Object)) return []

	const keysAndValues = Object.entries(obj)

	return keysAndValues.map(([key, value]) => {
		if (typeof value !== 'object')
			return {
				id: key
			}

		return {
			id: key,
			...value
		}
	})
}
