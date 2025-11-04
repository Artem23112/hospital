import { GeneralAppointmentT } from '@/redux/slices/patient-slice/types'

type SortAppointmentsListFuncT = <T extends GeneralAppointmentT>(
	arr: T[]
) => T[]

export const sortAppointmentsList: SortAppointmentsListFuncT = arr => {
	return arr.sort((item1, item2) => {
		return item1.fullDateISO.localeCompare(item2.fullDateISO)
	})
}
