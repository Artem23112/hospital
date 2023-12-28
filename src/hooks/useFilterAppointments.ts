import moment from 'moment'
import { useEffect, useState } from 'react'
import { FiltersT } from '../components/layout/doctor-workspace/DoctorWorkspace'
import { GeneralAppointmentT } from '../redux/slices/appointments-slice/types'

export const useFilterAppointments = <T extends GeneralAppointmentT, F extends FiltersT>(
	list: T[],
	typeFilter: F,
	dateFilter: string
): [T[], F, React.Dispatch<React.SetStateAction<F>>] => {
	const [chosenFilter, setChosenFilter] = useState<F>(typeFilter)
	const [handledList, setHandleList] = useState<T[]>([])

	const filtrateByDateFilter = (item: T) => {
		return moment(item.fullDateISO).startOf('day').toISOString() === dateFilter
	}

	useEffect(() => {
		if (chosenFilter === 'all') {
			setHandleList(list.filter(filtrateByDateFilter))
		} else {
			setHandleList(list.filter(item => item.status === chosenFilter).filter(filtrateByDateFilter))
		}
	}, [chosenFilter, dateFilter, list])

	return [handledList!, chosenFilter, setChosenFilter]
}
