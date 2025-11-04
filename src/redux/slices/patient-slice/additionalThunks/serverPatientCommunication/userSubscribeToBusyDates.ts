import { arrFromFirebaseObj } from '@/shared/utils/functions/convert/array-from-firebase-object'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, onValue, ref } from 'firebase/database'
import {
	DoctorAppointmentT,
	doctorAppointmentsFromServer,
} from '../../../doctorSlice/serverDoctorCommunication/types'
import { setBusyDates } from '../../patientSlice'

export const userSubscribeToBusyDates = createAsyncThunk(
	'appointments',
	async (doctorId: string, { dispatch, rejectWithValue }) => {
		const doctorAppointmentsPath = ref(
			getDatabase(),
			`doctors/${doctorId}/appointments`
		)

		onValue(doctorAppointmentsPath, snapshot => {
			const data: unknown = snapshot.val()
			if (!snapshot.exists()) return dispatch(setBusyDates([]))
			if (!doctorAppointmentsFromServer.guard(data)) {
				return rejectWithValue('unknown type of doctor appointment data')
			}

			const appointments = arrFromFirebaseObj<DoctorAppointmentT>(data)
			const busyDatesISO = appointments.map(
				appointment => appointment.fullDateISO
			)

			dispatch(setBusyDates(busyDatesISO))
		})
	}
)
