import {
	UniqueDoctorAppointmentT,
	UniqueUserAppointmentT
} from '../../redux/slices/appointments-slice/types'

type SortAppointmentsListFuncT = (
	arr: UniqueDoctorAppointmentT[] | UniqueUserAppointmentT[]
) => UniqueDoctorAppointmentT[] | UniqueUserAppointmentT[]

export const sortAppointmentsList: SortAppointmentsListFuncT = arr => {
	return arr.sort((item1, item2) => {
		return item1.fullDateISO.localeCompare(item2.fullDateISO)
	})
}
