import { DoctorAppointmentT } from '../../redux/slices/appointments-slice/types'
import { get, getDatabase, ref } from 'firebase/database'
import { arrFromFirebaseObj } from './array-from-firebase-object'

type getAllBusyDatesISOFuncT = (doctorId: string) => Promise<string[]>

export const getAllBusyDatesISO: getAllBusyDatesISOFuncT = async doctorId => {
	const db = getDatabase()
	const appointmentsPath = ref(db, `doctors/${doctorId}/appointments`)

	const snapshot = await get(appointmentsPath)
	if (!snapshot.exists()) return []

	const appointments = arrFromFirebaseObj<ResponseAppointments>(snapshot.val())

	const busyDatesISO = appointments.map(appointment => appointment.fullDateISO)

	return busyDatesISO
}

export type ResponseAppointments = { [key: string]: DoctorAppointmentT }
