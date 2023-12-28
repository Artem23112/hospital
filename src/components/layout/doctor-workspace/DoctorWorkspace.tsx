import moment from 'moment'
import { useEffect, useState } from 'react'
import { selectAppointmentsForDate } from '../../../assets/functions/sorting-helper'
import { useSort } from '../../../hooks/useSort'
import { UniqueDoctorAppointmentT } from '../../../redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { StatusAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { SortButtons, SortItemConfigT } from '../../UI/SortButtons/SortButtons'
import { StyledCalendar } from '../../UI/StyledCalendar/StyledCalendar'
import { PatientList } from '../patient-list/PatientList'
import s from './DoctorWorkspace.module.scss'

type DoctorWorkspacePropsT = {
	doctorAppointments: UniqueDoctorAppointmentT[]
}

export const DoctorWorkspace = ({ doctorAppointments }: DoctorWorkspacePropsT) => {
	const [chosenDate, setChosenDate] = useState<Date>(moment().startOf('day').toDate())
	const { filter, sortedList, changeChosenDate, changeFilter } = useSort<
		UniqueDoctorAppointmentT,
		Date
	>(doctorAppointments, chosenDate, selectAppointmentsForDate, filterFunc)

	useEffect(() => {
		changeChosenDate(chosenDate)
	}, [chosenDate])

	function filterFunc(item: UniqueDoctorAppointmentT): boolean {
		return item.status === filter
	}

	const sortConfig: SortItemConfigT[] = [
		{
			filter: 'all',
			btnText: 'Все'
		},
		{
			filter: 'enrolled',
			btnText: 'Записанные'
		},
		{
			filter: 'admitted',
			btnText: 'Принятые'
		},
		{
			filter: 'not-admitted',
			btnText: 'Не принятые'
		},
		{ filter: 'expired', btnText: 'Просроченные' }
	]

	return (
		<>
			<div className={s['wrapper']}>
				<SortButtons
					className={s['sort-btns-wrapper']}
					sortConfig={sortConfig}
					chosenFilter={filter}
					handleClick={changeFilter}
				/>
				<PatientList className={s['appointment-list']} doctorAppointments={sortedList} />
				<StyledCalendar
					className={s['calendar']}
					value={chosenDate}
					onChange={v => setChosenDate(v as Date)}
				/>
			</div>
		</>
	)
}

export type FiltersT = StatusAppointmentT | 'all'
