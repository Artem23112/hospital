import { arrFromFirebaseObj } from '@/assets/functions/array-from-firebase-object'
import { cleanExpiredAppointments } from '@/assets/functions/clean-expired-appointments'
import { sortAppointmentsList } from '@/assets/functions/sort-appointments-list'
import {
	doctorAppointmentsFromServer,
	DoctorAppointmentT,
	UniqueDoctorAppointmentT,
} from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { setDoctorAppointments } from '@/redux/slices/appointments-slice/appointmentsSlice'
import { AppDispatch } from '@/redux/store'
import { getDatabase, onValue, ref } from 'firebase/database'

export function doctorSubscribeToAppointments(
	dispatch: AppDispatch,
	doctorId: string
): void {
	const path = ref(getDatabase(), `doctors/${doctorId}/appointments`)

	onValue(path, async snapshot => {
		const data: unknown = snapshot.val()
		if (!doctorAppointmentsFromServer.guard(data)) return

		const parsedAppointments = arrFromFirebaseObj<DoctorAppointmentT>(data)
		await cleanExpiredAppointments(parsedAppointments, doctorId, 'admin')

		const sorted =
			sortAppointmentsList<UniqueDoctorAppointmentT>(parsedAppointments)

		dispatch(setDoctorAppointments(sorted))
	})
}

export function doctorSubscribeToOwnPatients(
	dispatch: AppDispatch,
	doctorId: string
): void {
	const path = ref(getDatabase(), `doctors/${doctorId}/my-patients`)

	onValue(path, async snapshot => {
		const data: unknown = snapshot.val()
		if (!doctorAppointmentsFromServer.guard(data)) return

		const parsedAppointments = arrFromFirebaseObj<DoctorAppointmentT>(data)
	})
}
