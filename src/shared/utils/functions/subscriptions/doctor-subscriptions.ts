import {
	setDoctorAppointments,
	setDoctorPatients,
} from '@/redux/slices/doctorSlice/doctorSlice'
import {
	DoctorAppointmentT,
	UniqueDoctorAppointmentT,
	doctorAppointmentsFromServer,
	doctorPatientsFromServer,
} from '@/redux/slices/doctorSlice/serverDoctorCommunication/types'
import { AppDispatch } from '@/redux/store'
import { cleanExpiredAppointments } from '@/shared/utils/functions/clean/clean-expired-appointments'
import { arrFromFirebaseObj } from '@/shared/utils/functions/convert/array-from-firebase-object'
import { sortAppointmentsList } from '@/shared/utils/functions/sort/sort-appointments-list'
import { getDatabase, onValue, ref } from 'firebase/database'

export function doctorSubscribeToAppointments(
	dispatch: AppDispatch,
	doctorId: string
): void {
	const path = ref(getDatabase(), `doctors/${doctorId}/appointments`)

	onValue(path, async snapshot => {
		const data: unknown = snapshot.val()
		if (!doctorAppointmentsFromServer.guard(data)) return
		debugger
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

		if (!doctorPatientsFromServer.guard(data)) return
		const parsedList = Object.keys(data)
		
		dispatch(setDoctorPatients(parsedList))
	})
}
