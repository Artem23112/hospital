import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/arrFromFirebaseObj'
import { sortAppointmentsList } from '../../../../../assets/functions/sortAppointmentsList'
import { setUserAppointments } from '../../appointmentsSlice'
import {
	DoctorInfoT,
	UniqueUserAppointmentT,
	UserAppointmentT
} from '../../types'

export const userConnectToServer = createAsyncThunk(
	'appointments/userConnectToServer',
	async (userId: string, { dispatch }) => {
		const userAppointmentsPath = ref(
			getDatabase(),
			`users/${userId}/appointments`
		)

		onValue(userAppointmentsPath, snapshot => {
			if (!snapshot.exists()) return

			const parsedAppointments = arrFromFirebaseObj<{
				[key: string]: UserAppointmentT
			}>(snapshot.val())

			const sorted = sortAppointmentsList(parsedAppointments)

			dispatch(setUserAppointments(sorted as UniqueUserAppointmentT[]))
		})

		const doctorsInfoPath = ref(getDatabase(), 'doctors-info')
		const doctorsInfo = (await get(doctorsInfoPath)).val()

		return arrFromFirebaseObj<{ [key: string]: DoctorInfoT }>(doctorsInfo)
	}
)
