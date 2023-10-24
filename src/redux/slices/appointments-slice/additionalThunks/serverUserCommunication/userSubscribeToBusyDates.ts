import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, onValue, ref } from 'firebase/database'
import { arrFromFirebaseObj } from '../../../../../assets/functions/arrFromFirebaseObj'
import { ResponseAppointments } from '../../../../../assets/functions/getAllBusyDatesISO'
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
			const busyAppointments = appointments.filter(
				appointment => appointment.status !== 'canceled'
			)
			const busyDatesISO = busyAppointments.map(
				appointment => appointment.fullDateISO
			)

			dispatch(setBusyDates(busyDatesISO))
		})
	}
)
