import { arrFromFirebaseObj } from '@/assets/functions/array-from-firebase-object'
import { cleanExpiredAppointments } from '@/assets/functions/clean-expired-appointments'
import { sortAppointmentsList } from '@/assets/functions/sort-appointments-list'
import {
	userAppointmentsFromServer,
	UserAppointmentT,
	UniqueUserAppointmentT,
} from '@/redux/slices/appointments-slice/additionalThunks/serverUserCommunication/types'
import { setUserAppointments } from '@/redux/slices/appointments-slice/appointmentsSlice'
import { AppDispatch } from '@/redux/store'
import { ref, getDatabase, onValue } from 'firebase/database'

export function userSubscribeToAppointments(
	dispatch: AppDispatch,
	userId: string
) {
	const path = ref(getDatabase(), `users/${userId}/appointments`)

	onValue(path, async snapshot => {
		const data: unknown = snapshot.val()

		if (!userAppointmentsFromServer.guard(data)) return

		const parsedAppointments = arrFromFirebaseObj<UserAppointmentT>(data)
		await cleanExpiredAppointments(parsedAppointments, userId, 'user')

		const sorted =
			sortAppointmentsList<UniqueUserAppointmentT>(parsedAppointments)

		dispatch(setUserAppointments(sorted))
	})
}
