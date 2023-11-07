import { Unsubscribe, User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { setSavedUser } from '../redux/slices/authentication-slice/authenticationSlice'
import { AppDispatch } from '../redux/store'

export const subscribeToUserAvailability = (
	dispatch: AppDispatch
): Unsubscribe => {
	const unsubscribe = onAuthStateChanged(getAuth(), (user: User | null) => {
		if (user) {
			dispatch(
				setSavedUser({
					email: user.email,
					id: user.uid,
					isAuth: true
				})
			)
		}
	})

	return unsubscribe
}
