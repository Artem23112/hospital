import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/arrFromFirebaseObj'
import { sortAppointmentsList } from '../../../../../assets/functions/sortAppointmentsList'
import { setDoctorAppointments } from '../../appointmentsSlice'
import {
	DoctorAppointmentT,
	UniqueDoctorAppointmentT,
	UserInfoT
} from '../../types'

export const doctorConnectToServer = createAsyncThunk(
	'appointments/adminConnectToServer',
	async (uid: string, { dispatch }) => {
		const path = ref(getDatabase(), `doctors/${uid}/appointments`)

		onValue(path, snapshot => {
			if (!snapshot.exists()) return

			const parsedAppointments = arrFromFirebaseObj<{
				[key: string]: DoctorAppointmentT
			}>(snapshot.val())
			const sorted = sortAppointmentsList(parsedAppointments)

			dispatch(setDoctorAppointments(sorted as UniqueDoctorAppointmentT[]))
		})

		const usersInfoPath = ref(getDatabase(), 'users-info')
		const usersInfo = (await get(usersInfoPath)).val()

		return arrFromFirebaseObj<{ [key: string]: UserInfoT }>(usersInfo)
	}
)
