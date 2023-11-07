import moment from 'moment'
import { UniqueDoctorAppointmentT } from '../../redux/slices/appointments-slice/types'

export function selectAppointmentsForDate(
	originalList: UniqueDoctorAppointmentT[],
	date: Date
) {
	return originalList.filter(appointment => {
		const normalizedAppointmentDate = moment(appointment.fullDateISO)
			.startOf('day')
			.toISOString()

		return normalizedAppointmentDate === date.toISOString()
	})
}
