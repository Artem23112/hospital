import { getDatabase, ref, get } from 'firebase/database'
import { arrFromFirebaseObj } from './arrFromFirebaseObj'
import { DoctorAppointmentT } from '../../redux/slices/appointments-slice/types'

type getAllBusyDatesISOFuncT = (doctorId: string) => Promise<string[]>

export const getAllBusyDatesISO: getAllBusyDatesISOFuncT = async doctorId => {
	const db = getDatabase()
	const appointmentsPath = ref(db, `doctors/${doctorId}/appointments`)

	const snapshot = await get(appointmentsPath)
	if (!snapshot.exists()) return []

	const appointments = arrFromFirebaseObj<ResponseAppointments>(snapshot.val())
	const busyAppointments = appointments.filter(
		appointment => appointment.status !== 'canceled'
	)
	const busyDatesISO = busyAppointments.map(
		appointment => appointment.fullDateISO
	)

	return busyDatesISO
}

export type ResponseAppointments = { [key: string]: DoctorAppointmentT }
