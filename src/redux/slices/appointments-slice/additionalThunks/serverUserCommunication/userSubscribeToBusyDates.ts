import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/array-from-firebase-object'
import { ResponseAppointments } from '../../../../../assets/functions/get-all-busy-dates-ISO'
import { setBusyDates } from '../../appointmentsSlice'

export const userSubscribeToBusyDates = createAsyncThunk(
	'appointments',
	async (doctorId: string, { dispatch }) => {
		const doctorAppointmentsPath = ref(
			getDatabase(),
			`doctors/${doctorId}/appointments`
		)

		onValue(doctorAppointmentsPath, snapshot => {
			if (!snapshot.exists()) return dispatch(setBusyDates([]))
			const appointments = arrFromFirebaseObj<ResponseAppointments>(
				snapshot.val()
			)
			const busyDatesISO = appointments.map(
				appointment => appointment.fullDateISO
			)

			dispatch(setBusyDates(busyDatesISO))
		})
	}
)
