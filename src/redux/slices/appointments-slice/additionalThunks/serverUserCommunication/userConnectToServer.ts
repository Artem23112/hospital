import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import { sortAppointmentsList } from '../../../../../assets/functions/sort-appointments-list'
import { setUserAppointments } from '../../appointmentsSlice'

import { cleanExpiredAppointments } from '../../../../../assets/functions/clean-expired-appointments'
import { DoctorInfoT, doctorsInfoFromServer } from '../serverDoctorCommunication/types'
import { UniqueUserAppointmentT, UserAppointmentT, userAppointmentsFromServer } from './types'

export const userConnectToServer = createAsyncThunk(
	'appointments/userConnectToServer',
	async (userId: string, { dispatch, rejectWithValue }) => {
		const path = ref(getDatabase(), `users/${userId}/appointments`)

		onValue(path, async snapshot => {
			const data: unknown = snapshot.val()
			if (!userAppointmentsFromServer.guard(data)) {
				return rejectWithValue('unknown type of user appointment data')
			}

			const parsedAppointments = arrFromFirebaseObj<UserAppointmentT>(data)
			await cleanExpiredAppointments(parsedAppointments, userId, 'user')

			const sorted = sortAppointmentsList<UniqueUserAppointmentT>(parsedAppointments)

			dispatch(setUserAppointments(sorted))
		})

		const doctorsInfoPath = ref(getDatabase(), 'doctors-info')
		const doctorsInfo: unknown = (await get(doctorsInfoPath)).val()
		if (!doctorsInfoFromServer.guard(doctorsInfo)) {
			return rejectWithValue('unknown type info about doctors')
		}

		return arrFromFirebaseObj<DoctorInfoT>(doctorsInfo)
	}
)
