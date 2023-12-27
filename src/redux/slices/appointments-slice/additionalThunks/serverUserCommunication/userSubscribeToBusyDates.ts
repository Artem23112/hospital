import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import { setBusyDates } from '../../appointmentsSlice'
import {
	DoctorAppointmentT,
	doctorAppointmentsFromServer
} from '../serverDoctorCommunication/types'

export const userSubscribeToBusyDates = createAsyncThunk(
	'appointments',
	async (doctorId: string, { dispatch, rejectWithValue }) => {
		const doctorAppointmentsPath = ref(getDatabase(), `doctors/${doctorId}/appointments`)

		onValue(doctorAppointmentsPath, ({ val, exists }) => {
			const snapshot: unknown = val()
			if (!exists()) return dispatch(setBusyDates([]))
			if (!doctorAppointmentsFromServer.guard(snapshot)) {
				return rejectWithValue('unknown type of doctor appointment data')
			}

			const appointments = arrFromFirebaseObj<DoctorAppointmentT>(snapshot)
			const busyDatesISO = appointments.map(appointment => appointment.fullDateISO)

			dispatch(setBusyDates(busyDatesISO))
		})
	}
)
