import { getDatabase, ref, update } from 'firebase/database'
import moment from 'moment'
import { GeneralAppointmentT } from '@/redux/slices/appointments-slice/types'
import { Roles, Unique } from '@/main-types'

type CleanExpiredAppointmentsFuncT = <T extends Unique<GeneralAppointmentT>>(
	list: T[],
	userId: string,
	rights: Roles
) => Promise<void>

export const cleanExpiredAppointments: CleanExpiredAppointmentsFuncT = async (
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
