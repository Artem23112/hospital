export const arrFromFirebaseObj = <T extends object>(obj: {
	[key: string]: T
}): Array<T & { id: string }> => {
	if (!(obj instanceof Object)) return []

	const keysAndValues = Object.entries(obj)

	return keysAndValues.map(([key, value]) => {
		return {
			id: key,
			...value
		}
	})
}
