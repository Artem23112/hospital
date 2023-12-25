import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import { sortAppointmentsList } from '../../../../../assets/functions/sort-appointments-list'
import { RootState } from '../../../../store'
import { setDoctorAppointments } from '../../appointmentsSlice'
import {
	DoctorAppointmentT,
	UniqueDoctorAppointmentT,
	UserInfoT
} from '../../types'
import { cleanExpiredAppointments } from '../../../../../assets/functions/clean-expired-appointments'

export const doctorConnectToServer = createAsyncThunk(
	'appointments/adminConnectToServer',
	async (doctorId: string, { dispatch }) => {
		const path = ref(getDatabase(), `doctors/${doctorId}/appointments`)

		onValue(path, async snapshot => {
			// if (!snapshot.exists()) return

			const parsedAppointments = arrFromFirebaseObj<{
				[key: string]: DoctorAppointmentT
			}>(snapshot.val())
			await cleanExpiredAppointments(parsedAppointments, doctorId, 'admin')
			const sorted = sortAppointmentsList(parsedAppointments)

			dispatch(setDoctorAppointments(sorted as UniqueDoctorAppointmentT[]))
		})

		const usersInfoPath = ref(getDatabase(), 'users-info')
		const usersInfo = (await get(usersInfoPath)).val()

		return arrFromFirebaseObj<{ [key: string]: UserInfoT }>(usersInfo)
	}
)
