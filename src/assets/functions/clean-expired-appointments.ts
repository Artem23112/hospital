import { getDatabase, ref, update } from 'firebase/database'
import moment from 'moment'
import {
	UniqueDoctorAppointmentT,
	UniqueUserAppointmentT
} from '../../redux/slices/appointments-slice/types'

type cleanExpiredAppointmentsFuncT = (
	list: UniqueUserAppointmentT[] | UniqueDoctorAppointmentT[],
	userId: string,
	rights: 'admin' | 'user'
) => void

export const cleanExpiredAppointments: cleanExpiredAppointmentsFuncT = async (
	list,
	userId,
	rights
) => {
	list.forEach(item => {
		if (
			moment(item.fullDateISO).isBefore(moment()) &&
			item.status === 'enrolled'
		) {
			const db = getDatabase()
			const path = `${
				rights === 'admin' ? 'doctors' : 'users'
			}/${userId}/appointments/${item.id}/`

			update(ref(db, path), { status: 'expired' })
		}
	})
}
