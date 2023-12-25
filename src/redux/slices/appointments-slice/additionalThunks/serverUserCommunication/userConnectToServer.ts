import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import { sortAppointmentsList } from '../../../../../assets/functions/sort-appointments-list'
import { setUserAppointments } from '../../appointmentsSlice'
import {
	DoctorInfoT,
	UniqueUserAppointmentT,
	UserAppointmentT
} from '../../types'
import { cleanExpiredAppointments } from '../../../../../assets/functions/clean-expired-appointments'

export const userConnectToServer = createAsyncThunk(
	'appointments/userConnectToServer',
	async (userId: string, { dispatch }) => {
		const userAppointmentsPath = ref(
			getDatabase(),
			`users/${userId}/appointments`
		)

		onValue(userAppointmentsPath, async snapshot => {
			const parsedAppointments =
				arrFromFirebaseObj<AppointmentListFromFirebase>(snapshot.val())
			await cleanExpiredAppointments(parsedAppointments, userId, 'user')

			const sorted = sortAppointmentsList(parsedAppointments)

			dispatch(setUserAppointments(sorted as UniqueUserAppointmentT[]))
		})

		const doctorsInfoPath = ref(getDatabase(), 'doctors-info')
		const doctorsInfo = (await get(doctorsInfoPath)).val()

		return arrFromFirebaseObj<{ [key: string]: DoctorInfoT }>(doctorsInfo)
	}
)

interface AppointmentListFromFirebase {
	[key: string]: UserAppointmentT
}
