import { get, getDatabase, ref } from 'firebase/database'
import { arrFromFirebaseObj } from './array-from-firebase-object'
import {
	DoctorAppointmentT,
	doctorAppointmentsFromServer
} from '../../redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'

type getAllBusyDatesISOFuncT = (doctorId: string) => Promise<string[] | never>

export const getAllBusyDatesISO: getAllBusyDatesISOFuncT = async doctorId => {
	const db = getDatabase()
	const appointmentsPath = ref(db, `doctors/${doctorId}/appointments`)

	const snapshot = await get(appointmentsPath)
	const data: unknown = snapshot.val()
	if (!snapshot.exists()) return []
	if (!doctorAppointmentsFromServer.guard(data)) {
		throw new Error('unknown type of doctor appointment data')
	}

	const appointments = arrFromFirebaseObj<DoctorAppointmentT>(data)

	const busyDatesISO = appointments.map(appointment => appointment.fullDateISO)

	return busyDatesISO
}
