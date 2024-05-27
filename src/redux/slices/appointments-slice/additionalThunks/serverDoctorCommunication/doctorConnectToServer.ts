import {
	getDoctorAppointmentsApiUrl,
	getPatientInfoApiUrl,
} from '@/assets/shared/constants/api.endpoints'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, onValue, query, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import { cleanExpiredAppointments } from '../../../../../assets/functions/clean-expired-appointments'
import { sortAppointmentsList } from '../../../../../assets/functions/sort-appointments-list'
import { setDoctorAppointments } from '../../appointmentsSlice'
import {
	UserInfoT,
	usersInfoFromServer,
} from '../serverUserCommunication/types'
import {
	DoctorAppointmentT,
	UniqueDoctorAppointmentT,
	doctorAppointmentsFromServer,
} from './types'

export const doctorConnectToServer = createAsyncThunk(
	'appointments/adminConnectToServer',
	async (doctorId: string, { dispatch, rejectWithValue }) => {
		const path = ref(getDatabase(), getDoctorAppointmentsApiUrl(doctorId))

		onValue(path, async snapshot => {
			const data: unknown = snapshot.val()
			if (!doctorAppointmentsFromServer.guard(data)) {
				return rejectWithValue('unknown type of doctor appointment data')
			}

			const parsedAppointments = arrFromFirebaseObj<DoctorAppointmentT>(data)
			await cleanExpiredAppointments(parsedAppointments, doctorId, 'doctor')

			const sorted =
				sortAppointmentsList<UniqueDoctorAppointmentT>(parsedAppointments)

			dispatch(setDoctorAppointments(sorted))
		})

		const test = query(ref(getDatabase(), 'some-path'))
		const usersInfoPath = ref(getDatabase(), getPatientInfoApiUrl())
		const usersInfo: unknown = (await get(usersInfoPath)).val()
		if (!usersInfoFromServer.guard(usersInfo)) {
			return rejectWithValue('unknown type info about users')
		}

		return arrFromFirebaseObj<UserInfoT>(usersInfo)
	}
)
