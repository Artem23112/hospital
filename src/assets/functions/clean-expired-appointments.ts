import {
	getDoctorAppointmentApiUrl,
	getPatientAppointmentApiUrl,
} from '@/assets/shared/constants/api.endpoints'
import { Roles, Unique } from '@/main-types'
import { GeneralAppointmentT } from '@/redux/slices/appointments-slice/types'
import { getDatabase, ref, update } from 'firebase/database'
import moment from 'moment'

type CleanExpiredAppointmentsFuncT = <T extends Unique<GeneralAppointmentT>>(
	list: T[],
	id: string,
	rights: Roles
) => Promise<void>

export const cleanExpiredAppointments: CleanExpiredAppointmentsFuncT = async (
	list,
	id,
	rights
) => {
	list.forEach(item => {
		if (
			moment(item.fullDateISO).isBefore(moment()) &&
			item.status === 'enrolled'
		) {
			const db = getDatabase()
			let path: string = ''

			if (rights === 'doctor') path = getDoctorAppointmentApiUrl(id, item.id)
			if (rights === 'patient') path = getPatientAppointmentApiUrl(id, item.id)

			update(ref(db, path), { status: 'expired' })
		}
	})
}
